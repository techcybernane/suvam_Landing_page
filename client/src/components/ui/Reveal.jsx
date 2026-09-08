import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView.js";

// Hidden-state transforms per variant. The visible state always resets to the
// natural position (see SHOWN below), so any of these animate cleanly into place.
const HIDDEN = {
  up: { opacity: 0, transform: "translate3d(0, 44px, 0)" },
  down: { opacity: 0, transform: "translate3d(0, -44px, 0)" },
  left: { opacity: 0, transform: "translate3d(44px, 0, 0)" },
  right: { opacity: 0, transform: "translate3d(-44px, 0, 0)" },
  scale: { opacity: 0, transform: "scale(0.93)" },
  fade: { opacity: 0 },
  blur: { opacity: 0, transform: "translate3d(0, 26px, 0)", filter: "blur(14px)" },
  clip: { opacity: 0, transform: "translate3d(0, 26px, 0)", clipPath: "inset(0 0 18% 0)" },
};

const SHOWN = { opacity: 1, transform: "none", filter: "blur(0)", clipPath: "inset(0 0 0 0)" };

/**
 * Fades (+ slides/scales/blurs/wipes) a block into place on scroll-entry.
 * `delay` (ms) staggers siblings; `variant` picks the motion; `duration` (ms)
 * and `distance` are tunable. `eager` animates shortly after mount instead of
 * waiting for intersection — use for above-the-fold content.
 *
 * Reduced motion is honored globally: index.css forces transition-duration to
 * ~0 with !important, which beats these inline durations.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  duration = 820,
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
    transitionProperty: "opacity, transform, filter, clip-path",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: inView ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
    ...(inView ? SHOWN : hidden),
    ...styleProp,
  };

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
