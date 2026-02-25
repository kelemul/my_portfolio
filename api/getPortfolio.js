import { getDb } from './db.js';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const content = await db.collection('content').findOne({}) || {};

    // Never expose any sensitive fields
    const { _id, adminPassword, adminSecret, user, ...safeContent } = content;
    return res.status(200).json(safeContent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
