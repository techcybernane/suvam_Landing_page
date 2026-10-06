import Header from "../../../components/site/Header.jsx";
import Footer from "../../../components/site/Footer.jsx";
import ScrollProgress from "../../../components/ui/ScrollProgress.jsx";
import ScrollToTop from "../../../components/ui/ScrollToTop.jsx";
import SmoothScroll from "../../../components/ui/SmoothScroll.jsx";
import { getSiteMeta } from "../../../lib/server-api.js";
import { FALLBACK_META } from "../../../lib/fallback-meta.js";
import { normalizeLocale } from "../../../lib/i18n.js";

// The locale segment is a rewrite target for the default language, so this
// layout re-resolves per request and always matches the URL being served.
export default async function SiteLayout({ children, params }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  let meta = FALLBACK_META;
  try {
    meta = await getSiteMeta(locale);
  } catch (err) {
    // Keep a branded shell online when the CMS is down; page content handles
    // its own unavailable state. Log the real cause for operators.
    console.error("[site-layout] meta fetch failed:", err?.message || err);
  }

  return (
    // `grain` lays a fixed film-noise wash over the whole page — the texture
    // that keeps large flat dark areas from looking like dead pixels.
    <div className="grain min-h-screen bg-void">
      <SmoothScroll />
      <ScrollProgress />
      <Header brand={meta.brand} nav={meta.nav} locale={locale} />
      {/* Header is fixed, so the page owns its own top offset per-section. */}
      <main>{children}</main>
      <Footer brand={meta.brand} footer={meta.footer} locale={locale} />
      <ScrollToTop />
    </div>
  );
}
