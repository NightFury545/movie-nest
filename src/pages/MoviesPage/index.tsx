import MovieFilter from '@/components/MovieFilter';
import styles from './movies-page.module.css';
import SearchInput from '@/components/SearchInput';
import { mockMovies } from '@/data/movies-page.ts';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { useMovieFilterQuery } from '@/hooks/useMovieFilterQuery.ts';
import { debounce } from 'lodash';
import Button from '@/components/ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const MoviesPage = () => {
  const [query, setQuery] = useMovieFilterQuery();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const filters = {
    genres: query.genres,
    sortBy: query.sortBy,
    releaseYear: query.releaseYear,
    languages: query.languages,
    duration: query.duration,
    ageRestrictions: query.ageRestrictions,
    rating: query.rating,
    productionCountries: query.productionCountries,
    status: query.status,
  };

  const handleSearch = debounce((v: string) => {
    void setQuery({ search: v });
  }, 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles['movies']}>
      <div className={styles['movies__filter-bar']}>
        <MovieFilter filters={filters} onChange={setQuery} />
      </div>
      <div className={styles['movies__container']}>
        <div className={styles['movies__mobile-filter-bar']}>
          <SearchInput
            placeholder="Пошук фільмів..."
            value={query.search}
            onChange={handleSearch}
          />
          <div className={styles['movies__mobile-filter-button']}>
            <Button
              icon={!isMobile ? <SlidersHorizontal size={18} /> : undefined}
              variant={'secondary'}
              onClick={() => setFilterOpen(true)}
            >
              {isMobile ? <SlidersHorizontal size={18} /> : 'Фільтри'}
            </Button>
          </div>
        </div>
        <div className={styles['movies__list']}>
          {mockMovies.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              imageUrl={movie.imageUrl}
              rating={movie.rating}
              releaseYear={movie.releaseYear}
              slug={movie.slug}
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
      <div
        className={
          isFilterOpen
            ? `${styles['movies__mobile-filter-panel']} ${styles['movies__mobile-filter-panel--open']}`
            : styles['movies__mobile-filter-panel']
        }
      >
        <div className={styles['movies__mobile-filter-panel-header']}>
          <h3>Фільтри</h3>
          <Button variant="secondary" onClick={() => setFilterOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <MovieFilter
          filters={filters}
          onChange={setQuery}
          className={styles['movies__mobile-filter']}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
