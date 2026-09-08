import { Play, ArrowUpRight, ShieldCheck, Network, Cloud, Code2, Wrench, Compass } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

// Six service icons evenly spaced on the outer orbit ring (angles in degrees,
// -90 = top). The ring container rotates; each icon counter-rotates to stay upright.
const ORBIT_ICONS = [ShieldCheck, Network, Cloud, Code2, Wrench, Compass];
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

const MARQUEE = [
  "Cybersecurity",
  "Network & Infrastructure",
  "Cloud & Hybrid",
  "Software Development",
  "Managed IT",
  "Consulting",
  "Data & AI",
  "Training & Certifications",
];

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* concentric static rings */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[14%] rounded-full border border-white/10" />
      <div className="absolute inset-[28%] rounded-full border border-white/[0.07]" />

      {/* rotating scanner sweep */}
      <div className="animate-scan absolute inset-0 rounded-full" aria-hidden>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(130,174,255,0.28) 0deg, rgba(130,174,255,0) 70deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          }}
        />
      </div>

      {/* orbiting service icon nodes */}
      <div className="animate-orbit absolute inset-0">
        {ORBIT_ANGLES.map((deg, i) => {
          const Icon = ORBIT_ICONS[i % ORBIT_ICONS.length];
          const rad = (deg * Math.PI) / 180;
          const x = 50 + 50 * Math.cos(rad);
          const y = 50 + 50 * Math.sin(rad);
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="animate-orbit-reverse flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.1] text-lime-glow shadow-lift backdrop-blur-sm">
                <Icon className="h-5 w-5" />
              </span>
            </div>
          );
        })}
      </div>

      {/* glowing core */}
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="animate-pulse-dot absolute inset-0 rounded-full bg-lime/20 blur-xl" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-lime-gradient text-white shadow-lift">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none">
            <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* brand-true floating chips */}
      <div className="animate-float absolute -left-4 top-[18%] hidden sm:block">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-forest-soft/70 px-4 py-3 shadow-lift backdrop-blur-md">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/15 text-lime-glow">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">360° Security</p>
            <p className="text-[11px] text-white/50">Assess → Protect → Recover</p>
          </div>
        </div>
      </div>
      <div className="animate-float-slower absolute -right-2 bottom-[16%] hidden sm:block">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-forest-soft/70 px-4 py-3 shadow-lift backdrop-blur-md">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/15 text-lime-glow">
            <Network className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Infrastructure</p>
            <p className="text-[11px] text-white/50">Built for resilience</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ data }) {
  if (!data) return null;

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="animate-gradient absolute inset-0 bg-forest-gradient" aria-hidden />
      <div className="pointer-events-none absolute -left-1/4 -top-1/3 h-[700px] w-[700px] rounded-full bg-lime/25 blur-[130px]" aria-hidden />
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-sky-400/10 blur-[130px]" aria-hidden />
      <div className="bg-dot-grid-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden />

      <div className="container-page relative flex min-h-[calc(100vh-80px)] flex-col justify-center py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* left: editorial copy */}
          <div className="max-w-xl">
            <Reveal eager variant="scale">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-lime-glow">
                <ShieldCheck className="h-3.5 w-3.5" />
                Technology &middot; Security &middot; Expertise
              </span>
            </Reveal>

            <Reveal eager variant="clip" delay={120}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.25rem]">
                {data.headingLine1} <span className="text-lime-glow">{data.headingHighlight}</span>
              </h1>
            </Reveal>

            <Reveal eager variant="blur" delay={240}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">{data.subtext}</p>
            </Reveal>

            <Reveal eager delay={360}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {data.primaryCta?.label && (
                  <SmartLink href={data.primaryCta.href} className="btn-primary">
                    {data.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </SmartLink>
                )}
                {data.secondaryCta?.label && (
                  <SmartLink
                    href={data.secondaryCta.href}
                    className="inline-flex items-center gap-3 rounded-pill border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    {data.secondaryCta.label}
                  </SmartLink>
                )}
              </div>
            </Reveal>
          </div>

          {/* right: animated orbit visual */}
          <Reveal eager variant="scale" delay={200} className="hidden lg:block">
            <OrbitVisual />
          </Reveal>
        </div>

        {/* capability marquee */}
        <Reveal eager delay={480} className="mt-14 lg:mt-20">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max items-center gap-10">
              {[...MARQUEE, ...MARQUEE].map((item, i) => (
                <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-wide text-white/40">
                  {item}
                  <span className="h-1 w-1 rounded-full bg-lime-glow/60" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
