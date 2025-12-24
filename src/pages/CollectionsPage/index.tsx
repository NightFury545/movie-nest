import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './collections-page.module.css';
import SearchInput from '@/components/SearchInput';
import Button from '@/components/ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';
import Pagination from '@/components/Pagination';
import CollectionFilter from '@/components/CollectionFilter';
import { useCollectionFilterQuery } from '@/hooks/useCollectionFilterQuery.ts';
import { debounce } from 'lodash';
import CollectionCard from '@/components/CollectionCard';
import { useCollectionFilterParams } from '@/hooks/useCollectionFilterParams.ts';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useListCollections } from '@/hooks/collections/useListCollections.ts';
import type { CollectionQueryParams } from '@/types';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';

const CollectionsPage = () => {
  const [query, setQuery] = useCollectionFilterQuery();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollToTop } = useScrollToTop();

  const desktopFilterRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  const collectionParams = useCollectionFilterParams(
    query as CollectionQueryParams,
  );

  const {
    data: response,
    isLoading,
    isError,
  } = useListCollections(collectionParams);

  const collections = response?.data ?? [];
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

  const filterElement = (
    <CollectionFilter
      filters={query}
      onChange={(newFilters) => setQuery({ ...newFilters, page: 1 })}
      className={isMobile ? styles['collections__mobile-filter'] : undefined}
    />
  );

  return (
    <div className={styles['collections']}>
      <div className={styles['collections__filter-bar']} ref={desktopFilterRef}>
        {!isMobile && filterElement}
      </div>

      <div className={styles['collections__container']}>
        <div className={styles['collections__mobile-filter-bar']}>
          <SearchInput
            placeholder="Пошук за назвою..."
            value={query.search ?? ''}
            onChange={handleSearch}
          />
          <div className={styles['collections__mobile-filter-button']}>
            <Button variant="secondary" onClick={() => setFilterOpen(true)}>
              <SlidersHorizontal size={18} />
            </Button>
          </div>
        </div>

        <div className={styles['collections__list']}>
          {isLoading ? (
            <div className={styles['collections__status-wrapper']}>
              <div className={styles['collections__status-box']}>
                <div className={styles['collections__status-title']}>
                  Завантаження...
                </div>
              </div>
            </div>
          ) : isError ? (
            <div className={styles['collections__status-wrapper']}>
              <div className={styles['collections__status-box']}>
                <div className={styles['collections__status-title']}>
                  Сталася помилка
                </div>
                <div className={styles['collections__status-text']}>
                  Спробуйте пізніше.
                </div>
              </div>
            </div>
          ) : collections.length === 0 ? (
            <div className={styles['collections__status-wrapper']}>
              <div className={styles['collections__status-box']}>
                <div className={styles['collections__status-title']}>
                  Колекції не знайдено
                </div>
                <div className={styles['collections__status-text']}>
                  Спробуйте змінити фільтри або пошук.
                </div>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  title={collection.name}
                  movieCount={collection.movieCount}
                  date={collection.createdAt}
                  images={collection.posters}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className={styles['collections__pagination']}>
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
              ? `${styles['collections__mobile-filter-panel']} ${styles['collections__mobile-filter-panel--open']}`
              : styles['collections__mobile-filter-panel']
          }
          ref={mobileFilterRef}
        >
          <div className={styles['collections__mobile-filter-panel-header']}>
            <h3>Фільтри</h3>
            <Button variant="secondary" onClick={() => setFilterOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          {isMobile && filterElement}
        </div>,
        document.body,
      )}

      {isFilterOpen && isMobile && (
        <div
          className={
            styles['collections__mobile-filter-backdrop'] +
            ' ' +
            styles['collections__mobile-filter-backdrop--visible']
          }
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default CollectionsPage;
