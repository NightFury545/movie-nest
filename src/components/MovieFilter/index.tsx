import styles from './movie-filter.module.css';
import MultiSelect from '@/components/ui/MultiSelect';
import Select from '@/components/ui/Select';
import { ReleaseYear } from '@/components/MovieFilter/ReleaseYear';
import OriginalLanguage from '@/components/MovieFilter/OriginalLanguage';
import { Duration } from '@/components/MovieFilter/Duration';
import { Rating } from '@/components/MovieFilter/Rating';
import Status from '@/components/MovieFilter/Status';
import {
  movieGenres,
  movieLanguages,
  movieSortBy,
  ageRatings,
  productionCountries,
  movieStatuses,
} from '@/data/movie-filter.ts';
import type { MovieFilterProps } from '@/components/MovieFilter/movie-filter.types.ts';
import React from 'react';
import { SortButton } from '@/components/SortButton';

const MovieFilter: React.FC<MovieFilterProps> = ({
  filters,
  onChange,
  className,
}) => {
  return (
    <aside
      className={`${styles['movie-filter']} ${className ? className : ''}`}
    >
      <MultiSelect
        placeholder="Обрати жанри..."
        options={movieGenres}
        defaultValue={filters.genres}
        onChange={(v) => onChange({ genres: v })}
      />
      <div className={styles['movie-filter__sort-bar']}>
        <Select
          placeholder="Сортувати за..."
          options={movieSortBy}
          defaultValue={filters.sortBy}
          onChange={(v) => onChange({ sortBy: v })}
        />
        <SortButton onChange={(v) => onChange({ sortOrder: v })} />
      </div>

      <ReleaseYear
        value={filters.releaseYear}
        onChange={(v) => onChange({ releaseYear: v })}
      />
      <OriginalLanguage
        value={filters.languages}
        options={movieLanguages}
        onChange={(v) => onChange({ languages: v })}
      />
      <Duration
        value={filters.duration}
        onChange={(v) => onChange({ duration: v })}
      />
      <MultiSelect
        placeholder="Вікові обмеження"
        options={ageRatings}
        defaultValue={filters.ageRestrictions}
        onChange={(v) => onChange({ ageRestrictions: v })}
      />
      <Rating
        value={filters.rating}
        onChange={(v) => onChange({ rating: v })}
      />
      <MultiSelect
        placeholder="Країна виробництва"
        options={productionCountries}
        defaultValue={filters.countries}
        onChange={(v) => onChange({ countries: v })}
      />
      <Status
        value={filters.statuses}
        options={movieStatuses}
        onChange={(v) => onChange({ statuses: v })}
      />
    </aside>
  );
};

export default MovieFilter;
