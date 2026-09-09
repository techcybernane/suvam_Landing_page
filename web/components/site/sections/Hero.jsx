"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft, Pause, Play } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import RevealWords from "../../ui/RevealWords.jsx";
import CountUp from "../../ui/CountUp.jsx";
import LiveDot from "../../ui/LiveDot.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { useT } from "../../../hooks/useLocale.js";

const AUTOPLAY_MS = 7000;

// Accept the multi-slide shape, and fall back to the old single-hero shape.
function normalizeSlides(data) {
  if (Array.isArray(data.slides) && data.slides.length) return data.slides;
  return [
    {
      id: "legacy",
      image: data.image,
      headingLine1: data.headingLine1,
      headingHighlight: data.headingHighlight,
      subtext: data.subtext,
      primaryLabel: data.primaryCta?.label,
      primaryHref: data.primaryCta?.href,
      secondaryLabel: data.secondaryCta?.label,
      secondaryHref: data.secondaryCta?.href,
    },
  ];
}

export default function Hero({ data }) {
  const t = useT();
  const slides = normalizeSlides(data || {});
  const stats = data?.stats?.length ? data.stats : [];
  const count = slides.length;

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => {
    setReduced(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i) => setActive((i + count) % count), [count]);

  // Autoplay pauses on hover/focus, when the tab is hidden, and when the
  // visitor takes manual control with the pause button.
  const running = playing && !hovered && count > 1 && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [running, count, active]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 60) go(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };

  if (!count) return null;
  const s = slides[active];

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label={t("featured")}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative flex min-h-[min(100svh,900px)] flex-col overflow-hidden bg-void outline-none"
    >
      {/* Cross-fading slide images, each drifting under a slow ken-burns push. */}
      {slides.map((slide, i) => (
        <div
          key={slide.id || i}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1.2s] ease-editorial ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image && (
            <img
              src={slide.image}
              alt=""
              aria-hidden
              className={`h-full w-full object-cover object-center ${i === active ? "animate-kenburns" : ""}`}
            />
          )}
        </div>
      ))}

      {/* Layered scrims: horizontal for text legibility, vertical to seat the
          hero into the page, plus a grid + accent bloom for depth. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,7,15,0.94)_0%,rgba(4,7,15,0.72)_42%,rgba(4,7,15,0.35)_75%)]" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#04070F_4%,rgba(4,7,15,0.55)_38%,rgba(4,7,15,0.25)_70%,rgba(4,7,15,0.6)_100%)]" aria-hidden />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_70%_at_25%_45%,black,transparent)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute -left-1/4 top-1/3 h-[620px] w-[620px] rounded-full bg-signal/20 blur-[150px]" aria-hidden />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-10 pt-32">
        {/* Re-keyed on `active` so the word-stagger replays for every slide. */}
        <div key={active} className="max-w-4xl">
          <Reveal eager variant="fade" duration={700}>
            <span className="eyebrow">
              <LiveDot />
              {data?.eyebrow || "Technology · Security · Expertise"}
            </span>
          </Reveal>

          <RevealWords
            eager
            as="h1"
            start={140}
            stagger={70}
            duration={1000}
            className="mt-8 text-fluid-4xl font-semibold leading-[0.9] tracking-tightest text-bone"
            text={s.headingLine1}
            highlight={s.headingHighlight}
          />

          <Reveal eager variant="blur" delay={420} duration={1000}>
            <p className="mt-8 max-w-xl text-fluid-base leading-relaxed text-bone/65">{s.subtext}</p>
          </Reveal>

          <Reveal eager delay={560} duration={900}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {s.primaryLabel && (
                <SmartLink href={s.primaryHref || "/contact"} className="btn-primary group">
                  {s.primaryLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </SmartLink>
              )}
              {s.secondaryLabel && (
                <SmartLink href={s.secondaryHref || "/contact"} className="btn-outline">
                  {s.secondaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </SmartLink>
              )}
            </div>
          </Reveal>
        </div>

        {count > 1 && (
          <Reveal eager delay={700} duration={900} className="mt-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Slide titles double as the pagination: the visitor can see
                  where each control leads instead of guessing at dots. */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id || i}
                    onClick={() => go(i)}
                    aria-label={`${t("showSlide")} ${i + 1}: ${slide.headingLine1 || ""}`}
                    aria-current={i === active}
                    className="group flex max-w-[200px] flex-col gap-2 pr-4 text-left"
                  >
                    <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/15">
                      <span
                        key={`${i}-${active}-${running}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-signal"
                        style={
                          i === active
                            ? {
                                width: "100%",
                                transformOrigin: "left",
                                // Running: the bar fills over exactly one autoplay
                                // interval. Paused: it just sits full.
                                animation: running ? `track-fill ${AUTOPLAY_MS}ms linear forwards` : "none",
                                transform: running ? "scaleX(0)" : "scaleX(1)",
                              }
                            : { width: 0 }
                        }
                      />
                    </span>
                    <span
                      className={`font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        i === active ? "text-bone" : "text-bone/35 group-hover:text-bone/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} {slide.navLabel || slide.headingHighlight || slide.headingLine1}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="mr-2 font-mono text-fluid-xs text-bone/40">
                  {String(active + 1).padStart(2, "0")}
                  <span className="mx-1 text-bone/20">/</span>
                  {String(count).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? t("pauseCarousel") : t("playCarousel")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone backdrop-blur-sm transition-all duration-300 ease-editorial hover:border-signal/50 hover:bg-white/10"
                >
                  {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                </button>
                <button
                  onClick={() => go(active - 1)}
                  aria-label={t("previousSlide")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone backdrop-blur-sm transition-all duration-300 ease-editorial hover:border-signal/50 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(active + 1)}
                  aria-label={t("nextSlide")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone backdrop-blur-sm transition-all duration-300 ease-editorial hover:border-signal/50 hover:bg-white/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {stats.length > 0 && (
        <Reveal eager delay={840} duration={900} className="relative z-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-md">
          <div className="container-page grid grid-cols-2 gap-y-8 py-8 sm:grid-cols-4">
            {stats.map((st, i) => (
              <div key={i} className="px-2 sm:border-r sm:border-white/[0.08] sm:last:border-r-0">
                <CountUp
                  display={st.value}
                  className="block text-fluid-2xl font-semibold leading-none tracking-tightest text-bone"
                />
                <p className="mt-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-bone/40">{st.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
