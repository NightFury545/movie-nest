import { eq } from 'drizzle-orm';
import { collections } from '../../db/schema';
import { jsonResponse, errorResponse } from '../../utils/responses';
import { handleError } from '../../utils/error-handler';
import { getDb } from '../../db';
import type { Context } from '../../types';

export const onRequestGet = async (context: Context) => {
  try {
    const { env, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const { id } = params;
    if (!id) return errorResponse('Invalid collection ID', 400);

    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id));

    if (!collection) return errorResponse('Collection not found', 404);

    return jsonResponse(collection, 200);
  } catch (err) {
    return handleError(err, 'Failed to load collection');
  }
};

export const onRequestDelete = async (context: Context) => {
  try {
    const { env, params } = context;
    const db = getDb(env.DATABASE_URL as string);

    const { id } = params;
    if (!id) return errorResponse('Invalid collection ID', 400);

    const [existing] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id));

    if (!existing) return errorResponse('Collection not found', 404);

    await db.delete(collections).where(eq(collections.id, id));

    return jsonResponse({ message: 'Collection deleted' }, 200);
  } catch (err) {
    return handleError(err, 'Failed to delete collection');
  }
};
