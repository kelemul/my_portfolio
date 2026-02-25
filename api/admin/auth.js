import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
const JWT_EXPIRES_IN = '8h';

export function signAdminToken(payload = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function isAuthorized(req) {
  const authHeader = req.headers.authorization || '';
  const bearer = authHeader.replace('Bearer ', '').trim();

  // If env ADMIN_PASSWORD is set, allow direct password for compatibility
  if (bearer && bearer === process.env.ADMIN_PASSWORD) return true;

  if (!bearer) return false;

  const payload = verifyAdminToken(bearer);
  if (payload && payload?.role === 'admin') return true;

  return false;
}

export async function validateCredentials(username, password) {
  // Use MongoDB only. `getDb()` will throw if `MONGODB_URI` is not set.
  const db = await getDb();
  const users = db.collection('users');
  const user = await users.findOne({ username });

  // If no dedicated users entry, check legacy `content.user` in the DB and migrate
  if (!user) {
    try {
      const contentDoc = await db.collection('content').findOne({});
      const legacy = contentDoc?.user;
      if (legacy && legacy.username === username) {
        if (typeof legacy.password === 'string' && legacy.password.startsWith('$2')) {
          const ok = await bcrypt.compare(password, legacy.password);
          if (ok) {
            await users.insertOne({ username, password: legacy.password, role: legacy.role || 'admin' });
            return { username, role: legacy.role || 'admin' };
          }
        }
        if (legacy.password === password) {
          const hash = await bcrypt.hash(password, 10);
          await users.insertOne({ username, password: hash, role: legacy.role || 'admin' });
          return { username, role: legacy.role || 'admin' };
        }
      }
    } catch (e) {
      console.error('Legacy user lookup failed', e);
    }
    return null;
  }

  if (typeof user.password === 'string' && user.password.startsWith('$2')) {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    return { username: user.username, role: user.role || 'admin' };
  }

  if (user.password === password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await users.updateOne({ username }, { $set: { password: hash } });
    } catch (e) {
      console.error('Failed to migrate password to hash', e);
    }
    return { username: user.username, role: user.role || 'admin' };
  }

  return null;
}
