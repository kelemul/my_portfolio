import { validateCredentials, signAdminToken } from './auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password are required' });

  try {
    const user = await validateCredentials(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signAdminToken({ username: user.username, role: user.role });
    return res.status(200).json({ token, username: user.username });
  } catch (e) {
    console.error('login error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
