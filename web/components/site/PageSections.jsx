"use client";

import { usePathname } from "next/navigation";
import SectionRenderer from "./SectionRenderer.jsx";

// Sections that take part in the dark/deep band alternation. Heroes, CTA
// banners and the contact block own their treatment and opt out.
const BANDED_TYPES = new Set([
  "textIntro",
  "iconGrid",
  "valueList",
  "processSteps",
  "columnGroups",
  "featureSplit",
  "marquee",
  "statsBand",
  "logoStrip",
  "tabbedPillars",
  "showcaseCarousel",
  "timeline",
  "commitments",
  "faq",
]);

// Sections that carry a "02 / kicker" ordinal, counted in page order — the
// running index is what makes the page read as one numbered document.
const NUMBERED_TYPES = new Set([
  "featureSplit",
  "iconGrid",
  "valueList",
  "processSteps",
  "columnGroups",
  "textIntro",
  "tabbedPillars",
  "showcaseCarousel",
  "timeline",
  "commitments",
  "statsBand",
  "contact",
  "faq",
]);

export default function PageSections({ sections = [], faqs = [] }) {
  const pathname = usePathname();
  const ordered = [...sections].sort((a, b) => a.order - b.order);

  let bandCounter = 0;
  let numCounter = 0;

  return (
    <>
      {ordered.map((section) => {
        let tone;
        if (BANDED_TYPES.has(section.type)) {
          // `data.tone` is an explicit per-section override from the admin panel;
          // otherwise bands alternate between the two dark grounds.
          tone = section.data?.tone || (bandCounter++ % 2 === 0 ? "dark" : "deep");
        }

        const num =
          section.visible && NUMBERED_TYPES.has(section.type)
            ? String(++numCounter).padStart(2, "0")
            : undefined;

        return (
          <SectionRenderer
            key={section.id}
            section={section}
            faqs={faqs}
            tone={tone}
            num={num}
            pathname={pathname}
          />
        );
      })}
    </>
  );
}
