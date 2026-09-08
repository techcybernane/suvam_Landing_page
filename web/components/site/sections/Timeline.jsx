import Reveal from "../../ui/Reveal.jsx";
import CountUp from "../../ui/CountUp.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

/**
 * Phased roadmap. Each phase is a row on a continuous vertical rail with a
 * marker that lights up as the row arrives, a giant outlined phase numeral,
 * and an optional set of counting metrics.
 */
function Phase({ phase, index, total, t }) {
  const last = index === total - 1;

  return (
    <Reveal delay={index * 120} duration={1000} className="relative pl-10 sm:pl-16">
      {/* rail + node */}
      <span className={`absolute left-[7px] top-3 bottom-0 w-px sm:left-[15px] ${last ? "hidden" : t.hairline}`} aria-hidden />
      <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:left-2">
        <span className="animate-blip absolute h-2.5 w-2.5 rounded-full bg-signal/60" />
        <span className={`relative h-2.5 w-2.5 rounded-full bg-signal ring-4 ${t.light ? "ring-bone" : "ring-void"}`} />
      </span>

      <div className={`pb-14 ${last ? "" : "sm:pb-16"}`}>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className={`font-mono text-fluid-sm font-semibold tracking-[0.18em] ${t.accent}`}>{phase.year}</span>
          <span className={`font-mono text-fluid-xs uppercase tracking-[0.22em] ${t.muted}`}>
            {phase.label || `Phase ${String(index + 1).padStart(2, "0")}`}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-6">
          <span
            aria-hidden
            className={`hidden select-none font-display text-[5rem] font-semibold leading-none tracking-tightest lg:block ${
              t.light ? "stroke-text-dark" : "stroke-text"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            {phase.title && (
              <h3 className={`text-fluid-xl font-semibold leading-snug tracking-tight ${t.heading}`}>{phase.title}</h3>
            )}
            {phase.description && (
              <p className={`mt-3 max-w-2xl text-fluid-base leading-relaxed ${t.body}`}>{phase.description}</p>
            )}

            {phase.stats?.length > 0 && (
              <div className={`mt-7 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3 ${t.border}`}>
                {phase.stats.map((st, i) => (
                  <div key={i} className={`px-5 py-5 ${t.light ? "bg-white" : "bg-white/[0.03]"}`}>
                    <CountUp
                      display={st.value}
                      className={`block text-fluid-xl font-semibold leading-none tracking-tightest ${t.heading}`}
                    />
                    <p className={`mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] ${t.muted}`}>{st.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Timeline({ data, tone, num }) {
  const phases = data?.phases || [];
  if (!phases.length) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className={`${t.grid} pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_65%)]`} aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
        />

        <div className="mt-16">
          {phases.map((phase, i) => (
            <Phase key={phase.id || i} phase={phase} index={i} total={phases.length} t={t} />
          ))}
        </div>

        {data.footnote && (
          <Reveal delay={160}>
            <p className={`mt-4 max-w-xl font-serif text-fluid-lg italic ${t.light ? "text-signal-deep" : "text-signal-soft"}`}>
              {data.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
