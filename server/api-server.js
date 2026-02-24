import express from 'express';
import dotenv from 'dotenv';

import getPortfolioHandler from '../api/getPortfolio.js';
import contactHandler from '../api/contact.js';
import updateContentHandler from '../api/admin/updateContent.js';
import messagesHandler from '../api/admin/messages.js';
import loginHandler from '../api/admin/login.js';
import testimonialSubmissionsHandler from '../api/admin/testimonialSubmissions.js';
import testimonialSubmitHandler from '../api/testimonials/submit.js';

dotenv.config({ path: new URL('../.env.local', import.meta.url).pathname });

const app = express();
app.use(express.json({ limit: '2mb' }));

// Minimal CORS for local dev (Vite default :5173)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

function adaptVercel(handler) {
  return async (req, res) => {
    try {
      // Vercel handlers expect (req, res) with the same surface used here.
      await handler(req, res);
    } catch (e) {
      console.error('Unhandled API error', e);
      if (!res.headersSent) res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

app.get('/api/getPortfolio', adaptVercel(getPortfolioHandler));
app.post('/api/contact', adaptVercel(contactHandler));

app.post('/api/admin/updateContent', adaptVercel(updateContentHandler));
app.get('/api/admin/messages', adaptVercel(messagesHandler));
app.post('/api/admin/login', adaptVercel(loginHandler));
app.get('/api/admin/testimonial_submissions', adaptVercel(testimonialSubmissionsHandler));
app.post('/api/admin/testimonial_submissions', adaptVercel(testimonialSubmissionsHandler));
app.post('/api/testimonials/submit', adaptVercel(testimonialSubmitHandler));

app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

