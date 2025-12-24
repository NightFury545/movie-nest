import type { SortOrder } from './common';

export interface Collection {
  id: string;
  userId: string;
  name: string;
  isPublic: boolean;
  movieCount: number;
  createdAt: string;
  updatedAt: string;
  posters?: string[];
}

export interface CreateCollectionData {
  name: string;
  isPublic?: boolean;
}

export interface UpdateCollectionData {
  name?: string;
  isPublic?: boolean;
}

export interface AddMovieToCollectionData {
  collectionId: string;
  movieId: string;
}

export interface RemoveMovieFromCollectionData {
  collectionId: string;
  movieId: string;
}

export type CollectionSortableField =
  | 'title'
  | 'releaseDate'
  | 'moviesAmount'
  | 'createdAt';

export type CollectionVisibility = 'public' | 'private';

export interface CollectionQueryParams {
  page: number;
  limit?: number;
  sortBy?: CollectionSortableField;
  sortOrder?: SortOrder;
  search?: string;
  movieCount?: [number, number];
  visibility?: CollectionVisibility;
  searchByUser?: string;
}
