import { Router } from "express";
import { randomUUID } from "crypto";
import { faqs } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";
import { normalizeLocale, DEFAULT_LOCALE } from "../i18n.js";

const router = Router();

// FAQs carry their own locale rather than living in the content tree, so each
// language keeps an independent list. Entries written before i18n have no
// locale field and are treated as belonging to the default locale.
const localeOf = (req) => normalizeLocale(req.query.locale);
const faqLocale = (f) => f.locale || DEFAULT_LOCALE;

// Public: only enabled FAQs, sorted by order
router.get("/", (req, res) => {
  const locale = localeOf(req);
  const list = faqs
    .all()
    .filter((f) => f.enabled && faqLocale(f) === locale)
    .sort((a, b) => a.order - b.order);
  res.json(list);
});

// Admin: every FAQ regardless of enabled state
router.get("/all", requireAuth, (req, res) => {
  const locale = localeOf(req);
  const list = faqs
    .all()
    .filter((f) => faqLocale(f) === locale)
    .sort((a, b) => a.order - b.order);
  res.json(list);
});

router.post("/", requireAuth, (req, res) => {
  const { question, answer, category, enabled } = req.body || {};
  if (!question || !answer) {
    return res.status(400).json({ error: "question and answer are required" });
  }
  const locale = localeOf(req);
  const maxOrder = Math.max(-1, ...faqs.all().filter((f) => faqLocale(f) === locale).map((f) => f.order));
  const item = faqs.create({
    id: randomUUID(),
    locale,
    question,
    answer,
    category: category || "General",
    enabled: enabled ?? true,
    order: maxOrder + 1,
  });
  res.status(201).json(item);
});

router.put("/:id", requireAuth, (req, res) => {
  const updated = faqs.updateById(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: "FAQ not found" });
  res.json(updated);
});

router.delete("/:id", requireAuth, (req, res) => {
  const ok = faqs.deleteById(req.params.id);
  if (!ok) return res.status(404).json({ error: "FAQ not found" });
  res.json({ ok: true });
});

router.put("/reorder/all", requireAuth, (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) return res.status(400).json({ error: "order must be an array of ids" });
  const locale = localeOf(req);
  const items = faqs.all();
  const byId = new Map(items.map((f) => [f.id, f]));
  const reordered = order.map((id, i) => ({ ...byId.get(id), order: i })).filter((f) => f.id);
  const untouched = items.filter((f) => faqLocale(f) !== locale && !order.includes(f.id));
  faqs.replaceAll([...untouched, ...reordered]);
  res.json(reordered);
});

export default router;
