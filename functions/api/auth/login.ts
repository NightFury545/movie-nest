import { getDb } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { signJwt } from '../../lib/jwt';
import * as bcrypt from 'bcryptjs';
import { Context } from '../../types';

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env } = context;
    const { email, password } = await request.json();
    if (!email || !password) return errorResponse('Відсутні поля', 400);

    const db = getDb(env.DATABASE_URL as string);

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user)
      return errorResponse(
        'Неправильна адреса електронної пошти або пароль',
        401,
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return errorResponse(
        'Неправильна адреса електронної пошти або пароль',
        401,
      );

    const token = await signJwt(
      { id: user.id, username: user.username },
      env.JWT_SECRET as string,
    );

    return jsonResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err: unknown) {
    return errorResponse(`Внутрішня помилка сервера: ${err}`, 500);
  }
};
