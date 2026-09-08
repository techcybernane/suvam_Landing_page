import Reveal from "../../ui/Reveal.jsx";

export default function ProcessSteps({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-forest/5 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          {data.heading && (
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{data.heading}</h2>
          )}
          {data.intro && <p className="mt-4 text-base leading-relaxed text-ink-soft">{data.intro}</p>}
        </Reveal>

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.steps?.map((step, i) => (
            <Reveal key={step.id} delay={i * 90} variant={i % 2 === 0 ? "left" : "right"}>
              <div className="card group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-dark hover:shadow-lift">
                <span className="absolute -right-2 -top-4 text-6xl font-extrabold text-forest/[0.06] transition-colors duration-300 group-hover:text-lime/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-light text-xs font-extrabold text-forest">
                  {i + 1}
                </span>
                <h3 className="relative mt-3 font-bold text-ink">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
