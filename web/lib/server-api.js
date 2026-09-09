// Server-side fetch helpers used by Server Components. These hit the Express
// backend directly (not through the /api rewrite) and never cache, so admin
// edits show up immediately.
import { DEFAULT_LOCALE } from "./i18n.js";

const BACKEND = process.env.BACKEND_ORIGIN || "http://localhost:4000";

async function getJSON(path, locale) {
  const url = new URL(`${BACKEND}/api${path}`);
  if (locale) url.searchParams.set("locale", locale);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
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
