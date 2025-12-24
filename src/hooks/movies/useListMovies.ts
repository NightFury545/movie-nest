import { useQuery } from '@tanstack/react-query';
import type { MovieSummary, MovieQueryParams } from '@/types';
import type { PaginatedResponse } from '@/types';
import { getMovies } from '@/services/movies';
import { MOVIES_QUERY_KEY } from '@/config/constants.ts';

export function useListMovies(params: MovieQueryParams) {
  return useQuery<PaginatedResponse<MovieSummary>>({
    queryKey: [MOVIES_QUERY_KEY, params],
    queryFn: () => getMovies(params),
    //TODO: винести в константу
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
