import { Check } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";

export default function ValueList({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <Reveal variant="clip" className="mx-auto max-w-3xl text-center">
          {data.heading && (
            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">{data.heading}</h2>
          )}
          {data.subheading && <p className="mt-4 text-base text-ink-soft">{data.subheading}</p>}
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {data.items?.map((item, i) => (
            <Reveal key={i} delay={i * 45} variant={i % 2 === 0 ? "left" : "right"}>
              <span className="group inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-forest hover:text-white">
                <Check className="h-4 w-4 text-lime-dark group-hover:text-lime-glow" />
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
