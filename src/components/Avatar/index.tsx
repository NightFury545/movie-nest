import { DEFAULT_AVATAR } from '@/config/constants.ts';

interface AvatarProps {
  avatar_url?: string;
}

const Avatar = ({ avatar_url }: AvatarProps) => {
  return (
    <div className="avatar">
      <img
        className="avatar__image"
        src={avatar_url || DEFAULT_AVATAR}
        alt="User avatar"
      />
    </div>
  );
};

export default Avatar;
