import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

console.log(process.env);
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
console.log(db.$client);
