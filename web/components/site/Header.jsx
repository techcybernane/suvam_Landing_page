"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import SmartLink from "../ui/SmartLink.jsx";
import LocaleSwitch from "../ui/LocaleSwitch.jsx";
import { useT } from "../../hooks/useLocale.js";

export default function Header({ brand, nav }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The mobile sheet is full-height; stop the page behind it from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!nav) return null;

  const isActive = (href) => href !== "/" && pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial ${
        scrolled || open
          ? "border-b border-white/[0.08] bg-void/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-void/80 to-transparent"
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between">
        <SmartLink href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal transition-all duration-500 ease-editorial group-hover:bg-signal group-hover:text-void">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-fluid-lg font-semibold tracking-tight text-bone">
            {brand?.name || "CybernaNet"}
          </span>
        </SmartLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.links?.map((link) =>
            link.children?.length ? (
              <div key={link.id} className="group relative">
                <button
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-fluid-sm font-medium transition-colors duration-300 ${
                    isActive(link.href) ? "text-bone" : "text-bone/55 hover:text-bone"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-[19rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-300 ease-editorial group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-bark/95 p-2 shadow-panel backdrop-blur-2xl">
                    {link.children.map((child, i) => (
                      <SmartLink
                        key={child.id}
                        href={child.href}
                        className="group/item flex items-center gap-3 rounded-xl px-3.5 py-3 text-fluid-sm font-medium text-bone/60 transition-colors duration-300 hover:bg-white/[0.05] hover:text-bone"
                      >
                        <span className="font-mono text-[0.6rem] text-signal/60">{String(i + 1).padStart(2, "0")}</span>
                        {child.label}
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                      </SmartLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <SmartLink
                key={link.id}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-fluid-sm font-medium transition-colors duration-300 ${
                  isActive(link.href) ? "text-bone" : "text-bone/55 hover:text-bone"
                }`}
              >
                {link.label}
              </SmartLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitch />
          {nav.ctaPrimary?.label && (
            <SmartLink href={nav.ctaPrimary.href} className="btn-primary !px-6 !py-3">
              {nav.ctaPrimary.label}
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitch />
          <button
          className="rounded-lg p-2 text-bone"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/[0.08] bg-void px-6 pb-10 lg:hidden">
          <nav className="flex flex-col pt-3">
            {nav.links?.map((link, i) => (
              <div key={link.id} className="border-b border-white/[0.06]">
                <SmartLink href={link.href} className="flex items-center gap-4 py-4">
                  <span className="font-mono text-[0.62rem] text-signal/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-fluid-lg font-medium text-bone">{link.label}</span>
                </SmartLink>
                {link.children?.length > 0 && (
                  <div className="ml-10 border-l border-white/[0.08] pb-3 pl-4">
                    {link.children.map((child) => (
                      <SmartLink
                        key={child.id}
                        href={child.href}
                        className="block py-2 text-fluid-sm text-bone/50 transition-colors hover:text-bone"
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
            <SmartLink href={nav.ctaPrimary.href} className="btn-primary mt-8 w-full">
              {nav.ctaPrimary.label}
              <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          )}
        </div>
      )}
    </header>
  );
}
