// Public URL path → content slug. Mirrors the old react-router route table.
export const PATH_TO_SLUG = {
  "/": "home",
  "/about": "about",
  "/solutions": "solutions",
  "/solutions/cybersecurity": "cybersecurity",
  "/solutions/network-infrastructure": "network-infrastructure",
  "/solutions/software-development": "software-development",
  "/solutions/it-consulting": "it-consulting",
  "/solutions/managed-it": "managed-it",
  "/solutions/training-certifications": "training-certifications",
  "/industries": "industries",
  "/insights": "insights",
  "/contact": "contact",
};

/** Resolve a Next optional-catch-all `slug` param (array | undefined) to a content slug. */
export function slugFromSegments(segments) {
  const path = "/" + (Array.isArray(segments) ? segments.join("/") : "");
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return PATH_TO_SLUG[normalized] || null;
}
