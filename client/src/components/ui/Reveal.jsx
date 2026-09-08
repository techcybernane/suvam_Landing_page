import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView.js";

const VARIANTS = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  scale: "scale-95",
  fade: "",
};

/**
 * Fades (+ optionally slides/scales) a block into place. `delay` (ms) lets
 * siblings stagger; `variant` varies the motion direction so consecutive
 * sections don't all animate identically.
 *
 * `eager`: skip IntersectionObserver and animate in shortly after mount
 * instead. Use this for above-the-fold content (e.g. hero text) — relying
 * on scroll-intersection for something already on screen at load is
 * fragile (backgrounded/inactive tabs can delay or skip the observer's
 * first callback), and that content should never be stuck invisible.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  eager = false,
  className = "",
  children,
  ...rest
}) {
  const [ref, observedInView] = useInView();
  const [eagerVisible, setEagerVisible] = useState(!eager);

  useEffect(() => {
    if (!eager) return;
    const raf = requestAnimationFrame(() => setEagerVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [eager]);

  const inView = eager ? eagerVisible : observedInView;
  const offset = VARIANTS[variant] ?? VARIANTS.up;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${offset}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
