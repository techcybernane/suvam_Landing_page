import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DATA_DIR lets the JSON store live on a mounted persistent volume. Hosting
// platforms wipe the application directory on every deploy, so in production
// this must point at a disk that survives — otherwise all content edits, leads
// and admin accounts are lost on the next release.
export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, "..", "..", "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readJSON(name, fallback) {
  const fp = filePath(name);
  if (!fs.existsSync(fp)) {
    writeJSON(name, fallback);
    return fallback;
  }
  const raw = fs.readFileSync(fp, "utf-8");
  if (!raw.trim()) return fallback;
  return JSON.parse(raw);
}

export function writeJSON(name, data) {
  const fp = filePath(name);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

/**
 * Minimal collection helper over a JSON array file.
 * Fine for a low-traffic single-admin CMS — no concurrent-write contention to speak of.
 */
export class Collection {
  constructor(name, seedFn) {
    this.name = name;
    this.seedFn = seedFn || (() => []);
  }

  all() {
    return readJSON(this.name, this.seedFn());
  }

  save(items) {
    return writeJSON(this.name, items);
  }

  findById(id) {
    return this.all().find((item) => item.id === id) || null;
  }

  find(predicate) {
    return this.all().filter(predicate);
  }

  create(item) {
    const items = this.all();
    items.push(item);
    this.save(items);
    return item;
  }

  updateById(id, patch) {
    const items = this.all();
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...patch, id: items[idx].id };
    this.save(items);
    return items[idx];
  }

  replaceAll(items) {
    this.save(items);
    return items;
  }

  deleteById(id) {
    const items = this.all();
    const next = items.filter((item) => item.id !== id);
    this.save(next);
    return next.length !== items.length;
  }
}
