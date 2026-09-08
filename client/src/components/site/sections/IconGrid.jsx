import { ArrowRight, ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database, GraduationCap } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

const ICONS = [ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database, GraduationCap];
const VARIANTS = ["bg-forest text-white", "bg-lime text-forest", "bg-lime-light text-forest", "card text-ink"];

export default function IconGrid({ data, tone }) {
  if (!data) return null;
  const bg = tone === "white" ? "bg-white" : "bg-cream";
  const count = data.cards?.length ?? 0;
  const gridCols = count >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className={`section-pad border-t border-line ${bg}`}>
      <div className="container-page">
        {(data.tag || data.heading || data.intro) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            {data.tag && <span className="eyebrow">{data.tag}</span>}
            {data.heading && (
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{data.heading}</h2>
            )}
            {data.intro && <p className="mt-4 text-base leading-relaxed text-ink-soft">{data.intro}</p>}
          </Reveal>
        )}

        <div className={`mt-12 grid grid-cols-1 gap-4 sm:gap-5 ${gridCols}`}>
          {data.cards?.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            const variant = VARIANTS[i % VARIANTS.length];
            const Wrapper = card.href ? SmartLink : "div";

            return (
              <Reveal key={card.id} delay={i * 60} variant={i % 2 === 0 ? "up" : "scale"}>
                <Wrapper
                  href={card.href}
                  className={`group relative flex h-full min-h-[180px] flex-col justify-end overflow-hidden rounded-xl2 p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:min-h-[200px] sm:p-6 ${variant}`}
                >
                  <Icon
                    className="absolute -right-3 -top-3 h-20 w-20 opacity-[0.12] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-24 sm:w-24"
                    strokeWidth={1.2}
                  />
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${
                      variant.includes("bg-forest") ? "bg-white/10" : "bg-forest/10"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </span>
                  <h3 className="relative mt-3 text-base font-bold leading-snug sm:mt-4 sm:text-lg">{card.title}</h3>
                  {card.description && (
                    <p className="relative mt-2 flex-1 text-xs leading-relaxed opacity-80 sm:text-sm">{card.description}</p>
                  )}
                  {card.href && (
                    <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-bold">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        {data.footnote && (
          <Reveal delay={120}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-ink-soft">{data.footnote}</p>
          </Reveal>
        )}

        {data.cta?.label && (
          <Reveal delay={160} className="mt-10 flex justify-center">
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
