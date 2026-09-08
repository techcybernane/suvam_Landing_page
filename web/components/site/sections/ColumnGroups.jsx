import { Check } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import { toneOf } from "../../../lib/tone.js";

function Group({ group, index, t }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] border p-8 transition-all duration-500 ease-editorial hover:-translate-y-1 ${t.card} ${t.cardHover}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute right-4 top-2 select-none font-display text-[4.5rem] font-semibold leading-none tracking-tightest transition-colors duration-700 ${
            t.light ? "text-void/[0.045] group-hover:text-signal-deep/15" : "text-white/[0.045] group-hover:text-signal/20"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className={`relative inline-flex h-1 w-10 rounded-full ${t.light ? "bg-signal-deep" : "bg-signal"}`} />
        <h3 className={`relative mt-6 text-fluid-lg font-semibold tracking-tight ${t.heading}`}>{group.title}</h3>
        {group.intro && <p className={`relative mt-3 text-fluid-sm leading-relaxed ${t.body}`}>{group.intro}</p>}

        {group.items?.length > 0 && (
          <ul className="relative mt-6 space-y-3">
            {group.items.map((item, i) => (
              <li key={i} className={`flex items-start gap-2.5 text-fluid-sm ${t.body}`}>
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent}`} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export default function ColumnGroups({ data, tone, num }) {
  if (!data?.groups?.length) return null;
  const t = toneOf(tone);
  const count = data.groups.length;
  // Prefer a column count that leaves no orphan on the last row.
  const gridCols = count % 4 === 0 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`section-pad relative overflow-hidden border-t ${t.border} ${t.bg}`}>
      <div className="animate-breathe pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-signal/[0.07] blur-[120px]" aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          num={num}
          kicker={data.kicker}
          heading={data.heading}
          accent={data.accent}
          intro={data.intro}
          tone={tone}
        />

        <div className={`${data.heading || data.intro ? "mt-16" : ""} grid gap-5 ${gridCols}`}>
          {data.groups.map((group, i) => (
            <Group key={group.id || i} group={group} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
