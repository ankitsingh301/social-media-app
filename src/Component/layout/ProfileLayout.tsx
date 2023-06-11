import {
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Post from "Component/post";
import PostList from "Component/post/PostList";
import { useAuth } from "hooks/auth";
import { useEffect, useState } from "react";
import AllUser from "./AllUser";
import UserInfo from "./UserInfo";

const ProfileLayout: React.FC = () => {
  const { user } = useAuth();
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    setUserDetail(user);
  }, [user]);
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={1}
      display={{ sm: "flex", md: "grid" }}
    >
      <GridItem
        colSpan={2}
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        m="4"
      >
        <UserInfo userDetail={userDetail} />
        <Divider />
        <AllUser userDetail={userDetail} />
      </GridItem>
      <GridItem
        colSpan={3}
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        m="4"
      >
        <Center>
          <Post user={userDetail} />
        </Center>
        <Divider />
        <Text className="text-4xl font-extrabold ml-8 mt-8 text-red-500">
          News Feed
        </Text>
        {userDetail && userDetail.following.length == 0 && (
          <Text className="text-2xl font-bold ml-8 mt-8 text-black">
            Nothing to show right now.......
          </Text>
        )}
        {userDetail &&
          userDetail.following.map((id: any) => {
            return <PostList key={id} userId={id} />;
          })}
      </GridItem>
    </Grid>
  );
};
export default ProfileLayout;
