import { Box, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "hooks/user";
import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";

interface IPROPS {
  comment: any;
}
const CommentItem: React.FC<IPROPS> = ({ comment }) => {
  const { date, uid, text } = comment;
  const { user } = useUser(uid);

  return (
    <Box px="4" py="2" textAlign="left">
      <Flex pb="2">
        <Avatar user={user} size="sm" />
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
            <Box>
              <UsernameButton user={user} />
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(date)} ago
              </Text>
            </Box>
          </Flex>

          <div className="w-48 md:w-96">
            <Text>{text}</Text>
          </div>
        </Box>
      </Flex>
    </Box>
  );
};
export default CommentItem;
