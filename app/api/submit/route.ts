import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addSubmission } from "@/lib/submissions-store";

const TO_EMAIL = "ajithdhevarajan@gmail.com";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, village, category, title, content, source } = data;

    // Persist to admin dashboard store
    const isHatti = category === "Missing Hatti";
    addSubmission(
      isHatti
        ? { type: "hatti", hattiName: title, seemai: village, mapsUrl: source }
        : { type: "contribution", submitterName: name, category, title, content }
    );

    // Build the email body
    const body = `
New contribution submitted on The Badaga Foundation
===============================================

From: ${name} <${email}>
Village: ${village || "Not specified"}
Category: ${category}
Title: ${title}

Content:
${content}

Source / Reference:
${source || "Not provided"}

---
Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    `.trim();

    // Create transporter using environment variables
    // Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The Badaga Foundation" <${process.env.SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Contribution] ${category}: ${title}`,
      text: body,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
