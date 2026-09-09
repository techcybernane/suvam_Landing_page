"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

// Matches the field styling used by the public contact form, so the console's
// front door reads as part of the same product rather than a leftover screen.
const FIELD =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-fluid-sm text-bone outline-none transition-colors duration-300 placeholder:text-bone/25 focus:border-signal/60 focus:bg-white/[0.07]";
const LABEL = "mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone/40";

export default function AdminLogin() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/admin");
  }, [loading, user, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(form.email, form.password);
      router.replace("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-6 py-16">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[150px]"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="mb-9 flex flex-col items-center gap-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-signal/30 bg-signal/10 text-signal">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
              <path d="M6 7l6 11 6-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-signal">Admin Console</p>
            <h1 className="mt-3 text-fluid-2xl font-semibold leading-[1.02] tracking-tightest text-bone">
              CybernaNet
            </h1>
            <p className="mt-3 text-fluid-sm text-bone/50">Sign in to manage the website</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-8 shadow-panel backdrop-blur-sm"
        >
          <div className="mb-5">
            <label className={LABEL} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              autoComplete="username"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={FIELD}
              placeholder="admin@vertexa.io"
            />
          </div>
          <div className="mb-6">
            <label className={LABEL} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className={FIELD}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-fluid-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Signing in…" : "Sign In"}
            {!submitting && <ArrowUpRight className="h-4 w-4" />}
          </button>

          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone/25">
            <Lock className="h-3 w-3" aria-hidden />
            Authorized access only
          </p>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-bone/40 transition-colors duration-300 hover:text-signal"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-x-0.5" />
            Back to the site
          </Link>
        </div>
      </div>
    </div>
  );
}
