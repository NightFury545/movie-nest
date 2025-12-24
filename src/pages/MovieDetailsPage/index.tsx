import React from 'react';
import styles from './movie-details-page.module.css';
import DescriptionSection from '@/pages/MovieDetailsPage/DescriptionSection';
import GenresSection from '@/pages/MovieDetailsPage/GenresSection';
import { mockComments } from '@/data/movie-details-page.ts';
import ActorsSection from '@/pages/MovieDetailsPage/ActorsSection';
import CommentsSection from '@/pages/MovieDetailsPage/CommentsSection';
import { Navigate, useParams } from 'react-router-dom';
import { useGetMovie } from '@/hooks/movies/useGetMovie.ts';
import MovieDetailsSkeleton from '@/components/MovieDetailsSkeleton';
import { useAddFavorite } from '@/hooks/favorites/useAddFavorite.ts';
import { useAuth } from '@/hooks/useAuth.ts';

const MovieDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuth();
  const { data: movie, isLoading, isError } = useGetMovie(slug ?? '');

  const { mutate: addToFavorites, isPending } = useAddFavorite();

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (isError || !movie) {
    return <Navigate to="/movies" replace />;
  }

  const handdleAddToFavorites = () => {
    if (isAuthenticated) {
      addToFavorites(movie.id);
    } else {
      alert(
        'Будь ласка, увійдіть в свій обліковий запис щоб додавати фільми до улюблених',
      );
    }
  };

  return (
    <div className={styles['movie-details']}>
      <DescriptionSection
        title={movie.title}
        description={movie.overview}
        imageUrl={movie.posterUrl}
        backgroundUrl={movie.backdropUrl}
        rating={movie.rating}
        type={'Фільм'}
        status={movie.status}
        releaseDate={movie.releaseDate}
        language={movie.originalLanguage}
        duration={movie.runtime}
        age={movie.ageRating}
        country={movie.productionCountries?.[0]}
        handleAddToFavorites={handdleAddToFavorites}
        isFavoriteLoading={isPending}
      />
      <div className={styles['movie-details__divider']} />
      <GenresSection genres={movie.genres} />
      <div className={styles['movie-details__divider']} />
      <ActorsSection actors={movie.actors} />
      <div className={styles['movie-details__divider']} />
      <CommentsSection comments={mockComments} />
    </div>
  );
};

export default MovieDetailsPage;
