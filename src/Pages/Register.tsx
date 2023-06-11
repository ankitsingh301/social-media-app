import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuth, useRegister } from "hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, PROFILE } from "utils/routes";
import { validateEmail, validatePassword } from "utils/validate";
import { useToast } from "@chakra-ui/react";

const Register: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [emailError, setEmailError] = useState<Boolean>(false);
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  const { register: signup, isLoading } = useRegister();
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleInputField(e: any) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  function handleRegister(e: any) {
    e.preventDefault();
    const { userName, email, password } = userDetails;
    if (userName && email && password && !emailError && !passwordError) {
      signup({
        userName: userName,
        email: email,
        password: password,
        redirectTo: PROFILE,
      });
    } else {
      toast({
        title: "Please fill valid details",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
  }
  useEffect(() => {
    if ("email" in userDetails) {
      const emailValidate = validateEmail(userDetails.email);
      setEmailError(!emailValidate);
    }
    if ("password" in userDetails) {
      const passwordValidate = validatePassword(userDetails.password);
      setPasswordError(!passwordValidate);
    }
    if (user) {
      navigate(PROFILE);
    }
  }, [userDetails, user]);
  return (
    <Center w="100%" h="100vh" bg="gray.100">
      <Box borderWidth="1px" borderRadius="lg" p="9" mx="1" bg="white">
        <Heading textAlign="center" mb="4" size="lg">
          REGISTER
        </Heading>
        <form onSubmit={handleRegister}>
          <FormControl py="2">
            <FormLabel>User Name</FormLabel>
            <Input
              type="text"
              name="userName"
              placeholder="Your name"
              onChange={handleInputField}
            ></Input>
          </FormControl>
          <FormControl py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              name="email"
              onChange={handleInputField}
            ></Input>
            {emailError ? (
              <p className="text-red-500 text-xs">ENTER VALID EMAIL</p>
            ) : null}
          </FormControl>
          <FormControl py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="Password"
              name="password"
              placeholder="password@123"
              onChange={handleInputField}
            ></Input>
            {passwordError ? (
              <p className="text-red-500 text-xs">
                Password must contain atleast a<br /> number and a special
                character
              </p>
            ) : null}
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="blue"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            Create account
          </Button>
        </form>
        <div className="border-t-2 border-gray-300 mt-4"></div>
        <Text>
          Already have an account?{" "}
          <Link className="text-green-600" to={LOGIN}>
            Login
          </Link>
        </Text>
      </Box>
    </Center>
  );
};
export default Register;
