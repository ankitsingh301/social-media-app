import { Box, Center, Text } from "@chakra-ui/react";
import Header from "Component/Header";
import bgImg from "assets/background-image.jpg";
import { useAuth } from "hooks/auth";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "utils/routes";
import Footer from "Component/Footer";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(PROFILE);
    }
  }, [user]);
  return (
    <>
      <Header />

      <Box
        width="full"
        height="80.5vh"
        bgImage={bgImg}
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text className="text-red-600 font-black md:text-9xl">WELCOME!</Text>
      </Box>

      <Footer />
    </>
  );
};
export default Home;
