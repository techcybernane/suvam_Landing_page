import { ArrowRight, ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database, GraduationCap } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { useParallax } from "../../../hooks/useParallax.js";

const ICONS = [ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database, GraduationCap];

function Card({ card, index }) {
  const Icon = ICONS[index % ICONS.length];
  const Wrapper = card.href ? SmartLink : "div";
  const [numRef, y] = useParallax(0.05);

  return (
    <Reveal delay={index * 70} variant="blur" className="h-full">
      <Wrapper
        href={card.href}
        className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-xl2 border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime hover:shadow-lift"
      >
        <span
          ref={numRef}
          style={{ transform: `translateY(${y}px)` }}
          className="pointer-events-none absolute right-6 top-4 select-none text-6xl font-extrabold leading-none text-ink/[0.05] transition-colors duration-300 group-hover:text-lime/15"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-lime-light text-lime-dark transition-colors duration-300 group-hover:bg-lime group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="relative mt-6 text-lg font-bold leading-snug text-ink">{card.title}</h3>
        {card.description && (
          <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{card.description}</p>
        )}
        {card.href && (
          <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-lime-dark">
            Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Wrapper>
    </Reveal>
  );
}

export default function IconGrid({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";
  const count = data.cards?.length ?? 0;
  const gridCols = count >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className={`section-pad border-t border-line ${bg}`}>
      <div className="container-page">
        {(data.tag || data.heading || data.intro) && (
          <Reveal variant="clip" className="mx-auto max-w-3xl text-center">
            {data.tag && <span className="eyebrow">{data.tag}</span>}
            {data.heading && (
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
                {data.heading}
              </h2>
            )}
            {data.intro && <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">{data.intro}</p>}
          </Reveal>
        )}

        <div className={`mt-16 grid grid-cols-1 gap-5 ${gridCols}`}>
          {data.cards?.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>

        {data.footnote && (
          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-medium text-ink-soft">{data.footnote}</p>
          </Reveal>
        )}

        {data.cta?.label && (
          <Reveal delay={160} variant="up" className="mt-12 flex justify-center">
            <SmartLink href={data.cta.href} className="btn-dark">
              {data.cta.label}
              <ArrowRight className="h-4 w-4" />
            </SmartLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
