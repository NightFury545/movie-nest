'use client';
import React from 'react';
import styles from './comments-section.module.css';
import Button from '@/components/ui/Button';
import Comment from '@/components/Comment';
import { ArrowDownUp } from 'lucide-react';
import type { CommentsSectionProps } from '@/pages/MovieDetailsPage/CommentsSection/comments-section.types.ts';

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  onAddComment,
  onSortComments,
}) => {
  return (
    <section className={styles['comments-section']}>
      <h2 id="Коментарі" className={styles['comments-section__title']}>
        Коментарі
      </h2>

      <div className={styles['comments-section__controls']}>
        <Button variant="primary" onClick={onAddComment}>
          Залишити коментар
        </Button>

        <button
          type="button"
          onClick={onSortComments}
          className={styles['comments-section__sort']}
          aria-label="Сортувати коментарі"
        >
          <ArrowDownUp size={20} aria-hidden="true" />
        </button>
      </div>

      <div className={styles['comments-section__list']}>
        {comments.map((comment, idx) => (
          <Comment key={idx} {...comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
