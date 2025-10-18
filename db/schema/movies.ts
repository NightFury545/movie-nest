import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  real,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';
import type { MovieStatus } from '@api/types';

export const movies = pgTable('movies', {
  id: uuid('id').defaultRandom().primaryKey(),
  tmdbId: integer('tmdb_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  originalTitle: varchar('original_title', { length: 255 }),
  overview: text('overview'),
  releaseDate: date('release_date'),
  runtime: integer('runtime'),
  ageRating: varchar('age_rating', { length: 10 }),
  status: varchar('status', { length: 50 }).$type<MovieStatus>(),
  originalLanguage: varchar('original_language', { length: 20 }),
  posterUrl: text('poster_url'),
  backdropUrl: text('backdrop_url'),
  rating: real('rating'),
  popularity: real('popularity'),
  productionCountries: jsonb('production_countries').$type<string[]>(),
  budget: integer('budget'),
  revenue: integer('revenue'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
