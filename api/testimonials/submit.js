import { getDb } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, feedback, designation, image } = req.body || {};
  if (!name || !feedback) return res.status(400).json({ error: 'name and feedback are required' });

  try {
    const db = await getDb();
    const coll = db.collection('testimonial_submissions');
    const doc = { name, feedback, designation: designation || '', image: image || '', createdAt: new Date(), status: 0 };
    const r = await coll.insertOne(doc);
    return res.status(200).json({ success: true, id: r.insertedId });
  } catch (e) {
    console.error('submit testimonial error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
