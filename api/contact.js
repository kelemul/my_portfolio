import { getDb } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = await getDb();
    const collection = db.collection('messages');

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('contact error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

