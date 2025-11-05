import styles from './category-card.module.css';
import type { CategoryCardProps } from '@/pages/HomePage/CategoriesSection/CategoryCard/category-card.types.ts';
import React from 'react';

const CategoryCard: React.FC<CategoryCardProps> = ({ title, movies }) => {
  return (
    <div className={styles['category-card']}>
      <div className={styles['category-card__images']}>
        {movies.slice(0, 4).map((movie, index) => (
          <img
            key={index}
            src={movie.image}
            alt={`${title} movie ${index + 1}`}
            className={styles['category-card__image']}
          />
        ))}
      </div>
      <div className={styles['category-card__footer']}>
        <span className={styles['category-card__title']}>{title}</span>
        <span className={styles['category-card__arrow']}>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;
