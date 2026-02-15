# Deployment

## CI/CD Workflow

Main workflow file: `.github/workflows/deploy.yml`

Trigger:

- Push to `main`

Pipeline steps:

1. Checkout repository
2. Install Bun via `oven-sh/setup-bun@v1`
3. Install dependencies with `bun install`
4. Deploy with `bunx vercel --prod`

## Required GitHub Secrets

The workflow references:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Missing any of these will fail deployment.

## Production Environment Variables

Set these in Vercel project settings:

- `DSU_API_KEY`
- `NEXT_PUBLIC_BASE_URL` (optional for current implementation)

## Pre-Deploy Checklist

1. `bun run lint` passes.
2. `bun run build` passes.
3. `DSU_API_KEY` is configured for target environment.
4. Verification route `/:id` works for valid and invalid IDs.
5. UI still includes anti-fraud trust messaging.
