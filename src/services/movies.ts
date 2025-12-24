import api from '@/lib/axios';
import type { MovieSummary, MovieDetails, MovieQueryParams } from '@/types';
import type { PaginatedResponse } from '@/types';
import handleAxiosError from '@/utils/axios-error-handler.ts';

export async function getMovies(
  params: MovieQueryParams,
): Promise<PaginatedResponse<MovieSummary>> {
  try {
    const { data } = await api.get<PaginatedResponse<MovieSummary>>('/movies', {
      params,
    });
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get movies failed');
  }
}

export async function getMovieBySlug(slug: string): Promise<MovieDetails> {
  try {
    const { data } = await api.get<MovieDetails>(`/movies/${slug}`);
    return data;
  } catch (err: unknown) {
    handleAxiosError(err, 'Get movie failed');
  }
}
