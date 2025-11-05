import React from 'react';
import styles from './movie-details-page.module.css';
import DescriptionSection from '@/pages/MovieDetailsPage/DescriptionSection';
import GenresSection from '@/pages/MovieDetailsPage/GenresSection';
import {
  mockActors,
  mockComments,
  mockMovieDetails,
  movieGenres,
} from '@/data/movie-details-page.ts';
import ActorsSection from '@/pages/MovieDetailsPage/ActorsSection';
import CommentsSection from '@/pages/MovieDetailsPage/CommentsSection';

const MovieDetailsPage: React.FC = () => {
  return (
    <div className={styles['movie-details']}>
      <DescriptionSection {...mockMovieDetails} />
      <div className={styles['movie-details__divider']} />
      <GenresSection genres={movieGenres} />
      <div className={styles['movie-details__divider']} />
      <ActorsSection actors={mockActors} />
      <div className={styles['movie-details__divider']} />
      <CommentsSection comments={mockComments} />
    </div>
  );
};

export default MovieDetailsPage;
