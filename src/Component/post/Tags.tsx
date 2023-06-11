import { useUser } from "hooks/user";
import UsernameButton from "utils/UserNameButton";

interface IPROPS {
  userId: string;
}

const Tags: React.FC<IPROPS> = ({ userId }) => {
  const { user } = useUser(userId);
  return (
    <span className="mr-2 border rounded-full px-3 border-rose-600">
      <UsernameButton user={user} />
    </span>
  );
};
export default Tags;
