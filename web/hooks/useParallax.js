import { useEffect, useRef, useState } from "react";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-linked parallax. Returns [ref, offsetPx] — attach ref to the element
 * and apply `translateY(offsetPx)`. `strength` scales how far it drifts as the
 * element travels through the viewport (positive = moves opposite to scroll).
 * No-ops under reduced-motion. Reads are batched in a rAF to stay smooth.
 */
export function useParallax(strength = 0.12, maxOffset = 44) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const raw = (viewportCenter - elementCenter) * strength;
      // Clamped: without a cap the offset keeps growing with distance from the
      // viewport, so far-off elements render wildly out of position.
      setOffset(Math.max(-maxOffset, Math.min(maxOffset, raw)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, maxOffset]);

  return [ref, offset];
}
