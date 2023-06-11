import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useUpdateFollowing, useUsers } from "hooks/user";
import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";

interface IPROPS {
  userDetail: any;
}

const AllUser: React.FC<IPROPS> = ({ userDetail }) => {
  const { users, isLoading } = useUsers();
  const { followLoading, addFollower, removeFollower } = useUpdateFollowing(
    userDetail?.id
  );
  function handleFollow(id: string) {
    addFollower(id);
  }
  function handleUnfollow(id: string) {
    removeFollower(id);
  }

  return (
    <div>
      <Text as="u" color="green" className="text-xl font-bold mx-4">
        ALL USERS
      </Text>
      <div
        className="scroll-y overflow-y-auto border mt-4"
        style={{ height: "30rem" }}
      >
        {users &&
          userDetail &&
          users
            .filter((item) => {
              if (userDetail.id !== item.id) {
                return item;
              }
            })
            .map((item) => {
              return (
                <Box m="8" key={item.id}>
                  <Flex color="white">
                    <Center>
                      <Avatar size="md" user={item} />
                    </Center>
                    <Center ml="4">
                      <UsernameButton user={item} />
                    </Center>
                    <Spacer />
                    <Center>
                      {userDetail.following.includes(item.id) ? (
                        <Button
                          className="w-24"
                          colorScheme="red"
                          onClick={() => handleUnfollow(item.id)}
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          className="w-24"
                          colorScheme="yellow"
                          onClick={() => handleFollow(item.id)}
                        >
                          Follow
                        </Button>
                      )}
                    </Center>
                  </Flex>
                </Box>
              );
            })}
      </div>
    </div>
  );
};
export default AllUser;
