import styles from './movie-filter.module.css';
import MultiSelect from '@/components/ui/MultiSelect';
import { movieGenres, movieSortBy } from '@/data/movie-filter.ts';
import Select from '@/components/ui/Select';
import { ReleaseYear } from '@/components/MovieFilter/ReleaseYear';
import { useQueryStates } from 'nuqs';

const MovieFilter = () => {
  const [{ genres, sortBy, releaseYear }, setQuery] = useQueryStates({
    genres: {
      defaultValue: [] as string[],
      parse: (value) => value?.split(',').filter(Boolean) ?? [],
      serialize: (value) => value.join(','),
      clearOnDefault: true,
    },
    sortBy: {
      defaultValue: null as string | null,
      parse: (value) => value ?? null,
      serialize: (value) => value ?? '',
      clearOnDefault: true,
    },
    releaseYear: {
      defaultValue: [1950, 2025] as [number, number],
      parse: (value) => {
        if (!value) return [1950, 2025];
        const parts = value.split('-').map(Number);
        return parts.length === 2 ? [parts[0], parts[1]] : [1950, 2025];
      },
      serialize: (value) => `${value[0]}-${value[1]}`,
      clearOnDefault: true,
    },
  });

  return (
    <aside className={styles['movie-filter']}>
      <MultiSelect
        placeholder="Обрати жанри..."
        options={movieGenres}
        defaultValue={genres}
        onChange={(value) => setQuery({ genres: value })}
      />

      <Select
        placeholder="Сортувати за..."
        options={movieSortBy}
        defaultValue={sortBy ?? ''}
        onChange={(value) => setQuery({ sortBy: value })}
      />

      <ReleaseYear
        value={releaseYear}
        onChange={(value) => setQuery({ releaseYear: value })}
      />
    </aside>
  );
};

export default MovieFilter;
