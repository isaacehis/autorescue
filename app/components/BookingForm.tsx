"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { services } from "@/lib/data";
import { type SavedVehicle, phoneValid, vehicleLabel } from "@/lib/driver-data";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
import Icon from "./driver/Icon";
import { serviceIcons } from "./driver/ServiceChoices";
import styles from "./driver/driver.module.css";

type Props = { initialService?: string; online?: boolean; signedIn?: boolean; initialName?: string; initialEmail?: string; initialPhone?: string; vehicles?: SavedVehicle[] };
const steps = ["Service", "Vehicle", "Location", "Review"];
export default function BookingForm({ initialService = "", online = false, signedIn = false, initialName = "", initialEmail = "", initialPhone = "", vehicles = [] }: Props) {
  const options = [...services.map(service => service.title), "Other"];
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({ service: options.includes(initialService) ? initialService : "", vehicle: vehicles[0] ? vehicleLabel(vehicles[0]) : "", name: initialName, phone: initialPhone, location: "", notes: "" });
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]?.id ?? "");
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [geoMessage, setGeoMessage] = useState("");
  const [reference, setReference] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const requestId = useRef("");
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  function update(key: keyof typeof draft, value: string) {
    requestId.current = "";
    setDraft(previous => ({ ...previous, [key]: value }));
  }
  function move(next: number) {
    setError(""); setStep(next);
    requestAnimationFrame(() => { heading.current?.focus(); });
  }
  function locate() {
    setGeoMessage("");
    if (!navigator.geolocation) { setGeoMessage("Location is unavailable. Enter your address or nearest landmark instead."); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      const point = { latitude: Number(position.coords.latitude.toFixed(6)), longitude: Number(position.coords.longitude.toFixed(6)) };
      setCoordinates(point); requestId.current = ""; setLocating(false);
      setGeoMessage("Location added. Please also enter a nearby landmark so support can find you.");
    }, () => { setLocating(false); setGeoMessage("We couldn’t get your location. Enter your address or nearest landmark manually."); }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  const fullLocation = draft.location + (coordinates ? "\nGPS: " + coordinates.latitude + ", " + coordinates.longitude : "");
  function prepareWhatsApp() {
    const text = "Hello AutoRescue. I need roadside assistance.\nService: " + draft.service + "\nVehicle: " + draft.vehicle + "\nName: " + draft.name + "\nPhone: " + draft.phone + "\nLocation: " + fullLocation + "\nDetails: " + draft.notes;
    setWhatsapp("https://wa.me/" + SUPPORT_PHONE_E164.replace(/\D/g, "") + "?text=" + encodeURIComponent(text));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || locating) return;
    if (!form.current?.reportValidity()) return;
    if (step === 0 && !draft.service) { setError("Choose a service."); return; }
    if (step === 1 && !phoneValid(draft.phone)) { setError("Enter a valid contact phone number."); return; }
    if (step < 3) { move(step + 1); return; }
    if (!draft.service || draft.name.trim().length < 2 || !phoneValid(draft.phone) || draft.vehicle.trim().length < 2 || draft.location.trim().length < 3) { setError("Check your service, vehicle, phone and location before submitting."); return; }
    if (!online) { prepareWhatsApp(); return; }
    setError(""); setBusy(true);
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, coordinates, request_id: requestId.current }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) { setError(result.errors?.join(" ") || result.error || "Your request could not be saved."); return; }
      if (typeof result.data?.id !== "string") throw new Error("Missing request reference");
      setReference(result.data.id);
    } catch { setError("We could not confirm whether your request was saved. Check Your requests or retry; the same request reference will be reused."); }
    finally { setBusy(false); }
  }
  if (online && !signedIn) return <section className={styles.panel + " " + styles.panelBody}><h2 className={styles.wizardTitle}>Sign in to save your request</h2><p className={styles.muted}>Keep your vehicle details and request updates in one place. For immediate assistance, contact support.</p><div className={styles.actions}><Link className={styles.primary} href="/sign-in?next=/booking">Sign in</Link><Link className={styles.secondary} href="/sign-up?next=/booking">Create an account</Link><a className={styles.textLink} href={"tel:" + SUPPORT_PHONE_E164}>Call support</a></div></section>;
  if (reference) return <section className={styles.panel + " " + styles.panelBody} role="status"><Icon name="check" size={38} /><h2 className={styles.wizardTitle + " mt-4"}>Your request is saved.</h2><p className={styles.muted}>Contact support to confirm availability and arrange assistance. No mechanic has been automatically dispatched.</p><dl className={styles.summary}><div><dt>Service</dt><dd>{draft.service}</dd></div><div><dt>Reference</dt><dd>{reference}</dd></div></dl><div className={styles.actions}><Link className={styles.primary} href={"/profile/requests/" + reference}>View request</Link><a className={styles.secondary} href={"tel:" + SUPPORT_PHONE_E164}>Call support</a></div></section>;
  if (whatsapp) return <section className={styles.panel + " " + styles.panelBody} role="status"><h2 className={styles.wizardTitle}>Review and send your message</h2><p className={styles.muted}>Your message is prepared, not sent. Open WhatsApp and press Send. This fallback does not create a saved request in your account.</p><div className={styles.actions}><a className={styles.primary} href={whatsapp} target="_blank" rel="noopener noreferrer">Open WhatsApp</a><button className={styles.secondary} onClick={() => setWhatsapp("")}>Edit details</button></div></section>;
  return <div className={styles.grid}><form ref={form} onSubmit={submit} className={styles.panel}><ol className={styles.progress} aria-label="Request progress">{steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}><span>{step > index ? <Icon name="check" size={14} /> : index + 1}</span>{label}</li>)}</ol><div className={styles.panelBody}><h2 ref={heading} tabIndex={-1} className={styles.wizardTitle}>{["What do you need help with?", "Which vehicle needs help?", "Where did your vehicle stop?", "Check your request"][step]}</h2><p className={styles.muted + " mb-5"}>{["Select the service that best describes the problem.", "Choose a saved vehicle or enter another one.", "Add a clear address or nearby landmark and city.", "Confirm these details before sending your request."][step]}</p>{error && <div className={styles.error} role="alert">{error}{step === 3 && <div className={styles.actions}><Link className={styles.textLink} href="/profile/requests">Check Your requests</Link><a className={styles.textLink} href={"tel:" + SUPPORT_PHONE_E164}>Call support</a></div>}</div>}<fieldset disabled={busy}>
    {step === 0 && <div className={styles.services + " " + styles.wizardServices}>{options.map((service, index) => <label key={service} className={styles.service}><input type="radio" name="service" value={service} checked={draft.service === service} onChange={() => update("service", service)} required /><Icon name={serviceIcons[index] ?? "support"} size={27} /><strong>{service}</strong></label>)}</div>}
    {step === 1 && <div className={styles.formGrid}>{vehicles.length > 0 && <label className={styles.field + " " + styles.full}>Saved vehicle<select value={selectedVehicle} onChange={event => { const vehicle = vehicles.find(item => item.id === event.target.value); setSelectedVehicle(event.target.value); update("vehicle", vehicle ? vehicleLabel(vehicle) : ""); }}><option value="">Use another vehicle</option>{vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>{vehicleLabel(vehicle)}{vehicle.plate ? " · " + vehicle.plate : ""}</option>)}</select></label>}<label className={styles.field + " " + styles.full}>Vehicle make and model<input value={draft.vehicle} onChange={event => { setSelectedVehicle(""); update("vehicle", event.target.value); }} placeholder="For example, Toyota Corolla 2018" required minLength={2} maxLength={200} /></label><label className={styles.field}>Contact name<input value={draft.name} onChange={event => update("name", event.target.value)} autoComplete="name" required minLength={2} maxLength={100} /></label><label className={styles.field}>Phone number<input value={draft.phone} onChange={event => update("phone", event.target.value)} type="tel" autoComplete="tel" required maxLength={40} /></label></div>}
    {step === 2 && <div className={styles.formStack}><label className={styles.field}>Address or nearest landmark<input value={draft.location} onChange={event => update("location", event.target.value)} placeholder="Street, landmark and city" required minLength={3} maxLength={1800} autoComplete="off" /></label><div><button className={styles.secondary} type="button" disabled={locating} onClick={locate}><Icon name="pin" size={17} />{locating ? "Getting location..." : "Use current location"}</button>{geoMessage && <p className={styles.note} role="status">{geoMessage}</p>}{coordinates && <p className={styles.note}>GPS: {coordinates.latitude}, {coordinates.longitude} <button type="button" className={styles.textLink} onClick={() => { setCoordinates(null); setGeoMessage(""); requestId.current = ""; }}>Remove GPS</button></p>}</div><label className={styles.field}>What happened? (optional)<textarea value={draft.notes} onChange={event => update("notes", event.target.value)} maxLength={2000} placeholder="Useful details, symptoms or access instructions" /></label><p className={styles.note}>Location is shared with AutoRescue only when you submit or send your request.</p></div>}
    {step === 3 && <><dl className={styles.summary}><div><dt>Service</dt><dd>{draft.service}</dd></div><div><dt>Vehicle</dt><dd>{draft.vehicle}</dd></div><div><dt>Breakdown location</dt><dd>{fullLocation}</dd></div><div><dt>Contact</dt><dd>{draft.name}<br />{draft.phone}{initialEmail && <><br />{initialEmail}</>}</dd></div>{draft.notes && <div><dt>Additional details</dt><dd>{draft.notes}</dd></div>}</dl><p className={styles.note}>Price and arrival time are agreed with support. No payment is taken here. Read our <Link href="/privacy" className={styles.textLink}>privacy policy</Link> before submitting.</p></>}
    </fieldset></div><div className={styles.wizardActions}>{step > 0 && <button type="button" className={styles.secondary} disabled={busy || locating} onClick={() => move(step - 1)}>Back</button>}<button type="submit" className={styles.primary} disabled={busy || locating}>{busy ? "Submitting..." : step === 3 ? online ? "Submit request" : "Prepare WhatsApp message" : "Continue"}<Icon name="arrow" size={16} /></button></div></form><aside className={styles.stack}><section className={styles.panel + " " + styles.panelBody}><h2>Your request</h2><dl className={styles.summaryMini}><div><dt>Service</dt><dd>{draft.service || "Choose a service"}</dd></div><div><dt>Vehicle</dt><dd>{draft.vehicle || "Add vehicle details"}</dd></div><div><dt>Location</dt><dd>{draft.location || "Add your location"}</dd></div></dl><p className={styles.note}>Coverage, price and arrival arrangements are confirmed by support.</p></section><section className={styles.panel + " " + styles.panelBody}><h2>Need help with this?</h2><a className={styles.textLink} href={"tel:" + SUPPORT_PHONE_E164}>Call AutoRescue <Icon name="arrow" size={16} /></a></section></aside></div>;
}
