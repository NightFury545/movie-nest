import React from 'react';
import type { MovieCardProps } from './movie-card.types';
import styles from './movie-card.module.css';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  rating,
  releaseYear,
  imageUrl,
  slug,
}) => {
  return (
    <Link to={`/movies/${slug}`}>
      <div className={styles['movie-card']}>
        <div className={styles['movie-card__image-wrapper']}>
          <img
            src={imageUrl}
            alt={title}
            className={styles['movie-card__image']}
            loading="lazy"
          />
        </div>

        <div className={styles['movie-card__info']}>
          <h4 className={styles['movie-card__title']} title={title}>
            {title.length > 15 ? `${title.slice(0, 12)}...` : title}
          </h4>
          <div className={styles['movie-card__meta']}>
            <span className={styles['movie-card__year']}>{releaseYear}</span>
            <span className={styles['movie-card__type']}>• TV</span>
            <span className={styles['movie-card__rating']}>
              <FaStar className={styles['movie-card__rating-icon']} />
              {rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(MovieCard);
