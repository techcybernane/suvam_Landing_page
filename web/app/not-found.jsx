import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { normalizeLocale, localizeHref } from "../lib/i18n.js";
import { t } from "../lib/ui-strings.js";

export default async function NotFound() {
  // Set by middleware. A 404 outside the public site (or a static render)
  // falls back to the default locale.
  const locale = normalizeLocale((await headers()).get("x-locale"));

  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden bg-void px-6 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[140px]" aria-hidden />

      <div className="relative flex flex-col items-center gap-5">
        <span className="font-mono text-fluid-xs font-semibold uppercase tracking-[0.22em] text-signal">404</span>
        <h1 className="text-fluid-3xl font-semibold leading-[0.95] tracking-tightest text-bone">
          {t(locale, "notFoundTitle")}
        </h1>
        <p className="max-w-sm text-fluid-base text-bone/55">{t(locale, "notFoundBody")}</p>
        <Link href={localizeHref("/", locale)} className="btn-primary mt-2">
          <ArrowLeft className="h-4 w-4" />
          {t(locale, "notFoundCta")}
        </Link>
      </div>
    </div>
  );
}
