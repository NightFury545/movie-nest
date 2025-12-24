import axios, { type AxiosInstance } from 'axios';

export function createTmdbApi(apiKey: string, baseUrl: string): AxiosInstance {
  const tmdbApi: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      api_key: apiKey,
      language: 'uk-UA',
    },
  });

  tmdbApi.interceptors.request.use(
    (config) => {
      if (!config.params) config.params = {};
      if (!config.params.api_key) {
        config.params.api_key = apiKey;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return tmdbApi;
}
