import axios from 'axios';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { db } from '@db';
import { users } from '@db/schema';
import { signJwt } from '@api/lib/jwt';
import { handleError } from '@api/utils/error-handler.ts';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { eq } from 'drizzle-orm';

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    if (!code) return errorResponse('No code provided', 400);

    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const accessToken = tokenRes.data.access_token;

    const profileRes = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const { email, name, picture: avatar } = profileRes.data;

    let [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      [user] = await db
        .insert(users)
        .values({
          username: name,
          email,
          avatar: avatar || null,
          password: hashedPassword,
        })
        .returning();
    }

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
  } catch (err: unknown) {
    return handleError(err, 'Google OAuth error');
  }
};
