import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import SmartLink from "../ui/SmartLink.jsx";

export default function Header({ brand, nav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (!nav) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <SmartLink href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-forest">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-lime">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {brand?.name || "CybernaNet"}
        </SmartLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.links?.map((link) =>
            link.children?.length ? (
              <div key={link.id} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl2 border border-line bg-white p-2 shadow-lift">
                    {link.children.map((child) => (
                      <SmartLink
                        key={child.id}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-cream hover:text-ink"
                      >
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <SmartLink
                key={link.id}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </SmartLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {nav.ctaPrimary?.label && (
            <SmartLink href={nav.ctaPrimary.href} className="btn-primary">
              {nav.ctaPrimary.label}
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-cream px-6 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            {nav.links?.map((link) => (
              <div key={link.id}>
                <SmartLink
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white hover:text-ink"
                >
                  {link.label}
                </SmartLink>
                {link.children?.length > 0 && (
                  <div className="ml-3 border-l border-line pl-3">
                    {link.children.map((child) => (
                      <SmartLink
                        key={child.id}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-white hover:text-ink"
                      >
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {nav.ctaPrimary?.label && (
            <SmartLink href={nav.ctaPrimary.href} className="btn-primary mt-4 w-full">
              {nav.ctaPrimary.label}
            </SmartLink>
          )}
        </div>
      )}
    </header>
  );
}
