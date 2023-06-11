import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [file, setFile] = useState<any>(null);

  async function addPost(uid: string, post: string, tag: string) {
    setLoading(true);
    const id = uuidv4();
    if (!file) {
      await setDoc(doc(db, "posts", id), {
        id,
        post,
        image: null,
        date: Date.now(),
        likes: [],
        userId: uid,
        tag: tag,
      });
      toast({
        title: "Post added successfully!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return;
    }
    const fileRef = ref(storage, "post/" + id);
    await uploadBytes(fileRef, file);
    const postImage = await getDownloadURL(fileRef);
    await setDoc(doc(db, "posts", id), {
      id,
      post,
      image: postImage,
      date: Date.now(),
      likes: [],
      userId: uid,
      tag: tag,
    });
    toast({
      title: "Post added successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setFile(null);
    setLoading(false);
  }

  return { setFile, addPost, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("userId", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function usePost(id: string) {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);
  return { post, isLoading };
}

interface like {
  id: string;
  isLiked: any;
  uid: string;
}
export function useToggleLike({ id, isLiked, uid }: like) {
  const [isLoading, setLoading] = useState(false);
  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}
