# Deployment

Deploy the frontend to Vercel and the API as a Render Web Service.

## Vercel frontend

1. Import this repository into Vercel and set **Root Directory** to `client`.
2. Use the Vite defaults: build command `npm run build`, output directory `dist`.
3. Deploy once and copy the Vercel production URL.

## Render API

1. Create a **Web Service** from this repository.
2. Set **Root Directory** to `server`, **Runtime** to Node, **Build Command** to
   `npm ci --omit=dev`, and **Start Command** to `npm start`.
3. Add these environment variables in Render:
   - `MONGODB_URI`: the production MongoDB connection string.
   - `CLIENT_ORIGIN`: the exact Vercel production origin, e.g.
     `https://your-project.vercel.app`. Separate multiple origins with commas.
   - `NODE_ENV`: `production`.
4. Deploy and confirm `https://your-render-service.onrender.com/api/health`
   returns `{"ok":true}`. Render provides the `PORT` variable automatically.
   The Render service is API-only, so its root URL may return 404; the website
   remains served by Vercel.

## Connect Vercel to Render

`client/vercel.json` rewrites `/api/*` on the Vercel site to the Render service
(`https://gurukrupa-furniture.onrender.com`). The browser only talks to Vercel,
so no `VITE_API_URL` or CORS setup is needed. If the Render URL changes, update
the rewrite destination. Leave `VITE_API_URL` unset; if it is set, the browser
calls Render directly and `CLIENT_ORIGIN` on Render must list the Vercel origin.

Do not commit `server/.env` or paste its secrets into source files. Set
production secrets in Render's environment settings. For local development,
copy `server/.env.example` to `server/.env`.
