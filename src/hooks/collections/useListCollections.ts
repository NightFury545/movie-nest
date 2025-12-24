import type { Collection, CollectionQueryParams } from '@/types';
import type { PaginatedResponse } from '@/types';
import { getCollections } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';

export function useListCollections(params: CollectionQueryParams) {
  return useQuery<PaginatedResponse<Collection>>({
    queryKey: [COLLECTIONS_QUERY_KEY, params],
    queryFn: () => getCollections(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
