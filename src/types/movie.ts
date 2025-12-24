import type { Genre } from './genre';
import type { ActorSummary } from './actor';
import type { SortOrder } from './common';

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
  slug: string;
  releaseDate?: string;
  posterUrl?: string;
  rating?: number;
  status?: MovieStatus;
}

export interface MovieDetails extends MovieSummary {
  originalTitle?: string;
  overview?: string;
  runtime?: number;
  ageRating?: string;
  originalLanguage?: string;
  productionCountries?: string[];
  backdropUrl?: string;
  budget?: number;
  revenue?: number;
  createdAt: string;
  updatedAt: string;
  genres?: Genre[];
  actors?: ActorSummary[];
}

export type MovieSortableField =
  | 'title'
  | 'releaseYear'
  | 'rating'
  | 'runtime'
  | 'status';

export interface MovieQueryParams {
  page: number;
  limit?: number;
  sortBy?: MovieSortableField;
  sortOrder?: SortOrder;
  search?: string;
  genres?: string[];
  languages?: string[];
  countries?: string[];
  statuses?: MovieStatus[];
  ageRestrictions?: string[];
  releaseYear?: [number, number];
  duration?: [number, number];
  rating?: [number, number];
}
