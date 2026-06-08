# Frontend — Deploy to Render

## Prerequisites

- A [Render](https://render.com) account
- A GitHub account with a repo for the frontend (e.g., `ejercicio2-frontend`)
- The backend deployed and its Render URL

## Split the frontend into its own repo

From the monorepo root, extract frontend history into a new branch:

```bash
git subtree split --prefix=frontend -b frontend-deploy
```

Create a new repo on GitHub, then push:

```bash
git remote add frontend-origin https://github.com/your-org/ejercicio2-frontend.git
git push frontend-origin frontend-deploy:main
```

The `frontend/` folder history is now in its own repository.

> **Note:** If your monorepo is not yet version-controlled, initialize it first:
> ```bash
> cd Ejercicio2
> git init
> git add .
> git commit -m "Initial commit"
> ```

## Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
2. Connect your `ejercicio2-frontend` GitHub repo
3. Render will read `render.yaml` and create the Static Site automatically
4. Set the **backend API URL**:
   - In the Render Dashboard, go to the `ejercicio2-frontend` service
   - **Environment** → **Environment Variables**
   - Add `BACKEND_API_URL` with your backend Render URL (e.g., `https://ejercicio2-backend.onrender.com`)
   - This variable is available at build time and gets substituted into `src/assets/env.js`

## How the API URL injection works

1. `env.template.js` contains `window.__env__ = { backendApiUrl: '__BACKEND_API_URL__' }`
2. During build, `sed` replaces `__BACKEND_API_URL__` with the actual env var value and outputs `src/assets/env.js`
3. `index.html` loads `/assets/env.js` before Angular bootstraps
4. `persona.service.ts` reads `window.__env__.backendApiUrl` at runtime

## SPA Routing

Render Static Sites serve `index.html` for all routes by default. No additional configuration needed — deep links like `/personas/nueva` work out of the box.

## Environment Variables

| Variable | Required | Build Time | Description |
|----------|----------|------------|-------------|
| `BACKEND_API_URL` | Yes | Yes | Full URL of the deployed backend (e.g., `https://ejercicio2-backend.onrender.com`) |

## Updating

Push to the `main` branch of the frontend repo — Render auto-builds and deploys.
