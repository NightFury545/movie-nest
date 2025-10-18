import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';

export const genres = pgTable('genres', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  tmdbId: integer('tmdb_id').notNull(),
});
