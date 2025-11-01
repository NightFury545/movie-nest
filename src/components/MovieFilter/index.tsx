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

interface MovieFilterProps {
  filters: {
    genres: string[];
    sortBy: string;
    releaseYear: [number, number];
    languages: string[];
    duration: [number, number];
    ageRestrictions: string[];
    rating: [number, number];
    productionCountries: string[];
    status: string[];
  };
  onChange: (newFilters: Partial<MovieFilterProps['filters']>) => void;
  className?: string;
}

const MovieFilter = ({ filters, onChange, className }: MovieFilterProps) => {
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

      <Select
        placeholder="Сортувати за..."
        options={movieSortBy}
        defaultValue={filters.sortBy}
        onChange={(v) => onChange({ sortBy: v })}
      />

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
        defaultValue={filters.productionCountries}
        onChange={(v) => onChange({ productionCountries: v })}
      />
      <Status
        value={filters.status}
        options={movieStatuses}
        onChange={(v) => onChange({ status: v })}
      />
    </aside>
  );
};

export default MovieFilter;
