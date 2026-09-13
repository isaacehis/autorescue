import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireDriver } from "@/lib/driver-session";
import { UUID_PATTERN, requestLabels, requestDate } from "@/lib/driver-data";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
import Icon from "../../../components/driver/Icon";
import RefreshButton from "../../../components/driver/RefreshButton";
import styles from "../../../components/driver/driver.module.css";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: "Request " + (UUID_PATTERN.test(id) ? id.slice(0, 8) : "details"), description: "Your roadside request details and current status.", alternates: { canonical: "/profile/requests/" + encodeURIComponent(id) } };
}
export default async function RequestDetails({ params }: Props) {
  const { database, user } = await requireDriver();
  const { id } = await params;
  if (!UUID_PATTERN.test(id)) notFound();
  const { data: booking, error } = await database.from("bookings").select("id,service,vehicle,location,notes,status,created_at,name,phone").eq("user_id", user.id).eq("id", id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
  if (error) return <section className={styles.panel + " " + styles.panelBody}><h1 className={styles.wizardTitle}>This request couldn’t load.</h1><p className={styles.muted}>Try refreshing or contact support. Your request has not been removed.</p><div className={styles.actions}><RefreshButton /><Link className={styles.secondary} href="/profile/requests">Back to requests</Link></div></section>;
  if (!booking) notFound();
  const confirmed = booking.status === "confirmed" || booking.status === "completed";
  const completed = booking.status === "completed";
  const gps = String(booking.location).match(/GPS: (-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?)/);
  const mapLocation = gps && Math.abs(Number(gps[1])) <= 90 && Math.abs(Number(gps[2])) <= 180 ? gps[1] + "," + gps[2] : booking.location;
  return <><Link className={styles.detailBack} href="/profile/requests">← Back to requests</Link><header className={styles.pageHeading}><div><h1>{booking.service}</h1><p>Submitted {requestDate(booking.created_at)}</p></div><RefreshButton /></header><div className={styles.grid}><section className={styles.panel + " " + styles.panelBody}><div className={styles.stepLinks}><h2>Request details</h2><span className={styles.status} data-status={booking.status}>{requestLabels[booking.status] ?? "Status unavailable"}</span></div><dl className={styles.summary}><div><dt>Vehicle</dt><dd>{booking.vehicle || "Not specified"}</dd></div><div><dt>Breakdown location</dt><dd>{booking.location}</dd><a className={styles.textLink} href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapLocation)} target="_blank" rel="noopener noreferrer">Open location in Maps <Icon name="arrow" size={16} /></a></div><div><dt>Contact</dt><dd>{booking.name}<br />{booking.phone}</dd></div>{booking.notes && <div><dt>Your notes</dt><dd>{booking.notes}</dd></div>}<div><dt>Request reference</dt><dd>{booking.id}</dd></div></dl><p className={styles.note}>Need to change or cancel this request? Contact support and quote the reference.</p><div className={styles.actions}><a className={styles.primary} href={"tel:" + SUPPORT_PHONE_E164}>Call about this request</a><Link className={styles.secondary} href="/profile/support">Support options</Link></div></section><aside className={styles.panel + " " + styles.panelBody}><h2>Request progress</h2>{booking.status === "cancelled" ? <p className={styles.note}>This request is marked as cancelled. Contact support if you need clarification, or start a new request.</p> : <ol className={styles.timeline}><li data-done="true"><span><Icon name="check" size={15} /></span><div><h3>Request submitted</h3><p>Your details have been saved.</p></div></li><li data-done={confirmed}><span>{confirmed ? <Icon name="check" size={15} /> : "2"}</span><div><h3>{confirmed ? "Assistance confirmed" : "Awaiting confirmation"}</h3><p>{confirmed ? "Contact support for the agreed arrangements." : "Call support to agree on availability, price and arrival time."}</p></div></li><li data-done={completed}><span>{completed ? <Icon name="check" size={15} /> : "3"}</span><div><h3>{completed ? "Service completed" : "Service completion"}</h3><p>{completed ? "This request has been marked as completed." : "Completion will appear when the request status is updated."}</p></div></li></ol>}<p className={styles.note}>Select Refresh to check for updates. This is request status, not live mechanic tracking.</p></aside></div></>;
}
