"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView.js";

/**
 * Splits an authored display value into [prefix, number, suffix] so the editor
 * can just type "24/7", "360°", "10+", "−30%" or "1.5M+" and only the numeric
 * part animates. Anything with no digits is returned as a static string.
 */
export function splitNumeric(display) {
  const str = String(display ?? "");
  const match = str.match(/-?[\d]+(?:[.,]\d+)?/);
  if (!match) return { prefix: str, number: null, suffix: "", decimals: 0 };
  const raw = match[0];
  const normalized = raw.replace(",", ".");
  const dot = normalized.indexOf(".");
  return {
    prefix: str.slice(0, match.index),
    number: parseFloat(normalized),
    suffix: str.slice(match.index + raw.length),
    decimals: dot === -1 ? 0 : normalized.length - dot - 1,
  };
}

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts a metric up from zero the first time it scrolls into view — the
 * signature "0 → 360°" reveal on the reference's stat bands.
 *
 * Pass either `display` (an authored string like "24/7") or an explicit
 * `value` + `prefix`/`suffix`. Reduced motion renders the final value at once.
 */
export default function CountUp({
  display,
  value,
  prefix = "",
  suffix = "",
  decimals,
  duration = 1600,
  className = "",
}) {
  const parsed = display != null ? splitNumeric(display) : null;
  const target = value != null ? value : parsed?.number;
  const pre = display != null ? parsed.prefix : prefix;
  const post = display != null ? parsed.suffix : suffix;
  const places = decimals != null ? decimals : (parsed?.decimals ?? 0);

  const [ref, inView] = useInView({ threshold: 0.4, rootMargin: "0px 0px -40px 0px" });
  const [shown, setShown] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!inView || target == null) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(target * easeOutExpo(t));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, target, duration]);

  // Non-numeric values (e.g. "Always on") just render as-is.
  if (target == null) {
    return (
      <span ref={ref} className={className}>
        {display ?? `${prefix}${suffix}`}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {pre}
      <span className="tabular-nums">{shown.toFixed(places)}</span>
      {post}
    </span>
  );
}
