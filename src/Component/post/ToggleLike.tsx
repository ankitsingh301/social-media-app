import { IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { useToggleLike } from "hooks/posts";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";

interface IPROPS {
  post: any;
}

const ToggleLike: React.FC<IPROPS> = ({ post }) => {
  const { user, loading } = useAuth();
  const [userDetail, setUserDetail] = useState<any>();
  const { id, likes } = post;
  const isLiked = likes.includes(userDetail && userDetail.id);

  const { toggleLike, isLoading: likeLoading } = useToggleLike({
    id,
    isLiked,
    uid: userDetail?.id,
  });

  useEffect(() => {
    setUserDetail(user);
  }, [user, userDetail]);
  return (
    <>
      <IconButton
        onClick={toggleLike}
        size="md"
        colorScheme="red"
        variant="ghost"
        icon={isLiked ? <FaHeart /> : <FaRegHeart />}
        isRound
        aria-label=""
      />
      {likes.length}
    </>
  );
};
export default ToggleLike;
