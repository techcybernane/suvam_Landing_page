import { Router } from "express";
import { getSettings, saveSettings } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";
import { smtpStatus } from "../utils/sendEmail.js";
import { normalizeLocale, LOCALES, DEFAULT_LOCALE } from "../i18n.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  const locale = normalizeLocale(req.query.locale);
  const settings = getSettings();
  // `autoResponse` is flattened to the requested locale so the admin form keeps
  // its existing shape; `autoResponseByLocale` carries the full map.
  res.json({
    ...settings,
    autoResponse: settings.autoResponse[locale] || settings.autoResponse[DEFAULT_LOCALE],
    autoResponseByLocale: settings.autoResponse,
    locale,
    locales: LOCALES,
    smtp: { ...settings.smtp, ...smtpStatus() },
  });
});

router.put("/", requireAuth, (req, res) => {
  const locale = normalizeLocale(req.query.locale);
  const current = getSettings();
  const { leadRecipients, autoResponse } = req.body || {};
  const next = {
    ...current,
    leadRecipients: Array.isArray(leadRecipients) ? leadRecipients : current.leadRecipients,
    autoResponse: autoResponse
      ? { ...current.autoResponse, [locale]: { ...current.autoResponse[locale], ...autoResponse } }
      : current.autoResponse,
  };
  saveSettings(next);
  res.json({ ...next, autoResponse: next.autoResponse[locale], autoResponseByLocale: next.autoResponse, locale });
});

export default router;
