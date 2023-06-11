import { Box } from "@chakra-ui/react";
import { useComments } from "hooks/comment";
import CommentItem from "./CommentItem";
interface IPROPS {
  post: any;
}
const CommentList: React.FC<IPROPS> = ({ post }) => {
  const { id } = post;
  const { comments, isLoading } = useComments(id);

  return (
    <Box>
      {comments?.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </Box>
  );
};
export default CommentList;
