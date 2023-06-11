import { Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

interface IPROPS {
  user: any;
}
const UsernameButton: React.FC<IPROPS> = ({ user }) => {
  return (
    <Button as={Link} to={`/user/${user.id}`} colorScheme="teal" variant="link">
      {user.username}
    </Button>
  );
};
export default UsernameButton;
