import React from 'react';
import styles from './actor-card.module.css';
import type { ActorCardProps } from '@/components/ActorCard/actor-card.types.ts';

const ActorCard: React.FC<ActorCardProps> = ({
  name,
  birthYear,
  role,
  imageUrl,
}) => {
  return (
    <div className={styles['actor-card']}>
      <div className={styles['actor-card__image-wrapper']}>
        <img
          src={imageUrl}
          alt={name}
          className={styles['actor-card__image']}
          loading="lazy"
        />
      </div>

      <div className={styles['actor-card__info']}>
        <h4 className={styles['actor-card__name']} title={name}>
          {name}
        </h4>
        <p className={styles['actor-card__meta']}>
          {birthYear} • {role}
        </p>
      </div>
    </div>
  );
};

export default React.memo(ActorCard);
