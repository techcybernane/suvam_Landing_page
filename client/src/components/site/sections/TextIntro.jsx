import { ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

function FlowDiagram({ steps }) {
  return (
    <div className="relative mt-2 overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-sm font-extrabold text-lime-glow shadow-card transition-transform duration-300 hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-ink">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <svg width="48" height="12" viewBox="0 0 48 12" className="mx-1 shrink-0 text-lime-dark">
                <line x1="0" y1="6" x2="38" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
                <path d="M34,2 L40,6 L34,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TextIntro({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-lime/8 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <Reveal variant="up" className="lg:sticky lg:top-28 lg:self-start">
          <span className="section-label">
            <span className="h-px w-8 bg-lime-dark" aria-hidden />
            {data.subheading}
          </span>
          {data.heading && (
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.75rem]">
              {data.heading}
            </h2>
          )}
        </Reveal>

        <div className="max-w-2xl">
          {data.paragraphs?.map((p, i) => (
            <Reveal key={i} variant="blur" delay={i * 90}>
              <p
                className={
                  i === 0
                    ? "text-xl font-medium leading-relaxed text-ink"
                    : "mt-5 text-base leading-relaxed text-ink-soft"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}

          {data.flowSteps?.length > 0 && (
            <Reveal variant="up" delay={120} className="mt-10">
              <FlowDiagram steps={data.flowSteps} />
            </Reveal>
          )}

          {data.ctas?.length > 0 && (
            <Reveal variant="up" delay={160} className="mt-8 flex flex-wrap items-center gap-3">
              {data.ctas.map((cta, i) => (
                <SmartLink key={i} href={cta.href} className={i === 0 ? "btn-primary" : "btn-outline"}>
                  {cta.label}
                  {i === 0 && <ArrowUpRight className="h-4 w-4" />}
                </SmartLink>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
