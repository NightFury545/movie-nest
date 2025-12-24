import { verifyJwt } from '../lib/jwt';
import { AppJwtPayload } from '../types';

export async function getUserFromRequest(
  req: Request,
  secret: string,
): Promise<AppJwtPayload | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    return verifyJwt(token, secret);
  } catch {
    return null;
  }
}
