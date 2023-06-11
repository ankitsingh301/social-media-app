import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import { useUpdateAvatar } from "hooks/user";
import { useUpdateBio } from "hooks/user";

interface IPROPS {
  userData: any;
}

const EditProfileModal: React.FC<IPROPS> = ({ userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(userData?.id);
  const { setText, updateBio, isLoading } = useUpdateBio(userData?.id);

  function handleAvatarChange(e: any) {
    setFile(e.target.files[0]);
  }
  function handleBioChange(e: any) {
    setText(e.target.value);
  }
  return (
    <>
      <Button variant="solid" colorScheme="blue" mt={4} onClick={onOpen}>
        Edit Profile
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="u" fontSize="2xl" fontWeight="bold" color="red.400">
            Edit your profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div>
              <Avatar
                size="2xl"
                name={userData && userData.username}
                src={userData && userData.avatar}
              />
              <input
                className="mt-4"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              ></input>
            </div>

            <Button
              colorScheme="blue"
              mt={3}
              onClick={updateAvatar}
              isLoading={fileLoading}
            >
              Change Avatar
            </Button>

            <div className="mt-4">
              <Text as="u" fontSize="lg" fontWeight="bold" mb="8px">
                Add your Bio:
              </Text>
              <Textarea
                placeholder="Tell us about yourself"
                size="sm"
                onChange={handleBioChange}
              />
            </div>
            <Button
              colorScheme="blue"
              mt={3}
              onClick={updateBio}
              isLoading={isLoading}
            >
              Save Bio
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditProfileModal;
