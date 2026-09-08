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
        <Reveal variant="scale" className="mx-auto max-w-2xl text-center">
          {data.heading && (
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{data.heading}</h2>
          )}
          {data.subheading && <p className="mt-3 text-sm text-ink-soft">{data.subheading}</p>}
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {data.items?.map((item, i) => (
            <Reveal key={i} delay={i * 45} variant={i % 2 === 0 ? "left" : "right"}>
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-dark hover:bg-forest hover:text-white">
                <Check className="h-4 w-4 text-lime-dark" />
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
