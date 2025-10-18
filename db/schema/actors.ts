import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
} from 'drizzle-orm/pg-core';
import type { Gender } from '@api/types';

export const actors = pgTable('actors', {
  id: uuid('id').defaultRandom().primaryKey(),
  tmdbId: integer('tmdb_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  biography: text('biography'),
  birthday: date('birth_date'),
  deathday: date('death_date'),
  gender: varchar('gender', { length: 10 }).$type<Gender>(),
  placeOfBirth: varchar('place_of_birth', { length: 255 }),
  profileUrl: text('profile_url'),
  popularity: text('popularity'),
});
