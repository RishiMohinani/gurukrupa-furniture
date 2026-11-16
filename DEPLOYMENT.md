# Deployment

The frontend is deployed to Vercel and the API to Heroku. Keep the Heroku app
root at the repository root so its `Procfile` and `heroku-postbuild` script run.

## Vercel frontend

1. Import this repository into Vercel and set **Root Directory** to `client`.
2. Use the Vite defaults (`npm run build`, output directory `dist`).
3. Set `VITE_API_URL` to the Heroku app's base URL, for example
   `https://your-app-name.herokuapp.com` (no trailing slash).
4. Deploy, then copy the Vercel production URL for the API configuration below.

## Heroku API

1. Create a Heroku app for this repository and deploy from the repository root.
   The root `Procfile` starts the API; `heroku-postbuild` installs the server
   dependencies. The frontend is built and deployed separately by Vercel.
2. Set these Config Vars in Heroku:
   - `MONGODB_URI`: the production MongoDB connection string.
   - `CLIENT_ORIGIN`: the exact Vercel production origin, such as
     `https://your-project.vercel.app`. Separate multiple allowed origins with
     commas if needed.
   - `NODE_ENV`: `production`.
3. Confirm `https://your-app-name.herokuapp.com/api/health` returns
   `{"ok":true}`.

After changing `VITE_API_URL`, redeploy the Vercel project because Vite embeds
that value at build time. For local server development, copy
`server/.env.example` to `server/.env`.
