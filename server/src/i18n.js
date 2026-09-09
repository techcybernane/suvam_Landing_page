// Locales the public site is published in. `DEFAULT_LOCALE` is the one served
// at the bare path ("/"); every other locale lives under its own prefix
// ("/fr/..."). Adding a locale here plus a translation map is all it takes.
export const LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS = {
  en: "English",
  fr: "Français",
};

export const isLocale = (value) => LOCALES.includes(value);

export const normalizeLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE);
