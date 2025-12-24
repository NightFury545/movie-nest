export interface MovieFilterProps {
  filters: {
    genres: string[];
    sortBy: string;
    sortOrder: string;
    releaseYear: [number, number];
    languages: string[];
    duration: [number, number];
    ageRestrictions: string[];
    rating: [number, number];
    countries: string[];
    statuses: string[];
  };
  onChange: (newFilters: Partial<MovieFilterProps['filters']>) => void;
  className?: string;
}
