import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavorite } from '@/services/favorites';
import type { Favorite } from '@/types/favorites';
import type { PaginatedResponse } from '@/types/api';

export function useRemoveFavorite(limit = 10, sort: 'asc' | 'desc' = 'desc') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => removeFavorite(movieId),

    onMutate: async (movieId: number) => {
      const queryKey = ['favorites', limit, sort];
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<{
        pages: PaginatedResponse<Favorite>[];
        pageParams: number[];
      }>(queryKey);

      if (prevData) {
        queryClient.setQueryData(queryKey, {
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            data: page.data.filter((fav) => fav.movieId !== movieId),
            pagination: {
              ...page.pagination,
              total: page.pagination.total - 1,
            },
          })),
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
