import { RefreshCw } from "lucide-react";
import { t } from "../../lib/ui-strings.js";
import { localizeHref } from "../../lib/i18n.js";

/**
 * Branded public-facing state when the CMS API cannot be reached.
 * Never mentions localhost/port numbers — those are operator concerns.
 */
export default function SiteUnavailable({ locale, homeHref }) {
  const href = homeHref || localizeHref("/", locale);

  return (
    <div className="grain relative flex min-h-[70vh] flex-col items-center justify-center gap-5 overflow-hidden px-6 py-24 text-center">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[140px]"
        aria-hidden
      />

      <div className="relative flex max-w-md flex-col items-center gap-5">
        <span className="font-mono text-fluid-xs font-semibold uppercase tracking-[0.22em] text-signal">
          {t(locale, "unavailableKicker")}
        </span>
        <h1 className="text-fluid-2xl font-semibold leading-[0.95] tracking-tightest text-bone">
          {t(locale, "unavailableTitle")}
        </h1>
        <p className="text-fluid-base text-bone/55">{t(locale, "unavailableBody")}</p>
        <a href={href} className="btn-primary mt-2">
          <RefreshCw className="h-4 w-4" />
          {t(locale, "unavailableRetry")}
        </a>
      </div>
    </div>
  );
}
