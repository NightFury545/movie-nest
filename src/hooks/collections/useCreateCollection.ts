import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCollectionData } from '@/types';
import { createCollection } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY } from '@/config/constants';

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCollectionData) => createCollection(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS_QUERY_KEY] }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
