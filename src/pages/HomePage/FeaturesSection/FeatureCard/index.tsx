import styles from './feature-card.module.css';
import type { FeatureCardProps } from '@/pages/HomePage/FeaturesSection/FeatureCard/feature-card.types.ts';
import React from 'react';

const FeatureCard: React.FunctionComponent<FeatureCardProps> = ({
  title,
  text,
  image,
  icons,
  reverse = false,
}) => {
  return (
    <div
      className={`${styles['feature-card']} ${reverse ? styles['feature-card--reverse'] : ''}`}
    >
      <div className={styles['feature-card__image-wrapper']}>
        <img
          src={image}
          alt={title}
          className={styles['feature-card__image']}
        />
      </div>

      <div className={styles['feature-card__content']}>
        <h3 className={styles['feature-card__title']}>{title}</h3>
        <p className={styles['feature-card__text']}>{text}</p>
        <div className={styles['feature-card__icons']}>
          {icons.map((Icon, idx) => (
            <Icon key={idx} size={20} strokeWidth={1.8} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
