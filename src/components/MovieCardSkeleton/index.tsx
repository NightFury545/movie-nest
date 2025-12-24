import React from 'react';
import styles from './movie-card-skeleton.module.css';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className={styles['movie-card-skeleton']}>
      <div className={styles['movie-card-skeleton__image-wrapper']}>
        <div className={styles['movie-card-skeleton__image']} />
      </div>

      <div className={styles['movie-card-skeleton__info']}>
        <div className={styles['movie-card-skeleton__title']} />
        <div className={styles['movie-card-skeleton__meta']}>
          <div className={styles['movie-card-skeleton__year']} />
          <div className={styles['movie-card-skeleton__type']} />
          <div className={styles['movie-card-skeleton__rating']} />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
