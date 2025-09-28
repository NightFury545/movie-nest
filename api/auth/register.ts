import { db } from '@db';
import { users } from '@db/schema';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import bcrypt from 'bcrypt';
import { signJwt } from '@api/lib/jwt';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

  try {
    const { username, email, password, avatar } = await req.json();

    if (!username || !email || !password) {
      return errorResponse('Missing fields', 400);
    }

    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existing) return errorResponse('Email already registered', 400);

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

    const token = signJwt({ id: newUser.id, username: newUser.username });

    return jsonResponse({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (err) {
    return errorResponse(`Internal server error: ${err}`, 500);
  }
}
