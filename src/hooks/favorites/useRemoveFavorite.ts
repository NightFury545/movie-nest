import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavorite } from '@/services/favorites';
import { FAVORITES_QUERY_KEY } from '@/config/constants';

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: string) => removeFavorite(movieId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [FAVORITES_QUERY_KEY],
      }),
    onError: (error) => {
      console.error(error.message);
    },
  });
}
