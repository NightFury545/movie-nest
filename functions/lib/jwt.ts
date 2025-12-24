import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { AppJwtPayload } from '../types';

const EXPIRES_IN = '7d';

export async function signJwt(
  payload: Omit<AppJwtPayload, 'iat' | 'exp'>,
  secret: string,
): Promise<string> {
  const key = new TextEncoder().encode(secret);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(key);
}

export async function verifyJwt(
  token: string,
  secret: string,
): Promise<AppJwtPayload | null> {
  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload as AppJwtPayload;
  } catch {
    return null;
  }
}
