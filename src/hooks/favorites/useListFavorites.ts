import { useInfiniteQuery } from '@tanstack/react-query';
import { getFavorites } from '@/services/favorites';
import type { Favorite } from '@/types';
import type { PaginatedResponse } from '@/types';
import type { SortOrder } from '@/types';
import { FAVORITES_QUERY_KEY } from '@/config/constants.ts';

export function useInfiniteFavorites(limit = 10, sort: SortOrder = 'desc') {
  return useInfiniteQuery<PaginatedResponse<Favorite>>({
    queryKey: [FAVORITES_QUERY_KEY, limit, sort],
    queryFn: ({ pageParam = 1 }) =>
      getFavorites(pageParam as number, limit, sort),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
