import {
  ArrowUpRight, ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database,
  GraduationCap, Building2, Landmark, Rocket,
} from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { toneOf } from "../../../lib/tone.js";
import { useT } from "../../../hooks/useLocale.js";

const ICONS = [
  ShieldCheck, Network, Cloud, Code2, Wrench, Compass, Database,
  GraduationCap, Building2, Landmark, Rocket,
];

function Card({ card, index, total, t, tr }) {
  const Icon = ICONS[index % ICONS.length];
  const Wrapper = card.href ? SmartLink : "div";

  return (
    <Reveal delay={index * 70} className="h-full">
      <Wrapper
        href={card.href}
        className={`group relative flex h-full min-h-[250px] flex-col overflow-hidden border p-8 transition-all duration-500 ease-editorial hover:-translate-y-1 ${t.card} ${t.cardHover} rounded-[22px]`}
      >
        {/* Index numeral sits behind the content and lifts on hover. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute right-4 top-2 select-none font-display text-[4.5rem] font-semibold leading-none tracking-tightest transition-all duration-700 ease-editorial group-hover:-translate-y-1 ${
            t.light ? "text-void/[0.045] group-hover:text-signal-deep/15" : "text-white/[0.045] group-hover:text-signal/20"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 ease-editorial ${t.border} ${
            t.light
              ? "bg-bone text-signal-deep group-hover:bg-void group-hover:text-signal"
              : "bg-white/[0.04] text-signal group-hover:bg-signal group-hover:text-void"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <h3 className={`relative mt-7 text-fluid-lg font-semibold leading-snug tracking-tight ${t.heading}`}>
          {card.title}
        </h3>
        {card.description && (
          <p className={`relative mt-3 flex-1 text-fluid-sm leading-relaxed ${t.body}`}>{card.description}</p>
        )}
        {card.href && (
          <span className={`relative mt-7 inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] ${t.accent}`}>
            {tr("explore")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </Wrapper>
    </Reveal>
  );
}

export default function IconGrid({ data, tone, num }) {
  const tr = useT();
  if (!data) return null;
  const t = toneOf(tone);
  const count = data.cards?.length ?? 0;
  // Prefer a column count that leaves no orphan on the last row.
  const gridCols =
    count % 4 === 0 && count >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : count >= 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className={`${t.grid} pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.tag || data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
        />

        <div className={`${data.heading || data.intro || data.tag ? "mt-16" : ""} grid grid-cols-1 gap-5 ${gridCols}`}>
          {data.cards?.map((card, i) => (
            <Card key={card.id || i} card={card} index={i} total={count} t={t} tr={tr} />
          ))}
        </div>

        {data.footnote && (
          <Reveal delay={120}>
            <p className={`mx-auto mt-12 max-w-2xl text-center font-serif text-fluid-lg italic ${
              t.light ? "text-signal-deep" : "text-signal-soft"
            }`}>
              {data.footnote}
            </p>
          </Reveal>
        )}

        {data.cta?.label && (
          <Reveal delay={160} className="mt-14 flex justify-center">
            <SmartLink href={data.cta.href} className={t.light ? "btn-dark" : "btn-primary"}>
              {data.cta.label}
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
