import { Router } from "express";
import { randomUUID } from "crypto";
import { faqs } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: only enabled FAQs, sorted by order
router.get("/", (req, res) => {
  const list = faqs
    .all()
    .filter((f) => f.enabled)
    .sort((a, b) => a.order - b.order);
  res.json(list);
});

// Admin: every FAQ regardless of enabled state
router.get("/all", requireAuth, (req, res) => {
  const list = faqs.all().sort((a, b) => a.order - b.order);
  res.json(list);
});

router.post("/", requireAuth, (req, res) => {
  const { question, answer, category, enabled } = req.body || {};
  if (!question || !answer) {
    return res.status(400).json({ error: "question and answer are required" });
  }
  const maxOrder = Math.max(-1, ...faqs.all().map((f) => f.order));
  const item = faqs.create({
    id: randomUUID(),
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
  const items = faqs.all();
  const byId = new Map(items.map((f) => [f.id, f]));
  const reordered = order.map((id, i) => ({ ...byId.get(id), order: i })).filter((f) => f.id);
  faqs.replaceAll(reordered);
  res.json(reordered);
});

export default router;
