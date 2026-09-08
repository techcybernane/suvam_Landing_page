import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "../ui/ScrollProgress.jsx";
import { useSiteMeta } from "../../hooks/useSiteMeta.js";

export default function PublicLayout() {
  const { meta, error } = useSiteMeta();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream px-6 text-center">
        <h1 className="text-xl font-bold text-ink">Couldn't load the site</h1>
        <p className="text-sm text-ink-soft">{error} — make sure the API server is running.</p>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Header brand={meta.brand} nav={meta.nav} />
      <main>
        <Outlet />
      </main>
      <Footer brand={meta.brand} footer={meta.footer} />
    </div>
  );
}
