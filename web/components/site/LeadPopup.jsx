"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { stripLocale } from "../../lib/i18n.js";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { api } from "../../lib/api.js";
import LiveDot from "../ui/LiveDot.jsx";
import { useT } from "../../hooks/useLocale.js";

const STORAGE_KEY = "cybernanet:lead-popup";
const EMPTY = { name: "", email: "", phone: "", service: "", message: "" };

const FIELD =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-fluid-sm text-bone outline-none transition-colors duration-300 placeholder:text-bone/25 focus:border-signal/60 focus:bg-white/[0.07]";
const LABEL = "mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone/40";

/** Remember a dismissal/submission so the modal doesn't nag on every visit. */
function suppressedUntil() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(JSON.parse(raw).until) || 0 : 0;
  } catch {
    return 0;
  }
}

function suppressFor(days) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ until: Date.now() + Math.max(0, days) * 86400000 })
    );
  } catch {
    /* private mode — the popup simply reappears next session */
  }
}

/**
 * Timed lead-capture modal. Opens after `delaySeconds` on the site, or earlier
 * if the pointer leaves toward the browser chrome (exit intent). Submissions go
 * to the same /leads endpoint as the contact form, tagged source "Popup Form",
 * so they show up in Admin → Leads alongside everything else.
 *
 * All copy, timing and the suppression window are editable from
 * Admin → Site & SEO.
 */
export default function LeadPopup({ config }) {
  const tr = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const openedRef = useRef(false);

  const enabled =
    !!config?.enabled && !(config.hideOnPaths || []).some((p) => p && stripLocale(pathname) === p);
  const repeatDays = Number(config?.repeatAfterDays ?? 7);

  const show = useCallback(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (Date.now() < suppressedUntil()) return;

    const delay = Math.max(0, Number(config.delaySeconds ?? 25)) * 1000;
    const timer = setTimeout(show, delay);

    // Exit intent: pointer heading out of the top of the viewport.
    let onLeave;
    if (config.exitIntent) {
      onLeave = (e) => {
        if (e.clientY <= 0) show();
      };
      document.addEventListener("mouseout", onLeave);
    }

    return () => {
      clearTimeout(timer);
      if (onLeave) document.removeEventListener("mouseout", onLeave);
    };
  }, [enabled, config, show]);

  // Lock the page, trap focus loosely, and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector("input")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    suppressFor(repeatDays);
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await api.post("/leads", { ...form, source: "Popup Form" });
      setStatus("success");
      setForm(EMPTY);
      // A submitted visitor shouldn't see this again for a good while.
      suppressFor(Math.max(repeatDays, 30));
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  if (!enabled || !open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label={tr("close")}
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-void/80 backdrop-blur-sm"
        style={{ animation: "popup-fade 320ms cubic-bezier(0.16,1,0.3,1) both" }}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
        className="relative grid w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/[0.1] bg-bark shadow-panel md:grid-cols-[0.85fr_1fr]"
        style={{ animation: "popup-in 480ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <button
          onClick={close}
          aria-label={tr("close")}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-void/60 text-bone/70 backdrop-blur-sm transition-colors duration-300 hover:bg-void hover:text-bone"
        >
          <X className="h-4 w-4" />
        </button>

        {/* --- pitch side --- */}
        <div className="relative hidden overflow-hidden md:block">
          {config.image && (
            <img src={config.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,13,26,0.96),rgba(8,13,26,0.55))]"
            aria-hidden
          />
          <div className="relative flex h-full flex-col justify-end p-8">
            {config.eyebrow && (
              <span className="eyebrow mb-5 self-start">
                <LiveDot />
                {config.eyebrow}
              </span>
            )}
            <h2 id="lead-popup-title" className="text-fluid-xl font-semibold leading-[1.06] tracking-tightest text-bone">
              {config.heading} {config.accent && <span className="accent">{config.accent}</span>}
            </h2>
            {config.body && <p className="mt-4 text-fluid-sm leading-relaxed text-bone/60">{config.body}</p>}
          </div>
        </div>

        {/* --- form side --- */}
        <div className="p-7 sm:p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-[19rem] flex-col items-center justify-center gap-4 text-center">
              <CheckCircle2 className="h-11 w-11 text-signal" />
              <h3 className="text-fluid-lg font-semibold text-bone">{config.successHeading || tr("requestSent")}</h3>
              <p className="max-w-xs text-fluid-sm text-bone/55">{config.successBody}</p>
              <button onClick={close} className="btn-outline mt-2">
                {tr("close")}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Repeated on small screens where the pitch panel is hidden. */}
              <div className="md:hidden">
                <h2 className="text-fluid-lg font-semibold leading-tight tracking-tight text-bone">
                  {config.heading} {config.accent && <span className="accent">{config.accent}</span>}
                </h2>
                {config.body && <p className="mt-2 text-fluid-sm leading-relaxed text-bone/55">{config.body}</p>}
              </div>

              {config.serviceOptions?.length > 0 && (
                <div>
                  <span className={LABEL}>{config.serviceLabel || "What do you need help with?"}</span>
                  <div className="flex flex-wrap gap-2">
                    {config.serviceOptions.map((opt) => {
                      const on = form.service === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setForm((f) => ({ ...f, service: on ? "" : opt }))}
                          className={`rounded-pill border px-3.5 py-1.5 text-[0.75rem] font-medium transition-all duration-300 ease-editorial ${
                            on
                              ? "border-signal bg-signal text-void"
                              : "border-white/[0.1] bg-white/[0.04] text-bone/60 hover:border-signal/50 hover:text-bone"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="popup-name">{tr("fullName")}</label>
                  <input id="popup-name" name="name" required value={form.name} onChange={onChange} className={FIELD} placeholder={tr("namePlaceholder")} />
                </div>
                <div>
                  <label className={LABEL} htmlFor="popup-phone">{tr("phone")}</label>
                  <input id="popup-phone" name="phone" value={form.phone} onChange={onChange} className={FIELD} placeholder={tr("phonePlaceholder")} />
                </div>
              </div>

              <div>
                <label className={LABEL} htmlFor="popup-email">{tr("email")}</label>
                <input id="popup-email" type="email" name="email" required value={form.email} onChange={onChange} className={FIELD} placeholder={tr("emailPlaceholder")} />
              </div>

              <div>
                <label className={LABEL} htmlFor="popup-message">{tr("popupMessageLabel")}</label>
                <textarea id="popup-message" name="message" rows={2} value={form.message} onChange={onChange} className={`${FIELD} resize-none`} placeholder={tr("popupMessagePlaceholder")} />
              </div>

              {status === "error" && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-fluid-sm text-red-300">{error}</p>
              )}

              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
                {status === "submitting" ? tr("sending") : config.submitLabel || tr("sendRequest")}
                {status !== "submitting" && <ArrowUpRight className="h-4 w-4" />}
              </button>

              <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone/25">
                {config.privacyNote || "No obligation · No spam"}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
