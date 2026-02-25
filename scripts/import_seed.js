import fs from 'fs/promises';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load local env vars from .env.local when running the script directly
dotenv.config({ path: new URL('../.env.local', import.meta.url).pathname });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set');
    process.exit(2);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();

    // Import users
    try {
      const usersRaw = await fs.readFile(new URL('../mongo_seed/users.json', import.meta.url));
      const users = JSON.parse(usersRaw.toString());
      const usersColl = db.collection('users');
      for (const u of users) {
        await usersColl.updateOne({ username: u.username }, { $set: u }, { upsert: true });
      }
      console.log('Imported users:', users.length);
    } catch (e) {
      console.error('Failed to import users:', e.message || e);
    }

    // Import content
    try {
      const contentRaw = await fs.readFile(new URL('../mongo_seed/content.json', import.meta.url));
      const contents = JSON.parse(contentRaw.toString());
      const contentColl = db.collection('content');
      // Upsert as single document
      await contentColl.updateOne({}, { $set: contents }, { upsert: true });
      console.log('Imported content');
    } catch (e) {
      console.error('Failed to import content:', e.message || e);
    }

    // Remove legacy user field from content (if present)
    try {
      const contentColl = db.collection('content');
      await contentColl.updateOne({}, { $unset: { user: '' } });
      console.log('Unset legacy content.user (if it existed)');
    } catch (e) {
      console.error('Failed to unset legacy user:', e.message || e);
    }

    console.log('Done');
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
