import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const client = postgres(building ? '' : env.DATABASE_URL);

export const db = drizzle(client, { schema });
