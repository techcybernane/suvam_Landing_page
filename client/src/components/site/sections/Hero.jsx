import { Play, ArrowUpRight, ShieldCheck, Network, Cloud, Code2, Wrench, Compass } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

const ORBIT_ICONS = [ShieldCheck, Network, Cloud, Code2, Wrench, Compass];

// Scattered along the far edges of the section — ambient background motion,
// clear of the centered text column so nothing competes with it.
const ORBIT_POSITIONS = [
  { top: "14%", left: "4%" },
  { top: "50%", left: "1.5%" },
  { top: "84%", left: "7%" },
  { top: "16%", left: "96%" },
  { top: "50%", left: "98.5%" },
  { top: "82%", left: "93%" },
];

export default function Hero({ data }) {
  if (!data) return null;

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-forest-gradient" aria-hidden />
      <div className="pointer-events-none absolute -left-1/4 -top-1/3 h-[700px] w-[700px] rounded-full bg-lime/20 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-emerald-400/10 blur-[120px]" aria-hidden />
      <div className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" aria-hidden />

      {ORBIT_POSITIONS.map((pos, i) => {
        const Icon = ORBIT_ICONS[i % ORBIT_ICONS.length];
        return (
          <div
            key={i}
            className="animate-float pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.5}s` }}
            aria-hidden
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-lime shadow-lift">
              <Icon className="h-5 w-5" />
            </span>
          </div>
        );
      })}

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="scale">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-lime">
              <ShieldCheck className="h-3.5 w-3.5" />
              Technology &middot; Security &middot; Expertise
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.headingLine1} <span className="text-lime">{data.headingHighlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              {data.subtext}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {data.primaryCta?.label && (
                <SmartLink href={data.primaryCta.href} className="btn-primary">
                  {data.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </SmartLink>
              )}
              {data.secondaryCta?.label && (
                <SmartLink
                  href={data.secondaryCta.href}
                  className="inline-flex items-center gap-3 rounded-pill border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {data.secondaryCta.label}
                </SmartLink>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-1.5 w-1 animate-float rounded-full bg-lime" style={{ animationDuration: "1.6s" }} />
        </span>
      </div>
    </section>
  );
}
