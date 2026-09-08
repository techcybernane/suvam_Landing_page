import { Router } from "express";
import { getSettings, saveSettings } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";
import { smtpStatus } from "../utils/sendEmail.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  const settings = getSettings();
  res.json({ ...settings, smtp: { ...settings.smtp, ...smtpStatus() } });
});

router.put("/", requireAuth, (req, res) => {
  const current = getSettings();
  const { leadRecipients, autoResponse } = req.body || {};
  const next = {
    ...current,
    leadRecipients: Array.isArray(leadRecipients) ? leadRecipients : current.leadRecipients,
    autoResponse: autoResponse ? { ...current.autoResponse, ...autoResponse } : current.autoResponse,
  };
  saveSettings(next);
  res.json(next);
});

export default router;
