import type { Genre } from './genre';
import type { ActorSummary } from './actor';

export type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

export interface MovieSummary {
  id: string;
  tmdbId: number;
  title: string;
  releaseDate: string | null;
  posterUrl: string | null;
  rating: number | null;
  status: MovieStatus | null;
}

export interface MovieDetails extends MovieSummary {
  originalTitle: string | null;
  overview: string | null;
  runtime: number | null;
  ageRating: string | null;
  originalLanguage: string | null;
  productionCountries: string[];
  backdropUrl: string | null;
  budget: number | null;
  revenue: number | null;
  createdAt: string;
  updatedAt: string;
  genres?: Genre[];
  actors?: ActorSummary[];
}

export type SortOrder = 'asc' | 'desc';

export type MovieSortableField =
  | 'title'
  | 'releaseDate'
  | 'rating'
  | 'runtime'
  | 'status';

export interface MovieQueryParams {
  page: number;
  limit: number;
  sortBy?: MovieSortableField;
  sortOrder?: SortOrder;
  title?: string;
  genres?: string[];
  languages?: string[];
  countries?: string[];
  statuses?: MovieStatus[];
  ageRatings?: string[];
  minYear?: number;
  maxYear?: number;
  minRuntime?: number;
  maxRuntime?: number;
  minRating?: number;
  maxRating?: number;
}
