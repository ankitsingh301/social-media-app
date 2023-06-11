import { Avatar, Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { useAddComment } from "hooks/comment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
interface IPROPS {
  post: any;
}

const NewComment: React.FC<IPROPS> = ({ post }) => {
  const { id: postID } = post;
  const { user, loading } = useAuth();

  const [userDetail, setUserDetail] = useState<any>();
  const [comment, setComment] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const { addComment, isLoading } = useAddComment({
    postID,
    uid: userDetail && userDetail.id,
  });

  function handleCommentChange(e: any) {
    setComment(e.target.value);
  }
  function handleAddComment(e: any) {
    e.preventDefault();
    if (comment) {
      addComment(comment);
      setComment("");
    } else {
      toast({
        title: "Nothing to comment",
        description: "Please add comment",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }
  useEffect(() => {
    setUserDetail(user);
  }, [user, userDetail]);
  return (
    <Box maxW="600px" mx="auto" py="6">
      <Flex padding="4">
        <Avatar
          name={userDetail && userDetail.username}
          src={userDetail && userDetail.avatar}
        />
        <Box flex="1" ml="4">
          <form onSubmit={handleAddComment}>
            <Box>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                value={comment}
                onChange={handleCommentChange}
              />
            </Box>
            <Flex pt="2">
              <Button type="submit" colorScheme="teal" size="xs" ml="auto">
                Add Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
export default NewComment;
