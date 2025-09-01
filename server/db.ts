import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle, type NeonDatabase } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '../shared/schema.js';

neonConfig.webSocketConstructor = ws;

let _pool: Pool | null = null;
let _db: NeonDatabase<typeof schema> | null = null;

export function isDbConfigured(): boolean {
  return typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.length > 0;
}

export function getPool(): Pool {
  if (!_pool) {
    if (!isDbConfigured()) {
      throw new Error('DATABASE_URL must be set. Did you forget to provision a database?');
    }
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}

export function getDb() {
  if (!_db) {
    _db = drizzle({ client: getPool(), schema });
  }
  return _db;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    if (!isDbConfigured()) return false;
    const pool = getPool();
    const client = await pool.connect();
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    if (_pool) {
      await _pool.end();
      _pool = null;
      _db = null;
    }
  } catch (err) {
    console.error('Error closing database connection:', err);
  }
}
