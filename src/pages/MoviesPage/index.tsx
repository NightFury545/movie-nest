import MovieFilter from '@/components/MovieFilter';
import styles from './movies-page.module.css';
import SearchInput from '@/components/SearchInput';
import { mockMovies } from '@/data/movies-page.ts';
import { MovieCard } from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { useMovieFilterQuery } from '@/hooks/useMovieFilterQuery.ts';
import { debounce } from 'lodash';

const MoviesPage = () => {
  const [query, setQuery] = useMovieFilterQuery();

  const handleSearch = debounce((v: string) => {
    void setQuery({ search: v });
  }, 500);

  return (
    <div className={styles['movies']}>
      <MovieFilter
        filters={{
          genres: query.genres,
          sortBy: query.sortBy,
          releaseYear: query.releaseYear,
          languages: query.languages,
          duration: query.duration,
          ageRestrictions: query.ageRestrictions,
          rating: query.rating,
          productionCountries: query.productionCountries,
          status: query.status,
        }}
        onChange={setQuery}
      />
      <div className={styles['movies__container']}>
        <SearchInput
          placeholder="Пошук фільмів..."
          value={query.search}
          onChange={handleSearch}
        />
        <div className={styles['movies__list']}>
          {mockMovies.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              imageUrl={movie.imageUrl}
              rating={movie.rating}
              releaseYear={movie.releaseYear}
            />
          ))}
        </div>
        <div className={styles['movies__pagination']}>
          <Pagination
            currentPage={query.page}
            totalPages={99}
            onPageChange={(v) => setQuery({ page: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
