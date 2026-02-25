import { getDb } from '../../api/db.js';
import { isAuthorized } from './auth.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = await getDb();
  if (req.method === 'GET') {
    const ok = await isAuthorized(req);
    if (!ok) return res.status(401).json({ error: 'Unauthorized' });
    const subs = await db.collection('testimonials').find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(subs);
  }

  if (req.method === 'POST') {
    const ok = await isAuthorized(req);
    if (!ok) return res.status(401).json({ error: 'Unauthorized' });

    const { action, id } = req.body || {};
    if (!action || !id) return res.status(400).json({ error: 'action and id required' });

    try {
      const submissions = db.collection('testimonials');
      if (action === 'approve') {
        const doc = await submissions.findOne({ _id: new ObjectId(id) });
        if (!doc) return res.status(404).json({ error: 'Not found' });
        // insert into dedicated 'testimonials' collection (approved)
        const testimonial = { name: doc.name, feedback: doc.feedback, designation: doc.designation || '', image: doc.image || '', status: 1, createdAt: new Date() };
        await db.collection('testimonials').insertOne(testimonial);
        await submissions.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ success: true });
      }

      if (action === 'delete') {
        await submissions.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Unknown action' });
    } catch (e) {
      console.error('testimonial submissions admin error', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
