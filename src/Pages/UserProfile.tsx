import { Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import Footer from "Component/Footer";
import Header from "Component/Header";
import UserInfo from "Component/layout/UserInfo";
import OtherUserInfo from "Component/OtherUserInfo";
import PostList from "Component/post/PostList";
import UserDetail from "Component/UserDetail";
import { useAuth } from "hooks/auth";
import { useUser } from "hooks/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser(id);
  const { user: loggedInUser } = useAuth();
  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    setUserDetails(loggedInUser);
  }, [loggedInUser, userDetails]);

  return (
    <>
      <Header />
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
          {userDetails && userDetails.id === id ? (
            <UserInfo userDetail={user} />
          ) : (
            <OtherUserInfo userDetail={user} />
          )}
        </GridItem>
        <GridItem
          colSpan={3}
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          m="4"
        >
          <UserDetail user={user} />

          <Divider />

          <PostList userId={id} />
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};
export default UserProfile;
