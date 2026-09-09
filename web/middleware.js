import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n.js";

/**
 * Locale routing for the public site.
 *
 * The default locale is served on clean, unprefixed URLs ("/about") and is
 * *rewritten* — not redirected — onto the internal /[locale] segment, so the
 * visitor's address bar never grows an "/en". Other locales keep their real
 * prefix ("/fr/about") because each language needs its own indexable URL.
 *
 * An explicit "/en/..." redirects down to the bare path so there is exactly
 * one canonical URL per page per language.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (segment === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  // The resolved locale rides along in a header so the root layout — which
  // sits above the [locale] segment and therefore has no params — can still
  // set <html lang>.
  if (LOCALES.includes(segment)) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", segment);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  const headers = new Headers(request.headers);
  headers.set("x-locale", DEFAULT_LOCALE);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Everything except the admin app, API routes, Next internals and static files.
  matcher: ["/((?!admin|api|_next/static|_next/image|favicon|icons|uploads|.*\\..*).*)"],
};
