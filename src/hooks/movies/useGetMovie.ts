import { useQuery } from '@tanstack/react-query';
import type { MovieDetails } from '@/types';
import { getMovieBySlug } from '@/services/movies';
import { MOVIE_QUERY_KEY } from '@/config/constants.ts';

export function useGetMovie(slug: string) {
  return useQuery<MovieDetails>({
    queryKey: [MOVIE_QUERY_KEY, slug],
    queryFn: () => getMovieBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
}
