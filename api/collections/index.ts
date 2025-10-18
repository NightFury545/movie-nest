import { db } from '@db';
import { collections, collectionMovies, movies, users } from '@db/schema';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import {
  eq,
  and,
  ilike,
  gte,
  lte,
  desc,
  asc,
  sql,
  type SQL,
} from 'drizzle-orm';
import type { SortOrder } from '@api/types';
import type { PaginatedResponse } from '@api/types';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder: SortOrder =
      (url.searchParams.get('sortOrder') as SortOrder) || 'desc';
    const minMovies = Number(url.searchParams.get('minMovies')) || 0;
    const maxMovies =
      Number(url.searchParams.get('maxMovies')) || Number.MAX_SAFE_INTEGER;
    const visibility = url.searchParams.get('isPublic');
    const username = url.searchParams.get('username');
    const search = url.searchParams.get('search');
    const offset = (page - 1) * limit;

    const conditions: SQL[] = [
      gte(collections.movieCount, minMovies),
      lte(collections.movieCount, maxMovies),
    ];

    if (visibility === 'true' || visibility === 'false') {
      conditions.push(eq(collections.isPublic, visibility === 'true'));
    }
    if (search) {
      conditions.push(ilike(collections.name, `%${search}%`));
    }
    if (username) {
      conditions.push(ilike(users.username, `%${username}%`));
    }

    const allCollections = await db
      .select({
        id: collections.id,
        name: collections.name,
        userId: collections.userId,
        username: users.username,
        movieCount: collections.movieCount,
        createdAt: collections.createdAt,
      })
      .from(collections)
      .leftJoin(users, eq(users.id, collections.userId))
      .where(and(...conditions))
      .orderBy(
        sortBy === 'movieCount'
          ? sortOrder === 'desc'
            ? desc(collections.movieCount)
            : asc(collections.movieCount)
          : sortOrder === 'desc'
            ? desc(collections.createdAt)
            : asc(collections.createdAt),
      )
      .limit(limit)
      .offset(offset);

    const countQuery = await db.execute(
      sql`
        SELECT COUNT(*)::int AS total
        FROM ${collections}
        ${conditions.length > 0 ? sql`WHERE ${and(...conditions)}` : sql``}
      `,
    );

    const total = Number(countQuery.rows?.[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const collectionIds = allCollections.map((c) => c.id);
    if (collectionIds.length === 0) {
      return jsonResponse({
        page,
        limit,
        total,
        totalPages,
        data: [],
      } as PaginatedResponse<[]>);
    }

    const moviesForCollections = await db.execute(
      sql`
        SELECT collection_id AS "collectionId", poster_url AS "posterUrl"
        FROM (
               SELECT cm.collection_id, m.poster_url,
                      ROW_NUMBER() OVER (PARTITION BY cm.collection_id ORDER BY m.created_at DESC) AS rn
               FROM ${collectionMovies} cm
                      JOIN ${movies} m ON cm.movie_id = m.id
               WHERE cm.collection_id IN (${sql.join(collectionIds, sql`, `)})
             ) sub
        WHERE rn <= 4
      `,
    );

    const groupedMovies = collectionIds.map((id) => ({
      collectionId: id,
      posters: moviesForCollections.rows
        .filter((m) => m.collectionId === id)
        .map((m) => m.posterUrl),
    }));

    const result = allCollections.map((col) => ({
      ...col,
      posters:
        groupedMovies.find((gm) => gm.collectionId === col.id)?.posters ?? [],
    }));

    return jsonResponse({
      page,
      limit,
      total,
      totalPages,
      data: result,
    } satisfies PaginatedResponse<(typeof result)[number]>);
  } catch (err) {
    return handleError(err, 'Get collections failed');
  }
}
