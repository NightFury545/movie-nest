import { useInfiniteQuery } from '@tanstack/react-query';
import type { MovieSummary } from '@/types';
import type { PaginatedResponse } from '@/types';
import { getCollectionMovies } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY, MOVIES_QUERY_KEY } from '@/config/constants';

export function useListCollectionMovies(collectionId: string, limit = 10) {
  return useInfiniteQuery<
    PaginatedResponse<MovieSummary & { description: string }>
  >({
    queryKey: [COLLECTIONS_QUERY_KEY, collectionId, MOVIES_QUERY_KEY],
    queryFn: ({ pageParam = 1 }) =>
      getCollectionMovies(collectionId, pageParam as number, limit),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
