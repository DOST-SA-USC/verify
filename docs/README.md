# Documentation

This folder contains project docs generated from the current codebase state.

## Contents

- `architecture.md`: runtime model, routes, and component boundaries
- `development.md`: local setup, environment variables, and developer workflow
- `api-contract.md`: upstream scholar API contract used by the app
- `deployment.md`: CI/CD workflow and production deployment requirements

## Quick Links

- App entry route: `src/app/page.tsx`
- Verification route: `src/app/[id]/page.tsx`
- Verification service: `src/lib/scholar.ts`
- Global styles: `src/styles/globals.css`
- Security headers: `next.config.ts`
- Deploy workflow: `.github/workflows/deploy.yml`
