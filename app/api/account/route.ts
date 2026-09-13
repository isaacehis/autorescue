import { NextRequest, NextResponse } from "next/server";
import { apiError, guardRequest, readBody } from "@/lib/api";
import { createDatabase } from "@/lib/supabase";
import { driverProfile, parseVehicle, phoneValid, UUID_PATTERN } from "@/lib/driver-data";

export async function POST(request: NextRequest) {
  const blocked = await guardRequest(request, "account", 10);
  if (blocked) return blocked;
  const body = await readBody(request);
  if (!body) return apiError("Send a valid form.", 400);
  try {
    const database = await createDatabase();
    const user = database ? (await database.auth.getUser()).data.user : null;
    if (!database || !user) return apiError("Please sign in again before saving.", 401);
    const profile = driverProfile(user.user_metadata, user.email, Boolean(user.email_confirmed_at));
    if (body.revision !== profile.revision) return apiError("Your account changed in another window. Refresh this page before saving.", 409);
    const patch: Record<string, unknown> = {};
    if (body.action === "update-profile") {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const phone = typeof body.phone === "string" ? body.phone.trim() : "";
      if (name.length < 2 || name.length > 100 || /[\u0000-\u001f]/.test(name) || (phone && !phoneValid(phone))) return apiError("Enter your name and a valid contact phone number.", 400);
      patch.full_name = name;
      patch.contact_phone = phone;
    } else if (body.action === "save-vehicle") {
      const existingId = typeof body.id === "string" ? body.id : "";
      if (existingId && (!UUID_PATTERN.test(existingId) || !profile.vehicles.some(vehicle => vehicle.id === existingId))) return apiError("Vehicle not found in your account.", 404);
      if (!existingId && profile.vehicles.length >= 5) return apiError("You can save up to five vehicles. Edit or remove one first.", 400);
      if (["make", "model", "plate"].some(key => typeof body[key] !== "string") || String(body.make).length > 40 || String(body.model).length > 60 || String(body.plate).length > 20 || typeof body.year !== "string" || body.year.length > 4) return apiError("Check the length of your vehicle details.", 400);
      const vehicle = parseVehicle({ ...body, id: existingId || crypto.randomUUID() });
      if (!vehicle) return apiError("Enter a make, model and valid year.", 400);
      patch.ar_vehicles = existingId ? profile.vehicles.map(item => item.id === existingId ? vehicle : item) : [...profile.vehicles, vehicle];
    } else if (body.action === "remove-vehicle" || body.action === "default-vehicle") {
      const selected = profile.vehicles.find(vehicle => vehicle.id === body.id);
      if (!selected) return apiError("Vehicle not found in your account.", 404);
      const remaining = profile.vehicles.filter(vehicle => vehicle.id !== selected.id);
      patch.ar_vehicles = body.action === "remove-vehicle" ? remaining : [selected, ...remaining];
    } else return apiError("Choose a valid account action.", 400);
    patch.ar_preferences_revision = crypto.randomUUID();
    const { data, error } = await database.auth.updateUser({ data: patch });
    if (error || !data.user) return apiError("Your changes were not saved. Please try again.", 503);
    return NextResponse.json({ success: true, profile: driverProfile(data.user.user_metadata, data.user.email, Boolean(data.user.email_confirmed_at)) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return apiError("Your account is temporarily unavailable. Please try again.", 503); }
}
