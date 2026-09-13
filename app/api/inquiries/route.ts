import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";
import { apiError, guardRequest, readBody } from "@/lib/api";
import { asString, validateInquiry } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const blocked = await guardRequest(request, "inquiries", 4);
  if (blocked) return blocked;
  const body = await readBody(request);
  if (!body) return apiError("Invalid message.", 400);
  const errors = validateInquiry(body);
  if (!["support", "mechanic", "fleet", "partnership"].includes(asString(body.subject))) errors.push("Choose a listed subject.");
  if (Object.values(body).some(value => typeof value === "string" && value.length > 2000)) errors.push("Please keep each field under 2,000 characters.");
  if (errors.length) return NextResponse.json({ success: false, errors }, { status: 400 });
  try {
  const database = await createDatabase();
  if (!database) return apiError("Online messages are temporarily unavailable. Please email us directly.", 503);
  const { error } = await database.from("inquiries").insert({
    name: asString(body.name).trim(), email: asString(body.email).trim().toLowerCase(),
    phone: asString(body.phone).trim(), subject: body.subject, message: asString(body.message).trim(),
  }).abortSignal(AbortSignal.timeout(10000));
  return error ? apiError("Your message was not saved. Please email us directly.", 503)
    : NextResponse.json({ success: true }, { status: 201 });
  } catch { return apiError("We could not confirm your message. Please email us directly.", 503); }
}
