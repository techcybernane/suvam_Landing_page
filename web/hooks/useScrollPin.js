import { useEffect, useRef, useState } from "react";

/**
 * Drives a "pinned" section: the wrapper is taller than the viewport, an inner
 * sticky frame holds still while the page scrolls through it, and the scroll
 * distance is divided into `steps` equal segments.
 *
 * Returns [ref, index, progress, active]:
 *   ref      attach to the TALL wrapper (not the sticky frame)
 *   index    0-based current step
 *   progress 0..1 through the whole pinned run
 *   active   whether pinning is actually engaged right now
 *
 * Pinning is only engaged on wide, tall-enough viewports and never under
 * reduced motion — on a phone a pinned section costs several screens of scroll
 * to read one panel, so there it degrades to a normal tap-through block.
 */
export function useScrollPin(steps, { minWidth = 1024, minHeight = 780 } = {}) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (steps < 2) return;

    const wide = window.matchMedia(`(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let engaged = false;

    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;

      if (!engaged) {
        setActive(false);
        setIndex(0);
        setProgress(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      // Distance the page travels while the inner frame stays pinned.
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
      setIndex(Math.min(steps - 1, Math.floor(p * steps)));
      setActive(true);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const sync = () => {
      engaged = wide.matches && !reduced.matches;
      onScroll();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps, minWidth, minHeight]);

  /** Scroll the page to the start of `i`'s segment — lets tabs stay clickable while pinned. */
  const scrollToStep = (i) => {
    const el = ref.current;
    if (!el) return false;
    const travel = el.getBoundingClientRect().height - window.innerHeight;
    if (travel <= 0) return false;
    const top = window.scrollY + el.getBoundingClientRect().top;
    // Aim at the middle of the segment so the step is unambiguous.
    window.scrollTo({ top: top + ((i + 0.5) / steps) * travel, behavior: "smooth" });
    return true;
  };

  return [ref, index, progress, active, scrollToStep];
}
