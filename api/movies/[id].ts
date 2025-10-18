import { db } from '@db';
import { movies, movieGenres, genres, movieActors, actors } from '@db/schema';
import { eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import type { MovieDetails, ActorSummary, Genre } from '@api/types';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

    const url = new URL(req.url);
    const movieId = url.pathname.split('/').pop();
    if (!movieId) return errorResponse('Invalid movie id', 400);

    const [movie] = await db
      .select()
      .from(movies)
      .where(eq(movies.id, movieId));
    if (!movie) return errorResponse('Movie not found', 404);

    const movieGenresList: Genre[] = await db
      .select({
        id: genres.id,
        tmdbId: genres.tmdbId,
        name: genres.name,
      })
      .from(movieGenres)
      .innerJoin(genres, eq(genres.id, movieGenres.genreId))
      .where(eq(movieGenres.movieId, movieId));

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
      .where(eq(movieActors.movieId, movieId));

    const response: MovieDetails = {
      ...movie,
      productionCountries: movie.productionCountries ?? [],
      genres: movieGenresList ?? [],
      actors: actorsList ?? [],
    };

    return jsonResponse(response);
  } catch (err: unknown) {
    return handleError(err, 'Get movie details failed');
  }
}
