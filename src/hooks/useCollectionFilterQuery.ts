import { useQueryStates } from 'nuqs';
import { parseRange } from '@/utils/parsers.ts';

const DEFAULTS = {
  movieCount: [4, 99] as [number, number],
};

const serializeRange = (value: [number, number], def: [number, number]) =>
  value[0] === def[0] && value[1] === def[1] ? null : `${value[0]}-${value[1]}`;

export const useCollectionFilterQuery = () => {
  return useQueryStates({
    sortBy: {
      defaultValue: '',
      parse: (v) => v ?? '',
      serialize: (v) => (v ? v : null),
    },
    movieCount: {
      defaultValue: DEFAULTS.movieCount,
      parse: (v) => parseRange(v, 0, 100, DEFAULTS.movieCount),
      serialize: ((v) => serializeRange(v, DEFAULTS.movieCount)) as (
        v: [number, number],
      ) => string,
    },
    visibility: {
      defaultValue: '',
      parse: (v) => v ?? '',
      serialize: (v) => (v ? v : null),
    },
    searchByUser: {
      defaultValue: '',
      parse: (v) => v ?? '',
      serialize: (v) => (v ? v : null),
    },
    search: {
      defaultValue: '',
      parse: (v) => v ?? '',
      serialize: (v) => (v ? v : null),
    },
    page: {
      defaultValue: 1,
      parse: (v) => (v ? Number(v) : 1),
      serialize: ((v) => (v > 1 ? String(v) : null)) as (v: number) => string,
    },
  });
};
