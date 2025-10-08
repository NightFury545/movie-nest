import { db } from '@db';
import { favorites } from '@db/schema';
import { and, eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import { getUserFromRequest } from '@api/utils/auth-checker';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'DELETE')
      return errorResponse('Method not allowed', 405);

    const user = getUserFromRequest(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const url = new URL(req.url);
    const movieIdParam = url.pathname.split('/').pop();
    const movieId = Number(movieIdParam);

    if (!movieId || isNaN(movieId))
      return errorResponse('Invalid movie ID', 400);

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

    return jsonResponse({ message: 'Favorite removed successfully' });
  } catch (err: unknown) {
    return handleError(err, 'Remove favorite failed');
  }
}
