import { notFound } from "next/navigation";
import PageSections from "../../../../components/site/PageSections.jsx";
import { getPage, getFaqs } from "../../../../lib/server-api.js";
import { slugFromSegments } from "../../../../lib/paths.js";
import { normalizeLocale, LOCALES, DEFAULT_LOCALE, localizeHref } from "../../../../lib/i18n.js";

export const dynamic = "force-dynamic";

async function loadPage(segments, locale) {
  const slug = slugFromSegments(segments);
  if (!slug) return null;
  try {
    return await getPage(slug, locale);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const page = await loadPage(slug, normalizeLocale(locale));
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
  const page = await loadPage(slug, locale);
  if (!page) notFound();

  // FAQs only matter if the page actually renders a faq section; fetch lazily.
  const hasFaq = page.sections?.some((s) => s.type === "faq");
  const faqs = hasFaq ? await getFaqs(locale).catch(() => []) : [];

  return <PageSections sections={page.sections} faqs={faqs} />;
}
