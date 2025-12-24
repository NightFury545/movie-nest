import { getDb } from '../../db';
import { favorites, movies } from '../../db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { errorResponse, jsonResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import { getUserFromRequest } from '../../utils/auth-checker';
import type { Context } from '../../types';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    const data = await db
      .select({
        favoriteId: favorites.id,
        createdAt: favorites.createdAt,
        movieId: movies.id,
        title: movies.title,
        releaseDate: movies.releaseDate,
        rating: movies.rating,
        posterUrl: movies.posterUrl,
      })
      .from(favorites)
      .innerJoin(movies, eq(movies.id, favorites.movieId))
      .where(eq(favorites.userId, user.id))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(favorites)
      .where(eq(favorites.userId, user.id));

    const total = Number(totalResult[0]?.count ?? 0);

    const responseData = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    };

    return jsonResponse(responseData);
  } catch (err: unknown) {
    return handleError(err, 'Не вдалося отримати favorites');
  }
};

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const { movieId } = await request.json();
    if (!movieId) return errorResponse('movieId is required', 400);

    const [existing] = await db
      .select()
      .from(favorites)
      .where(
        and(eq(favorites.userId, user.id), eq(favorites.movieId, movieId)),
      );

    if (existing) return errorResponse('Movie already in favorites', 400);

    const [newFavorite] = await db
      .insert(favorites)
      .values({ userId: user.id, movieId })
      .returning();

    return jsonResponse({
      message: 'Movie added to favorites',
      favorite: newFavorite,
    });
  } catch (err: unknown) {
    return handleError(err, 'Add favorite failed');
  }
};
