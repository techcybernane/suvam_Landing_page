import { ArrowUpRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { toneOf } from "../../../lib/tone.js";

/** Optional "Assess → Plan → Implement" chip flow under the copy. */
function FlowDiagram({ steps, t }) {
  return (
    <div className="no-scrollbar relative overflow-x-auto pb-2">
      <div className="flex min-w-max items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <Reveal delay={i * 110} className="flex flex-col items-center gap-2.5">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border font-mono text-fluid-xs font-semibold transition-transform duration-500 ease-editorial hover:scale-110 ${t.border} ${
                  t.light ? "bg-void text-signal" : "bg-white/[0.04] text-signal"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className={`font-mono text-[0.62rem] uppercase tracking-[0.16em] ${t.muted}`}>{step}</span>
            </Reveal>
            {i < steps.length - 1 && (
              <svg width="48" height="12" viewBox="0 0 48 12" className={`mx-1 shrink-0 ${t.accent}`} aria-hidden>
                <line x1="0" y1="6" x2="38" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M34,2 L40,6 L34,10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TextIntro({ data, tone, num }) {
  if (!data) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="animate-breathe pointer-events-none absolute -left-24 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-signal/[0.07] blur-[120px]" aria-hidden />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        {/* Heading pins while the copy scrolls past it. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            num={num}
            kicker={data.subheading || data.kicker}
            heading={data.heading}
            accent={data.accent}
            tone={tone}
            headingClassName="text-fluid-2xl"
          />
        </div>

        <div className="max-w-2xl">
          {data.paragraphs?.map((p, i) => (
            <Reveal key={i} variant="blur" delay={i * 100} duration={1000}>
              <p
                className={
                  i === 0
                    ? `text-fluid-lg leading-relaxed ${t.heading}`
                    : `mt-5 text-fluid-base leading-relaxed ${t.body}`
                }
              >
                {p}
              </p>
            </Reveal>
          ))}

          {data.flowSteps?.length > 0 && (
            <div className="mt-12">
              <FlowDiagram steps={data.flowSteps} t={t} />
            </div>
          )}

          {data.ctas?.length > 0 && (
            <Reveal delay={160} className="mt-10 flex flex-wrap items-center gap-3">
              {data.ctas.map((cta, i) => (
                <SmartLink key={i} href={cta.href} className={i === 0 ? (t.light ? "btn-dark" : "btn-primary") : "btn-outline"}>
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
