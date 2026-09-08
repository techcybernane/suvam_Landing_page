import { ArrowUpRight, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import SmartLink from "../ui/SmartLink.jsx";
import Reveal from "../ui/Reveal.jsx";

export default function Footer({ brand, footer }) {
  if (!footer) return null;
  const name = brand?.name || "CybernaNet";

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-bark text-bone/70">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" aria-hidden />
      <div className="animate-breathe pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-signal/10 blur-[130px]" aria-hidden />

      <div className="container-page relative pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-signal/30 bg-signal/10 text-signal">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                  <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-display text-fluid-xl font-semibold leading-none tracking-tight text-bone">{name}</p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal">{brand?.tagline}</p>
              </div>
            </div>
            <p className="mt-7 max-w-sm text-fluid-sm leading-relaxed text-bone/50">{footer.tagline}</p>

            <SmartLink href="/contact" className="btn-outline mt-8">
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          </Reveal>

          {footer.columns?.map((col, ci) => (
            <Reveal key={col.id} delay={(ci + 1) * 90}>
              <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-bone/35">{col.title}</h4>
              <ul className="mt-6 space-y-3.5">
                {col.links?.map((link) => (
                  <li key={link.id}>
                    <SmartLink
                      href={link.href}
                      className="inline-flex items-center gap-2 text-fluid-sm text-bone/55 transition-all duration-300 ease-editorial hover:translate-x-1 hover:text-signal"
                    >
                      {link.href?.startsWith("tel:") && <Phone className="h-3.5 w-3.5 shrink-0" />}
                      {link.href?.startsWith("mailto:") && <Mail className="h-3.5 w-3.5 shrink-0" />}
                      {col.title === "Headquarters" && link.href === "/contact" && <MapPin className="h-3.5 w-3.5 shrink-0" />}
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.08] py-8 sm:flex-row">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone/30">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            {footer.social?.map((s) => (
              <SmartLink key={s.id} href={s.href} className="text-fluid-xs font-medium text-bone/50 transition-colors hover:text-signal">
                {s.label}
              </SmartLink>
            ))}
            <a href="#hero" className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/40 transition-colors hover:text-signal">
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized outlined wordmark closing the page, clipped by the fold. */}
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden>
        <p className="stroke-text -mb-[0.22em] whitespace-nowrap text-center font-display text-fluid-mega font-semibold leading-[0.78] tracking-tightest">
          {name}
        </p>
      </div>
    </footer>
  );
}
