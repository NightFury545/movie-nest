import { getDb } from '../../../db';
import {
  actors,
  genres,
  movieActors,
  movieGenres,
  movies,
} from '../../../db/schema';
import { and, eq } from 'drizzle-orm';
import { errorResponse, jsonResponse } from '../../../utils/responses';
import type { Context } from '../../../types';
import { createTmdbApi } from '../../../lib/tmdb';
import { generateSlug } from '../../../utils/slug-generator';
import { TmdbProductionCountry } from '../../../types';

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env } = context;
    const { tmdbId } = await request.json();

    if (!tmdbId) return errorResponse('tmdbId відсутній', 400);

    const db = getDb(env.DATABASE_URL as string);
    const tmdbApi = createTmdbApi(
      env.TMDB_API_KEY as string,
      env.TMDB_API_URL as string,
    );

    const { data: movieData } = await tmdbApi.get(`/movie/${tmdbId}`, {
      params: { append_to_response: 'credits' },
    });

    const genreIds: string[] = [];
    for (const g of movieData.genres) {
      const [existingGenre] = await db
        .select()
        .from(genres)
        .where(eq(genres.tmdbId, g.id));

      const genreId = existingGenre
        ? existingGenre.id
        : (
            await db
              .insert(genres)
              .values({ name: g.name, tmdbId: g.id })
              .returning()
          )[0].id;

      genreIds.push(genreId);
    }

    const actorMap: Record<number, string> = {};
    for (const a of movieData.credits.cast) {
      const [existingActor] = await db
        .select()
        .from(actors)
        .where(eq(actors.tmdbId, a.id));

      actorMap[a.id] = existingActor
        ? existingActor.id
        : (
            await db
              .insert(actors)
              .values({
                tmdbId: a.id,
                name: a.name,
                biography: a.biography || '',
                birthday: a.birthday || null,
                deathday: a.deathday || null,
                gender:
                  a.gender === 1 ? 'female' : a.gender === 2 ? 'male' : 'other',
                placeOfBirth: a.place_of_birth || null,
                profileUrl: a.profile_path
                  ? `https://image.tmdb.org/t/p/w500${a.profile_path}`
                  : null,
                popularity: String(a.popularity || 0),
              })
              .returning()
          )[0].id;
    }

    const [existingMovie] = await db
      .select()
      .from(movies)
      .where(eq(movies.tmdbId, tmdbId));

    const { id: movieId, slug: movieSlug } = existingMovie
      ? existingMovie
      : (
          await db
            .insert(movies)
            .values({
              tmdbId: movieData.id,
              title: movieData.title,
              originalTitle: movieData.original_title,
              slug: generateSlug(movieData.title),
              overview: movieData.overview,
              releaseDate: movieData.release_date,
              runtime: movieData.runtime,
              ageRating: movieData.adult ? '18+' : '0+',
              status: movieData.status.toLowerCase(),
              originalLanguage: movieData.original_language,
              posterUrl: movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : null,
              backdropUrl: movieData.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
                : null,
              rating: movieData.vote_average,
              popularity: movieData.popularity,
              productionCountries: movieData.production_countries.map(
                (c: TmdbProductionCountry) => c.iso_3166_1,
              ),
              budget: movieData.budget,
              revenue: movieData.revenue,
            })
            .returning()
        )[0];

    for (const genreId of genreIds) {
      const exists = await db
        .select()
        .from(movieGenres)
        .where(
          and(
            eq(movieGenres.movieId, movieId),
            eq(movieGenres.genreId, genreId),
          ),
        );

      if (!exists.length) {
        await db.insert(movieGenres).values({ movieId, genreId });
      }
    }

    for (const castMember of movieData.credits.cast) {
      const actorId = actorMap[castMember.id];
      const exists = await db
        .select()
        .from(movieActors)
        .where(
          and(
            eq(movieActors.movieId, movieId),
            eq(movieActors.actorId, actorId),
          ),
        );

      if (!exists.length) {
        await db.insert(movieActors).values({
          movieId,
          actorId,
          character: castMember.character,
        });
      }
    }

    return jsonResponse({ message: 'Фільм імпортовано успішно', movieSlug });
  } catch (err) {
    return errorResponse(`Помилка імпорту: ${err}`, 500);
  }
};
