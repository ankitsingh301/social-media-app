import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { usePosts } from "hooks/posts";
import { formatDistanceToNow } from "date-fns";
import ToggleLike from "./ToggleLike";
import { useUser } from "hooks/user";
import Comment from "Component/comment";
import NewComment from "Component/comment/NewComment";
import { useSelector } from "react-redux";
import CommentList from "Component/comment/CommentList";
import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";
import Tags from "./Tags";
import PostCard from "./PostCard";

interface IPROPS {
  userId: any;
}

const PostList: React.FC<IPROPS> = ({ userId }) => {
  const toggleCommentBox = useSelector(
    (state: any) => state.SocialMediaState.showCommentBox
  );

  const { posts, isLoading } = usePosts(userId && userId);
  const { user } = useUser(userId && userId);

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Text fontSize="sm" color="gray.500" className="md:ml-20 mt-10">
                {formatDistanceToNow(post.date)} ago
              </Text>
              <Center>
                <Box
                  className="w-4/5 mb-4"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="9"
                  bg="white"
                >
                  <div>
                    <Avatar size="md" user={user} />
                    <span className=" ml-2">
                      <UsernameButton user={user} />
                    </span>
                  </div>
                  <PostCard post={post} />
                  <Divider />
                  <div className="md:ml-20 mt-4">
                    <ToggleLike post={post} />
                    <Comment post={post} />
                    {post?.tag.length > 0 && (
                      <div>
                        <Text className="mr-2">Tags:</Text>
                        {post?.tag.map((id: string) => {
                          return <Tags key={id} userId={id} />;
                        })}
                      </div>
                    )}
                  </div>
                  {toggleCommentBox.id === post.id ? (
                    <>
                      <NewComment post={post} />
                      <CommentList post={post} />
                    </>
                  ) : null}
                </Box>
              </Center>
            </div>
          );
        })}
    </>
  );
};
export default PostList;
