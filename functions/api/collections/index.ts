import { getDb } from '../../db';
import { collections, collectionMovies, movies, users } from '../../db/schema';
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
import { errorResponse, jsonResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import type { Context, SortOrder, PaginatedResponse } from '../../types';
import { CreateCollectionDTO } from '../../types/collection';
import { Collection } from '../../../src/types';
import { getUserFromRequest } from '../../utils/auth-checker';
import { parseRangeParam } from '../../utils/parsers';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env } = context;
    const db = getDb(env.DATABASE_URL as string);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder: SortOrder =
      (url.searchParams.get('sortOrder') as SortOrder) || 'desc';

    const movieCount = parseRangeParam(url.searchParams.get('movieCount'));

    const visibility = url.searchParams.get('isPublic');
    const username = url.searchParams.get('username');
    const search = url.searchParams.get('search');

    const offset = (page - 1) * limit;

    const conditions: SQL[] = [];

    conditions.push(gte(collections.movieCount, 4));

    if (movieCount) {
      const [min, max] = movieCount;

      if (Number.isFinite(min)) {
        conditions.push(gte(collections.movieCount, min!));
      }

      if (Number.isFinite(max)) {
        conditions.push(lte(collections.movieCount, max!));
      }
    }

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

    const countResult = await db
      .select({ total: sql<number>`COUNT(*)::int` })
      .from(collections)
      .leftJoin(users, eq(users.id, collections.userId))
      .where(and(...conditions));

    const total = countResult[0]?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    const collectionIds = allCollections.map((c) => c.id);
    if (collectionIds.length === 0) {
      return jsonResponse({
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
        data: [],
      } satisfies PaginatedResponse<[]>);
    }

    const moviesForCollections = await db.execute(
      sql`
        SELECT collection_id AS "collectionId", poster_url AS "posterUrl"
        FROM (
          SELECT cm.collection_id, m.poster_url,
                 ROW_NUMBER() OVER (
                   PARTITION BY cm.collection_id
                   ORDER BY m.created_at DESC
                 ) AS rn
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
        groupedMovies.find((g) => g.collectionId === col.id)?.posters ?? [],
    }));

    return jsonResponse({
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      data: result,
    } satisfies PaginatedResponse<(typeof result)[number]>);
  } catch (err: unknown) {
    return handleError(err, 'Get collections failed');
  }
};

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env } = context;
    const db = getDb(env.DATABASE_URL as string);

    const user = await getUserFromRequest(request, env.JWT_SECRET as string);
    if (!user) return errorResponse('Unauthorized', 401);

    const body: CreateCollectionDTO = await request.json();

    const [newCollection] = await db
      .insert(collections)
      .values({
        userId: user.id,
        name: body.name,
        isPublic: body.isPublic ?? false,
      })
      .returning({
        id: collections.id,
        userId: collections.userId,
        name: collections.name,
        isPublic: collections.isPublic,
        movieCount: collections.movieCount,
        createdAt: collections.createdAt,
        updatedAt: collections.updatedAt,
      });

    return jsonResponse<Collection>(newCollection);
  } catch (err: unknown) {
    return handleError(err, 'Create collection failed');
  }
};
