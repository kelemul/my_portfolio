import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Cache the client across lambda invocations to avoid creating
// too many connections in serverless environments (Vercel, etc.).
const globalRef = globalThis;
if (!globalRef.__mongo) {
  globalRef.__mongo = { conn: null, promise: null };
}

function tryLoadDotenv() {
  // Only attempt in non-production environments
  if (process.env.NODE_ENV === 'production') return;
  if (process.env.MONGODB_URI) return;
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    dotenv.config({ path: envPath });
    // also try plain .env as fallback
    if (!process.env.MONGODB_URI) dotenv.config();
  } catch (e) {
    // ignore
  }
}

export async function getDb() {
  tryLoadDotenv();

  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB || 'portfolio_db';

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Set it in .env.local or Vercel project env vars.');
  }

  if (globalRef.__mongo.conn) {
    return globalRef.__mongo.conn.db(MONGODB_DB);
  }

  if (!globalRef.__mongo.promise) {
    const client = new MongoClient(MONGODB_URI);
    globalRef.__mongo.promise = client.connect().then((connectedClient) => {
      globalRef.__mongo.conn = connectedClient;
      return connectedClient;
    });
  }

  const clientInstance = await globalRef.__mongo.promise;
  return clientInstance.db(MONGODB_DB);
}

