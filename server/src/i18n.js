// Locales the public site is published in. `DEFAULT_LOCALE` is the one served
// at the bare path ("/"); every other locale lives under its own prefix
// ("/fr/..."). Adding a locale here plus a translation map is all it takes.
export const LOCALES = ["en", "fr", "ar"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

// Right-to-left locales, so the layout can flip direction.
export const RTL_LOCALES = ["ar"];
export const isRtl = (value) => RTL_LOCALES.includes(value);

export const isLocale = (value) => LOCALES.includes(value);

export const normalizeLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE);
