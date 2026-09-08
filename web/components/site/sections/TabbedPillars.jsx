"use client";

import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { useScrollPin } from "../../../hooks/useScrollPin.js";
import { toneOf } from "../../../lib/tone.js";

// Viewport-heights of scroll spent on each pillar after the first. The frame is
// pinned for (count - 1) * this, so the section costs 100vh + that in total.
const STEP_VH = 85;

/**
 * Pinned pillar walkthrough. The section is taller than the viewport; an inner
 * sticky frame holds still while the page scrolls through it, stepping one
 * pillar at a time. Everything — rail, copy and image — lives in a single row
 * sized to fit inside one screen, so the image never leaves the viewport while
 * the section is being read.
 *
 * On narrow or short viewports (and under reduced motion) pinning switches off
 * and the same markup reads as an ordinary tap-through block.
 */
export default function TabbedPillars({ data, tone, num }) {
  const pillars = data?.pillars || [];
  const count = pillars.length;
  const pinEnabled = data?.pinned !== false;

  const [clicked, setClicked] = useState(0);
  const [pinRef, pinIndex, progress, pinActive, scrollToStep] = useScrollPin(pinEnabled ? count : 0);

  if (!count) return null;
  const t = toneOf(tone);

  // While pinned the scroll position is the source of truth; otherwise the tabs are.
  const active = pinActive ? pinIndex : Math.min(clicked, count - 1);

  const select = (i) => {
    setClicked(i);
    // Setting state alone would be overwritten by the next scroll frame, so
    // move the page to that pillar's slice of the pinned run instead.
    if (pinActive) scrollToStep(i);
  };

  return (
    <section
      ref={pinRef}
      // No overflow-hidden here: any scroll-clipping ancestor silently kills
      // position:sticky on the frame below.
      className={`relative border-t ${t.border} ${t.bg} ${pinEnabled ? "pin-wrap" : ""}`}
      style={pinEnabled ? { "--pin-height": `${100 + (count - 1) * STEP_VH}vh` } : undefined}
    >
      {/* .pin-frame turns this into the sticky viewport-height frame, but only
          on viewports big enough for the whole layout to fit (see globals.css). */}
      <div className={`relative overflow-hidden py-20 md:py-28 ${pinEnabled ? "pin-frame" : ""}`}>
        <div
          className="animate-breathe pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-signal/[0.07] blur-[130px]"
          aria-hidden
        />

        <div className="container-page relative">
          <SectionHeading
            num={num}
            kicker={data.kicker}
            heading={data.heading}
            accent={data.accent}
            tone={tone}
            headingClassName="text-fluid-2xl"
            className="lg:max-w-4xl"
          />

          {/* rail | copy | image — one row, so the image is always on screen
              for the whole pinned run instead of scrolling past it. */}
          <div className="mt-10 grid gap-8 lg:mt-8 lg:grid-cols-[0.8fr_1.15fr_0.85fr] lg:gap-10">
            {/* ---------------- tab rail ---------------- */}
            <div>
              <div className={`border-t ${t.border}`}>
                {pillars.map((pillar, i) => {
                  const on = i === active;
                  // How far through this pillar's own scroll segment we are.
                  const stepFill = pinActive ? Math.min(1, Math.max(0, progress * count - i)) : on ? 1 : 0;

                  return (
                    <button
                      key={pillar.id || i}
                      onClick={() => select(i)}
                      aria-pressed={on}
                      className={`group relative flex w-full items-center gap-4 border-b ${t.border} py-3.5 text-left transition-colors duration-500 ease-editorial`}
                    >
                      <span
                        className={`font-mono text-fluid-xs tracking-[0.2em] transition-colors duration-500 ${
                          on ? "text-signal" : t.muted
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-display text-fluid-lg font-medium tracking-tight transition-all duration-500 ease-editorial ${
                          on
                            ? `${t.heading} translate-x-1`
                            : t.light
                              ? "text-void/40 group-hover:text-void/75"
                              : "text-bone/35 group-hover:text-bone/75"
                        }`}
                      >
                        {pillar.title}
                      </span>
                      {/* Per-step progress line, mirroring the pinned scroll. */}
                      <span
                        aria-hidden
                        className={`absolute bottom-[-1px] left-0 h-px w-full origin-left ${
                          t.light ? "bg-signal-deep" : "bg-signal"
                        }`}
                        style={{ transform: `scaleX(${stepFill})` }}
                      />
                    </button>
                  );
                })}
              </div>

              {data.intro && (
                <p className={`pin-optional mt-6 text-fluid-sm leading-relaxed ${t.body}`}>{data.intro}</p>
              )}
            </div>

            {/* ---------------- copy ---------------- */}
            {/* Panels are stacked and cross-faded so nothing reflows as the
                active pillar changes and the frame's height stays constant. */}
            <div className="relative min-h-[21rem] lg:min-h-[25rem]">
              {pillars.map((p, i) => {
                const on = i === active;
                return (
                  <div
                    key={p.id || i}
                    aria-hidden={!on}
                    className={`transition-all duration-700 ease-editorial ${
                      on
                        ? "relative opacity-100 blur-0"
                        : "pointer-events-none absolute inset-0 translate-y-4 opacity-0 blur-[2px]"
                    }`}
                  >
                    {p.heading && (
                      <h3 className={`text-fluid-xl font-semibold leading-[1.06] tracking-tightest ${t.heading}`}>
                        {p.heading}
                      </h3>
                    )}
                    {p.body && <p className={`mt-4 text-fluid-sm leading-relaxed ${t.body}`}>{p.body}</p>}

                    {p.points?.length > 0 && (
                      <ul className={`mt-5 space-y-px overflow-hidden rounded-2xl border ${t.border}`}>
                        {p.points.map((point, pi) => (
                          <li
                            key={pi}
                            className={`flex items-start gap-3 px-4 py-2 text-fluid-sm transition-all duration-700 ease-editorial ${t.body} ${
                              t.light ? "bg-bone/60" : "bg-white/[0.02]"
                            }`}
                            style={{
                              transitionDelay: on ? `${120 + pi * 90}ms` : "0ms",
                              opacity: on ? 1 : 0,
                              transform: on ? "none" : "translateY(10px)",
                            }}
                          >
                            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent}`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {p.ctaLabel && (
                      <div className="mt-6">
                        <SmartLink
                          href={p.ctaHref || "/contact"}
                          className={`${t.light ? "btn-dark" : "btn-primary"} !px-6 !py-3`}
                        >
                          {p.ctaLabel}
                          <ArrowUpRight className="h-4 w-4" />
                        </SmartLink>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ---------------- image ---------------- */}
            <Reveal variant="clip" duration={900}>
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-[24px] border sm:aspect-[16/9] lg:aspect-[5/6] ${t.border}`}
              >
                {pillars.map((p, i) =>
                  p.image ? (
                    <img
                      key={p.id || i}
                      src={p.image}
                      alt=""
                      aria-hidden
                      loading={i === 0 ? undefined : "lazy"}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.1s] ease-editorial ${
                        i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                      }`}
                    />
                  ) : null
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,7,15,0.9),rgba(4,7,15,0.05))]"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/70">
                    {pillars[active]?.lens ? `Lens · ${pillars[active].lens}` : pillars[active]?.title}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-bone/50">
                    {String(active + 1).padStart(2, "0")}
                    <span className="mx-1 opacity-40">/</span>
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Overall progress through the pinned run. */}
        {pinEnabled && (
          <div className={`absolute inset-x-0 bottom-0 hidden h-px lg:block ${t.hairline}`} aria-hidden>
            <div
              className={`h-px origin-left ${t.light ? "bg-signal-deep" : "bg-signal"}`}
              style={{ transform: `scaleX(${pinActive ? progress : 0})` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
