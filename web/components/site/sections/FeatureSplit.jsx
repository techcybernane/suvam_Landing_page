import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { useParallax } from "../../../hooks/useParallax.js";
import { toneOf } from "../../../lib/tone.js";

export default function FeatureSplit({ data, tone, num }) {
  if (!data) return null;
  const t = toneOf(tone);
  const imageLeft = data.imageSide === "left";
  const [imgRef, y] = useParallax(0.07);

  const media = (
    <Reveal variant="clip" duration={1100} className="relative">
      <div className={`relative overflow-hidden rounded-[24px] border ${t.border} shadow-panel`}>
        <div className="aspect-[4/3] w-full overflow-hidden">
          {data.image && (
            <img
              ref={imgRef}
              src={data.image}
              alt={data.heading || ""}
              loading="lazy"
              // Over-scaled so the parallax drift never exposes an edge.
              style={{ transform: `translateY(${y}px) scale(1.12)` }}
              className="h-full w-full object-cover will-change-transform"
            />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,7,15,0.7),rgba(4,7,15,0.05))]" aria-hidden />
        {data.badge !== "" && (
          <span className="absolute bottom-6 left-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-bone/70">
            {data.badge || "Innovate · Secure · Transform"}
          </span>
        )}
      </div>
    </Reveal>
  );

  const text = (
    <div className="max-w-xl">
      <SectionHeading
        num={num}
        kicker={data.eyebrow}
        heading={data.heading}
        accent={data.accent}
        tone={tone}
        headingClassName="text-fluid-2xl"
      />

      <div className="mt-7 space-y-5">
        {data.body?.map((p, i) => (
          <Reveal key={i} variant="blur" delay={i * 100} duration={1000}>
            <p className={i === 0 ? `text-fluid-lg leading-relaxed ${t.heading}` : `text-fluid-base leading-relaxed ${t.body}`}>
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      {data.bullets?.length > 0 && (
        <div className={`mt-9 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 ${t.border}`}>
          {data.bullets.map((b, i) => (
            <Reveal
              key={i}
              delay={120 + i * 80}
              className={`flex items-start gap-3 px-5 py-4 text-fluid-sm font-medium ${t.heading} ${
                t.light ? "bg-white" : "bg-white/[0.03]"
              }`}
            >
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent}`} />
              {b}
            </Reveal>
          ))}
        </div>
      )}

      {data.cta?.label && (
        <Reveal delay={200} className="mt-10">
          <SmartLink href={data.cta.href} className={t.light ? "btn-dark" : "btn-primary"}>
            {data.cta.label}
            <ArrowUpRight className="h-4 w-4" />
          </SmartLink>
        </Reveal>
      )}
    </div>
  );

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="animate-breathe pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-signal/[0.07] blur-[120px]" aria-hidden />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {imageLeft ? (
          <>
            {media}
            {text}
          </>
        ) : (
          <>
            {text}
            {media}
          </>
        )}
      </div>
    </section>
  );
}
