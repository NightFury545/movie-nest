import { getDb } from '../../../../db';
import { collections, collectionMovies } from '../../../../db/schema';
import { jsonResponse, errorResponse } from '../../../../utils/responses';
import { handleError } from '../../../../utils/error-handler';
import { eq, and } from 'drizzle-orm';
import type { Context } from '../../../../types';
import { getUserFromRequest } from '../../../../utils/auth-checker';

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const { id: collectionId } = params;
    const { movieId } = params;

    if (!collectionId || !movieId)
      return errorResponse('Collection ID and Movie ID are required', 400);

    const collection = await db
      .select()
      .from(collections)
      .where(
        and(eq(collections.id, collectionId), eq(collections.userId, user.id)),
      );

    if (!collection.length) return errorResponse('Collection not found', 404);

    const exists = await db
      .select()
      .from(collectionMovies)
      .where(
        and(
          eq(collectionMovies.collectionId, collectionId),
          eq(collectionMovies.movieId, movieId),
        ),
      );

    if (exists.length) return errorResponse('Movie already in collection', 400);

    await db.insert(collectionMovies).values({ collectionId, movieId });

    const [updated] = await db
      .update(collections)
      .set({ movieCount: collection[0].movieCount + 1 })
      .where(eq(collections.id, collectionId))
      .returning({ movieCount: collections.movieCount });

    return jsonResponse({
      success: true,
      message: 'Movie added to collection',
      movieId,
      movieCount: updated.movieCount,
    });
  } catch (err: unknown) {
    return handleError(err, 'Add movie to collection failed');
  }
};

export const onRequestDelete = async (context: Context) => {
  try {
    const { request, env, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const { id: collectionId } = params;
    const { movieId } = params;

    if (!collectionId || !movieId)
      return errorResponse('Collection ID and Movie ID are required', 400);

    const collection = await db
      .select()
      .from(collections)
      .where(
        and(eq(collections.id, collectionId), eq(collections.userId, user.id)),
      );

    if (!collection.length) return errorResponse('Collection not found', 404);

    const exists = await db
      .select()
      .from(collectionMovies)
      .where(
        and(
          eq(collectionMovies.collectionId, collectionId),
          eq(collectionMovies.movieId, movieId),
        ),
      );

    if (!exists.length) return errorResponse('Movie not in collection', 404);

    await db
      .delete(collectionMovies)
      .where(
        and(
          eq(collectionMovies.collectionId, collectionId),
          eq(collectionMovies.movieId, movieId),
        ),
      );

    const [updated] = await db
      .update(collections)
      .set({ movieCount: collection[0].movieCount - 1 })
      .where(eq(collections.id, collectionId))
      .returning({ movieCount: collections.movieCount });

    return jsonResponse({
      success: true,
      message: 'Movie removed from collection',
      movieId,
      movieCount: updated.movieCount,
    });
  } catch (err: unknown) {
    return handleError(err, 'Remove movie from collection failed');
  }
};
