# Access Handoff

## GitHub

| Item | Value |
|------|-------|
| Repository | https://github.com/louptothefuture/loupkids2 |
| Production branch | `v2` |
| Backup branch (local snapshot) | `backup/thomas-local-20260720-1410` |

### Invite collaborator

Thomas must invite **returnofhe@gmail.com** manually:

1. Go to https://github.com/louptothefuture/loupkids2/settings/access
2. Click **Add people**
3. Enter the GitHub username linked to `returnofhe@gmail.com` (email alone may not work)
4. Role: **Write** (or **Maintain** for deployment settings)

## Vercel

| Item | Value |
|------|-------|
| Project ID | `prj_dhgSIJjA7MXQTUGOvf3BlJAdo2zl` |
| Team ID | `team_zrFtaQyEACk0TvIPc1S2tLHh` |
| Production URL | https://loupkids-v2.vercel.app |
| Dashboard | https://vercel.com/loup1/loupkids-v2 |

### Invite collaborator

1. Open Vercel → Team Settings → Members
2. Invite **returnofhe@gmail.com**
3. Grant access to the **loupkids-v2** project

Confirm **Production Branch** = `v2` under Project → Settings → Git.

## Sanity

Sanity project must be created or connected before CMS editing works.

### If no project exists yet

1. Run `pnpm dlx sanity@latest init --env` in this repo (or create at sanity.io/manage).
2. Copy the project ID into Vercel env: `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Set dataset: `NEXT_PUBLIC_SANITY_DATASET=production`
4. Create an API token with **Editor** permissions → store as `SANITY_API_WRITE_TOKEN` (local/CI only, not in browser).
5. Create a read token if using draft/private datasets → `SANITY_API_READ_TOKEN`
6. Seed live content: `pnpm seed:sanity`
7. Studio URL: `https://loupkids.com/studio`

### Invite collaborator

1. Open https://sanity.io/manage → LOUP project → Members
2. Invite **returnofhe@gmail.com** with **Editor** role

### Webhook secret

Generate a random string for `SANITY_REVALIDATE_SECRET` in Vercel. Use the same value in the Sanity webhook Authorization header.

## Environment variables checklist

Set these in Vercel (Production + Preview):

| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Required |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Missing locally — set in Vercel** |
| `NEXT_PUBLIC_SANITY_DATASET` | Required (`production`) |
| `SANITY_REVALIDATE_SECRET` | Required for instant publish |
| `STRIPE_SECRET_KEY` | Required for checkout |
| `STRIPE_WEBHOOK_SECRET` | Required for order events |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional |
| `SHOPIFY_STORE_DOMAIN` | Optional (legacy cart) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Optional (legacy cart) |

Never commit `.env.local`, tokens, or private keys to GitHub.
