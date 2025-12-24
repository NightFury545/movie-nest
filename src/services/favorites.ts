import api from '@/lib/axios';
import type { Favorite } from '@/types';
import type { PaginatedResponse } from '@/types';
import handleAxiosError from '@/utils/axios-error-handler.ts';
import type { SortOrder } from '@/types';

export async function getFavorites(
  page = 1,
  limit = 10,
  sort: SortOrder = 'desc',
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

export async function addFavorite(movieId: string): Promise<Favorite> {
  try {
    const { data } = await api.post<Favorite>('/favorites', { movieId });
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Add favorite failed');
  }
}

export async function removeFavorite(movieId: string): Promise<Favorite> {
  try {
    const { data } = await api.delete<Favorite>(`/favorites/${movieId}`);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Remove favorite failed');
  }
}
