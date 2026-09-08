import { ArrowUpRight, Sparkle } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

function FlowDiagram({ steps }) {
  return (
    <div className="relative mt-2 overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-sm font-extrabold text-lime shadow-card transition-transform duration-300 hover:scale-110">
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
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-line bg-white/70 p-8 shadow-card backdrop-blur-sm sm:p-12">
            <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-14">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-gradient text-lime shadow-card">
                  <Sparkle className="h-5 w-5" />
                </span>
                {data.heading && (
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                    {data.heading}
                  </h2>
                )}
                {data.subheading && <p className="mt-2 text-sm font-medium text-ink-soft">{data.subheading}</p>}
              </div>

              <div className="space-y-5 border-t border-line pt-8 md:border-t-0 md:border-l md:pl-14 md:pt-0">
                {data.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-lg font-medium leading-relaxed text-ink"
                        : "text-base leading-relaxed text-ink-soft"
                    }
                  >
                    {p}
                  </p>
                ))}

                {data.flowSteps?.length > 0 && <FlowDiagram steps={data.flowSteps} />}

                {data.ctas?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {data.ctas.map((cta, i) => (
                      <SmartLink key={i} href={cta.href} className={i === 0 ? "btn-primary" : "btn-outline"}>
                        {cta.label}
                        {i === 0 && <ArrowUpRight className="h-4 w-4" />}
                      </SmartLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
