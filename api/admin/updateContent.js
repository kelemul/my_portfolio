import { getDb } from '../db.js';
import { isAuthorized } from './auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ok = await isAuthorized(req);
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });

  const { section, data } = req.body || {};

  if (!section) {
    return res.status(400).json({ error: 'Section is required' });
  }

  try {
    const db = await getDb();
    const collection = db.collection('content');

    await collection.updateOne(
      {},
      {
        $set: {
          [section]: data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('updateContent error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

