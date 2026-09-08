"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth/inertia scrolling for the public site (the "premium agency" feel).
 * Renders nothing. Disabled under prefers-reduced-motion. Lenis drives real window
 * scroll, so IntersectionObserver reveals, parallax and the progress bar keep working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Lenis forces `scroll-behavior: auto`, so a plain in-page anchor would jump
    // instantly while the rest of the page glides. Hand those clicks to Lenis
    // instead so "#contact" and "Back to top" match the ambient scroll feel.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      // Compute the destination explicitly rather than leaning on Lenis's
      // `offset` — that stacks with the document's scroll-padding-top and
      // lands the target twice the header height down the page.
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      lenis.scrollTo(Math.max(0, top), { duration: 1.4 });
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
