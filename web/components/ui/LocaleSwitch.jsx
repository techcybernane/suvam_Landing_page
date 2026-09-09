"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, localeFromPathname, localizeHref } from "../../lib/i18n.js";
import { t } from "../../lib/ui-strings.js";

/**
 * Public language toggle. Each option is a real <Link> to the same page in the
 * other language, so it is crawlable, middle-clickable and works without JS —
 * rather than a button that swaps strings client-side.
 */
export default function LocaleSwitch({ className = "", tone = "dark" }) {
  const pathname = usePathname();
  const active = localeFromPathname(pathname);
  const light = tone === "light";

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-pill border p-0.5 ${
        light ? "border-void/15 bg-void/[0.04]" : "border-white/15 bg-white/[0.04]"
      } ${className}`}
      role="group"
      aria-label={t(active, "switchLanguage")}
    >
      <Globe className={`ml-2 mr-0.5 h-3.5 w-3.5 ${light ? "text-void/40" : "text-bone/40"}`} aria-hidden />
      {LOCALES.map((locale) => {
        const on = locale === active;
        return (
          <Link
            key={locale}
            href={localizeHref(pathname, locale)}
            hrefLang={locale}
            aria-current={on ? "true" : undefined}
            title={LOCALE_NAMES[locale]}
            className={`rounded-pill px-2.5 py-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-editorial ${
              on
                ? light
                  ? "bg-void text-bone"
                  : "bg-signal text-void"
                : light
                  ? "text-void/45 hover:text-void"
                  : "text-bone/45 hover:text-bone"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
