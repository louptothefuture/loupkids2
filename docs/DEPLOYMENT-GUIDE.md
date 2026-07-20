# Deployment Guide

## Source of truth

**GitHub repository:** https://github.com/louptothefuture/loupkids2  
**Production branch:** `v2`

All production deployments must come from a push or merge to `v2`. Do not rely on local `vercel deploy` for production.

## Deployment flow

```
Edit code locally → commit → push to v2 → Vercel builds → live site updates
```

Content-only changes skip GitHub:

```
Edit in Sanity Studio → Publish → webhook revalidates cache → live site updates
```

## Vercel project

- **Project name:** loupkids-v2
- **Production URL:** https://loupkids-v2.vercel.app
- **Framework:** Next.js (App Router)
- **Build command:** `pnpm build` (or `next build`)
- **Output:** standalone (Docker-compatible)

Connect the Vercel project to `louptothefuture/loupkids2` with production branch `v2`.

## AWS / Docker (optional)

The repo includes a `Dockerfile` and `compose.yml` for self-hosted or AWS deployment:

```bash
docker compose up --build
```

Health check: `GET /api/health`

Pass public build args (`NEXT_PUBLIC_*`) at build time. Inject secrets at runtime via AWS Secrets Manager or SSM — never bake secrets into the image.

## Environment variables

Copy `.env.example` and fill values in Vercel → Project → Settings → Environment Variables.

Required for CMS:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_REVALIDATE_SECRET` (for instant publish refresh)

Required for checkout:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

See `.env.example` for the full list (names only — never commit values).

## Rollback

### Code rollback

1. Open Vercel → Deployments.
2. Find the last good deployment from `v2`.
3. Click **Promote to Production**.

Or revert the Git commit on `v2` and push — Vercel will redeploy automatically.

### Content rollback

1. Open Sanity Studio → document history.
2. Restore the previous published version.

## Health checks

After deploy, verify:

- `GET /api/health` returns `{ "ok": true }`
- Homepage hero loads with expected copy
- `/about`, `/faq`, `/setup`, `/studio` respond
- `/shop/loup` checkout button works

## Sanity webhook (instant content refresh)

In Sanity → API → Webhooks, create a webhook:

- **URL:** `https://loupkids.com/api/revalidate` (or your production domain)
- **Method:** POST
- **Headers:** `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
- **Trigger:** Create, update, delete on all document types

The site also revalidates every 5 minutes as a fallback.
