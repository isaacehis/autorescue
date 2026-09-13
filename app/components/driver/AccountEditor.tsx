"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { type DriverProfile, type SavedVehicle, vehicleLabel } from "@/lib/driver-data";
import LogoutButton from "../LogoutButton";
import Icon from "./Icon";
import styles from "./driver.module.css";

const emptyVehicle = { id: "", make: "", model: "", year: "", plate: "" };
export default function AccountEditor({ initialProfile, mode }: { initialProfile: DriverProfile; mode: "vehicles" | "settings" }) {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState<SavedVehicle | null>(null);
  const [removing, setRemoving] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function save(body: Record<string, unknown>, success: string) {
    if (busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, revision: profile.revision }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "Could not save your changes."); return; }
      setProfile(result.profile); setMessage(success); setEditing(null); setRemoving(""); router.refresh();
    } catch { setError("Connection lost. Your changes may not have saved. Refresh before retrying."); }
    finally { setBusy(false); }
  }
  function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save({ ...Object.fromEntries(new FormData(event.currentTarget)), action: "update-profile" }, "Your account details have been saved.");
  }
  function submitVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save({ ...Object.fromEntries(new FormData(event.currentTarget)), action: "save-vehicle", id: editing?.id ?? "" }, "Your vehicle has been saved.");
  }
  return <><header className={styles.pageHeading}><div><h1>{mode === "vehicles" ? "Your vehicles" : "Account settings"}</h1><p>{mode === "vehicles" ? "Keep up to five vehicles ready for your next request." : "Manage the details used for your roadside requests."}</p></div>{mode === "vehicles" && !editing && profile.vehicles.length < 5 && <button className={styles.primary} onClick={() => { setEditing(emptyVehicle); setMessage(""); }}><Icon name="plus" size={17} />Add vehicle</button>}</header>{error && <div className={styles.error} role="alert">{error}</div>}{message && <p className={styles.success} role="status">{message}</p>}
    {mode === "settings" ? <div className={styles.twoColumns}><section className={styles.panel + " " + styles.panelBody}><h2>Personal details</h2><form onSubmit={submitProfile} className={styles.formStack + " mt-6"}><fieldset disabled={busy} className={styles.formStack}><label className={styles.field}>Full name<input name="name" defaultValue={profile.name} autoComplete="name" minLength={2} maxLength={100} required /></label><label className={styles.field}>Contact phone<input name="phone" type="tel" autoComplete="tel" defaultValue={profile.phone} maxLength={40} /><small>Used to prefill your request. This does not change your sign-in method.</small></label><button className={styles.primary} type="submit">{busy ? "Saving..." : "Save changes"}</button></fieldset></form></section><section className={styles.panel + " " + styles.panelBody}><h2>Sign-in and security</h2><dl className={styles.summary}><div><dt>Email address</dt><dd>{profile.email}</dd></div><div><dt>Email status</dt><dd>{profile.emailVerified ? "Confirmed" : "Confirmation required"}</dd></div></dl><p className={styles.muted}>Passwords are managed through the password-reset process, never displayed in your account.</p><div className={styles.actions}><Link href="/forgot-password" className={styles.secondary}>Reset password</Link><LogoutButton /></div><Link href="/privacy" className={styles.textLink}>Read our privacy policy</Link></section></div>
    : <div className={styles.stack}>{editing && <section className={styles.panel + " " + styles.panelBody}><h2>{editing.id ? "Edit vehicle" : "Add a vehicle"}</h2><form key={editing.id || "new"} onSubmit={submitVehicle} className="mt-6"><fieldset disabled={busy}><div className={styles.formGrid}><label className={styles.field}>Make<input name="make" defaultValue={editing.make} placeholder="Toyota" required minLength={2} maxLength={40} /></label><label className={styles.field}>Model<input name="model" defaultValue={editing.model} placeholder="Corolla" required maxLength={60} /></label><label className={styles.field}>Year (optional)<input name="year" inputMode="numeric" pattern="[0-9]{4}" defaultValue={editing.year} placeholder="2018" maxLength={4} /></label><label className={styles.field}>Registration (optional)<input name="plate" defaultValue={editing.plate} placeholder="Vehicle registration" maxLength={20} /></label></div><div className={styles.actions}><button className={styles.primary} type="submit">{busy ? "Saving..." : "Save vehicle"}</button><button className={styles.secondary} type="button" onClick={() => setEditing(null)}>Cancel</button></div></fieldset></form></section>}
    {!profile.vehicles.length && !editing && <section className={styles.panel}><div className={styles.compactEmpty}><Icon name="vehicle" size={38} /><div><h3>Add your first vehicle</h3><p>Save the make and model so you don’t have to enter them every time you need help.</p><button className={styles.textLink} onClick={() => setEditing(emptyVehicle)}>Add vehicle <Icon name="plus" size={16} /></button></div></div></section>}
    <div className={styles.vehicleGrid}>{profile.vehicles.map((vehicle, index) => <article key={vehicle.id} className={styles.vehicleCard}><header><Icon name="vehicle" size={42} />{index === 0 && <span className={styles.status}>Default vehicle</span>}</header><h2>{vehicleLabel(vehicle)}</h2><p>{vehicle.plate || "No registration added"}</p><div className={styles.actions}><button disabled={busy} className={styles.secondary} onClick={() => { setEditing(vehicle); setRemoving(""); }}>Edit</button>{index !== 0 && <button disabled={busy} className={styles.textLink} onClick={() => void save({ action: "default-vehicle", id: vehicle.id }, "Default vehicle updated.")}>Make default</button>}<button disabled={busy} className={styles.textLink} onClick={() => setRemoving(vehicle.id)}>Remove</button></div>{removing === vehicle.id && <div className={styles.confirmation}><p>Remove this saved vehicle? Existing requests will keep their vehicle details.</p><div className={styles.actions}><button disabled={busy} className={styles.secondary} onClick={() => void save({ action: "remove-vehicle", id: vehicle.id }, "Vehicle removed.")}>Yes, remove</button><button disabled={busy} className={styles.textLink} onClick={() => setRemoving("")}>Keep vehicle</button></div></div>}</article>)}</div></div>}
  </>;
}
