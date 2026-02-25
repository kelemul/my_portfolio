# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

**Vercel Deployment**
 - **Env vars:** set `MONGODB_URI`, optionally `MONGODB_DB`, `ADMIN_PASSWORD`, and `ADMIN_JWT_SECRET` in your Vercel project settings (or use `.env.local` for local dev).
 - **Build:** Vercel uses the `build` script (`vite build`) to produce the `dist` folder which is served as static files. API serverless functions live in the `/api` directory and are deployed via `@vercel/node`.
 - **Local dev:** copy `.env.example` → `.env.local`, set `MONGODB_URI` (required) and run the API locally with `npm run dev:api` and the frontend with `npm run dev:all` or use `vercel dev`.

**Notes**
 - This project is MongoDB-first: do not rely on `/mongo_seed/content.json` in production. The API and admin tools now require a live MongoDB connection (`MONGODB_URI`).
 - To populate your MongoDB with the seed data, set `MONGODB_URI` and run:

```bash
node scripts/import_seed.js
```

 - The MongoDB helper `api/db.js` uses a global cache to reuse the `MongoClient` across serverless warm invocations, avoiding connection exhaustion.
 - If your API server runs on a different origin/port during local dev (for example `http://localhost:3000`), set `VITE_API_BASE` in `.env.local` so the frontend points to the correct API host.
