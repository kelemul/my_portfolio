import { getDb } from '../../api/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = await getDb();
    // Prefer a dedicated 'testimonials' collection if present, fallback to content.testimonials
    const collNames = await db.listCollections().toArray();
    const hasColl = collNames.some(c => c.name === 'testimonials');
    if (hasColl) {
      const items = await db.collection('testimonials').find({}).sort({ _id: -1 }).toArray();
      return res.status(200).json(items || []);
    }

    // fallback to content document's testimonials array
    const content = await db.collection('content').findOne({});
    const items = (content && Array.isArray(content.testimonials)) ? content.testimonials : [];
    return res.status(200).json(items);
  } catch (e) {
    console.error('fetch testimonials error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
