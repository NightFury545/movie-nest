import { getDb } from '../../db';
import { favorites } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import { getUserFromRequest } from '../../utils/auth-checker';
import type { Context } from '../../types';

export const onRequestDelete = async (context: Context) => {
  try {
    const { request, env, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const { movieId } = params;
    if (!movieId) return errorResponse('movieId is required', 400);

    const [existing] = await db
      .select()
      .from(favorites)
      .where(
        and(eq(favorites.userId, user.id), eq(favorites.movieId, movieId)),
      );

    if (!existing) return errorResponse('Favorite not found', 404);

    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, user.id), eq(favorites.movieId, movieId)),
      );

    return jsonResponse({ message: 'Movie removed from favorites' });
  } catch (err: unknown) {
    return handleError(err, 'Remove favorite failed');
  }
};
