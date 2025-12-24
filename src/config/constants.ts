export const DEFAULT_AVATAR =
  'https://i.pinimg.com/236x/e0/6c/86/e06c86f5f4e62e8c81f2cb10a854660b.jpg';

export const MOVIE_QUERY_KEY = 'movie';

export const MOVIES_QUERY_KEY = 'movies';

export const FAVORITES_QUERY_KEY = 'favorites';

export const COLLECTIONS_QUERY_KEY = 'collections';

export const MOVIE_FILTER_DEFAULTS = {
  releaseYear: [1950, 2025] as [number, number],
  duration: [0, 360] as [number, number],
  rating: [0, 10] as [number, number],
};

export const COLLECTION_FILTER_DEFAULTS = {
  movieCount: [4, 99] as [number, number],
};
