import { ArrowRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import { useParallax } from "../../../hooks/useParallax.js";

function StepRow({ step, index }) {
  const [numRef, y] = useParallax(0.06);

  return (
    <Reveal variant="up" delay={index * 90} className="group border-b border-line">
      <div className="grid grid-cols-[auto_1fr] items-start gap-6 py-8 sm:grid-cols-[160px_1fr] sm:gap-10 sm:py-10">
        <span
          ref={numRef}
          style={{ transform: `translateY(${y}px)` }}
          className="select-none text-5xl font-extrabold leading-none tracking-tight text-ink/10 transition-colors duration-300 group-hover:text-lime sm:text-7xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="pt-1 sm:pt-3">
          <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {step.title}
            <ArrowRight className="h-5 w-5 shrink-0 -translate-x-2 text-lime-dark opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </h3>
          {step.description && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{step.description}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ProcessSteps({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/5 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <Reveal variant="clip" className="max-w-3xl">
          {data.heading && (
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
              {data.heading}
            </h2>
          )}
          {data.intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">{data.intro}</p>}
        </Reveal>

        <div className="mt-14 border-t border-line">
          {data.steps?.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
