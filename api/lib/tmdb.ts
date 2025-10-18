import axios, { type AxiosInstance } from 'axios';

const tmdbApi: AxiosInstance = axios.create({
  baseURL: process.env.TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'uk-UA',
  },
});

tmdbApi.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    if (!config.params.api_key) {
      config.params.api_key = process.env.TMDB_API_KEY;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default tmdbApi;
