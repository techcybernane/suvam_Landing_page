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

  const email = process.env.ADMIN_EMAIL || "admin@vertexa.io";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const admin = users.all().find((u) => u.role === "admin");

  if (!admin) {
    // First boot: create the admin from the env vars (or the dev defaults).
    users.create({
      id: randomUUID(),
      name: "Admin",
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      role: "admin",
    });
    console.log(`Seeded admin user: ${email} (password from ADMIN_PASSWORD env var)`);
  } else if (process.env.ADMIN_RESET === "true") {
    // Recovery path for headless hosts (no shell): set ADMIN_RESET=true plus the
    // desired ADMIN_EMAIL/ADMIN_PASSWORD and restart, and the existing admin is
    // forced back to those credentials. Unset ADMIN_RESET again afterwards.
    users.updateById(admin.id, { email, passwordHash: bcrypt.hashSync(password, 10) });
    console.log(`Reset admin credentials to ${email} (ADMIN_RESET=true — remove that env var now).`);
  }
}

// Allow running directly: npm run seed
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  ensureSeeded();
  console.log("Seed complete.");
  process.exit(0);
}
