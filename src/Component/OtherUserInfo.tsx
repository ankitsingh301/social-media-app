import { Card, CardBody, Center, Stack, Text } from "@chakra-ui/react";

import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";

interface IPROPS {
  userDetail: any;
}

const OtherUserInfo: React.FC<IPROPS> = ({ userDetail }) => {
  return (
    <Center>
      <Card w="sm" m="4">
        {userDetail && (
          <CardBody>
            <Center>
              <Avatar size="2xl" user={userDetail} />
            </Center>
            <Stack mt="6" spacing="3">
              <Center>
                <UsernameButton user={userDetail} />
              </Center>
              <Center>
                <Text w="100%">{userDetail.bio}</Text>
              </Center>
            </Stack>
          </CardBody>
        )}
      </Card>
    </Center>
  );
};
export default OtherUserInfo;
