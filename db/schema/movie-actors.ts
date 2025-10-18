import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { movies } from './movies';
import { actors } from './actors';

export const movieActors = pgTable('movie_actors', {
  movieId: uuid('movie_id')
    .references(() => movies.id)
    .notNull(),
  actorId: uuid('actor_id')
    .references(() => actors.id)
    .notNull(),
  character: varchar('character', { length: 255 }),
});
