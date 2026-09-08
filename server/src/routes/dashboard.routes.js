import { Router } from "express";
import { leads, faqs, media } from "../data/collections.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  const allLeads = leads.all();
  const newLeads = allLeads.filter((l) => l.status === "New").length;
  const recent = [...allLeads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  res.json({
    totalLeads: allLeads.length,
    newLeads,
    totalFaqs: faqs.all().length,
    totalMedia: media.all().length,
    recentLeads: recent,
  });
});

export default router;
