import Link from "next/link";
import { SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_E164 } from "@/lib/site";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">24/7 roadside response</p>
        <h1 id="hero-title">Roadside<br /><span>Rescue</span><br />Anytime.</h1>
        <p className="hero-description">
          Request a mechanic, towing, a battery jumpstart, or tyre assistance.
          Tell us where your vehicle stopped and get help with your next step.
        </p>
        <div className="hero-actions">
          <Link href="/booking" className="button-primary">Request Mechanic</Link>
          <Link href="/mechanics" className="button-secondary">Become a Mechanic</Link>
        </div>
        <p className="hero-contact">
          Prefer to talk? <a href={`tel:${SUPPORT_PHONE_E164}`}>{SUPPORT_PHONE_DISPLAY}</a>
        </p>
        <p className="hero-availability">
          Confirm coverage, cost, and arrival time with support before assistance is arranged.
        </p>
        <div className="hero-service-list" aria-label="Popular services">
          <span>01 / Towing</span>
          <span>02 / Battery</span>
          <span>03 / Tyres</span>
        </div>
      </div>
      <div className="hero-device">
        <PhoneMockup />
      </div>
    </section>
  );
}
