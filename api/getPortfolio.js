import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // Use Environment Variable so your password is NEVER in the code
  const uri = process.env.MONGODB_URI; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('portfolio_db');
    const content = await database.collection('content').findOne({});
    
    // Send the data back to your Vue app
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}