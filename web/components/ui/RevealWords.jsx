"use client";

import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView.js";

const toWords = (str) =>
  String(str || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

/**
 * Heading reveal where each word rises + fades into place in sequence — the
 * staggered display motion the reference uses on every section title.
 *
 * `text` is the base heading. `highlight` is appended and rendered with
 * `highlightClassName` (default: the serif-italic accent), continuing the same
 * stagger so it reads as one sentence. `eager` plays shortly after mount for
 * above-the-fold headings; otherwise it triggers on scroll-entry. Reduced
 * motion is honored globally in globals.css.
 */
export default function RevealWords({
  text,
  highlight,
  as: Tag = "h2",
  className = "",
  highlightClassName = "accent",
  eager = false,
  start = 0,
  stagger = 55,
  duration = 900,
}) {
  const [ref, inView] = useInView();
  const [eagerVisible, setEagerVisible] = useState(!eager);

  useEffect(() => {
    if (!eager) return;
    const raf = requestAnimationFrame(() => setEagerVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [eager]);

  const show = eager ? eagerVisible : inView;
  const words = [
    ...toWords(text).map((t) => ({ t, hl: false })),
    ...toWords(highlight).map((t) => ({ t, hl: true })),
  ];

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        // Each word gets its own clipping row so the rise reads as the word
        // sliding up from under the line rather than fading in mid-air.
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className={`inline-block ${w.hl ? highlightClassName : ""}`}
            style={{
              transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`,
              transitionDelay: `${show ? start + i * stagger : 0}ms`,
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(105%)",
              willChange: "opacity, transform",
            }}
          >
            {w.t}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
