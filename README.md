# Furniture site

## Local development

1. Use Node.js 22 and install dependencies with `npm run install:all`.
2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
3. Run `npm run dev:server` and `npm run dev:client` in separate terminals.
   Open `http://localhost:5173`; Vite proxies `/api` requests to the server.
4. Run `npm run build` to create the production frontend in `client/dist`.

For separate Vercel and Render deployment instructions, see
[DEPLOYMENT.md](./DEPLOYMENT.md).
