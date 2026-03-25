# HR Portal

A small HR web app: employee profiles, holiday requests, admin approval flow, and role-based navigation. **Frontend** is a Create React App; **backend** is Express with MongoDB (Mongoose).

## Stack

| Layer | Tech |
|--------|------|
| UI | React 19, React Router 7, Bootstrap 5, TanStack Query |
| API | Express, Mongoose, JWT, bcrypt, Helmet, rate limiting |
| Data | MongoDB; demo roster loaded from `server/data/employeesSeed.json` |

## Features

- Sign in with **email** or **`firstname.lastname`**
- JWT session: API calls send `Authorization: Bearer <token>`
- Employee and **admin** roles (directory, profiles, book holidays, admin holiday queue)
- Passwords stored as bcrypt hashes; optional `/api/auth` routes for a separate User model

## Local development

1. **MongoDB** running and a connection string ready.

2. **Backend** (`server/`):

   ```bash
   cd server
   cp .env.example .env
   # Set MONGO_URI and JWT_SECRET (use a long random string for the secret)
   npm install
   npm run seed
   npm start
   ```

   API defaults to `http://localhost:5000`.

3. **Frontend** (repository root):

   ```bash
   npm install
   npm start
   ```

   Opens `http://localhost:3000`. The CRA **proxy** forwards `/api` to port **5000**, so leave `REACT_APP_API_URL` unset locally.

### Environment variables

**`server/.env`**

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | Secret for signing tokens (required) |
| `JWT_EXPIRES_IN` | Optional; default `7d` |
| `PORT` | Optional; default `5000` |
| `CLIENT_ORIGIN` | Optional; comma-separated frontend origins. `https://*.vercel.app` is allowed automatically. |

**Root `.env` (production builds only)**

| Variable | Purpose |
|----------|---------|
| `REACT_APP_API_URL` | Public API origin **without** trailing slash, e.g. `https://your-api.example.com`. Required for Vercel (or any host where `/api` is not proxied). |

## Scripts

| Command | Where | Description |
|---------|--------|-------------|
| `npm start` | root | Dev server for React |
| `npm run build` | root | Production build → `build/` |
| `npm start` | `server/` | Runs Express |
| `npm run seed` | `server/` | Clears employees and loads `server/data/employeesSeed.json` |

## API (overview)

- `POST /api/employees/login` — body: `{ username, password }` → `{ token, id, name, role }` (public)
- `GET/PATCH /api/employees`, `GET/PATCH /api/employees/:id` — require employee JWT
- `POST /api/employees`, `DELETE /api/employees/:id` — admin JWT
- `POST /api/auth/register`, `POST /api/auth/login` — User model (optional; separate from employee login)

`:id` can be a Mongo ObjectId or a legacy seed id (e.g. `a1`, `e1`).

## Deployment

- **Frontend (e.g. Vercel):** set `REACT_APP_API_URL` for Production and Preview, then redeploy. `vercel.json` configures the CRA `build` output and SPA routing.
- **Backend:** run Node on a long-lived host (Render, Railway, Fly.io, VPS, etc.) with `MONGO_URI`, `JWT_SECRET`, and HTTPS. Point `REACT_APP_API_URL` at that origin.

After deploy, run `npm run seed` once against the production database if you need demo users (clears existing employees first).

## Project layout

```
server/           Express app, models, routes, middleware, seed script
server/data/      employeesSeed.json (demo data for npm run seed)
src/              React app (components, services, config)
```

More login tips and role notes: `hr-portal-notes.txt`.

## License

Private / use per your organization.
