// Server-side fetch helpers used by Server Components. These hit the Express
// backend directly (not through the /api rewrite) and never cache, so admin
// edits show up immediately.
import { DEFAULT_LOCALE } from "./i18n.js";
import {
  getBackendOrigin,
  BackendConfigError,
  BackendUnavailableError,
  BackendHttpError,
} from "./backend.js";

const FETCH_TIMEOUT_MS = 12_000;
const MAX_ATTEMPTS = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJSON(path, locale) {
  let backend;
  try {
    backend = getBackendOrigin();
  } catch (err) {
    if (err instanceof BackendConfigError) throw err;
    throw new BackendConfigError(err.message || "Invalid BACKEND_ORIGIN");
  }

  const url = new URL(`${backend}/api${path}`);
  if (locale) url.searchParams.set("locale", locale);

  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        let message = `Request failed: ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) message = body.error;
        } catch {
          /* ignore non-JSON error bodies */
        }
        throw new BackendHttpError(res.status, message);
      }

      return await res.json();
    } catch (err) {
      // Don't retry client/config mistakes or definitive 4xx (except 408/429).
      if (err instanceof BackendConfigError) throw err;
      if (err instanceof BackendHttpError) {
        if (err.status >= 400 && err.status < 500 && err.status !== 408 && err.status !== 429) {
          throw err;
        }
      }

      lastError = err;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(250 * attempt);
      }
    }
  }

  const reason = lastError?.message || "unknown error";
  console.error(`[server-api] ${path} failed after ${MAX_ATTEMPTS} attempts:`, reason);
  throw new BackendUnavailableError(
    `Could not reach the API at ${backend} (${reason})`,
    lastError
  );
}

export function getSiteMeta(locale = DEFAULT_LOCALE) {
  return getJSON("/content/meta", locale);
}

export function getPage(slug, locale = DEFAULT_LOCALE) {
  return getJSON(`/content/pages/${slug}`, locale);
}

export function getFaqs(locale = DEFAULT_LOCALE) {
  return getJSON("/faqs", locale);
}

export function getPageList() {
  return getJSON("/content/pages");
}

export { BackendConfigError, BackendUnavailableError, BackendHttpError };
