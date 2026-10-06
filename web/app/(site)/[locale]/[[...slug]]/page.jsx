import { notFound } from "next/navigation";
import PageSections from "../../../../components/site/PageSections.jsx";
import SiteUnavailable from "../../../../components/site/SiteUnavailable.jsx";
import {
  getPage,
  getFaqs,
  BackendHttpError,
  BackendUnavailableError,
  BackendConfigError,
} from "../../../../lib/server-api.js";
import { slugFromSegments } from "../../../../lib/paths.js";
import { normalizeLocale, LOCALES, DEFAULT_LOCALE, localizeHref } from "../../../../lib/i18n.js";

export const dynamic = "force-dynamic";

async function loadPage(segments, locale) {
  const slug = slugFromSegments(segments);
  if (!slug) return { page: null, unavailable: false };

  try {
    const page = await getPage(slug, locale);
    return { page, unavailable: false };
  } catch (err) {
    if (err instanceof BackendHttpError && err.status === 404) {
      return { page: null, unavailable: false };
    }
    if (
      err instanceof BackendUnavailableError ||
      err instanceof BackendConfigError ||
      err instanceof BackendHttpError
    ) {
      console.error(`[page] ${slug} unavailable:`, err.message);
      return { page: null, unavailable: true };
    }
    console.error(`[page] ${slug} failed:`, err?.message || err);
    return { page: null, unavailable: true };
  }
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const { page } = await loadPage(slug, normalizeLocale(locale));
  if (!page?.seo) return {};

  // hreflang alternates: one canonical URL per language, so search engines
  // index the French and English versions separately instead of treating one
  // as a duplicate of the other.
  const route = "/" + (Array.isArray(slug) ? slug.join("/") : "");
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localizeHref(route, l)]));

  return {
    title: page.seo.title || "CybernaNet",
    description: page.seo.description || "",
    alternates: {
      canonical: localizeHref(route, normalizeLocale(locale)),
      languages: { ...languages, "x-default": localizeHref(route, DEFAULT_LOCALE) },
    },
  };
}

export default async function PublicPage({ params }) {
  const { slug, locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const { page, unavailable } = await loadPage(slug, locale);

  if (unavailable) {
    return <SiteUnavailable locale={locale} />;
  }
  if (!page) notFound();

  // FAQs only matter if the page actually renders a faq section; fetch lazily.
  const hasFaq = page.sections?.some((s) => s.type === "faq");
  const faqs = hasFaq ? await getFaqs(locale).catch(() => []) : [];

  return <PageSections sections={page.sections} faqs={faqs} />;
}
