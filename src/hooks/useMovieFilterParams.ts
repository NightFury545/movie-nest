import { MOVIE_FILTER_DEFAULTS } from '@/config/constants';
import type { MovieQueryParams } from '@/types';
import { toRangeParam, toStringParam, toListParam } from '@/utils/query-params';

export const useMovieFilterParams = (query: MovieQueryParams) => {
  return {
    page: query.page > 1 ? query.page : undefined,
    search: toStringParam(query.search),
    sortBy: toStringParam(query.sortBy),
    sortOrder: toStringParam(query.sortOrder),
    releaseYear: toRangeParam(
      query.releaseYear,
      MOVIE_FILTER_DEFAULTS.releaseYear,
    ),
    duration: toRangeParam(query.duration, MOVIE_FILTER_DEFAULTS.duration),
    rating: toRangeParam(query.rating, MOVIE_FILTER_DEFAULTS.rating),
    genres: toListParam(query.genres),
    languages: toListParam(query.languages),
    ageRestrictions: toListParam(query.ageRestrictions),
    countries: toListParam(query.countries),
    statuses: toListParam(query.statuses),
  } as MovieQueryParams;
};
