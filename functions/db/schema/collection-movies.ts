import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { collections } from './collections';
import { movies } from './movies';

export const collectionMovies = pgTable('collection_movies', {
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  movieId: uuid('movie_id')
    .notNull()
    .references(() => movies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});
