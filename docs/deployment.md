# Deployment

## CI/CD Workflow

Main workflow file: `.github/workflows/deploy.yml`

Trigger:

- Push to `main`

Pipeline steps:

1. Checkout repository
2. Install Bun via `oven-sh/setup-bun@v2` (pinned to `1.2.16`)
3. Install dependencies with `bun install --frozen-lockfile`
4. Run `bun run lint`
5. Run `bun run build`
6. Deploy with `bunx vercel --prod`

Workflow hardening in place:

- `permissions: contents: read`
- `concurrency` enabled to avoid overlapping `main` deployments

## Required GitHub Secrets

The workflow references:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Missing any of these will fail deployment.

## Production Environment Variables

Set these in Vercel project settings:

- `DSU_API_KEY` (required)
- `NEXT_PUBLIC_BASE_URL` (optional for current implementation)

## Security Headers

Configured in `next.config.ts` for all routes:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `poweredByHeader: false`

## Pre-Deploy Checklist

1. `bun run lint` passes.
2. `bun run build` passes.
3. `DSU_API_KEY` is configured for target environment.
4. Verification route `/:id` works for valid and invalid IDs.
5. UI still includes anti-fraud trust messaging.
