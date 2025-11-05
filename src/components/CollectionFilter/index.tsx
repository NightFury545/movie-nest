import styles from './collection-filter.module.css';
import Select from '@/components/ui/Select';
import {
  collectionSortBy,
  visibilityOptions,
} from '@/data/collection-filter.ts';
import MoviesAmount from '@/components/CollectionFilter/MoviesAmount';
import SearchByUser from '@/components/CollectionFilter/SearchByUser';
import { debounce } from 'lodash';
import React, { useMemo } from 'react';
import type { CollectionFilterProps } from '@/components/CollectionFilter/collection-filter.types.ts';

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  filters,
  onChange,
  className,
}) => {
  const debouncedUserSearch = useMemo(
    () => debounce((v: string) => onChange({ searchByUser: v }), 500),
    [onChange],
  );

  return (
    <aside
      className={`${styles['collection-filter']} ${className ? className : ''}`}
    >
      <Select
        placeholder="Сортувати за..."
        options={collectionSortBy}
        defaultValue={filters.sortBy}
        onChange={(v) => onChange({ sortBy: v })}
      />
      <MoviesAmount
        value={filters.movieCount}
        onChange={(v) => onChange({ movieCount: v })}
      />
      <Select
        placeholder="Видимість"
        options={visibilityOptions}
        defaultValue={filters.visibility}
        onChange={(v) => onChange({ visibility: v })}
      />
      <SearchByUser
        value={filters.searchByUser}
        onChange={debouncedUserSearch}
      />
    </aside>
  );
};

export default CollectionFilter;
