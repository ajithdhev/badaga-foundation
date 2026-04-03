import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, COOKIE_MAX_AGE, makeToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPw = process.env.ADMIN_PASSWORD;

  if (!adminPw) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }
  if (password !== adminPw) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
