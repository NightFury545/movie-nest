import MovieFilter from '@/components/MovieFilter';
import styles from './movies-page.module.css';
import SearchInput from '@/components/SearchInput';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { useMovieFilterQuery } from '@/hooks/useMovieFilterQuery.ts';
import { useListMovies } from '@/hooks/movies/useListMovies.ts';
import { debounce } from 'lodash';
import Button from '@/components/ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { useMovieFilterParams } from '@/hooks/useMovieFilterParams.ts';
import type { MovieQueryParams } from '@/types';
import { AnimatePresence } from 'framer-motion';

const MoviesPage = () => {
  const [query, setQuery] = useMovieFilterQuery();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollToTop } = useScrollToTop();

  const desktopFilterRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  const movieParams = useMovieFilterParams(query as MovieQueryParams);
  const { data: response, isLoading, isError } = useListMovies(movieParams);
  const movies = response?.data ?? [];
  const pagination = response?.pagination;

  const handleSearch = useCallback(
    debounce((v: string) => {
      void setQuery({ search: v, page: 1 });
    }, 500),
    [],
  );

  useEffect(() => {
    scrollToTop();
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 930;
      setIsMobile(mobile);
      if (!mobile && isFilterOpen) {
        setFilterOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFilterOpen]);

  const movieFilterElement = (
    <MovieFilter
      filters={query}
      onChange={(newFilters) => setQuery({ ...newFilters, page: 1 })}
      className={isMobile ? styles['movies__mobile-filter'] : undefined}
    />
  );

  return (
    <div className={styles['movies']}>
      <div className={styles['movies__filter-bar']} ref={desktopFilterRef}>
        {!isMobile && movieFilterElement}
      </div>

      <div className={styles['movies__container']}>
        <div className={styles['movies__mobile-filter-bar']}>
          <SearchInput
            placeholder="Пошук фільмів..."
            value={query.search ?? ''}
            onChange={handleSearch}
          />
          <div className={styles['movies__mobile-filter-button']}>
            <Button variant="secondary" onClick={() => setFilterOpen(true)}>
              <SlidersHorizontal size={18} />
            </Button>
          </div>
        </div>

        <div className={styles['movies__list']}>
          {isLoading ? (
            Array.from({ length: 18 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          ) : isError ? (
            <div className={styles['movies__status-wrapper']}>
              <div className={styles['movies__status-box']}>
                <div className={styles['movies__status-title']}>
                  Сталася помилка
                </div>
                <div className={styles['movies__status-text']}>
                  Спробуйте пізніше.
                </div>
              </div>
            </div>
          ) : movies.length === 0 ? (
            <div className={styles['movies__status-wrapper']}>
              <div className={styles['movies__status-box']}>
                <div className={styles['movies__status-title']}>
                  Фільми не знайдено
                </div>
                <div className={styles['movies__status-text']}>
                  Спробуйте змінити фільтри або пошук.
                </div>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={movie.posterUrl}
                  rating={movie.rating}
                  releaseDate={movie.releaseDate}
                  slug={movie.slug}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className={styles['movies__pagination']}>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setQuery({ page })}
            />
          </div>
        )}
      </div>

      {createPortal(
        <div
          className={
            isFilterOpen
              ? `${styles['movies__mobile-filter-panel']} ${styles['movies__mobile-filter-panel--open']}`
              : styles['movies__mobile-filter-panel']
          }
          ref={mobileFilterRef}
        >
          <div className={styles['movies__mobile-filter-panel-header']}>
            <h3>Фільтри</h3>
            <Button variant="secondary" onClick={() => setFilterOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          {isMobile && movieFilterElement}
        </div>,
        document.body,
      )}

      {isFilterOpen && isMobile && (
        <div
          className={
            styles['movies__mobile-filter-backdrop'] +
            ' ' +
            styles['movies__mobile-filter-backdrop--visible']
          }
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default MoviesPage;
