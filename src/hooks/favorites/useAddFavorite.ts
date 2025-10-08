import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite } from '@/services/favorites';
import type { Favorite } from '@/types/favorites';
import type { PaginatedResponse } from '@/types/api';

export function useAddFavorite(limit = 10, sort: 'asc' | 'desc' = 'desc') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => addFavorite(movieId),

    onMutate: async (movieId: number) => {
      const queryKey = ['favorites', limit, sort];
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<{
        pages: PaginatedResponse<Favorite>[];
        pageParams: number[];
      }>(queryKey);

      if (prevData) {
        const newFavorite: Favorite = {
          id: Date.now().toString(),
          movieId,
          userId: 'temp-user',
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData(queryKey, {
          ...prevData,
          pages: [
            {
              ...prevData.pages[0],
              data: [newFavorite, ...prevData.pages[0].data],
              pagination: {
                ...prevData.pages[0].pagination,
                total: prevData.pages[0].pagination.total + 1,
              },
            },
            ...prevData.pages.slice(1),
          ],
        });
      }

      return { prevData };
    },

    onError: (_err, _movieId, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['favorites', limit, sort], context.prevData);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['favorites', limit, sort],
      });
    },
  });
}
