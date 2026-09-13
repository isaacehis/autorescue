import type { Metadata } from "next";
import { requireDriver } from "@/lib/driver-session";
import { getBookingHistory } from "@/lib/booking-history";
import Overview from "../components/driver/Overview";
export const metadata: Metadata = { title: "Driver overview", description: "Choose a roadside service, manage vehicles and follow your requests.", alternates: { canonical: "/profile" } };
export default async function ProfilePage() {
  const { database, user, profile } = await requireDriver();
  const history = await getBookingHistory(database, user.id);
  return <Overview profile={profile} bookings={history.bookings} available={history.available} />;
}
