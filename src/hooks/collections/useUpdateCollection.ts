import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateCollectionData } from '@/types';
import { updateCollection } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY } from '@/config/constants';

export function useUpdateCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCollectionData) =>
      updateCollection(collectionId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS_QUERY_KEY, collectionId],
      }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
