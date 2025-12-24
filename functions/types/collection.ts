export interface Collection {
  id: string;
  userId: string;
  name: string;
  isPublic: boolean;
  movieCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCollectionDTO {
  name: string;
  isPublic?: boolean;
}

export interface UpdateCollectionDTO {
  name?: string;
  isPublic?: boolean;
}

export interface AddMovieToCollectionDTO {
  collectionId: string;
  movieId: string;
}

export interface RemoveMovieFromCollectionDTO {
  collectionId: string;
  movieId: string;
}
