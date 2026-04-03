import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { getSubmissions, markRead, removeSubmission } from "@/lib/submissions-store";

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSubmissions());
}

export async function PATCH(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, action } = await request.json();
  if (action === "read")   markRead(id);
  if (action === "delete") removeSubmission(id);
  return NextResponse.json({ ok: true });
}
