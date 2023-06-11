import { useToast } from "@chakra-ui/react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useUser(uid: any) {
  const [user, setUser] = useState<any>({});

  async function getData() {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const res = await getDoc(docRef);
      const data = res.data();
      setUser(data);
    }
  }
  useEffect(() => {
    getData();
  }, [uid]);
  return { user };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}

export function useUpdateAvatar(uid: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    setLoading(true);

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast({
      title: "Profile updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);

    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}

export function useUpdateBio(uid: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  async function updateBio() {
    if (text == undefined) {
      toast({
        title: "Nothing found",
        description: "Please add bio",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    setIsLoading(true);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { bio: text });
    toast({
      title: "Profile updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setIsLoading(false);
    navigate(0);
  }

  return { isLoading, setText, updateBio };
}

export function useUpdateFollowing(uid: string) {
  const navigate = useNavigate();
  const toast = useToast();
  const [followLoading, setIsLoading] = useState(false);
  const { user } = useUser(uid);
  async function addFollower(id: string) {
    setIsLoading(true);
    const followingArray = user.following;
    if (followingArray.includes(id)) {
      return;
    } else {
      followingArray.push(id);
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { following: followingArray });
    }
    toast({
      title: "user Followed",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setIsLoading(false);
    navigate(0);
  }

  async function removeFollower(id: string) {
    setIsLoading(true);
    const followingArray = user.following;
    const index = followingArray.indexOf(id);
    followingArray.splice(index, 1);
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { following: followingArray });
    toast({
      title: "user Unfollowed",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setIsLoading(false);
    navigate(0);
  }
  return { followLoading, addFollower, removeFollower };
}
