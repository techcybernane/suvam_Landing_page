"use client";

import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView.js";

// One uniform entrance for every block: a clean fade + rise on the editorial
// ease. Keeping the motion identical everywhere (rather than mixing slide-in /
// scale / wipe) is what makes the scroll feel aligned section to section.
// `fade` stays opacity-only for small in-place elements (breadcrumbs, etc.),
// and `clip` adds a mask wipe for images and panels.
const RISE = { opacity: 0, transform: "translate3d(0, 42px, 0)" };
const HIDDEN = {
  up: RISE,
  down: RISE,
  left: RISE,
  right: RISE,
  scale: { opacity: 0, transform: "translate3d(0, 42px, 0) scale(0.97)" },
  blur: RISE,
  clip: RISE,
  fade: { opacity: 0 },
};

const SHOWN = { opacity: 1, transform: "none", filter: "none" };

// The `clip` wipe lives on an INNER element. Chrome folds a target's own
// clip-path into the rect it hands IntersectionObserver, so animating
// clip-path on the observed node means the observer can never fire and the
// block stays invisible forever.
const CLIP_HIDDEN = "inset(0 0 100% 0)";
const CLIP_SHOWN = "inset(0 0 0% 0)";

/**
 * Fades + rises a block into place on scroll-entry. `delay` (ms) staggers
 * siblings. `eager` animates shortly after mount (above-the-fold) instead of
 * waiting for intersection. Reduced motion is honored globally in globals.css.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  duration = 1000,
  eager = false,
  className = "",
  style: styleProp,
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
  const hidden = HIDDEN[variant] ?? HIDDEN.up;

  const style = {
    transitionProperty: "opacity, transform, clip-path",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: inView ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
    ...(inView ? SHOWN : hidden),
    ...styleProp,
  };

  if (variant === "clip") {
    return (
      <Tag ref={ref} className={className} style={style} {...rest}>
        <div
          style={{
            clipPath: inView ? CLIP_SHOWN : CLIP_HIDDEN,
            transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${inView ? delay : 0}ms`,
          }}
        >
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
