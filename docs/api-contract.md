# API Contract

## Upstream Endpoint

- Method: `GET`
- URL: `https://tracker.dostsausc.org/api/scholar/{id}`
- Consumer files: `src/app/[id]/page.tsx`, `src/lib/scholar.ts`

The app calls this endpoint server-side with:

```http
Authorization: Bearer <DSU_API_KEY>
```

`id` is validated and normalized before request:

- Allowed characters: letters, numbers, `_`, `-`
- Maximum length: 64
- Invalid IDs are rejected without an upstream call

`id` is URL-encoded before interpolation.

## Runtime Guards

- `DSU_API_KEY` must be set, otherwise verification returns `service_unavailable`.
- Upstream request uses timeout: `5000ms`.
- Network and parsing failures are caught and mapped to safe failure responses.
- Upstream JSON is runtime-validated before rendering.

## Response Handling

- `200 OK` + valid payload -> `success`, rendered by `Valid`.
- `404` -> `not_found`, rendered by `Invalid`.
- Invalid route ID input -> `invalid_id`, rendered by `Invalid`.
- Any other non-OK, timeout, config, or payload-shape issue -> `service_unavailable`, rendered by `Invalid`.

## Expected Scholar Payload

Based on `src/type.ts`, the app expects:

```ts
interface UserType {
  uscID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string | undefined;
  image: string;
  program: string;
  yearLevel: string;
  yearOfAward: string;
  scholarshipType: string;
}
```

## Caching Behavior

Next.js request options in `src/lib/scholar.ts`:

- Revalidate interval: `300` seconds
- Tag: `scholar:{id}`

This allows short-term cache reuse while keeping data reasonably fresh.
