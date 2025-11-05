import { DEFAULT_AVATAR } from '@/config/constants.ts';
import styles from './avatar.module.css';
import type { AvatarProps } from '@/components/Avatar/avatar.types.ts';
import React from 'react';

const Avatar: React.FC<AvatarProps> = ({ avatar_url }) => {
  return (
    <div className={styles['avatar']}>
      <img
        className={styles['avatar__image']}
        src={avatar_url || DEFAULT_AVATAR}
        alt="User avatar"
      />
    </div>
  );
};

export default Avatar;
