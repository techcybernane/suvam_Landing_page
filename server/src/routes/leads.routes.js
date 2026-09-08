import { Router } from "express";
import { randomUUID } from "crypto";
import { leads, getSettings } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = Router();

const STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"];

// Where a submission came from. Anything the client sends is matched against
// this list so the field can be trusted when filtering in the admin panel.
const SOURCES = ["Contact Form", "Popup Form"];

function renderTemplate(str, vars) {
  return String(str || "").replace(/{{\s*(\w+)\s*}}/g, (_, key) => vars[key] ?? "");
}

// Public: contact form submission
router.post("/", async (req, res) => {
  const { name, email, phone, company, service, message, source } = req.body || {};
  // The popup form is deliberately short, so a message is optional there; the
  // contact form still requires one client-side.
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const leadSource = SOURCES.includes(source) ? source : "Contact Form";
  const lead = leads.create({
    id: randomUUID(),
    name,
    email,
    phone: phone || "",
    company: company || "",
    service: service || "",
    message: message || "",
    status: "New",
    source: leadSource,
    createdAt: new Date().toISOString(),
  });

  const settings = getSettings();

  try {
    if (settings.leadRecipients?.length) {
      await sendEmail({
        to: settings.leadRecipients,
        subject: `New website lead (${leadSource}): ${name}`,
        text: `New ${leadSource} submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nOrganization: ${company || "—"}\nService Required: ${service || "—"}\n\nMessage:\n${message}`,
        html: `<h2>New website lead — ${leadSource}</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "—"}</p><p><strong>Organization:</strong> ${company || "—"}</p><p><strong>Service Required:</strong> ${service || "—"}</p><p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>`,
      });
    }

    const ar = settings.autoResponse || {};
    const greeting = renderTemplate(ar.greeting, { name });
    const bodyHtml = String(ar.body || "").replace(/\n/g, "<br/>");
    await sendEmail({
      to: email,
      subject: ar.subject || "Thanks for reaching out",
      text: `${greeting}\n\n${ar.body || ""}\n\n${ar.footer || ""}`,
      html: `<p>${greeting}</p><p>${bodyHtml}</p>${ar.ctaUrl ? `<p><a href="${ar.ctaUrl}">${ar.ctaLabel || ar.ctaUrl}</a></p>` : ""}<p>${ar.footer || ""}</p>`,
    });
  } catch (err) {
    console.error("Email dispatch failed:", err.message);
  }

  res.status(201).json({ ok: true, id: lead.id });
});

// Admin: list with search / filter / sort
router.get("/", requireAuth, (req, res) => {
  const { q, status, source, sort = "-createdAt" } = req.query;
  let list = leads.all();

  if (q) {
    const needle = String(q).toLowerCase();
    list = list.filter((l) =>
      [l.name, l.email, l.company, l.message].some((f) => f?.toLowerCase().includes(needle))
    );
  }
  if (status) {
    list = list.filter((l) => l.status === status);
  }
  if (source) {
    list = list.filter((l) => (l.source || "Contact Form") === source);
  }

  const dir = sort.startsWith("-") ? -1 : 1;
  const key = sort.replace(/^-/, "");
  list = [...list].sort((a, b) => (a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0));

  res.json({ items: list, statuses: STATUSES, sources: SOURCES, total: list.length });
});

router.put("/:id", requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (status && !STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${STATUSES.join(", ")}` });
  }
  const updated = leads.updateById(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: "Lead not found" });
  res.json(updated);
});

router.delete("/:id", requireAuth, (req, res) => {
  const ok = leads.deleteById(req.params.id);
  if (!ok) return res.status(404).json({ error: "Lead not found" });
  res.json({ ok: true });
});

export default router;
