import type { MovieSummary } from '@/types/movie.ts';

export interface Favorite extends MovieSummary {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
}
