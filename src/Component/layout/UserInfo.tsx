import { Card, CardBody, Center, Stack, Text } from "@chakra-ui/react";

import EditProfileModal from "./EditProfileModal";
import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";

interface IPROPS {
  userDetail: any;
}

const UserInfo: React.FC<IPROPS> = ({ userDetail }) => {
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
                <Text w="100%">
                  {userDetail.bio ? (
                    userDetail.bio
                  ) : (
                    <span>
                      Add Bio in{" "}
                      <span className="text-red-500">Edit Profile</span> Option
                    </span>
                  )}
                </Text>
              </Center>
            </Stack>
            <EditProfileModal userData={userDetail} />
          </CardBody>
        )}
      </Card>
    </Center>
  );
};
export default UserInfo;
