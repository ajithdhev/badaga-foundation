import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

export interface Submission {
  id: string;
  type: "hatti" | "contribution";
  // Hatti-specific
  hattiName?: string;
  seemai?: string;
  mapsUrl?: string;
  // General contribution
  submitterName?: string;
  category?: string;
  title?: string;
  content?: string;
  // Common
  submittedAt: string;
  read: boolean;
}

const STORE_DIR  = path.join(process.cwd(), ".submissions");
const STORE_PATH = path.join(STORE_DIR, "store.json");

function load(): Submission[] {
  try {
    if (!existsSync(STORE_PATH)) return [];
    return JSON.parse(readFileSync(STORE_PATH, "utf-8")) as Submission[];
  } catch {
    return [];
  }
}

function save(submissions: Submission[]): void {
  try {
    if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
    writeFileSync(STORE_PATH, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (e) {
    console.error("submissions-store write error:", e);
  }
}

export function addSubmission(
  sub: Omit<Submission, "id" | "submittedAt" | "read">
): Submission {
  const all = load();
  const entry: Submission = {
    ...sub,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    submittedAt: new Date().toISOString(),
    read: false,
  };
  all.unshift(entry);
  save(all);
  return entry;
}

export function getSubmissions(): Submission[] {
  return load();
}

export function markRead(id: string): void {
  const all = load();
  const s = all.find((x) => x.id === id);
  if (s) { s.read = true; save(all); }
}

export function removeSubmission(id: string): void {
  save(load().filter((s) => s.id !== id));
}
