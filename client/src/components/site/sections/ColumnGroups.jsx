import { Check } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import { useParallax } from "../../../hooks/useParallax.js";

function Group({ group, index }) {
  const [numRef, y] = useParallax(0.05);

  return (
    <Reveal delay={index * 90} variant="blur" className="h-full">
      <div className="card group relative h-full overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime hover:shadow-lift">
        <span
          ref={numRef}
          style={{ transform: `translateY(${y}px)` }}
          className="pointer-events-none absolute right-6 top-4 select-none text-6xl font-extrabold leading-none text-ink/[0.05] transition-colors duration-300 group-hover:text-lime/15"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative inline-flex h-1.5 w-10 rounded-full bg-lime" />
        <h3 className="relative mt-5 text-xl font-bold tracking-tight text-ink">{group.title}</h3>
        {group.intro && <p className="relative mt-2.5 text-sm leading-relaxed text-ink-soft">{group.intro}</p>}
        {group.items?.length > 0 && (
          <ul className="relative mt-5 space-y-3">
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
  );
}

export default function ColumnGroups({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`section-pad relative overflow-hidden border-t border-line ${bg}`}>
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-lime/5 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        {(data.heading || data.intro) && (
          <Reveal variant="clip" className="mx-auto max-w-3xl text-center">
            {data.heading && (
              <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
                {data.heading}
              </h2>
            )}
            {data.intro && <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">{data.intro}</p>}
          </Reveal>
        )}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.groups?.map((group, i) => (
            <Group key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
