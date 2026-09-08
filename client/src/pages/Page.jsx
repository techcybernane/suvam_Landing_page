import { useEffect } from "react";
import { usePageContent } from "../hooks/usePageContent.js";
import SectionRenderer from "../components/site/SectionRenderer.jsx";

// Section types that alternate cream/white background bands for visual
// rhythm — hero/CTA/contact sections have their own fixed treatment.
const ALTERNATING_TYPES = new Set(["textIntro", "iconGrid", "valueList", "processSteps", "columnGroups"]);

export default function Page({ slug }) {
  const { page, loading, error } = usePageContent(slug);

  useEffect(() => {
    if (!page?.seo) return;
    document.title = page.seo.title || "CybernaNet";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", page.seo.description || "");
  }, [page]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-6 text-center">
        <h1 className="text-xl font-bold text-ink">Page not found</h1>
        <p className="text-sm text-ink-soft">{error || "This page doesn't exist yet."}</p>
      </div>
    );
  }

  const orderedSections = [...page.sections].sort((a, b) => a.order - b.order);

  let toneCounter = 0;
  return (
    <>
      {orderedSections.map((section) => {
        const tone = ALTERNATING_TYPES.has(section.type) ? (toneCounter++ % 2 === 0 ? "cream" : "white") : undefined;
        return <SectionRenderer key={section.id} section={section} tone={tone} />;
      })}
    </>
  );
}
