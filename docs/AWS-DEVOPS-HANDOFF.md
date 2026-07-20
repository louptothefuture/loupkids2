# LOUP AWS DevOps handoff

Last reviewed: 2026-07-17  
Application: `loupkids.com` marketing site and pre-order funnel  
Current branch: `conversion-trim`  
Current reference deployment: `https://loupkids-v2.vercel.app`

This is the canonical engineering and operations handoff for moving the site from
Vercel to AWS. It describes the repository as it exists today, the recommended
single-server AWS deployment, the security baseline, and the backend risks that
must be resolved before production traffic is cut over.

## 1. Executive status

The application is a Next.js 16 App Router site with a small Node.js backend
implemented as route handlers. It has no local database, no user authentication,
and no background workers. Stripe is the current pre-order checkout. Sanity,
Shopify, GA4, Meta, and an optional contact webhook are external SaaS
integrations.

The repository is now container-portable:

- `next.config.ts` produces Next.js standalone output.
- `Dockerfile` builds a non-root production image.
- `compose.yml` runs the image locally or on one server.
- `.dockerignore` prevents secrets, build output, and raw source assets from
  entering the build context.
- `.env.example` is the environment-variable contract.
- `GET /api/health` is the load-balancer/container health endpoint.
- Baseline HTTP security headers are set in `next.config.ts`.

### Production blockers

1. **Checkout is currently broken on the Vercel deployment.** On 2026-07-16,
   `POST /api/checkout` returned HTTP 500. A pre-order cannot complete until the
   Stripe account/key configuration is corrected and a real test purchase passes.
2. **The Git working tree is not clean.** At review time, Git showed the tracked
   tree staged for deletion while replacement files were untracked. Do not build
   a production release or hand off repository access until the intended files
   are normalized, reviewed, committed, and pushed.
3. **There are no automated tests or CI workflow.** At minimum, CI must run
   install, lint, build, container health, and a non-billing Stripe test-mode
   checkout smoke test.
4. **Public write endpoints have no application-level rate limiting.** WAF rate
   rules are required before launch; the contact route also needs validation and
   abuse protection if the form is re-enabled.

## 2. Technology stack

| Layer | Current implementation |
| --- | --- |
| Framework | Next.js `16.2.10`, App Router, React Server Components |
| Runtime | Node.js; container baseline is Node 22 on Debian Bookworm slim |
| UI | React `19.2.4`, TypeScript 5, Tailwind CSS 4 |
| Animation | Framer Motion |
| Content | Local typed fallback content; optional Sanity CMS and embedded Studio |
| Commerce | Stripe Checkout for current pre-order; legacy Shopify Storefront cart remains |
| Analytics | GA4 browser events and server-side purchase event; Meta browser pixel; Shopify webhook also supports Meta CAPI |
| Image processing | Next.js Image Optimization using `sharp` |
| Package manager | pnpm `10.28.0` |
| Persistence | No application database; Shopify cart IDs/mock carts are stored in cookies |
| Hosting today | Vercel |
| Portable target | OCI/Docker image running Next.js standalone server |

Lockfile policy: `pnpm-lock.yaml` is authoritative. Do not install with npm or
commit a second lockfile.

## 3. Repository map

```text
src/app/                         Next.js routes, layouts, API route handlers
src/app/api/checkout/route.ts    Creates Stripe Checkout sessions
src/app/api/webhooks/stripe/     Verifies Stripe webhooks and sends GA4 purchase
src/app/api/cart/route.ts        Legacy Shopify/mock cart API
src/app/api/webhooks/shopify/    Shopify HMAC verification and conversion events
src/app/api/contact/route.ts     Optional contact webhook forwarder
src/app/api/health/route.ts      Load-balancer/container liveness endpoint
src/app/order/success/           Post-Stripe browser confirmation page
src/app/studio/                  Embedded Sanity Studio
src/lib/stripe.ts                Server-only Stripe client and product definition
src/lib/shopify/                 Shopify GraphQL client, cart queries, mock data
src/lib/content/                 Sanity getters plus local fallback content
src/lib/analytics.ts             Client GA4/Meta funnel events
src/components/Analytics.tsx     Loads GA4 and Meta browser scripts
public/                          Versioned images, videos, press files
Dockerfile                       Multi-stage production image
compose.yml                      One-host runtime reference
.env.example                     Configuration contract
```

The `public/` directory is approximately 101 MB. `public/videos/` is
approximately 12 MB; `cutout-phone.mp4` alone is approximately 5.9 MB. These
assets materially affect image size, deployment time, origin bandwidth, and
first-load performance.

## 4. Current application architecture

```text
Browser
  |
  +-- Next.js pages and optimized images
  +-- GA4 / Meta browser events
  |
  +-- POST /api/checkout ----------> Stripe Checkout API
  |                                     |
  |                                     +--> Stripe-hosted payment page
  |                                     +--> POST /api/webhooks/stripe
  |                                               |
  |                                               +--> GA4 Measurement Protocol
  |
  +-- POST /api/cart --------------> Shopify Storefront GraphQL (legacy)
  |          |
  |          +--> cookie-backed mock when Shopify is not configured
  |
  +-- POST /api/contact -----------> optional external webhook
  |
  +-- content reads ---------------> Sanity CDN, with local fallback
```

There is no database or internal order ledger. Stripe/Shopify are the payment
and order systems of record. Sanity is the CMS system of record only when its
public project configuration is supplied.

## 5. Backend route inventory

### `POST /api/checkout`

Creates a one-time Stripe Checkout session for one Loup Silver at the price in
`src/lib/site.ts`. It collects US/Canadian shipping addresses and phone numbers,
then redirects to `/order/success`.

Current concerns:

- The live Vercel route returned HTTP 500 during the audit; credentials/config
  must still be corrected and a real test purchase must pass.
- The product amount is generated in code rather than using a Stripe Price ID.
  Changing `SITE.price` changes future charges without a Stripe catalog audit
  trail.
- There is no idempotency key. Repeated client requests can create multiple
  unused sessions.

Mitigations already applied in this handoff:

- Checkout redirect URLs now use the canonical `SITE.url` /
  `NEXT_PUBLIC_SITE_URL` only — they no longer trust `Host` /
  `X-Forwarded-Host`.
- Stripe session creation is wrapped in `try/catch` and returns a clean JSON
  500 without leaking SDK details.

### `POST /api/webhooks/stripe`

Verifies `stripe-signature` with `STRIPE_WEBHOOK_SECRET` in production and
handles `checkout.session.completed`. It sends a server-side GA4 `purchase`
event when analytics secrets are configured.

Current concerns:

- It does not persist fulfillment state or notify an operations system.
- It does not send Stripe purchases to Meta CAPI.
- It has no explicit event-id ledger. Stripe can redeliver events.
- Alerting for signature failures and repeated non-2xx responses is absent.

Mitigations already applied in this handoff:

- Production and non-production both require `STRIPE_WEBHOOK_SECRET` and a
  `stripe-signature` header. Unsigned payloads are rejected.
- GA4 analytics failures are isolated so they do not cause Stripe webhook
  retries.

### `GET /api/health`

Returns `200 {"status":"ok"}` with `Cache-Control: no-store`. Use this for the
Docker health check and ALB target-group health check. It intentionally checks
only process liveness; it does not call Stripe, Sanity, or Shopify.

### `POST /api/cart` (legacy)

Implements Shopify Storefront cart get/add/update/remove operations. Without
Shopify variables, it silently switches to a cookie-backed mock cart.

Current concerns:

- The current product page bypasses this cart and uses Stripe Checkout directly.
  This creates two commerce architectures in one codebase.
- Shopify API version `2025-01` is stale and must be upgraded before reuse.
- Request bodies and quantities are not schema-validated.
- Mock mode can activate in production when variables are missing.
- Cart cookies are HTTP-only and SameSite=Lax, but do not explicitly set
  `secure: true` in production.

Decision required: either delete the inactive cart/Shopify path after confirming
it is no longer needed, or make Shopify the single commerce system and remove
the parallel Stripe product path. Do not operate both unintentionally.

### `POST /api/webhooks/shopify` (legacy)

Correctly computes a SHA-256 HMAC using `timingSafeEqual`, accepts only
`orders/paid`, and sends purchase data to GA4 and Meta CAPI with
`Promise.allSettled`.

Current concerns:

- It belongs to the legacy commerce path and may never receive events.
- No webhook-id deduplication is stored.
- Outbound requests have no explicit timeout.

### `POST /api/contact` (currently unused by the live page)

Validates only the presence of name/email/message, then forwards to
`CONTACT_WEBHOOK_URL`. Without that variable it logs the full submission.

Current concerns:

- Logging full submissions places personal data in application logs.
- No rate limit, CAPTCHA/honeypot, length limit, content type check, or robust
  email validation.
- No outbound timeout/retry/dead-letter path.
- `ContactForm` is not currently rendered by a page. Keep the route disabled or
  WAF-restricted until the intake path is deliberately launched.

### `/order/success`

Displays a confirmation whenever a `session_id` query value exists. It does not
retrieve the Stripe session or verify that payment completed. Treat it as a
cosmetic page, never as evidence of an order.

### `/studio`

Loads Sanity Studio when a project ID is supplied. Sanity handles editor
authentication, but exposing the editor on the same public application
increases attack surface. Prefer Sanity's hosted Studio or restrict `/studio*`
with WAF/IP/identity-aware access.

## 6. Environment-variable contract

The source of truth is `.env.example`. Values fall into two classes.

### Build-time public values

Next.js embeds `NEXT_PUBLIC_*` values into client bundles during `next build`.
They are not secrets and changing them requires a new image.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URLs, metadata, Stripe product image URL |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional | Enables Sanity content and Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Optional | Sanity dataset; defaults to `production` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional | Browser GA4 and server event routing |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Browser Meta Pixel and Shopify CAPI routing |

### Runtime secrets

Inject these only when the container starts. Store them in AWS Secrets Manager
or encrypted SSM Parameter Store. Never pass them as Docker build arguments.

| Variable | Required | Purpose |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Required for sales | Creates Stripe Checkout sessions |
| `STRIPE_WEBHOOK_SECRET` | Required for sales | Verifies Stripe webhook signatures |
| `GA4_API_SECRET` | Optional | Server-side GA4 purchases |
| `META_CAPI_ACCESS_TOKEN` | Optional | Meta CAPI for Shopify purchases |
| `CONTACT_WEBHOOK_URL` | Optional | Contact intake destination |
| `SHOPIFY_STORE_DOMAIN` | Legacy | Shopify Storefront API host |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Legacy | Shopify Storefront API token |
| `SHOPIFY_WEBHOOK_SECRET` | Legacy | Shopify webhook HMAC secret |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Scale-out | Stable shared key for multiple instances |

`NODE_ENV=production`, `HOSTNAME=0.0.0.0`, and `PORT=3000` are set in the
container.

### Secret handling

- Create separate test/staging/production Stripe keys and webhook secrets.
- Restrict IAM access to the application instance role and named operators.
- Enable Secrets Manager rotation where supported; otherwise maintain a
  documented 90-day manual rotation.
- Never print environment values in CI logs.
- Search Git history for leaked secrets before granting broader repository
  access. Rotate any secret that has ever been committed or pasted into logs.

## 7. Build and container operation

### Local application

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm start
```

### Portable container

```bash
cp .env.example .env.local
# Populate local/test values only.
docker compose build
docker compose up -d
curl --fail http://127.0.0.1:3000/api/health
```

The Compose port is bound to loopback deliberately. In AWS, the container may
bind to the instance interface, but the security group must allow port 3000 only
from the ALB security group.

### Direct image build

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://loupkids.com \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=PROJECT_ID \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  -t loupkids:COMMIT_SHA .
docker run --rm -p 127.0.0.1:3000:3000 --env-file .env.local loupkids:COMMIT_SHA
```

The runtime image executes as UID/GID 1001 and includes only Next.js standalone
output, static assets, and `public/`.

## 8. Recommended AWS architecture

For the requested dedicated server, start with a single Dockerized EC2 instance.
Do not purchase an EC2 Dedicated Host unless physical-host tenancy is a legal,
compliance, or licensing requirement; a Dedicated Host adds cost and operations
without improving application portability.

```text
Route 53
   |
CloudFront + AWS WAF
   |
Application Load Balancer (ACM TLS certificate)
   |
private EC2 instance + Docker (no public inbound traffic, no SSH)
   |
ECR image / Secrets Manager / CloudWatch Logs
```

Recommended initial compute baseline:

- One x86_64 Linux EC2 instance with 2 vCPU and 4 GB RAM.
- Encrypted gp3 root volume, at least 30 GB.
- AWS Systems Manager Session Manager/Run Command instead of SSH.
- Automatic OS security patching through SSM Patch Manager.
- Daily EBS snapshots only as recovery convenience; the image and Git repository
  remain the deployment sources of truth.

Load test before choosing the final instance class. Next.js image optimization
is CPU-intensive and the repository serves large media.

### Network controls

- Put the ALB in public subnets and the EC2 instance in a private subnet.
- ALB security group: inbound 443 from the internet; optional 80 only to redirect
  to 443.
- EC2 security group: inbound 3000 only from the ALB security group.
- No inbound port 22. Use SSM.
- Restrict egress where practical, but allow HTTPS to Stripe, Sanity, Shopify,
  Google Analytics, Meta, ECR, CloudWatch, Secrets Manager, and SSM endpoints.
- Use VPC endpoints for AWS services or a controlled NAT path.

### TLS and DNS

- Issue an ACM certificate for `loupkids.com` and `www.loupkids.com`.
- Redirect HTTP to HTTPS and choose one canonical hostname.
- Keep HSTS enabled only after HTTPS is verified on every included subdomain.
- Lower DNS TTL before cutover, then restore it after validation.

### WAF

Attach WAF at CloudFront. Enable AWS managed common, known-bad-inputs,
Amazon-IP-reputation, and anonymous-IP rules in count mode first, then block
after reviewing logs.

Add explicit rate rules for:

- `/api/checkout`
- `/api/contact`
- `/api/cart`

Do not challenge or rate-limit Stripe/Shopify webhook paths using generic browser
rules. Restrict them through signature verification and targeted limits that
allow provider retry bursts.

## 9. CDN, media, and Next.js caching

For the first cutover, keep `public/` inside the image. This is the most portable
option and avoids rewriting asset URLs during migration. Configure CloudFront to:

- Cache `/_next/static/*` immutably.
- Cache versioned public images/videos with a long TTL.
- Forward dynamic pages and `/api/*` without caching.
- Respect Next.js cache-control headers.
- Never cache checkout, success, Studio, or webhook responses.

The Next.js image optimizer writes cache data locally. A single persistent EC2
instance works, but a fresh container starts cold and can make first image loads
slow. Monitor CPU and `/_next/image` latency.

Before adding a second application instance:

1. Set one shared `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.
2. Implement and test a distributed Next.js cache handler.
3. Disable per-instance in-memory cache as required by the chosen handler.
4. Verify ISR/revalidation behavior across both instances.

Do not put multiple instances behind the ALB with independent caches and assume
content invalidation is coordinated.

Phase-two media optimization may move large videos to S3/CloudFront, but that is
not required for the first portable release. Compress
`public/videos/cutout-phone.mp4` before launch; it was approximately 94% of the
homepage transfer in the live audit.

## 10. CI/CD design

Use GitHub Actions with AWS OIDC. Do not create long-lived AWS access keys in
GitHub.

Required pipeline:

1. Trigger on a reviewed merge to the production branch.
2. `pnpm install --frozen-lockfile`.
3. `pnpm lint`.
4. `pnpm build`.
5. Build the Docker image with production public build arguments.
6. Start the image and require `/api/health` to return 200.
7. Scan dependencies and the image for critical/high vulnerabilities.
8. Tag the image with the immutable Git commit SHA; push to private ECR.
9. Assume a tightly scoped deploy role through GitHub OIDC.
10. Deploy through SSM Run Command or an instance deployment service; do not SSH.
11. Pull the immutable image, inject runtime secrets, start the new container,
    and wait for health.
12. Run synthetic homepage, PDP, asset, and Stripe test-mode checkout checks.
13. Shift traffic only after checks pass.
14. Retain the prior image tag for immediate rollback.

Protect the production GitHub Environment with required approval. Restrict the
AWS OIDC trust policy by repository, branch/environment, and audience.

No CI workflow is committed yet because AWS account IDs, regions, ECR repository,
instance selection, and IAM role names must be chosen by the DevOps engineer.

## 11. Security baseline

### Already present

- Stripe production webhooks require a signing secret.
- Shopify webhooks use HMAC and timing-safe comparison.
- The production image runs as a non-root user.
- Compose drops Linux capabilities and prevents privilege escalation.
- Environment files and PEM files are Git-ignored and Docker-ignored.
- Baseline HSTS, frame denial, MIME sniffing protection, referrer policy, and
  permissions policy headers are configured.
- Checkout is hosted by Stripe; card data does not enter this application.

### Required before production

- Resolve and test Stripe checkout end-to-end.
- Add WAF rate rules and alarms.
- Add structured server logging with request IDs and secret/PII redaction.
- Add error tracking (for example, Sentry or OpenTelemetry collector).
- Add a Content Security Policy in report-only mode, observe violations from
  Next.js, Stripe, Sanity, GA4, and Meta, then enforce it.
- Decide whether `/studio` is public, restricted, or removed from this runtime.
- Remove or hard-disable mock commerce in production.
- Add request schemas and body-size limits to all write routes.
- Add explicit outbound request timeouts.
- Verify dependencies and container images continuously.
- Enable CloudTrail, GuardDuty, AWS Config, ECR scan-on-push, encrypted EBS, ALB
  access logs, WAF logs, and Secrets Manager audit trails.

## 12. Observability and alerts

Send container stdout/stderr to CloudWatch Logs. Use JSON logs in production and
redact request bodies, cookies, authorization values, Stripe signatures, and
personal data.

Minimum dashboards/alarms:

- ALB 5xx rate and target 5xx rate.
- ALB p95/p99 latency.
- Unhealthy target count.
- EC2 CPU, memory, disk space, and status checks.
- Container restart count.
- `/api/checkout` error rate and latency.
- Stripe webhook non-2xx count and age of last successful event.
- WAF blocked/challenged request rate.
- CloudFront origin error rate and cache-hit ratio.
- Synthetic journey: homepage → `/shop/loup` → create Stripe test session.

The checkout synthetic check must use Stripe test mode and must not create a
charge in production.

## 13. Backup and disaster recovery

There is no local application database to back up.

Back up and retain:

- Git repository and protected production tags.
- Immutable ECR images with lifecycle rules.
- IaC once the DevOps engineer creates it.
- Secrets Manager values and documented rotation ownership.
- Sanity dataset exports if Sanity becomes an editorial system of record.
- Shopify/Stripe exports according to business retention requirements.
- CloudWatch, ALB, CloudFront, WAF, and CloudTrail logs according to policy.

Recovery target for a single-instance launch:

1. Provision replacement infrastructure from IaC.
2. Pull the last known-good ECR image.
3. Inject current secrets.
4. Pass health and synthetic checkout tests.
5. Update the ALB target/DNS.

The EC2 filesystem must not contain unique business data.

## 14. Deployment and rollback runbook

### Deploy

1. Confirm the release commit is clean, reviewed, and tagged.
2. Confirm CI install/lint/build/container checks pass.
3. Confirm the new image scan has no unapproved critical findings.
4. Pull the SHA-tagged image.
5. Start it on a temporary local port with production runtime secrets.
6. Check `/api/health`, homepage, PDP, images, and API behavior.
7. Register/switch the healthy target.
8. Run a Stripe test-mode checkout and verify the webhook.
9. Watch errors, latency, and WAF for at least 15 minutes.

### Roll back

1. Re-register/restart the previous SHA-tagged image.
2. Confirm `/api/health`.
3. Run homepage/PDP/checkout smoke checks.
4. Record the failed release and preserve logs.
5. Do not rebuild an old commit; deploy the previously tested immutable image.

### Checkout incident

1. Verify `POST /api/checkout` status and application logs.
2. Check Stripe API status and the restricted/live key environment.
3. Verify domain, account mode, and webhook endpoint mode match.
4. If checkout remains unavailable, stop paid campaigns and display an honest
   temporary unavailable state rather than leaving a looping redirect button.
5. Never log the Stripe secret or full webhook payload.

## 15. Backend review: work completed and current quality

### Implemented successfully

- A server-only Stripe client and one-product Checkout session flow.
- A signed Stripe webhook and GA4 purchase reporting path.
- A signed Shopify orders webhook with GA4 and Meta conversion reporting.
- A Shopify Storefront API abstraction with mock fallback.
- Cookie-based cart persistence without an application database.
- Sanity content getters with typed local fallbacks and five-minute revalidation.
- Browser funnel tracking for view item, add to cart, begin checkout, and leads.
- Metadata, canonical URLs, structured data, sitemap/robots, and order success
  route.
- Container portability, health endpoint, environment contract, and baseline
  security headers added as part of this handoff.

### Incomplete or contradictory

- Stripe is the active checkout while Shopify cart code remains mounted globally.
- README architecture previously described Shopify as the sole commerce system;
  the current product page actually uses Stripe.
- Stripe purchase reporting sends GA4 but not Meta CAPI; Shopify sends both.
- The success page does not verify payment.
- Contact backend exists but the live site uses direct email and does not render
  the form.
- No internal fulfillment pipeline, order database, email service, or customer
  account backend exists.
- No automated tests, health/dependency readiness checks, CI/CD, structured
  logging, tracing, or application error reporting existed before this handoff.

### Risk rating

| Severity | Finding | Required action |
| --- | --- | --- |
| P0 | Live Stripe checkout returns 500 | Fix credentials/config and pass real test |
| P0 | Repository/index is not in a clean releasable state | Normalize, review, commit, and push intended tree |
| P1 | No CI/tests for revenue path | Add build and Stripe test-mode smoke coverage |
| P1 | Two commerce systems coexist | Select one authoritative commerce path |
| P1 | Public write APIs lack rate limits/schema validation | Add WAF limits and application validation |
| P1 | Success page does not verify paid session | Retrieve/verify Stripe session server-side |
| P1 | No structured monitoring/alerting | Add logs, error tracking, metrics, synthetics |
| P1 | Contact fallback logs personal data | Remove PII logging; use secure delivery/failure handling |
| P2 | No enforced CSP | Roll out report-only, then enforce |
| P2 | Public embedded Studio expands surface | Restrict, separate, or remove |
| P2 | Shopify API version is stale | Upgrade if Shopify path is retained |
| P2 | Large media and cold image optimization | Compress video, cache, and monitor optimizer |

Resolved during this handoff (still verify in CI before cutover):

- Stripe webhook now requires both secret and signature (no unsigned fallback).
- Checkout redirects use the canonical site URL only.
- Checkout returns clean JSON on Stripe SDK failures.
- Health endpoint, Docker standalone packaging, `.env.example`, and baseline
  security headers are in the repository.

## 16. Production acceptance checklist

- [ ] Git working tree is clean and the intended release is pushed.
- [ ] One commerce architecture is explicitly designated.
- [ ] Stripe test and live account configurations are separated.
- [ ] Test-mode checkout creates a session, redirects, completes, and triggers a
      verified webhook.
- [ ] Live-mode low-value/order test is approved and reconciled in Stripe.
- [ ] Build-time public variables are present in the image.
- [ ] Runtime secrets come from Secrets Manager/SSM, not image layers.
- [ ] Docker image runs non-root and passes `/api/health`.
- [ ] Route 53, ACM, CloudFront, ALB, WAF, and security groups are reviewed.
- [ ] Instance has no public SSH and is managed through SSM.
- [ ] CloudWatch, ALB, CloudFront, WAF, and CloudTrail logs are retained.
- [ ] Alerts and synthetic checkout monitoring are active.
- [ ] WAF rate rules are active for public write endpoints.
- [ ] `/studio` access policy is decided and enforced.
- [ ] CSP report-only telemetry is reviewed.
- [ ] Rollback to the prior image has been rehearsed.
- [ ] DNS cutover and rollback owners are named.

## 17. Decisions the DevOps engineer needs from the owner

1. Is “dedicated server” a preference for one EC2 instance, or a requirement for
   dedicated physical tenancy?
2. Which AWS account, region, production domain, and recovery objectives apply?
3. Is Stripe the permanent commerce system, or should Shopify own checkout?
4. Should Sanity Studio remain available at `/studio`?
5. What are the log, order, analytics, and personal-data retention policies?
6. Who owns Stripe, DNS, AWS billing, incident response, and secret rotation?
7. What monthly infrastructure budget and traffic/ad-spend peak should be sized?

Do not cut DNS or paid traffic to AWS until the P0 items and production
acceptance checklist are complete.
