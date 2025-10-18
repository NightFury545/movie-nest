import { db } from '@db';
import { collections } from '@db/schema';
import { jsonResponse, errorResponse } from '@api/utils/responses';
import { handleError } from '@api/utils/error-handler';
import type { CreateCollectionDTO, Collection } from '@api/types/collection';
import { getUserFromRequest } from '@api/utils/auth-checker';

export default async function handler(req: Request) {
  try {
    if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

    const user = getUserFromRequest(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body: CreateCollectionDTO = await req.json();

    const [newCollection] = await db
      .insert(collections)
      .values({
        userId: user.id,
        name: body.name,
        isPublic: body.isPublic ?? false,
      })
      .returning({
        id: collections.id,
        userId: collections.userId,
        name: collections.name,
        isPublic: collections.isPublic,
        movieCount: collections.movieCount,
        createdAt: collections.createdAt,
        updatedAt: collections.updatedAt,
      });

    return jsonResponse<Collection>(newCollection);
  } catch (err: unknown) {
    return handleError(err, 'Create collection failed');
  }
}
