import { Router } from "express";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { media } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";
import { upload, UPLOAD_DIR } from "../middleware/upload.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  res.json(media.all().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const item = media.create({
    id: randomUUID(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype,
    size: req.file.size,
    alt: req.body.alt || "",
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(item);
});

router.put("/:id", requireAuth, (req, res) => {
  const { alt } = req.body || {};
  const updated = media.updateById(req.params.id, { alt });
  if (!updated) return res.status(404).json({ error: "Media not found" });
  res.json(updated);
});

router.delete("/:id", requireAuth, (req, res) => {
  const item = media.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Media not found" });

  const filePath = path.join(UPLOAD_DIR, item.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  media.deleteById(req.params.id);
  res.json({ ok: true });
});

export default router;
