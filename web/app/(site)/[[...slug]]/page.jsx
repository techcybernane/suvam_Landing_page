import { notFound } from "next/navigation";
import PageSections from "../../../components/site/PageSections.jsx";
import { getPage, getFaqs } from "../../../lib/server-api.js";
import { slugFromSegments } from "../../../lib/paths.js";

export const dynamic = "force-dynamic";

async function loadPage(segments) {
  const slug = slugFromSegments(segments);
  if (!slug) return null;
  try {
    return await getPage(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await loadPage(slug);
  if (!page?.seo) return {};
  return {
    title: page.seo.title || "CybernaNet",
    description: page.seo.description || "",
  };
}

export default async function PublicPage({ params }) {
  const { slug } = await params;
  const page = await loadPage(slug);
  if (!page) notFound();

  // FAQs only matter if the page actually renders a faq section; fetch lazily.
  const hasFaq = page.sections?.some((s) => s.type === "faq");
  const faqs = hasFaq ? await getFaqs().catch(() => []) : [];

  return <PageSections sections={page.sections} faqs={faqs} />;
}
