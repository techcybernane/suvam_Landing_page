import { ArrowUpRight, ChevronRight } from "lucide-react";
import Reveal from "../../ui/Reveal.jsx";
import RevealWords from "../../ui/RevealWords.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import LiveDot from "../../ui/LiveDot.jsx";
import { breadcrumbFor } from "../../../lib/breadcrumb.js";

/**
 * Inner-page masthead. Always dark so every page opens on the same note as the
 * home hero, with an optional photographic backdrop under heavy scrims.
 */
export default function PageHero({ data, pathname = "/" }) {
  if (!data) return null;
  const crumbs = breadcrumbFor(pathname);
  const hasImage = !!data.image;

  return (
    <section className="relative overflow-hidden bg-void pb-24 pt-32 md:pb-28 md:pt-40">
      {hasImage && (
        <img src={data.image} alt="" aria-hidden className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
      )}
      <div
        className={`absolute inset-0 ${
          hasImage
            ? "bg-[linear-gradient(to_top,#04070F_6%,rgba(4,7,15,0.82)_45%,rgba(4,7,15,0.68)_100%)]"
            : "bg-[radial-gradient(90%_70%_at_50%_0%,rgba(14,22,38,0.9),#04070F_72%)]"
        }`}
        aria-hidden
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" aria-hidden />

      <div className="container-page relative">
        <Reveal variant="fade" eager duration={700}>
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap items-center justify-center gap-1.5 font-mono text-fluid-xs text-bone/45">
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-bone/25" />}
                {i === crumbs.length - 1 ? (
                  <span className="text-signal">{crumb.label}</span>
                ) : (
                  <SmartLink href={crumb.href} className="transition-colors duration-300 hover:text-bone">
                    {crumb.label}
                  </SmartLink>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <div className="mx-auto max-w-4xl text-center">
          {data.eyebrow && (
            <Reveal eager delay={80}>
              <span className="eyebrow">
                <LiveDot />
                {data.eyebrow}
              </span>
            </Reveal>
          )}
          <RevealWords
            eager
            as="h1"
            start={160}
            stagger={55}
            text={data.heading}
            highlight={data.accent}
            className="mt-7 text-fluid-3xl font-semibold leading-[0.94] tracking-tightest text-bone"
          />
          {data.subtext && (
            <Reveal eager variant="blur" delay={340} duration={1000}>
              <p className="mx-auto mt-8 max-w-2xl text-fluid-base leading-relaxed text-bone/60">{data.subtext}</p>
            </Reveal>
          )}
          {data.ctas?.length > 0 && (
            <Reveal eager delay={460}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
      </div>
    </section>
  );
}
