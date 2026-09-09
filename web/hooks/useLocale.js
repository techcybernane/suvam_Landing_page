"use client";

import { usePathname } from "next/navigation";
import { localeFromPathname } from "../lib/i18n.js";
import { translator } from "../lib/ui-strings.js";

/** Current locale, read from the URL the visitor is actually on. */
export function useLocale() {
  return localeFromPathname(usePathname());
}

/** `t("key")` for the handful of UI strings that live in code, not the CMS. */
export function useT() {
  return translator(useLocale());
}
