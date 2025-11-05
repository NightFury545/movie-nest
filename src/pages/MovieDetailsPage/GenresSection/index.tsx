import React from 'react';
import styles from './genres-section.module.css';
import type { GenresSectionProps } from '@/pages/MovieDetailsPage/GenresSection/genres-section.types.ts';

const fallbackIcon = 'https://cdn-icons-png.flaticon.com/512/1710/1710164.png';

const GenresSection: React.FC<GenresSectionProps> = ({ genres }) => {
  return (
    <section className={styles['genres']}>
      <h2 id="Жанри" className={styles['genres__title']}>
        Жанри
      </h2>
      <div className={styles['genres__grid']}>
        {genres.map((genre, index) => (
          <div key={index} className={styles['genres__item']}>
            <div className={styles['genres__info']}>
              <h3 className={styles['genres__name']}>{genre.title}</h3>
              <p className={styles['genres__description']}>
                {genre.description}
              </p>
            </div>
            <img
              src={genre.iconUrl || fallbackIcon}
              alt={genre.title}
              className={styles['genres__icon']}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenresSection;
