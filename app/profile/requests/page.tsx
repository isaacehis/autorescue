import type { Metadata } from "next";
import { requireDriver } from "@/lib/driver-session";
import { getBookingHistory } from "@/lib/booking-history";
import Link from "next/link";
import RequestList from "../../components/driver/RequestList";
import styles from "../../components/driver/driver.module.css";
export const metadata: Metadata = { title: "Your requests", description: "Review your roadside assistance requests and their status.", alternates: { canonical: "/profile/requests" } };
export default async function RequestsPage() {
  const { database, user } = await requireDriver();
  const history = await getBookingHistory(database, user.id);
  return <><header className={styles.pageHeading}><div><h1>Your requests</h1><p>Open a request to see its details and current status.</p></div><Link className={styles.primary} href="/booking">New request</Link></header><RequestList bookings={history.bookings} available={history.available} /></>;
}
