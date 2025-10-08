import { useInfiniteQuery } from '@tanstack/react-query';
import { getFavorites } from '@/services/favorites';
import type { Favorite } from '@/types/favorites';
import type { PaginatedResponse } from '@/types/api';

export function useInfiniteFavorites(
  limit = 10,
  sort: 'asc' | 'desc' = 'desc',
) {
  return useInfiniteQuery<PaginatedResponse<Favorite>>({
    queryKey: ['favorites', limit, sort],
    queryFn: ({ pageParam = 1 }) =>
      getFavorites(pageParam as number, limit, sort),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}
