import { useQueryStates } from 'nuqs';

const DEFAULTS = {
  releaseYear: [1950, 2025] as [number, number],
  duration: [0, 360] as [number, number],
  rating: [0, 10] as [number, number],
};

const parseList = (value: string | null): string[] =>
  value?.split(',').filter(Boolean) ?? [];

const serializeList = (value: string[]): string | null | undefined =>
  value.length > 0 ? value.join(',') : undefined;

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

const serializeRange = (
  value: [number, number],
  def: [number, number],
): string | null | undefined =>
  value[0] === def[0] && value[1] === def[1]
    ? undefined
    : `${value[0]}-${value[1]}`;

export const useMovieFilterQuery = () => {
  return useQueryStates({
    genres: {
      defaultValue: [] as string[],
      parse: parseList,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string[]) => serializeList(v),
    },
    sortBy: {
      defaultValue: null as string | null,
      parse: (v: string | null): string | null => v ?? null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string | null) => v || undefined,
    },
    releaseYear: {
      defaultValue: DEFAULTS.releaseYear,
      parse: (v: string | null): [number, number] =>
        parseRange(v, 1950, 2025, DEFAULTS.releaseYear),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: [number, number]) =>
        serializeRange(v, DEFAULTS.releaseYear),
    },
    languages: {
      defaultValue: [] as string[],
      parse: parseList,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string[]) => serializeList(v),
    },
    duration: {
      defaultValue: DEFAULTS.duration,
      parse: (v: string | null): [number, number] =>
        parseRange(v, 0, 360, DEFAULTS.duration),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: [number, number]) => serializeRange(v, DEFAULTS.duration),
    },
    rating: {
      defaultValue: DEFAULTS.rating,
      parse: (v: string | null): [number, number] =>
        parseRange(v, 0, 10, DEFAULTS.rating),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: [number, number]) => serializeRange(v, DEFAULTS.rating),
    },
    ageRestrictions: {
      defaultValue: [] as string[],
      parse: parseList,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string[]) => serializeList(v),
    },
    productionCountries: {
      defaultValue: [] as string[],
      parse: parseList,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string[]) => serializeList(v),
    },
    status: {
      defaultValue: [] as string[],
      parse: parseList,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string[]) => serializeList(v),
    },
    page: {
      defaultValue: 1,
      parse: (v: string | null): number => (v ? Number(v) : 1),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: number) => (v > 1 ? String(v) : undefined),
    },
    search: {
      defaultValue: '',
      parse: (v: string | null): string => v ?? '',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      serialize: (v: string) => (v ? v : undefined),
    },
  });
};
