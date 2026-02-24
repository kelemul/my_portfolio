import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Ensure `.env.local` is loaded before calling getDb().');
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  if (!client) {
    client = await clientPromise;
  } else {
    await clientPromise;
  }

  return client.db('portfolio_db');
}

