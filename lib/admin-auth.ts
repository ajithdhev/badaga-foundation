import { createHash } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "badaga_admin_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function makeToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(pw + "::vob_admin_2026").digest("hex");
}

export function isAuthed(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  return token === makeToken();
}
