import api from '@/lib/axios';
import type { Collection, MovieSummary } from '@/types';
import type { PaginatedResponse } from '@/types';
import type {
  CreateCollectionData,
  UpdateCollectionData,
  AddMovieToCollectionData,
  RemoveMovieFromCollectionData,
  CollectionQueryParams,
} from '@/types/collection';
import handleAxiosError from '@/utils/axios-error-handler.ts';

export async function getCollections(
  params: CollectionQueryParams,
): Promise<PaginatedResponse<Collection>> {
  try {
    const { data } = await api.get<PaginatedResponse<Collection>>(
      '/collections',
      {
        params,
      },
    );
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get collections failed');
  }
}

export async function getCollectionById(id: string): Promise<Collection> {
  try {
    const { data } = await api.get<Collection>(`/collections/${id}`);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get collection failed');
  }
}

export async function getCollectionMovies(
  id: string,
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<MovieSummary & { description: string }>> {
  try {
    const { data } = await api.get<
      PaginatedResponse<MovieSummary & { description: string }>
    >(`/collections/${id}/movies`, { params: { page, limit } });
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get collection movies failed');
  }
}

export async function createCollection(
  collectionData: CreateCollectionData,
): Promise<Collection> {
  try {
    const { data } = await api.post<Collection>('/collections', collectionData);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Create collection failed');
  }
}

export async function updateCollection(
  id: string,
  updateData: UpdateCollectionData,
): Promise<Collection> {
  try {
    const { data } = await api.put<Collection>(
      `/collections/${id}`,
      updateData,
    );
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Update collection failed');
  }
}

export async function deleteCollection(id: string): Promise<void> {
  try {
    await api.delete(`/collections/${id}`);
  } catch (err: unknown) {
    handleAxiosError(err, 'Delete collection failed');
  }
}

export async function addMovieToCollection(
  payload: AddMovieToCollectionData,
): Promise<Collection> {
  try {
    const { data } = await api.post<Collection>(
      `/collections/${payload.collectionId}/movies/${payload.movieId}`,
    );
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Add movie to collection failed');
  }
}

export async function removeMovieFromCollection(
  payload: RemoveMovieFromCollectionData,
): Promise<Collection> {
  try {
    const { data } = await api.delete<Collection>(
      `/collections/${payload.collectionId}/movies/${payload.movieId}`,
    );
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Remove movie from collection failed');
  }
}
