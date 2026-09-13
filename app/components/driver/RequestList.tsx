"use client";
import Link from "next/link";
import { useState } from "react";
import type { CustomerBooking } from "@/lib/booking-history";
import { requestActive, requestDate, requestLabels } from "@/lib/driver-data";
import Icon from "./Icon";
import RefreshButton from "./RefreshButton";
import styles from "./driver.module.css";

export function RequestRows({ bookings }: { bookings: CustomerBooking[] }) {
  return <ul className={styles.requestRows}>{bookings.map(booking => <li key={booking.id}><Link className={styles.requestRow} href={"/profile/requests/" + booking.id}><div><span className={styles.smallIcon}><Icon name="requests" size={20} /></span><div><h3>{booking.service}</h3><p>{booking.vehicle || "Vehicle details"} · {requestDate(booking.created_at)}</p></div></div><span className={styles.status} data-status={booking.status}>{requestLabels[booking.status] ?? "Status unavailable"}</span></Link></li>)}</ul>;
}
export default function RequestList({ bookings, available }: { bookings: CustomerBooking[]; available: boolean }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = bookings.filter(booking => (filter === "All" || (filter === "Active" ? requestActive(booking.status) : booking.status === filter.toLowerCase())) && [booking.id, booking.service, booking.vehicle, booking.location].join(" ").toLowerCase().includes(search.toLowerCase().trim()));
  return <section className={styles.panel}><div className={styles.panelHeading}><h2>Request history</h2><RefreshButton /></div>{available ? <><label className={styles.field + " " + styles.search}>Search requests<input type="search" maxLength={100} placeholder="Service, vehicle, location or reference" value={search} onChange={event => setSearch(event.target.value)} /></label><div className={styles.filters} role="group" aria-label="Filter requests">{["All", "Active", "Completed", "Cancelled"].map(option => <button type="button" key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div>{filtered.length ? <RequestRows bookings={filtered} /> : <div className={styles.compactEmpty} role="status"><Icon name="requests" /><div><h3>{bookings.length ? "No matching requests" : "No requests yet"}</h3><p>{bookings.length ? "Try another filter or search term." : "Choose a service when you need help. Your requests will be saved here."}</p>{bookings.length ? <button className={styles.textLink} onClick={() => { setSearch(""); setFilter("All"); }}>Clear filters</button> : <Link className={styles.textLink} href="/booking">Start a request <Icon name="arrow" size={16} /></Link>}</div></div>}{bookings.length === 50 && <p className={styles.note + " " + styles.panelBody}>Showing the most recent 50 requests. Contact support for older records.</p>}</> : <div className={styles.compactEmpty} role="alert"><Icon name="support" /><div><h3>Request history is unavailable</h3><p>Refresh to try again. You can still contact support for help.</p><Link className={styles.textLink} href="/profile/support">Contact support</Link></div></div>}</section>;
}
