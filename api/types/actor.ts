import type { MovieSummary } from './movie';

export type Gender = 'male' | 'female' | 'other';

export interface ActorSummary {
  id: string;
  tmdbId: number;
  name: string;
  profileUrl: string | null;
  popularity: string | null;
  character: string | null;
}

export interface ActorDetails extends ActorSummary {
  originalName: string | null;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  gender: Gender | null;
  placeOfBirth: string | null;
  movies?: MovieSummary[];
}
