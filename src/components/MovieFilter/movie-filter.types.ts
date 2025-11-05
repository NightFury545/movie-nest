export interface MovieFilterProps {
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
