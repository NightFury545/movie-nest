import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite } from '@/services/favorites';
import { FAVORITES_QUERY_KEY } from '@/config/constants';

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: string) => addFavorite(movieId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [FAVORITES_QUERY_KEY],
      });
      alert('Фільм успішно додано');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
