import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMovieToCollection } from '@/services/collections';
import { COLLECTIONS_QUERY_KEY, MOVIES_QUERY_KEY } from '@/config/constants';

export function useAddMovieToCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: string) =>
      addMovieToCollection({ collectionId, movieId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS_QUERY_KEY, collectionId, MOVIES_QUERY_KEY],
      }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
