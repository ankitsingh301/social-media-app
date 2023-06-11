import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useUsers } from "hooks/user";
import { useEffect, useState } from "react";
import { FaUserTag } from "react-icons/fa";
import Avatar from "utils/Avatar";
import UsernameButton from "utils/UserNameButton";
import { useDispatch, useSelector } from "react-redux";
import { addTags, clearTag } from "Redux/action";

interface IPROPS {
  user: any;
}
const TagUser: React.FC<IPROPS> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users } = useUsers();
  const [tags, setTags] = useState<any>([]);
  const dispatch = useDispatch();
  const taggedUser = useSelector((state: any) => state.SocialMediaState.tags);

  function handleTagClick(id: string) {
    setTags((prevstate: any) => [...prevstate, id]);
  }

  function handleRemoveClick(id: string) {
    const index = tags.indexOf(id);
    const newTagArray = tags?.filter((item: string) => {
      return item !== id;
    });
    setTags(newTagArray);
  }

  useEffect(() => {
    dispatch(addTags(tags));
  }, [tags]);
  return (
    <>
      <IconButton
        size="md"
        colorScheme="red"
        variant="ghost"
        icon={<FaUserTag />}
        isRound
        onClick={onOpen}
        aria-label=""
      />
      {taggedUser.length > 0 && taggedUser.length}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Tag Users</ModalHeader>
          <ModalCloseButton />
          {users
            ?.filter((item) => {
              return item?.id !== user?.id;
            })
            .map((user) => {
              return (
                <ModalBody key={user.id}>
                  <Box>
                    <Flex color="white">
                      <Center>
                        <Avatar size="md" user={user} />
                      </Center>
                      <Center ml="4">
                        <UsernameButton user={user} />
                      </Center>
                      <Spacer />
                      <Center>
                        {taggedUser?.includes(user.id) ? (
                          <Button
                            className="w-24"
                            colorScheme="red"
                            onClick={() => handleRemoveClick(user.id)}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            className="w-24"
                            colorScheme="red"
                            onClick={() => handleTagClick(user.id)}
                          >
                            Tag
                          </Button>
                        )}
                      </Center>
                    </Flex>
                  </Box>
                </ModalBody>
              );
            })}
        </ModalContent>
      </Modal>
    </>
  );
};
export default TagUser;
