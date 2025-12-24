import { getDb } from '../../db';
import { users } from '../../db/schema';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import { getUserFromRequest } from '../../utils/auth-checker';
import type { Context } from '../../types';
import { eq } from 'drizzle-orm';

export const onRequestGet = async (context: Context) => {
  try {
    const { request, env } = context;
    const db = getDb(env.DATABASE_URL as string);

    const tokenUser = await getUserFromRequest(
      request,
      env.JWT_SECRET as string,
    );
    if (!tokenUser) return errorResponse('Unauthorized', 401);

    const [user] = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        avatar: users.avatar,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, tokenUser.id));

    if (!user) return errorResponse('Користувача не знайдено', 404);

    return jsonResponse(user);
  } catch (err: unknown) {
    return handleError(err, 'Не вдалося отримати поточного користувача');
  }
};
