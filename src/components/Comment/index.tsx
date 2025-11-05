import React from 'react';
import styles from './comment.module.css';
import Avatar from '@/components/Avatar';
import type { CommentProps } from '@/components/Comment/comment.types.ts';

const Comment: React.FC<CommentProps> = ({
  username,
  avatar_url,
  timeAgo,
  text,
}) => {
  return (
    <div className={styles['comment']}>
      <div className={styles['comment__header']}>
        <Avatar avatar_url={avatar_url} />
        <div className={styles['comment__meta']}>
          <span className={styles['comment__username']}>{username}</span>
          <span className={styles['comment__time']}>{timeAgo}</span>
        </div>
      </div>
      <p className={styles['comment__text']}>{text}</p>
    </div>
  );
};

export default Comment;
