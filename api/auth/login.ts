import { db } from '@db';
import { users } from '@db/schema';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { signJwt } from '@api/lib/jwt';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function handler(req: Request) {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

  try {
    const { email, password } = await req.json();

    if (!email || !password) return errorResponse('Missing fields', 400);

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return errorResponse('Invalid email or password', 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return errorResponse('Invalid email or password', 401);

    const token = signJwt({ id: user.id, username: user.username });

    return jsonResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return errorResponse(`Internal server error: ${err}`, 500);
  }
}
