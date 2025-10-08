import { db } from '@db';
import { favorites } from '@db/schema';
import { asc, desc, eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler.ts';
import { getUserFromRequest } from '@api/utils/auth-checker.ts';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

    const user = getUserFromRequest(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const order = url.searchParams.get('order') === 'asc' ? asc : desc;
    const offset = (page - 1) * limit;

    const [items, total] = await Promise.all([
      db
        .select()
        .from(favorites)
        .where(eq(favorites.userId, user.id))
        .orderBy(order(favorites.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: favorites.id })
        .from(favorites)
        .where(eq(favorites.userId, user.id)),
    ]);

    return jsonResponse({
      data: items,
      pagination: {
        page,
        limit,
        total: Number(total[0]?.count ?? 0),
        totalPages: Math.ceil(Number(total[0]?.count ?? 0) / limit),
        order: url.searchParams.get('order') ?? 'desc',
      },
    });
  } catch (err: unknown) {
    return handleError(err, 'Get favorites failed');
  }
}
