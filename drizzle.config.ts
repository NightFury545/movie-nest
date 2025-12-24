import type { Config } from 'drizzle-kit';

export default {
  schema: './functions/db/schema',
  out: './functions/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
