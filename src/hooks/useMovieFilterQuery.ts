import { useQueryStates } from 'nuqs';

const DEFAULTS = {
  releaseYear: [1950, 2025] as [number, number],
  duration: [0, 360] as [number, number],
  rating: [0, 10.0] as [number, number],
};

const parseList = (value: string | null) =>
  value?.split(',').filter(Boolean) ?? [];

const serializeList = (value: string[]) =>
  value.length > 0 ? value.join(',') : null;

const parseRange = (
  value: string | null,
  min: number,
  max: number,
  def: [number, number],
): [number, number] => {
  if (!value) return def;
  const parts = value.split('-').map(Number);
  if (parts.length !== 2) return def;
  const [start, end] = parts;
  return start < min || end > max || start > end ? def : [start, end];
};

const serializeRange = (value: [number, number], def: [number, number]) =>
  value[0] === def[0] && value[1] === def[1] ? null : `${value[0]}-${value[1]}`;

export const useMovieFilterQuery = () => {
  return useQueryStates({
    genres: {
      defaultValue: [] as string[],
      parse: parseList,
      serialize: serializeList as (value: string[]) => string,
    },
    sortBy: {
      defaultValue: null as string | null,
      parse: (v) => v ?? null,
      serialize: (v) => (v ? v : null),
    },
    releaseYear: {
      defaultValue: DEFAULTS.releaseYear,
      parse: (v) => parseRange(v, 1950, 2025, DEFAULTS.releaseYear),
      serialize: ((v) => serializeRange(v, DEFAULTS.releaseYear)) as (
        v: [number, number],
      ) => string,
    },
    languages: {
      defaultValue: [] as string[],
      parse: parseList,
      serialize: serializeList as (value: string[]) => string,
    },
    duration: {
      defaultValue: DEFAULTS.duration,
      parse: (v) => parseRange(v, 0, 360, DEFAULTS.duration),
      serialize: ((v) => serializeRange(v, DEFAULTS.duration)) as (
        v: [number, number],
      ) => string,
    },
    rating: {
      defaultValue: DEFAULTS.rating,
      parse: (v) => parseRange(v, 0, 10, DEFAULTS.rating),
      serialize: ((v) => serializeRange(v, DEFAULTS.rating)) as (
        v: [number, number],
      ) => string,
    },
    ageRestrictions: {
      defaultValue: [] as string[],
      parse: parseList,
      serialize: serializeList as (value: string[]) => string,
    },
    productionCountries: {
      defaultValue: [] as string[],
      parse: parseList,
      serialize: serializeList as (value: string[]) => string,
    },
    status: {
      defaultValue: [] as string[],
      parse: parseList,
      serialize: serializeList as (value: string[]) => string,
    },
    page: {
      defaultValue: 1,
      parse: (v) => (v ? Number(v) : 1),
      serialize: ((v) => (v > 1 ? String(v) : null)) as (v: number) => string,
    },
    search: {
      defaultValue: '',
      parse: (v) => v ?? '',
      serialize: ((v) => (v ? v : null)) as (v: string) => string,
    },
  });
};
