import React from 'react';
import styles from './movie-details-skeleton.module.css';

const MovieDetailsSkeleton: React.FC = () => {
  return (
    <section className={styles['skeleton']}>
      {/* Background */}
      <div className={styles['skeleton__background']} />

      {/* Breadcrumb */}
      <div className={styles['skeleton__breadcrumb']}>
        <div className={styles['skeleton__breadcrumb-item']} />
        <div className={styles['skeleton__breadcrumb-separator']} />
        <div className={styles['skeleton__breadcrumb-item--wide']} />
      </div>

      <div className={styles['skeleton__container']}>
        {/* Poster */}
        <div className={styles['skeleton__poster']}>
          <div className={styles['skeleton__poster-image']} />
          <div className={styles['skeleton__poster-buttons']}>
            <div className={styles['skeleton__button']} />
            <div className={styles['skeleton__button']} />
          </div>
        </div>

        {/* Content */}
        <div className={styles['skeleton__content']}>
          <div className={styles['skeleton__title']} />

          <div className={styles['skeleton__text']}>
            <div />
            <div />
            <div className={styles['short']} />
          </div>

          <div className={styles['skeleton__tabs']}>
            <div className={styles['skeleton__tab']} />
            <div className={styles['skeleton__tab']} />
            <div className={styles['skeleton__tab']} />
          </div>

          <div className={styles['skeleton__info']}>
            <div className={styles['skeleton__info-block']}>
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className={styles['skeleton__info-block']}>
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsSkeleton;
