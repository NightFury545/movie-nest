import {
  movies,
  movieGenres,
  genres,
  movieActors,
  actors,
} from '../../db/schema';
import { eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import type { MovieDetails, ActorSummary, Genre } from '../../types';
import type { Context } from '../../types';
import { getDb } from '../../db';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env, waitUntil, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const { slug } = params;
    if (!slug) return errorResponse('Недійсний slug фільму', 400);

    const cache = await caches.open('movie-cache');
    const cacheKey = new Request(request.url, request);
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const [movie] = await db.select().from(movies).where(eq(movies.slug, slug));

    if (!movie) return errorResponse('Фільм не знайдено', 404);

    const movieGenresList: Genre[] = await db
      .select({
        id: genres.id,
        tmdbId: genres.tmdbId,
        name: genres.name,
      })
      .from(movieGenres)
      .innerJoin(genres, eq(genres.id, movieGenres.genreId))
      .where(eq(movieGenres.movieId, movie.id));

    const actorsList: ActorSummary[] = await db
      .select({
        id: actors.id,
        tmdbId: actors.tmdbId,
        name: actors.name,
        profileUrl: actors.profileUrl,
        character: movieActors.character,
        popularity: actors.popularity,
      })
      .from(movieActors)
      .innerJoin(actors, eq(actors.id, movieActors.actorId))
      .where(eq(movieActors.movieId, movie.id));

    const responseData: MovieDetails = {
      ...movie,
      productionCountries: movie.productionCountries ?? [],
      genres: movieGenresList ?? [],
      actors: actorsList ?? [],
    };

    const response = jsonResponse(responseData, 200, {
      'Cache-Control': 'public, max-age=3600',
    });

    waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err: unknown) {
    return handleError(err, 'Не вдалося отримати деталі фільму');
  }
};
