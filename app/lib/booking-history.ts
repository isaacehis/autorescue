import "server-only";
import type { createDatabase } from "./supabase";

export type CustomerBooking = {
  id: string; service: string; vehicle: string; location: string;
  notes: string; status: string; created_at: string;
};

export async function bookingStorageAvailable(database: NonNullable<Awaited<ReturnType<typeof createDatabase>>>, userId: string) {
  try {
    const { error } = await database.from("bookings").select("id").eq("user_id", userId).limit(0).abortSignal(AbortSignal.timeout(5000));
    return !error;
  } catch { return false; }
}

export async function getBookingHistory(database: NonNullable<Awaited<ReturnType<typeof createDatabase>>>, userId: string) {
  try {
    const { data, error } = await database.from("bookings")
      .select("id,service,vehicle,location,notes,status,created_at")
      .eq("user_id", userId).order("created_at", { ascending: false }).limit(50)
      .abortSignal(AbortSignal.timeout(8000));
    if (error) {
      console.error("Booking history unavailable", { code: error.code });
      return { available: false, bookings: [] as CustomerBooking[] };
    }
    return { available: true, bookings: (data ?? []) as CustomerBooking[] };
  } catch {
    console.error("Booking history connection unavailable");
    return { available: false, bookings: [] as CustomerBooking[] };
  }
}
