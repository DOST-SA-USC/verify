# Architecture

## Runtime Overview

The application is a Next.js App Router project that renders a verification UI for DOST SA USC scholars.

- Primary rendering is server-side (route components in `src/app`)
- UI primitives are reusable components in `src/components/ui`
- Verification lookups are centralized in `src/lib/scholar.ts`
- Scholar data is fetched server-side from `tracker.dostsausc.org`
- Vercel Analytics is enabled in the root layout

## Route Map

| Route          | File                    | Purpose                        |
| -------------- | ----------------------- | ------------------------------ |
| `/`            | `src/app/page.tsx`      | Landing page with trust notice |
| `/:id`         | `src/app/[id]/page.tsx` | Scholar verification flow      |
| loading states | `src/app/loading.tsx`   | Global route loading UI        |
| 404 page       | `src/app/not-found.tsx` | Custom not-found screen        |

## Verification Flow

1. Request arrives at `/:id`.
2. `src/app/[id]/page.tsx` extracts `id` from route params.
3. `src/lib/scholar.ts` validates the ID (`[A-Za-z0-9_-]`, max 64 chars).
4. Server validates `DSU_API_KEY` before attempting network calls.
5. Server performs `fetch("https://tracker.dostsausc.org/api/scholar/{id}")`.
6. Request includes `Authorization: Bearer ${process.env.DSU_API_KEY}`.
7. Next.js caching is configured with:
   - `revalidate: 300` seconds
   - cache tag: `scholar:{id}`
8. Network calls use a timeout (`5000ms`) and `try/catch` handling.
9. API JSON payload is runtime-validated against the expected shape.
10. On success, app renders `Valid` UI (`src/app/[id]/valid.tsx`).
11. On failure, app renders `Invalid` UI with reason-specific messaging.

## Data Model

User payload shape is defined by `UserType` in `src/type.ts`:

- `uscID`
- `firstName`
- `middleName`
- `lastName`
- `suffix`
- `image`
- `program`
- `yearLevel`
- `yearOfAward`
- `scholarshipType`

## UI and Styling

- Theme tokens and global styles are defined in `src/styles/globals.css`.
- Layout wrapper and metadata are defined in `src/app/layout.tsx`.
- Utility function `cn` (class merging) is in `src/lib/utils.ts`.
- Name formatting helpers are in `src/lib/helpers.ts`.

## Boundaries and Trust

- The API key is only used in a server route, not in client components.
- `id` is encoded with `encodeURIComponent` before remote request construction.
- Invalid IDs are rejected before upstream requests.
- Failed/missing config and upstream errors degrade safely to non-500 UI states.
- The interface explicitly warns users to trust only `verify.dostsausc.org`.
