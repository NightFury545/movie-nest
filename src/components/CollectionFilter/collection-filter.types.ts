export interface CollectionFilterProps {
  filters: {
    sortBy: string;
    movieCount: [number, number];
    visibility: string;
    searchByUser: string;
  };
  onChange: (newFilters: Partial<CollectionFilterProps['filters']>) => void;
  className?: string;
}
