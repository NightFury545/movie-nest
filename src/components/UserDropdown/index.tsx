import type { User } from '@/types';
import Avatar from '@/components/Avatar';

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  return (
    <div className="user-dropdown">
      <Avatar avatar_url={user.avatar} />
    </div>
  );
};

export default UserDropdown;
