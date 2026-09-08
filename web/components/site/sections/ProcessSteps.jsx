import { ArrowRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { useParallax } from "../../../hooks/useParallax.js";
import { toneOf } from "../../../lib/tone.js";

function StepRow({ step, index, t }) {
  const [numRef, y] = useParallax(0.06);

  return (
    <Reveal delay={index * 90} className={`group border-b ${t.border}`}>
      <div className="relative grid grid-cols-[auto_1fr] items-start gap-6 py-9 sm:grid-cols-[180px_1fr] sm:gap-12 sm:py-11">
        {/* Hover wash bleeds past the container edges for a full-width sweep. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100 md:-inset-x-10 ${
            t.light ? "bg-white" : "bg-white/[0.03]"
          }`}
        />
        <span
          ref={numRef}
          style={{ transform: `translateY(${y}px)` }}
          className={`select-none font-display text-fluid-2xl font-semibold leading-none tracking-tightest transition-colors duration-500 ease-editorial sm:text-[4.5rem] ${
            t.light ? "stroke-text-dark group-hover:text-signal-deep" : "stroke-text group-hover:text-signal"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="pt-1 sm:pt-3">
          <h3 className={`flex items-center gap-3 text-fluid-xl font-semibold tracking-tight ${t.heading}`}>
            {step.title}
            <ArrowRight
              className={`h-5 w-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100 ${t.accent}`}
            />
          </h3>
          {step.description && (
            <p className={`mt-3.5 max-w-2xl text-fluid-base leading-relaxed ${t.body}`}>{step.description}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ProcessSteps({ data, tone, num }) {
  if (!data) return null;
  const t = toneOf(tone);

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="animate-breathe pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-signal/[0.07] blur-[120px]" aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
        />

        <div className={`mt-16 border-t ${t.border}`}>
          {data.steps?.map((step, i) => (
            <StepRow key={step.id || i} step={step} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
