import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Reveal from "../../ui/Reveal.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { breadcrumbFor } from "../../../lib/breadcrumb.js";

export default function PageHero({ data }) {
  const location = useLocation();
  if (!data) return null;
  const crumbs = breadcrumbFor(location.pathname);

  return (
    <section className="bg-dot-grid relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-forest/5 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative">
        <Reveal variant="fade">
          <nav className="mb-8 flex flex-wrap items-center justify-center gap-1.5 text-xs font-semibold text-ink-soft">
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-ink-soft/50" />}
                {i === crumbs.length - 1 ? (
                  <span className="text-forest">{crumb.label}</span>
                ) : (
                  <SmartLink href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </SmartLink>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <div className="mx-auto max-w-3xl text-center">
          {data.eyebrow && (
            <Reveal>
              <span className="eyebrow">{data.eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {data.heading}
            </h1>
          </Reveal>
          {data.subtext && (
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {data.subtext}
              </p>
            </Reveal>
          )}
          {data.ctas?.length > 0 && (
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {data.ctas.map((cta, i) => (
                  <SmartLink key={i} href={cta.href} className={i === 0 ? "btn-primary" : "btn-outline"}>
                    {cta.label}
                    {i === 0 && <ArrowUpRight className="h-4 w-4" />}
                  </SmartLink>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={280} className="mx-auto mt-12 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>
    </section>
  );
}
