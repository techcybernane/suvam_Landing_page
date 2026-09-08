// Server-side fetch helpers used by Server Components. These hit the Express
// backend directly (not through the /api rewrite) and never cache, so admin
// edits show up immediately.
const BACKEND = process.env.BACKEND_ORIGIN || "http://localhost:4000";

async function getJSON(path) {
  const res = await fetch(`${BACKEND}/api${path}`, { cache: "no-store" });
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function getSiteMeta() {
  return getJSON("/content/meta");
}

export function getPage(slug) {
  return getJSON(`/content/pages/${slug}`);
}

export function getFaqs() {
  return getJSON("/faqs");
}

export function getPageList() {
  return getJSON("/content/pages");
}
