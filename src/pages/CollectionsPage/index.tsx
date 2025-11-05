import { useEffect, useState } from 'react';
import styles from './collections-page.module.css';
import SearchInput from '@/components/SearchInput';
import Button from '@/components/ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';
import Pagination from '@/components/Pagination';
import CollectionFilter from '@/components/CollectionFilter';
import { useCollectionFilterQuery } from '@/hooks/useCollectionFilterQuery.ts';
import { debounce } from 'lodash';
import { mockCollections } from '@/data/collections-page.ts';
import CollectionCard from '@/components/CollectionCard';

const CollectionsPage = () => {
  const [query, setQuery] = useCollectionFilterQuery();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const filters = {
    sortBy: query.sortBy,
    movieCount: query.movieCount,
    visibility: query.visibility,
    searchByUser: query.searchByUser,
  };

  return (
    <div className={styles['collections']}>
      <div className={styles['collections__filter-bar']}>
        <CollectionFilter filters={filters} onChange={setQuery} />
      </div>

      <div className={styles['collections__container']}>
        <div className={styles['collections__mobile-filter-bar']}>
          <SearchInput
            placeholder="Пошук за назвою..."
            value={query.search}
            onChange={handleSearch}
          />
          <div className={styles['collections__mobile-filter-button']}>
            <Button
              icon={!isMobile ? <SlidersHorizontal size={18} /> : undefined}
              variant="secondary"
              onClick={() => setFilterOpen(true)}
            >
              {isMobile ? <SlidersHorizontal size={18} /> : 'Фільтри'}
            </Button>
          </div>
        </div>

        <div className={styles['collections__list']}>
          {mockCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              title={collection.title}
              movieCount={collection.movieCount}
              date={collection.date}
              images={collection.images}
            />
          ))}
        </div>

        <div className={styles['collections__pagination']}>
          <Pagination
            currentPage={query.page}
            totalPages={10}
            onPageChange={(v) => setQuery({ page: v })}
          />
        </div>
      </div>
      <div
        className={
          isFilterOpen
            ? `${styles['collections__mobile-filter-panel']} ${styles['collections__mobile-filter-panel--open']}`
            : styles['collections__mobile-filter-panel']
        }
      >
        <div className={styles['collections__mobile-filter-panel-header']}>
          <h3>Фільтри</h3>
          <Button variant="secondary" onClick={() => setFilterOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <CollectionFilter
          filters={filters}
          onChange={setQuery}
          className={styles['collections__mobile-filter']}
        />
      </div>
    </div>
  );
};

export default CollectionsPage;
