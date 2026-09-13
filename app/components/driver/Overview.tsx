import Link from "next/link";
import type { DriverProfile } from "@/lib/driver-data";
import { requestActive, vehicleLabel } from "@/lib/driver-data";
import type { CustomerBooking } from "@/lib/booking-history";
import { SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_E164 } from "@/lib/site";
import ServiceChoices from "./ServiceChoices";
import { RequestRows } from "./RequestList";
import Icon from "./Icon";
import styles from "./driver.module.css";

export default function Overview({ profile, bookings, available }: { profile: DriverProfile; bookings: CustomerBooking[]; available: boolean }) {
  const firstName = profile.name.split(/\s+/)[0];
  const greeting = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const active = bookings.filter(booking => requestActive(booking.status));
  const vehicle = profile.vehicles[0];
  return <><header className={styles.pageHeading}><div><h1>Hello, {greeting}.</h1><p>Wherever your day takes you, keep roadside help close.</p></div></header><div className={styles.grid}><div className={styles.stack}><ServiceChoices /><section className={styles.panel}><div className={styles.panelHeading}><h2>{active.length ? "Active requests" : "Recent requests"}</h2><Link href="/profile/requests" className={styles.textLink}>View all <Icon name="arrow" size={16} /></Link></div>{!available ? <div className={styles.compactEmpty} role="alert"><Icon name="requests" /><div><h3>We couldn’t load your requests.</h3><p>Your saved records have not been removed.</p><Link className={styles.textLink} href="/profile/requests">Retry in request history</Link></div></div> : bookings.length ? <RequestRows bookings={(active.length ? active : bookings).slice(0, 3)} /> : <div className={styles.compactEmpty}><Icon name="requests" /><div><h3>No roadside requests yet</h3><p>Your service details and status will appear here after you submit a request.</p></div></div>}</section></div><aside className={styles.stack}><section className={styles.panel + " " + styles.panelBody}><h2>Your vehicle</h2><div className={styles.vehicleSpot}><Icon name="vehicle" size={44} /><div><strong>{vehicle ? vehicleLabel(vehicle) : "Ready for your next trip"}</strong><p>{vehicle ? vehicle.plate || "Default vehicle" : "Save your details once."}</p></div></div><p className={styles.muted}>{vehicle ? "Use this vehicle when starting a new roadside request." : "Add your vehicle to make future requests quicker."}</p><Link className={styles.textLink} href="/profile/vehicles">{vehicle ? "Manage vehicles" : "Add a vehicle"} <Icon name="arrow" size={16} /></Link></section><section className={styles.panel + " " + styles.panelBody}><Icon name="support" size={26} /><h2 className="mt-3">Prefer to speak to us?</h2><p className={styles.muted}>Call to confirm service availability, cost and arrival arrangements.</p><a className={styles.supportNumber} href={"tel:" + SUPPORT_PHONE_E164}>{SUPPORT_PHONE_DISPLAY}</a><Link className={styles.textLink} href="/profile/support">Help and support <Icon name="arrow" size={16} /></Link></section><p className={styles.note}>Requests are reviewed by support. Submitting a request does not automatically dispatch a mechanic or take a payment.</p></aside></div></>;
}
