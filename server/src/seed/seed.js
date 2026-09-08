import "dotenv/config";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { users, getContent, faqs } from "../data/collections.js";
import { defaultFaqs } from "./defaults.js";

export function ensureSeeded() {
  // getContent() already writes the default content.json on first run (see
  // readJSON's fallback behavior) — just touch it, don't rewrite unconditionally,
  // or nodemon sees the changed mtime and restarts in a loop.
  getContent();
  if (faqs.all().length === 0) {
    faqs.replaceAll(defaultFaqs);
  }

  if (users.all().length === 0) {
    const email = process.env.ADMIN_EMAIL || "admin@vertexa.io";
    const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
    const passwordHash = bcrypt.hashSync(password, 10);
    users.create({
      id: randomUUID(),
      name: "Admin",
      email,
      passwordHash,
      role: "admin",
    });
    console.log(`Seeded admin user: ${email} (password from ADMIN_PASSWORD env var)`);
  }
}

// Allow running directly: npm run seed
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  ensureSeeded();
  console.log("Seed complete.");
  process.exit(0);
}
