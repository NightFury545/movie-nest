import api from '@/lib/axios';
import type { Favorite } from '@/types/favorites';
import type { PaginatedResponse } from '@/types/api';
import handleAxiosError from '@/utils/axios-error-handler.ts';

export async function getFavorites(
  page = 1,
  limit = 10,
  sort: 'asc' | 'desc' = 'desc',
): Promise<PaginatedResponse<Favorite>> {
  try {
    const { data } = await api.get<PaginatedResponse<Favorite>>('/favorites', {
      params: { page, limit, sort },
    });
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get favorites failed');
  }
}

export async function getFavoriteById(id: string): Promise<Favorite> {
  try {
    const { data } = await api.get<Favorite>(`/favorites/${id}`);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get favorite failed');
  }
}

export async function addFavorite(movieId: number): Promise<Favorite> {
  try {
    const { data } = await api.post<Favorite>('/favorites/add', { movieId });
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Add favorite failed');
  }
}

export async function removeFavorite(movieId: number): Promise<Favorite> {
  try {
    const { data } = await api.delete<Favorite>(`/favorites/${movieId}`);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Remove favorite failed');
  }
}
