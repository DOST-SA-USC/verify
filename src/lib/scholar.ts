import type { UserType } from '@/type';

const SCHOLAR_ENDPOINT_BASE = 'https://dostsausc.org/api/scholar';
const SCHOLAR_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const CACHE_REVALIDATE_SECONDS = 300;
const REQUEST_TIMEOUT_MS = 5000;

type LookupFailureReason = 'invalid_id' | 'not_found' | 'service_unavailable';

type ScholarLookupResult =
  | {
      kind: 'success';
      data: UserType;
      displayId: string;
    }
  | {
      kind: 'failure';
      reason: LookupFailureReason;
      displayId: string;
    };

const isString = (value: unknown): value is string => typeof value === 'string';

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === 'string';

const toDisplayId = (rawId: string): string => {
  const trimmedId = rawId.trim();
  if (trimmedId.length === 0) {
    return '(empty)';
  }

  return trimmedId.length <= 64 ? trimmedId : `${trimmedId.slice(0, 61)}...`;
};

const normalizeScholarId = (rawId: string): string | null => {
  const trimmedId = rawId.trim();
  if (!SCHOLAR_ID_PATTERN.test(trimmedId)) {
    return null;
  }

  return trimmedId;
};

const isUserType = (value: unknown): value is UserType => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    isString(candidate.uscID) &&
    isString(candidate.firstName) &&
    isString(candidate.middleName) &&
    isString(candidate.lastName) &&
    isOptionalString(candidate.suffix) &&
    isString(candidate.image) &&
    isString(candidate.program) &&
    isString(candidate.yearLevel) &&
    isString(candidate.yearOfAward) &&
    isString(candidate.scholarshipType)
  );
};

const getDsuApiKey = (): string | null => {
  const apiKey = process.env.DSU_API_KEY;
  if (!apiKey) {
    console.error('DSU_API_KEY environment variable is not configured.');
    return null;
  }

  return apiKey;
};

const createFailureResult = (
  reason: LookupFailureReason,
  rawId: string
): ScholarLookupResult => ({
  kind: 'failure',
  reason,
  displayId: toDisplayId(rawId),
});

export async function fetchScholarById(
  rawId: string
): Promise<ScholarLookupResult> {
  const scholarId = normalizeScholarId(rawId);
  if (!scholarId) {
    return createFailureResult('invalid_id', rawId);
  }

  const apiKey = getDsuApiKey();
  if (!apiKey) {
    return createFailureResult('service_unavailable', rawId);
  }

  try {
    const response = await fetch(
      `${SCHOLAR_ENDPOINT_BASE}/${encodeURIComponent(scholarId)}`,
      {
        headers: {
          authorization: `Bearer ${apiKey}`,
        },
        next: {
          revalidate: CACHE_REVALIDATE_SECONDS,
          tags: [`scholar:${scholarId}`],
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );

    if (response.status === 404) {
      return createFailureResult('not_found', scholarId);
    }

    if (!response.ok) {
      console.error(
        `Scholar API request failed with status ${response.status} for id ${scholarId}.`
      );
      return createFailureResult('service_unavailable', scholarId);
    }

    const payload: unknown = await response.json();
    if (!isUserType(payload)) {
      console.error(
        `Scholar API response validation failed for id ${scholarId}.`
      );
      return createFailureResult('service_unavailable', scholarId);
    }

    return {
      kind: 'success',
      data: payload,
      displayId: toDisplayId(scholarId),
    };
  } catch (error) {
    console.error(`Scholar API request failed for id ${scholarId}.`, error);
    return createFailureResult('service_unavailable', scholarId);
  }
}

export type { LookupFailureReason };
