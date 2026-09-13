import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";
import { apiError, guardRequest, readBody } from "@/lib/api";
import { asString, validateBooking } from "@/lib/utils";
import { services } from "@/lib/data";
import { getBookingHistory } from "@/lib/booking-history";
import { UUID_PATTERN } from "@/lib/driver-data";

export async function GET() {
  try {
  const database = await createDatabase();
  if (!database) return apiError("Accounts are temporarily unavailable.", 503);
  const { data: { user } } = await database.auth.getUser();
  if (!user) return apiError("Sign in to view your requests.", 401);
  const history = await getBookingHistory(database, user.id);
  return !history.available ? apiError("Could not load your requests.", 503) : NextResponse.json({ success: true, data: history.bookings }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return apiError("Could not load your requests. Please try again.", 503); }
}

export async function POST(request: NextRequest) {
  const blocked = await guardRequest(request, "bookings", 6);
  if (blocked) return blocked;
  const body = await readBody(request);
  if (!body) return apiError("Invalid request.", 400);
  try {
  const database = await createDatabase();
  if (!database) return apiError("Online booking is temporarily unavailable. Please call support.", 503);
  const { data: { user } } = await database.auth.getUser();
  if (!user?.email) return apiError("Please sign in to save your request, or call support for help.", 401);
  const errors = validateBooking({ ...body, email: user.email });
  if (![...services.map(service => service.title), "Other"].includes(asString(body.service))) errors.push("Choose a listed service.");
  if (asString(body.vehicle).trim().length < 2 || asString(body.vehicle).length > 200) errors.push("Enter vehicle details between 2 and 200 characters.");
  if (body.request_id !== undefined && (typeof body.request_id !== "string" || !UUID_PATTERN.test(body.request_id))) errors.push("Invalid request reference. Please reload the form.");
  let location = asString(body.location).trim();
  if (body.coordinates !== undefined && body.coordinates !== null) {
    const coordinates = body.coordinates as Record<string, unknown>;
    if (typeof coordinates !== "object" || typeof coordinates.latitude !== "number" || typeof coordinates.longitude !== "number" || !Number.isFinite(coordinates.latitude) || !Number.isFinite(coordinates.longitude) || Math.abs(coordinates.latitude) > 90 || Math.abs(coordinates.longitude) > 180) errors.push("Invalid GPS location. Remove GPS and enter your location manually.");
    else location += "\nGPS: " + coordinates.latitude.toFixed(6) + ", " + coordinates.longitude.toFixed(6);
  }
  if (location.length > 2000) errors.push("Please shorten your location details.");
  if (Object.values(body).some(value => typeof value === "string" && value.length > 2000)) errors.push("Please shorten your details.");
  if (errors.length) return NextResponse.json({ success: false, errors }, { status: 400 });
  const id = asString(body.request_id) || crypto.randomUUID();
  const { error } = await database.from("bookings").insert({
    id, user_id: user.id, name: asString(body.name).trim(), email: user.email,
    phone: asString(body.phone).trim(), service: body.service,
    vehicle: asString(body.vehicle).trim(), location,
    notes: asString(body.notes).trim(),
  }).abortSignal(AbortSignal.timeout(10000));
  if (error?.code === "23505") {
    const { data: existing } = await database.from("bookings").select("id").eq("id", id).eq("user_id", user.id).abortSignal(AbortSignal.timeout(5000)).maybeSingle();
    if (existing) return NextResponse.json({ success: true, data: { id: existing.id } }, { headers: { "Cache-Control": "private, no-store" } });
  }
  return error ? apiError("Your request was not saved. Please try again or call support.", 503)
    : NextResponse.json({ success: true, data: { id }, message: "Your request has been saved. Call support to confirm availability and arrange assistance." }, { status: 201 });
  } catch { return apiError("We could not confirm your request. Check Your requests before retrying, or call support.", 503); }
}
