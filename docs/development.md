# Development Guide

## Prerequisites

- Bun (required package manager and script runner)
- Node-compatible environment for Next.js 16

## Setup

```bash
bun install
cp .env.local.example .env.local
```

Populate `.env.local`:

| Variable | Required | Description |
| --- | --- | --- |
| `DSU_API_KEY` | yes | Bearer token for `tracker.dostsausc.org` scholar endpoint |
| `NEXT_PUBLIC_BASE_URL` | no (current code) | Present in env example; currently unused in source |

## Run

```bash
bun run dev
```

Default local URL: `http://localhost:3000`

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| Dev server | `bun run dev` | Start Next.js with Turbopack |
| Build | `bun run build` | Production build |
| Start | `bun run start` | Serve built output |
| Lint | `bun run lint` | ESLint checks |
| Format | `bun run format` | Prettier write |
| Format check | `bun run format:check` | Prettier validation |

## Project Layout

| Path | Role |
| --- | --- |
| `src/app` | App Router routes and route-level UI |
| `src/components/ui` | Reusable UI primitives |
| `src/components/loading.tsx` | Shared loading view |
| `src/lib` | Utility and formatting helpers |
| `src/styles/globals.css` | Global Tailwind and design tokens |
| `.github/workflows/deploy.yml` | Main deployment pipeline |

## Verification Checklist Before PR

1. Run `bun run lint`.
2. Run `bun run build`.
3. Confirm `/:id` handles valid and invalid IDs.
4. Confirm no secrets are hardcoded.
5. Confirm environment changes are reflected in `.env.local.example`.

## Current Gaps

- No automated tests are present yet.
- `NEXT_PUBLIC_BASE_URL` is declared but not used in current source files.
- `components.json` points to `src/globals.css`, but the stylesheet lives at `src/styles/globals.css`.
