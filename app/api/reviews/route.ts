import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";
import { apiError, guardRequest, readBody } from "@/lib/api";

export async function GET() {
  return NextResponse.json({ success: true, data: [], total: 0 });
}

export async function POST(request: NextRequest) {
  const blocked = await guardRequest(request, "reviews", 4);
  if (blocked) return blocked;
  const body = await readBody(request);
  if (!body) return apiError("Invalid review.", 400);
  const database = await createDatabase();
  if (!database) return apiError("Reviews are temporarily unavailable.", 503);
  const { data: { user } } = await database.auth.getUser();
  if (!user) return apiError("Sign in to leave a review.", 401);
  const { data: booking } = await database.from("bookings").select("id").eq("id", String(body.bookingId ?? "")).eq("user_id", user.id).eq("status", "completed").maybeSingle();
  if (!booking) return apiError("Only your completed requests can be reviewed.", 403);
  return apiError("Please send your feedback to support.", 409);
}
