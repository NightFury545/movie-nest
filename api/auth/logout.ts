import { jsonResponse, errorResponse } from '@api/utils/responses';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function handler(req: Request) {
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

  return jsonResponse({ message: 'Logged out successfully' });
}
