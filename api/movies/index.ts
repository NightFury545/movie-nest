import { db } from '@db';
import { movies } from '@db/schema';
import {
  and,
  asc,
  desc,
  ilike,
  inArray,
  gte,
  lte,
  sql,
  type Column,
  SQL,
} from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import type {
  MovieSummary,
  PaginatedResponse,
  MovieQueryParams,
  MovieStatus,
  MovieSortableField,
  SortOrder,
} from '@api/types';
import { parseArray, parseNumber } from '@api/utils/parsers.ts';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

    const params = parseQueryParams(req);
    const filters = buildFilters(params);
    const sort = buildSort(params.sortBy ?? 'title', params.sortOrder ?? 'asc');
    const offset = (params.page - 1) * params.limit;

    const data = await db
      .select({
        id: movies.id,
        tmdbId: movies.tmdbId,
        title: movies.title,
        releaseDate: movies.releaseDate,
        posterUrl: movies.posterUrl,
        rating: movies.rating,
        status: movies.status,
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

    const response: PaginatedResponse<MovieSummary> = {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit),
      data,
    };

    return jsonResponse(response);
  } catch (err: unknown) {
    return handleError(err, 'Get movies list failed');
  }
}

function parseQueryParams(req: Request): MovieQueryParams {
  const url = new URL(req.url);
  return {
    page: Number(url.searchParams.get('page')) || 1,
    limit: Number(url.searchParams.get('limit')) || 20,
    sortBy: (url.searchParams.get('sortBy') as MovieSortableField) || 'title',
    sortOrder: (url.searchParams.get('sortOrder') as SortOrder) || 'asc',
    title: url.searchParams.get('title') || undefined,
    genres: parseArray(url.searchParams.get('genres')),
    languages: parseArray(url.searchParams.get('languages')),
    countries: parseArray(url.searchParams.get('countries')),
    statuses: parseArray(url.searchParams.get('statuses')) as
      | MovieStatus[]
      | undefined,
    ageRatings: parseArray(url.searchParams.get('ageRatings')),
    minYear: parseNumber(url.searchParams.get('minYear')),
    maxYear: parseNumber(url.searchParams.get('maxYear')),
    minRuntime: parseNumber(url.searchParams.get('minRuntime')),
    maxRuntime: parseNumber(url.searchParams.get('maxRuntime')),
    minRating: parseNumber(url.searchParams.get('minRating')),
    maxRating: parseNumber(url.searchParams.get('maxRating')),
  };
}

function buildFilters(params: MovieQueryParams) {
  const filters: SQL[] = [];

  if (params.title) filters.push(ilike(movies.title, `%${params.title}%`));
  if (params.languages?.length)
    filters.push(inArray(movies.originalLanguage, params.languages));
  if (params.statuses?.length)
    filters.push(inArray(movies.status, params.statuses));
  if (params.ageRatings?.length)
    filters.push(inArray(movies.ageRating, params.ageRatings));
  if (params.countries?.length)
    filters.push(
      sql`EXISTS (
      SELECT 1 FROM jsonb_array_elements_text(${movies.productionCountries})
      AS country WHERE country = ANY(${sql`{${sql.join(
        params.countries.map((c) => sql`${c}`),
        sql`,`,
      )}}`})
      )`,
    );
  if (params.minRating) filters.push(gte(movies.rating, params.minRating));
  if (params.maxRating) filters.push(lte(movies.rating, params.maxRating));
  if (params.minRuntime) filters.push(gte(movies.runtime, params.minRuntime));
  if (params.maxRuntime) filters.push(lte(movies.runtime, params.maxRuntime));
  if (params.minYear)
    filters.push(
      gte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, params.minYear),
    );
  if (params.maxYear)
    filters.push(
      lte(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, params.maxYear),
    );

  return filters.length ? and(...filters) : undefined;
}

function buildSort(sortBy: MovieSortableField, sortOrder: SortOrder) {
  const sortableColumns: Record<MovieSortableField, Column> = {
    title: movies.title,
    releaseDate: movies.releaseDate,
    rating: movies.rating,
    runtime: movies.runtime,
    status: movies.status,
  };
  const column = sortableColumns[sortBy];
  return sortOrder === 'desc' ? desc(column) : asc(column);
}
