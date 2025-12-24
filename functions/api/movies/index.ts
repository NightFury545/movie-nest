import { genres, movies } from '../../db/schema';
import {
  and,
  asc,
  desc,
  gte,
  ilike,
  inArray,
  lte,
  sql,
  SQL,
} from 'drizzle-orm';
import { jsonResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import type {
  Context,
  MovieQueryParams,
  MovieSortableField,
  MovieStatus,
  MovieSummary,
  PaginatedResponse,
  SortOrder,
} from '../../types';
import { parseArray, parseRangeParam } from '../../utils/parsers';
import { getDb } from '../../db';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env, waitUntil } = context;
    const db = getDb(env.DATABASE_URL as string);

    const cache = await caches.open('movies-list-cache');
    const cacheKey = new Request(request.url, request);
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const params = parseQueryParams(request);

    if (params.genres?.length) {
      const rows = await db
        .select({ id: genres.id })
        .from(genres)
        .where(inArray(genres.name, params.genres));
      params.genres = rows.map((r) => r.id);
    }

    const filters = buildFilters(params);

    const sort = buildSort(params.sortBy ?? 'title', params.sortOrder ?? 'asc');
    const offset = (params.page - 1) * params.limit;

    const data = await db
      .select({
        id: movies.id,
        tmdbId: movies.tmdbId,
        title: movies.title,
        slug: movies.slug,
        releaseDate: movies.releaseDate,
        posterUrl: movies.posterUrl,
        rating: movies.rating,
        status: movies.status,
        runtime: movies.runtime,
      })
      .from(movies)
      .where(filters)
      .orderBy(sort)
      .limit(params.limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(movies)
      .where(filters);

    const total = Number(totalResult[0]?.count ?? 0);

    const responseData: PaginatedResponse<MovieSummary> = {
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
      data,
    };

    const response = jsonResponse(responseData, 200, {
      'Cache-Control': 'public, max-age=3600',
    });

    waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err: unknown) {
    return handleError(err, 'Не вдалося отримати список фільмів');
  }
};

function parseQueryParams(req: Request): MovieQueryParams {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 18;
  const sortBy =
    (url.searchParams.get('sortBy') as MovieSortableField) || 'title';
  const sortOrder = (url.searchParams.get('sortOrder') as SortOrder) || 'asc';
  const search = url.searchParams.get('search') || undefined;
  const genres = parseArray(url.searchParams.get('genres'));
  const languages = parseArray(url.searchParams.get('languages'));
  const countries = parseArray(url.searchParams.get('countries'));
  const statuses = parseArray(url.searchParams.get('statuses')) as
    | MovieStatus[]
    | undefined;
  const ageRestrictions = parseArray(url.searchParams.get('ageRestrictions'));
  const releaseYear = parseRangeParam(url.searchParams.get('releaseYear'));
  const duration = parseRangeParam(url.searchParams.get('duration'));
  const rating = parseRangeParam(url.searchParams.get('rating'));

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    genres,
    languages,
    countries,
    statuses,
    ageRestrictions,
    releaseYear,
    duration,
    rating,
  };
}

function buildFilters(params: MovieQueryParams) {
  const filters: SQL[] = [];

  if (params.search) {
    filters.push(ilike(movies.title, `%${params.search}%`));
  }

  if (params.languages?.length) {
    filters.push(inArray(movies.originalLanguage, params.languages));
  }

  if (params.statuses?.length) {
    filters.push(inArray(movies.status, params.statuses));
  }

  if (params.ageRestrictions?.length) {
    filters.push(inArray(movies.ageRating, params.ageRestrictions));
  }

  if (params.countries?.length) {
    const countrySqlArray = sql`ARRAY[${sql.join(
      params.countries.map((c) => sql`${c}`),
      sql`,`,
    )}]::text[]`;

    filters.push(
      sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(${movies.productionCountries}) AS country WHERE country = ANY(${countrySqlArray})
      )`,
    );
  }

  if (params.rating) {
    const [minR, maxR] = params.rating;
    if (!Number.isFinite(minR) && Number.isFinite(maxR)) {
      filters.push(lte(movies.rating, maxR));
    } else if (Number.isFinite(minR) && !Number.isFinite(maxR)) {
      filters.push(gte(movies.rating, minR));
    } else if (Number.isFinite(minR) && Number.isFinite(maxR)) {
      filters.push(gte(movies.rating, minR));
      filters.push(lte(movies.rating, maxR));
    }
  }

  if (params.duration) {
    const [minRt, maxRt] = params.duration;
    if (!Number.isFinite(minRt) && Number.isFinite(maxRt)) {
      filters.push(lte(movies.runtime, maxRt));
    } else if (Number.isFinite(minRt) && !Number.isFinite(maxRt)) {
      filters.push(gte(movies.runtime, minRt));
    } else if (Number.isFinite(minRt) && Number.isFinite(maxRt)) {
      filters.push(gte(movies.runtime, minRt));
      filters.push(lte(movies.runtime, maxRt));
    }
  }

  if (params.releaseYear) {
    const [minY, maxY] = params.releaseYear;
    if (!Number.isFinite(minY) && Number.isFinite(maxY)) {
      filters.push(lte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, maxY));
    } else if (Number.isFinite(minY) && !Number.isFinite(maxY)) {
      filters.push(gte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, minY));
    } else if (Number.isFinite(minY) && Number.isFinite(maxY)) {
      filters.push(gte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, minY));
      filters.push(lte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, maxY));
    }
  }

  if (params.genres?.length) {
    const genreSqlArray = sql.join(
      params.genres.map((g) => sql`${g}`),
      sql`,`,
    );

    filters.push(sql`
      ${movies.id} IN (
      SELECT mg.movie_id
      FROM movie_genres mg
      WHERE mg.genre_id = ANY(ARRAY[${genreSqlArray}]::uuid[])
      GROUP BY mg.movie_id
      HAVING COUNT(*) = ${params.genres.length}
      )
    `);
  }

  return filters.length ? and(...filters) : undefined;
}

function buildSort(sortBy: string | undefined, sortOrder: SortOrder): SQL {
  const allowedFields: Record<string, SQL> = {
    title: sql`${movies.title}`,
    releaseYear: sql`${movies.releaseDate}`,
    rating: sql`${movies.rating}`,
    runtime: sql`${movies.runtime}`,
    status: sql`${movies.status}`,
  };

  const field =
    sortBy && allowedFields[sortBy] ? allowedFields[sortBy] : movies.title;

  return sortOrder === 'desc' ? desc(field) : asc(field);
}
