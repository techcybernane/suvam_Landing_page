import { Router } from "express";
import { getContent, saveContent } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function getPageOr404(content, slug, res) {
  const page = content.pages[slug];
  if (!page) {
    res.status(404).json({ error: `Unknown page "${slug}"` });
    return null;
  }
  return page;
}

// Public: brand, nav, footer — shared across every page
router.get("/meta", (req, res) => {
  const { brand, nav, footer } = getContent();
  res.json({ brand, nav, footer });
});

// Admin: update brand/nav/footer
router.put("/meta", requireAuth, (req, res) => {
  const content = getContent();
  const { brand, nav, footer } = req.body || {};
  const next = {
    ...content,
    brand: brand ?? content.brand,
    nav: nav ?? content.nav,
    footer: footer ?? content.footer,
  };
  saveContent(next);
  res.json({ brand: next.brand, nav: next.nav, footer: next.footer });
});

// Public: list of pages (slug + title) — used for admin nav and sitemaps
router.get("/pages", (req, res) => {
  const content = getContent();
  const list = Object.entries(content.pages).map(([slug, page]) => ({
    slug,
    title: page.seo?.title || slug,
  }));
  res.json(list);
});

// Public: one page's full content (seo + sections)
router.get("/pages/:slug", (req, res) => {
  const content = getContent();
  const page = getPageOr404(content, req.params.slug, res);
  if (!page) return;
  res.json(page);
});

// Admin: update a page's SEO fields
router.put("/pages/:slug/seo", requireAuth, (req, res) => {
  const content = getContent();
  const page = getPageOr404(content, req.params.slug, res);
  if (!page) return;

  page.seo = { ...page.seo, ...(req.body || {}) };
  saveContent(content);
  res.json(page);
});

// Admin: update a single section's data/visibility
router.put("/pages/:slug/sections/:id", requireAuth, (req, res) => {
  const content = getContent();
  const page = getPageOr404(content, req.params.slug, res);
  if (!page) return;

  const idx = page.sections.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Section not found" });

  const { data, visible } = req.body || {};
  page.sections[idx] = {
    ...page.sections[idx],
    data: data ?? page.sections[idx].data,
    visible: typeof visible === "boolean" ? visible : page.sections[idx].visible,
  };
  saveContent(content);
  res.json(page.sections[idx]);
});

// Admin: reorder a page's sections — expects an array of section ids in the new order
router.put("/pages/:slug/sections/reorder", requireAuth, (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) return res.status(400).json({ error: "order must be an array of section ids" });

  const content = getContent();
  const page = getPageOr404(content, req.params.slug, res);
  if (!page) return;

  const byId = new Map(page.sections.map((s) => [s.id, s]));
  const reordered = order
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((s, i) => ({ ...s, order: i }));

  if (reordered.length !== page.sections.length) {
    return res.status(400).json({ error: "order must include every existing section id" });
  }

  page.sections = reordered;
  saveContent(content);
  res.json(page.sections);
});

export default router;
