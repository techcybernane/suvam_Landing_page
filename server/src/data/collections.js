import { Collection, readJSON, writeJSON } from "../utils/jsonStore.js";
import { defaultContent, defaultFaqs, defaultSettings } from "../seed/defaults.js";
import { translateTree } from "../seed/localize.js";
import { LOCALES, DEFAULT_LOCALE, normalizeLocale } from "../i18n.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Read rather than `import ... with { type: "json" }`: import attributes are
// not stable on the Node 20 line this project runs on.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readDictionary = (locale) => {
  const file = path.join(__dirname, "..", "seed", `translations.${locale}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf-8")) : null;
};

// Array-backed collections. Each is a thin wrapper over a JSON file on disk.
export const users = new Collection("users", () => []);
export const faqs = new Collection("faqs", () => defaultFaqs);
export const media = new Collection("media", () => []);
export const leads = new Collection("leads", () => []);

const DICTIONARIES = { fr: readDictionary("fr") };

/** The English source tree translated into `locale`, used to seed a new language. */
function buildLocale(locale, source = defaultContent) {
  const dict = DICTIONARIES[locale];
  return dict ? translateTree(source, dict) : structuredClone(source);
}

function buildDefaultStore() {
  const locales = {};
  for (const locale of LOCALES) {
    locales[locale] = locale === DEFAULT_LOCALE ? defaultContent : buildLocale(locale);
  }
  return { locales };
}

/**
 * Reads the content store, upgrading older files in place:
 *  - a pre-i18n file (brand/nav/pages at the top level) becomes the default
 *    locale, with the other locales generated from the translation maps;
 *  - a locale added to LOCALES later is generated on first read.
 * Migrating on read means existing installs pick this up without a manual step.
 */
function readStore() {
  const raw = readJSON("content", buildDefaultStore());
  let store = raw;
  let dirty = false;

  if (!raw.locales) {
    store = { locales: { [DEFAULT_LOCALE]: raw } };
    dirty = true;
  }

  for (const locale of LOCALES) {
    if (!store.locales[locale]) {
      store.locales[locale] = buildLocale(locale, store.locales[DEFAULT_LOCALE]);
      dirty = true;
    }
  }

  if (dirty) writeJSON("content", store);
  return store;
}

/** One locale's content tree — same shape the site has always consumed. */
export function getContent(locale = DEFAULT_LOCALE) {
  const store = readStore();
  const key = normalizeLocale(locale);
  return store.locales[key] || store.locales[DEFAULT_LOCALE];
}

export function saveContent(next, locale = DEFAULT_LOCALE) {
  const store = readStore();
  store.locales[normalizeLocale(locale)] = next;
  writeJSON("content", store);
  return next;
}

/**
 * Auto-response templates used to be a single flat object. Anything written
 * before i18n is folded under the default locale on read, and any locale added
 * later is seeded from the defaults, so existing installs need no manual step.
 */
export function getSettings() {
  const raw = readJSON("settings", defaultSettings);
  const ar = raw.autoResponse || {};
  const isKeyed = LOCALES.some((l) => ar[l] && typeof ar[l] === "object");

  const autoResponse = isKeyed ? { ...ar } : { [DEFAULT_LOCALE]: ar };
  let dirty = !isKeyed;
  for (const locale of LOCALES) {
    if (!autoResponse[locale]) {
      autoResponse[locale] = { ...defaultSettings.autoResponse[locale] };
      dirty = true;
    }
  }

  const next = { ...raw, autoResponse };
  if (dirty) writeJSON("settings", next);
  return next;
}

/** One locale's auto-response template, falling back to the default language. */
export function getAutoResponse(locale = DEFAULT_LOCALE) {
  const { autoResponse } = getSettings();
  return autoResponse[normalizeLocale(locale)] || autoResponse[DEFAULT_LOCALE] || {};
}

export function saveSettings(next) {
  return writeJSON("settings", next);
}
