import {
  Button,
  Center,
  Flex,
  Image,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import uploadImagelogo from "assets/uploadImageLogo.png";
import { useAddPost } from "hooks/posts";
import { useState } from "react";
import { useSelector } from "react-redux";
import TagUser from "./TagUser";
import { useDispatch } from "react-redux";
import { clearTag } from "Redux/action";

interface IPROPS {
  user: any;
}

const Post: React.FC<IPROPS> = ({ user }) => {
  const { addPost, isLoading, setFile } = useAddPost();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [postImage, setPostImage] = useState();
  const toast = useToast();
  const taggedUser = useSelector((state: any) => state.SocialMediaState.tags);

  function handleImageUplaod(e: any) {
    setFile(e.target.files[0]);
    setPostImage(e.target.value);
    toast({
      title: "Image uploaded!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
  }
  function handlePostUpload(e: any) {
    setPost(e.target.value);
  }

  function handleAddPost() {
    if (post || postImage) {
      addPost(user.id, post, taggedUser);
      setPost("");
      dispatch(clearTag());
    } else {
      toast({
        title: "Nothing there to post",
        description: "Please add post or select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <div className="w-4/5">
      <Text my="20px" color="teal.600">
        Something in your mind! share{" "}
      </Text>
      <div className="flex">
        <Textarea
          placeholder="Write your post"
          size="sm"
          value={post}
          onChange={handlePostUpload}
        />
        <Center ml="4">
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleAddPost}
          >
            POST
          </Button>
        </Center>
      </div>
      <Flex>
        <TagUser user={user} />
        <div className="mt-2 ml-4">
          <label htmlFor="files">
            <Image w="20px" h="20px" src={uploadImagelogo}></Image>
          </label>
          <input
            id="files"
            type="file"
            accept="image/*"
            style={{ visibility: "hidden", width: "0" }}
            onChange={handleImageUplaod}
          ></input>
        </div>
      </Flex>
    </div>
  );
};
export default Post;
