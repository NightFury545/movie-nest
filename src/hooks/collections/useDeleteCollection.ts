import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCollection } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY } from '@/config/constants';

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collectionId: string) => deleteCollection(collectionId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS_QUERY_KEY] }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
