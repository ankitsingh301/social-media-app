import { IconButton } from "@chakra-ui/react";
import { useComments } from "hooks/comment";
import { useEffect, useState } from "react";
import { FaComment, FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openCommentBox, closeCommentBox } from "Redux/action";

interface IPROPS {
  post: any;
}

const Comment: React.FC<IPROPS> = ({ post }) => {
  const { id } = post;
  const dispatch = useDispatch();
  const [toggleCommentBox, setToggleCommentBox] = useState(false);
  const { comments, isLoading } = useComments(id);
  function handleClick() {
    setToggleCommentBox(!toggleCommentBox);
  }
  useEffect(() => {
    if (toggleCommentBox) {
      dispatch(openCommentBox(id));
    } else {
      dispatch(closeCommentBox());
    }
  }, [toggleCommentBox]);
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="md"
        colorScheme="red"
        variant="ghost"
        ml="4"
        icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
        isRound
        aria-label=""
      />
      {comments?.length}
    </>
  );
};
export default Comment;
