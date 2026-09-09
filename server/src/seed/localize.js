/**
 * Produces a translated copy of a content tree from a flat
 * { "English string": "Chaîne française" } dictionary.
 *
 * Only leaf strings are touched, and only when the dictionary has an entry —
 * anything missing falls through to the source language, so an incomplete
 * dictionary degrades to partially-English rather than to blank pages.
 *
 * Keys holding machine values (ids, links, image URLs) are skipped outright so
 * a stray dictionary entry can never rewrite a route or break an image.
 */
const SKIP_KEYS = new Set([
  "id",
  "type",
  "slug",
  "href",
  "image",
  "ctaHref",
  "primaryHref",
  "secondaryHref",
  "hideOnPaths",
  "tone",
  "imageSide",
  "align",
  "speed",
  "autoplaySeconds",
  "delaySeconds",
  "repeatAfterDays",
]);

// Values that are addresses/numbers rather than prose.
const MACHINE_VALUE = /^(https?:\/\/|\/|#|mailto:|tel:)|^[^\p{L}]*$|^[\w.+-]+@[\w.-]+\.\w+$/u;

/**
 * A handful of English strings need different French depending on where they
 * sit — "Training" is a service chip in one place and half a heading in
 * another. Those are disambiguated with a "<fieldName>:<string>" key, which
 * wins over the plain one.
 */
export function translateString(value, dict, key) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed || MACHINE_VALUE.test(trimmed)) return value;
  if (key && dict[`${key}:${trimmed}`] != null) return dict[`${key}:${trimmed}`];
  return dict[trimmed] ?? value;
}

export function translateTree(node, dict, key) {
  if (typeof node === "string") return key && SKIP_KEYS.has(key) ? node : translateString(node, dict, key);
  if (Array.isArray(node)) return node.map((item) => translateTree(item, dict, key));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = SKIP_KEYS.has(k) ? v : translateTree(v, dict, k);
    }
    return out;
  }
  return node;
}

/** Which translatable strings in a tree have no dictionary entry yet. */
export function missingTranslations(node, dict, out = new Set(), key) {
  if (typeof node === "string") {
    const t = node.trim();
    const qualified = key ? `${key}:${t}` : null;
    if (t && !MACHINE_VALUE.test(t) && !(key && SKIP_KEYS.has(key)) && !(t in dict) && !(qualified && qualified in dict))
      out.add(t);
  } else if (Array.isArray(node)) {
    node.forEach((item) => missingTranslations(item, dict, out, key));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (!SKIP_KEYS.has(k)) missingTranslations(v, dict, out, k);
    }
  }
  return out;
}
