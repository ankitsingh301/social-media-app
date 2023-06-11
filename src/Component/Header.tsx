import { Button, Center, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import logo from "assets/social-media-logo.jpg";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "utils/routes";
import { useAuth } from "hooks/auth";
import { useLogout } from "hooks/auth";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { logout, isLoading } = useLogout();
  function handleLoginClick() {
    navigate(LOGIN);
  }
  function handleSignUpClick() {
    navigate(REGISTER);
  }

  return (
    <Flex px={2} bg="blue.600" className="h-24">
      <Center>
        <Image src={logo} boxSize="30px" mr={3}></Image>
        <Text color="white" fontWeight={700} className="md:text-2xl">
          SOCIAL-MEDIA
        </Text>
      </Center>
      <Spacer />
      {!user && !loading ? (
        <Center>
          <Button mr={3} onClick={handleLoginClick}>
            LOGIN
          </Button>
          <Button onClick={handleSignUpClick}>SIGNUP</Button>
        </Center>
      ) : (
        <Center>
          <Button onClick={logout}>LOGOUT</Button>
        </Center>
      )}
    </Flex>
  );
};
export default Header;
