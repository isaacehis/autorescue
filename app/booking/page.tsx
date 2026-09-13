import type { Metadata } from "next";
import { createDatabase } from "@/lib/supabase";
import { bookingStorageAvailable } from "@/lib/booking-history";
import { driverProfile } from "@/lib/driver-data";
import BookingForm from "../components/BookingForm";
import DriverShell from "../components/driver/DriverShell";
import styles from "../components/driver/driver.module.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New roadside request", description: "Choose a service, enter your vehicle and location, and review your roadside request.", robots: { index: false, follow: false }, alternates: { canonical: "/booking" } };
export default async function BookingPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const database = await createDatabase();
  const user = database ? (await database.auth.getUser()).data.user : null;
  const profile = driverProfile(user?.user_metadata ?? {}, user?.email, Boolean(user?.email_confirmed_at));
  const online = database && user ? await bookingStorageAvailable(database, user.id) : Boolean(database);
  const selectedService = (await searchParams).service ?? "";
  return <DriverShell name={user ? profile.name : "Guest"} signedIn={Boolean(user)}><header className={styles.pageHeading}><div><h1>Request roadside help</h1><p>Four steps to share the details support needs.</p></div></header><BookingForm initialService={selectedService} online={online} signedIn={Boolean(user)} initialName={user ? profile.name : ""} initialPhone={profile.phone} initialEmail={profile.email} vehicles={profile.vehicles} /></DriverShell>;
}
