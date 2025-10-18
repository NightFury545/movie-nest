import { db } from '@db';
import { collections, collectionMovies } from '@db/schema';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import { getUserFromRequest } from '@api/utils/auth-checker';
import { eq, and } from 'drizzle-orm';
import type { AddMovieToCollectionDTO } from '@api/types/collection';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

    const user = getUserFromRequest(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const { collectionId, movieId }: AddMovieToCollectionDTO = await req.json();

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
      movieId: { movieId },
      movieCount: updated.movieCount,
    });
  } catch (err: unknown) {
    return handleError(err, 'Add movie to collection failed');
  }
}
