import { Check, Layers } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";

const ACCENTS = ["bg-forest text-lime", "bg-lime text-forest", "bg-lime-light text-forest"];

export default function ColumnGroups({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-forest/5 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        {(data.heading || data.intro) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            {data.heading && (
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{data.heading}</h2>
            )}
            {data.intro && <p className="mt-4 text-base leading-relaxed text-ink-soft">{data.intro}</p>}
          </Reveal>
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.groups?.map((group, i) => (
            <Reveal key={group.id} delay={i * 100} variant={i % 2 === 0 ? "up" : "scale"}>
              <div className="card group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-dark hover:shadow-lift">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${ACCENTS[i % ACCENTS.length]}`}>
                  <Layers className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{group.title}</h3>
                {group.intro && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{group.intro}</p>}
                {group.items?.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-dark" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
