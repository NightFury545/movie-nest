import React from 'react';
import ActorCard from '@/components/ActorCard';
import styles from './actors-section.module.css';
import type { ActorsSectionProps } from '@/pages/MovieDetailsPage/ActorsSection/actors-section.types.ts';

const ActorsSection: React.FC<ActorsSectionProps> = ({ actors }) => {
  return (
    <section className={styles['actors-section']}>
      <h2 id="Актори" className={styles['actors-section__title']}>
        Актори
      </h2>

      <div className={styles['actors-section__grid']}>
        {actors.map((actor, i) => (
          <ActorCard
            key={i}
            name={actor.name}
            birthYear={actor.birthYear}
            role={actor.role}
            imageUrl={actor.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(ActorsSection);
