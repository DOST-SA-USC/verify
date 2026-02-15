# API Contract

## Upstream Endpoint

- Method: `GET`
- URL: `https://tracker.dostsausc.org/api/scholar/{id}`
- Consumer file: `src/app/[id]/page.tsx`

The app calls this endpoint server-side with:

```http
Authorization: Bearer <DSU_API_KEY>
```

`id` is URL-encoded before interpolation.

## Response Handling

- If `response.ok === true`, the body is parsed as JSON and rendered with `Valid`.
- For any non-OK response, the app renders `Invalid` and shows the queried ID.

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

Next.js request options in `src/app/[id]/page.tsx`:

- Revalidate interval: `300` seconds
- Tag: `scholar:{id}`

This allows short-term cache reuse while keeping data reasonably fresh.
