import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeMovieFromCollection } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY, MOVIES_QUERY_KEY } from '@/config/constants';

export function useRemoveMovieFromCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: string) =>
      removeMovieFromCollection({ collectionId, movieId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS_QUERY_KEY, collectionId, MOVIES_QUERY_KEY],
      }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
