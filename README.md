<img src="./public/logo.png" alt="logo" width="96">

# DOST SA USC Verify

Scholar verification app for DOST SA USC.

## Stack

- Next.js App Router (`next@16`)
- React (`react@19`)
- TypeScript (`strict: true`)
- Tailwind CSS v4 + shadcn/ui primitives
- Bun for package management and scripts

## Quick Start

```bash
bun install
cp .env.local.example .env.local
bun run dev
```

Local app URL: `http://localhost:3000`

## Environment Variables

- `DSU_API_KEY`: required Bearer token used by scholar lookup in `src/lib/scholar.ts`
- `NEXT_PUBLIC_BASE_URL`: reserved in `.env.local.example` (currently unused in source)

If `DSU_API_KEY` is missing, verification returns a controlled unavailable state.

## Scripts

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run format
bun run format:check
```

## Docs

- `docs/README.md`
- `docs/architecture.md`
- `docs/development.md`
- `docs/api-contract.md`
- `docs/deployment.md`
