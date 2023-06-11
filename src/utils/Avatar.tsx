import { Avatar as ChakraAvatar } from "@chakra-ui/react";

import { Link } from "react-router-dom";

interface IPROPS {
  user: any;
  size: string;
}

const Avatar: React.FC<IPROPS> = ({ user, size = "xl" }) => {
  return (
    <ChakraAvatar
      as={Link}
      to={`/user/${user.id && user.id}`}
      name={user.username}
      size={size}
      src={user.avatar}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
    />
  );
};
export default Avatar;
