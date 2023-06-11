import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { usePosts } from "hooks/posts";
import Avatar from "utils/Avatar";

interface IPROPS {
  user: any;
}

const UserDetail: React.FC<IPROPS> = ({ user }) => {
  const { posts } = usePosts(user.id);
  return (
    <Flex p={["4", "6"]} pos="relative" align="center">
      <Avatar size="2xl" user={user} />
      <Stack ml="10">
        <Text fontSize="2xl">{user.username}</Text>
        <HStack spacing="10">
          <Text color="gray.700" fontSize={["sm", "lg"]}>
            Posts: {posts?.length}
          </Text>
          <Text color="gray.700" fontSize={["sm", "lg"]}>
            {user.date && `Joined: ${format(user.date, "MMMM YYY")}`}
          </Text>
        </HStack>
      </Stack>
    </Flex>
  );
};
export default UserDetail;
