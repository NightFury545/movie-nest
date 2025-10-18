import { db } from '@db';
import { collections, collectionMovies, movies } from '@db/schema';
import { eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) return errorResponse('Collection id is required', 400);

    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id));

    if (!collection) return errorResponse('Collection not found', 404);

    const moviesInCollection = await db
      .select({
        id: movies.id,
        title: movies.title,
        posterUrl: movies.posterUrl,
        releaseDate: movies.releaseDate,
      })
      .from(collectionMovies)
      .innerJoin(movies, eq(collectionMovies.movieId, movies.id))
      .where(eq(collectionMovies.collectionId, id))
      .orderBy(collectionMovies.createdAt)
      .limit(10);

    return jsonResponse({
      ...collection,
      movies: moviesInCollection,
    });
  } catch (err: unknown) {
    return handleError(err, 'Failed to load collection details');
  }
}
