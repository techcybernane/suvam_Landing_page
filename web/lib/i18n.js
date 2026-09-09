// Mirrors server/src/i18n.js. The default locale is served at the bare path
// ("/about"); every other locale sits under its own prefix ("/fr/about").
// Flipping which language is default is a one-line change here plus the same
// change on the server.
export const LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS = { en: "EN", fr: "FR" };
export const LOCALE_NAMES = { en: "English", fr: "Français" };

export const isLocale = (value) => LOCALES.includes(value);
export const normalizeLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE);

/** Reads the locale out of a public pathname ("/fr/about" → "fr"). */
export function localeFromPathname(pathname = "/") {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Strips the locale prefix, leaving the shared route ("/fr/about" → "/about"). */
export function stripLocale(pathname = "/") {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return "/" + segments.join("/");
}

/**
 * Prefixes an internal route for a locale. The default locale keeps clean,
 * unprefixed URLs so nothing that is already indexed or linked breaks.
 */
export function localizeHref(href, locale) {
  if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return href;
  const bare = stripLocale(href) || "/";
  if (normalizeLocale(locale) === DEFAULT_LOCALE) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}
