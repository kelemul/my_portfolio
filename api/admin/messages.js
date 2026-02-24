import { getDb } from '../db.js';
import { isAuthorized } from './auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ok = await isAuthorized(req);
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const db = await getDb();
    const collection = db.collection('messages');

    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json(messages);
  } catch (error) {
    console.error('messages error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

