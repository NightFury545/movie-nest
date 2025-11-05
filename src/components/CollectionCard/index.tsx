import styles from './collection-card.module.css';
import { ArrowRight } from 'lucide-react';
import type { CollectionCardProps } from '@/components/CollectionCard/collection-card.types.ts';
import React from 'react';

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  movieCount,
  date,
  images,
}) => {
  return (
    <div className={styles['collection-card']}>
      <div className={styles['collection-card__images']}>
        {images.slice(0, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`poster-${i}`}
            className={styles['collection-card__image']}
            loading="lazy"
          />
        ))}
      </div>

      <div className={styles['collection-card__info']}>
        <div className={styles['collection-card__header']}>
          <h3 className={styles['collection-card__title']}>{title}</h3>
          <ArrowRight className={styles['collection-card__arrow']} size={18} />
        </div>
        <div className={styles['collection-card__meta']}>
          <span className={styles['collection-card__count']}>
            {movieCount} фільмів
          </span>
          <span className={styles['collection-card__date']}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
