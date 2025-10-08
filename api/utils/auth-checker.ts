import { verifyJwt } from '@api/lib/jwt';
import type { JwtPayload } from '@api/lib/jwt';

export function getUserFromRequest(req: Request): JwtPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    return verifyJwt(token) as JwtPayload;
  } catch {
    return null;
  }
}
