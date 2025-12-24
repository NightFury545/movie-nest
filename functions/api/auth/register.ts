import { getDb } from '../../db';
import { users } from '../../db/schema';
import { eq, or } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { signJwt } from '../../lib/jwt';
import * as bcrypt from 'bcryptjs';
import type { Context } from '../../types';

export const onRequestPost = async (context: Context) => {
  try {
    const { request, env } = context;
    const { username, email, password, avatar } = await request.json();

    const validationError = validateUserData(username, email, password);
    if (validationError) return errorResponse(validationError, 400);

    const db = getDb(env.DATABASE_URL as string);

    const [existing] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)));
    if (existing)
      return errorResponse(
        "Користувач з таким ім'ям або електронною адресою вже зареєстрований",
        400,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
        avatar: avatar || null,
      })
      .returning();

    const token = await signJwt(
      { id: newUser.id, username: newUser.username },
      env.JWT_SECRET as string,
    );

    return jsonResponse({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (err: unknown) {
    return errorResponse(`Внутрішня помилка сервера: ${err}`, 500);
  }
};

function validateUserData(username: string, email: string, password: string) {
  if (!username || username.length < 3 || username.length > 24) {
    return 'Ім’я користувача має бути від 3 до 24 символів';
  }
  if (!email || email.length > 100 || !/^\S+@\S+\.\S+$/.test(email)) {
    return 'Електронна пошта має бути дійсною та не більше 100 символів';
  }
  if (!password || password.length < 6 || password.length > 50) {
    return 'Пароль має бути від 6 до 50 символів';
  }

  return null;
}
