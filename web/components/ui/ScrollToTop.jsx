"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { t } from "../../lib/ui-strings.js";
import { useLocale } from "../../hooks/useLocale.js";

/**
 * Scrolls the window to the top. Prefers the shared Lenis instance (exposed by
 * SmoothScroll as `window.__lenis`) so the motion matches the site's ambient
 * inertia; falls back to native smooth scroll when Lenis is off (reduced motion).
 */
export function scrollToTop() {
  if (typeof window === "undefined") return;
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Two shapes from one component:
 *  - default: a floating circular button that fades in once the visitor has
 *    scrolled past the fold (mounted once in the site layout).
 *  - `inline`: a text link matching the footer's chrome, replacing the old
 *    `#hero` anchor that only resolved on the home page.
 */
export default function ScrollToTop({ inline = false }) {
  const locale = useLocale();
  const label = t(locale, "backToTop");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inline) return;
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [inline]);

  if (inline) {
    return (
      <button
        type="button"
        onClick={scrollToTop}
        className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/40 transition-colors hover:text-signal"
      >
        {label}
        <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className={`fixed bottom-6 end-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-void/80 text-bone shadow-panel backdrop-blur-md transition-all duration-500 ease-editorial hover:border-signal/60 hover:bg-signal hover:text-void ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
