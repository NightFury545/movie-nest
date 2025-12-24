import { useQuery } from '@tanstack/react-query';
import type { Collection } from '@/types';
import { getCollectionById } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY } from '@/config/constants';

export function useGetCollection(id: string) {
  return useQuery<Collection>({
    queryKey: [COLLECTIONS_QUERY_KEY, id],
    queryFn: () => getCollectionById(id),
    staleTime: 1000 * 60 * 5,
  });
}
