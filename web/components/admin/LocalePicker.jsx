"use client";

import { Languages } from "lucide-react";
import { LOCALES, LOCALE_NAMES } from "../../lib/i18n.js";

/**
 * Which language's content the admin screen is editing. Each locale holds an
 * independent copy of the content tree, so switching here changes what loads
 * and what a save writes to.
 */
export default function LocalePicker({ value, onChange, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Languages className="h-4 w-4 text-ink-soft" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Editing</span>
      <div className="inline-flex overflow-hidden rounded-lg border border-line">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => onChange(locale)}
            aria-pressed={value === locale}
            className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
              value === locale ? "bg-forest text-white" : "bg-white text-ink-soft hover:bg-cream"
            }`}
          >
            {LOCALE_NAMES[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
