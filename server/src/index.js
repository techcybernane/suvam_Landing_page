import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import faqsRoutes from "./routes/faqs.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { UPLOAD_DIR } from "./middleware/upload.js";
import { ensureSeeded } from "./seed/seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(UPLOAD_DIR));

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

ensureSeeded();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CybernaNet API listening on http://localhost:${PORT}`);
});
