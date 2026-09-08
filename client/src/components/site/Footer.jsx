import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import SmartLink from "../ui/SmartLink.jsx";

export default function Footer({ brand, footer }) {
  if (!footer) return null;

  return (
    <footer className="relative overflow-hidden bg-forest text-white/80">
      <div
        className="bg-dot-grid-light pointer-events-none absolute inset-x-0 top-0 h-64"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative py-16">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-forest shadow-lift">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                  <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-2xl font-extrabold leading-none tracking-tight text-white">{brand?.name || "CybernaNet"}</p>
                <p className="mt-1.5 text-xs font-bold uppercase tracking-widest text-lime-glow">{brand?.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">{footer.tagline}</p>

            <SmartLink
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-lime hover:text-white"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          </div>

          {footer.columns?.map((col) => (
            <div key={col.id}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-lime-glow">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links?.map((link) => (
                  <li key={link.id}>
                    <SmartLink
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-200 hover:translate-x-0.5 hover:text-lime-glow"
                    >
                      {link.href?.startsWith("tel:") && <Phone className="h-3.5 w-3.5 shrink-0" />}
                      {link.href?.startsWith("mailto:") && <Mail className="h-3.5 w-3.5 shrink-0" />}
                      {col.title === "Headquarters" && link.href === "/contact" && <MapPin className="h-3.5 w-3.5 shrink-0" />}
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">{footer.copyright}</p>
          <div className="flex gap-5">
            {footer.social?.map((s) => (
              <SmartLink key={s.id} href={s.href} className="text-xs font-medium text-white/60 hover:text-lime-glow">
                {s.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
