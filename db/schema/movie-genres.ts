import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { movies } from './movies';
import { genres } from './genres';

export const movieGenres = pgTable('movie_genres', {
  movieId: uuid('movie_id')
    .references(() => movies.id)
    .notNull(),
  genreId: uuid('genre_id')
    .references(() => genres.id)
    .notNull(),
});
