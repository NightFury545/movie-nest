import { eq, desc, asc } from 'drizzle-orm';
import { getDb } from '../../../../db';
import { collections, collectionMovies, movies } from '../../../../db/schema';
import { jsonResponse, errorResponse } from '../../../../utils/responses';
import { handleError } from '../../../../utils/error-handler';
import type {
  Context,
  SortOrder,
  PaginatedResponse,
  MovieSummary,
} from '../../../../types';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env, params } = context;

    const db = getDb(env.DATABASE_URL as string);

    const url = new URL(request.url);
    const { id: collectionId } = params;

    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const sortOrder: SortOrder =
      (url.searchParams.get('sortOrder') as SortOrder) || 'desc';

    if (!collectionId) return errorResponse('Collection ID is required', 400);

    const [collection] = await db
      .select({ movieCount: collections.movieCount })
      .from(collections)
      .where(eq(collections.id, collectionId));

    if (!collection) return errorResponse('Collection not found', 404);

    const total = collection.movieCount ?? 0;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const moviesInCollection = await db
      .select({
        id: movies.id,
        tmdbId: movies.tmdbId,
        title: movies.title,
        overview: movies.overview,
        posterUrl: movies.posterUrl,
        releaseDate: movies.releaseDate,
        status: movies.status,
        rating: movies.rating,
      })
      .from(collectionMovies)
      .innerJoin(movies, eq(collectionMovies.movieId, movies.id))
      .where(eq(collectionMovies.collectionId, collectionId))
      .orderBy(
        sortOrder === 'desc'
          ? desc(collectionMovies.createdAt)
          : asc(collectionMovies.createdAt),
      )
      .limit(limit)
      .offset(offset);

    const response: PaginatedResponse<
      MovieSummary & { overview: string | null }
    > = {
      page,
      limit,
      total,
      totalPages,
      data: moviesInCollection,
    };

    return jsonResponse(response);
  } catch (err) {
    return handleError(err, 'Get collection movies failed');
  }
};
