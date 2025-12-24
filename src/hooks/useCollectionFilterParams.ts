import { toStringParam, toRangeParam } from '@/utils/query-params';
import type { CollectionQueryParams } from '@/types';
import { COLLECTION_FILTER_DEFAULTS } from '@/config/constants.ts';

export const useCollectionFilterParams = (query: CollectionQueryParams) => {
  return {
    page: query.page > 1 ? query.page : undefined,
    search: toStringParam(query.search),
    sortBy: toStringParam(query.sortBy),
    movieCount: toRangeParam(
      query.movieCount,
      COLLECTION_FILTER_DEFAULTS.movieCount,
    ),
    visibility: toStringParam(query.visibility),
    searchByUser: toStringParam(query.searchByUser),
  } as CollectionQueryParams;
};
