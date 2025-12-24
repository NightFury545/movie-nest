import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { movies } from './movies';

export const favorites = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  movieId: uuid('movie_id')
    .notNull()
    .references(() => movies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
