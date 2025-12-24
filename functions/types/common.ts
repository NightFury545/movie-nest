import type { ExecutionContext } from '@cloudflare/workers-types';
import { JWTPayload } from 'jose';

export interface Context {
  request: Request;
  env: Record<string, unknown>;
  waitUntil: ExecutionContext['waitUntil'];
  params: Record<string, string>;
}

export interface AppJwtPayload extends JWTPayload {
  id: string;
  username: string;
}
