import Header from "../../../components/site/Header.jsx";
import Footer from "../../../components/site/Footer.jsx";
import LeadPopup from "../../../components/site/LeadPopup.jsx";
import ScrollProgress from "../../../components/ui/ScrollProgress.jsx";
import SmoothScroll from "../../../components/ui/SmoothScroll.jsx";
import { getSiteMeta } from "../../../lib/server-api.js";
import { normalizeLocale } from "../../../lib/i18n.js";

// The locale segment is a rewrite target for the default language, so this
// layout re-resolves per request and always matches the URL being served.
export default async function SiteLayout({ children, params }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  let meta = null;
  try {
    meta = await getSiteMeta(locale);
  } catch {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-void px-6 text-center">
        <h1 className="text-fluid-xl font-semibold text-bone">Couldn&apos;t load the site</h1>
        <p className="text-fluid-sm text-bone/50">Make sure the API server is running on port 4000.</p>
      </div>
    );
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
      <LeadPopup config={meta.popup} />
    </div>
  );
}
