"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";
import { useT } from "../../../hooks/useLocale.js";

/**
 * Horizontal showcase built on native CSS scroll-snap — so it drags, flicks and
 * scrolls with the trackpad exactly like the browser's own scroller, and the
 * arrows/counter are a thin layer on top rather than a bespoke slider engine.
 * The "03 / 10" counter tracks whichever card is nearest the snap point.
 */
export default function ShowcaseCarousel({ data, tone, num }) {
  const tr = useT();
  const items = data?.items || [];
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  // Autoplay pauses while the pointer is over the track and stops for good once
  // the visitor takes control with an arrow, a drag or a wheel.
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [taken, setTaken] = useState(false);
  const autoplay = data?.autoplay !== false;
  const intervalMs = Math.max(1500, Number(data?.autoplaySeconds ?? 4) * 1000);

  // Left edge of the track's content box in viewport coordinates. Measuring
  // against this (rather than offsetLeft) keeps the maths correct despite the
  // track's large asymmetric padding.
  const originOf = (el) => el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).paddingLeft) || 0);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children);
    if (!cards.length) return;

    // Nearest card to the track's left snap edge wins.
    const origin = originOf(el);
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - origin);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollTo = useCallback((index) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[Math.max(0, Math.min(index, el.children.length - 1))];
    if (!card) return;
    const delta = card.getBoundingClientRect().left - originOf(el);
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  }, []);

  // Only run the reel while the section is actually on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || taken || hovered || !visible || items.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const t = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      // Wrap back to the first card once the last one is fully in view.
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      scrollTo(atEnd ? 0 : active + 1);
    }, intervalMs);
    return () => clearInterval(t);
  }, [autoplay, taken, hovered, visible, items.length, active, intervalMs, scrollTo]);

  const takeOver = () => setTaken(true);

  if (!items.length) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="container-page relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            num={num}
            kicker={data.kicker}
            heading={data.heading}
            accent={data.accent}
            intro={data.intro}
            tone={tone}
            className="lg:max-w-2xl"
          />

          <Reveal delay={200} className="flex shrink-0 items-center gap-3">
            <span className={`mr-1 font-mono text-fluid-sm ${t.muted}`}>
              <span className={t.heading}>{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-1.5 opacity-40">/</span>
              {String(items.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => { takeOver(); scrollTo(active - 1); }}
              disabled={edges.start}
              aria-label={tr("previousItem")}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-30 ${t.border} ${
                t.light ? "text-void hover:border-signal-deep/50 hover:bg-void/5" : "text-bone hover:border-signal/50 hover:bg-white/10"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => { takeOver(); scrollTo(active + 1); }}
              disabled={edges.end}
              aria-label={tr("nextItem")}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-30 ${t.border} ${
                t.light ? "text-void hover:border-signal-deep/50 hover:bg-void/5" : "text-bone hover:border-signal/50 hover:bg-white/10"
              }`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>

      {/* Track bleeds past the container so partially-visible cards hint that
          there is more to the right — the usual "keep scrolling" affordance. */}
      <Reveal delay={140} duration={1000} className="mt-14">
        <div
          ref={trackRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onPointerDown={takeOver}
          onWheel={takeOver}
          className="no-scrollbar track-inset flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {items.map((item, i) => (
            <article
              key={item.id || i}
              className={`group flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border transition-all duration-500 ease-editorial sm:w-[380px] ${t.card} ${t.cardHover}`}
            >
              {item.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,7,15,0.85),rgba(4,7,15,0.05))]" aria-hidden />
                  <span className="absolute left-6 top-5 font-mono text-[0.62rem] tracking-[0.2em] text-bone/70">
                    {String(i + 1).padStart(2, "0")}
                    <span className="mx-1 opacity-40">/</span>
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
              ) : (
                <div className={`flex items-baseline gap-2 px-7 pt-7 font-mono text-fluid-xs tracking-[0.2em] ${t.muted}`}>
                  {String(i + 1).padStart(2, "0")}
                  <span className="opacity-40">/</span>
                  {String(items.length).padStart(2, "0")}
                </div>
              )}

              <div className="flex flex-1 flex-col p-7">
                <h3 className={`text-fluid-lg font-semibold leading-snug tracking-tight ${t.heading}`}>{item.title}</h3>
                {item.description && (
                  <p className={`mt-3 flex-1 text-fluid-sm leading-relaxed ${t.body}`}>{item.description}</p>
                )}
                {item.metric && (
                  <p className={`mt-6 border-t pt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] ${t.border} ${t.accent}`}>
                    {item.metric}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Progress rail mirrors the scroll position for people who never touch
          the arrows. */}
      <div className="container-page mt-8">
        <div className={`h-px w-full ${t.hairline}`}>
          <div
            className="h-px bg-signal transition-transform duration-500 ease-editorial"
            style={{
              width: `${100 / items.length}%`,
              transform: `translateX(${active * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
