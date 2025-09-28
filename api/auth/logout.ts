import { jsonResponse, errorResponse } from '@api/utils/responses';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

  return jsonResponse({ message: 'Logged out successfully' });
}
