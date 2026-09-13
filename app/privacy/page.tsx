import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the AutoRescue privacy policy covering account data, booking details, location information, cookies, analytics, and user rights.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "Information we collect",
    text: "AutoRescue may collect your name, email, phone number, vehicle details, service request, and location details needed to handle roadside assistance.",
  },
  {
    title: "How information is used",
    text: "Your information is used to process requests, contact you about support, improve safety, prevent abuse, and keep service records.",
  },
  {
    title: "Saved vehicles and account details",
    text: "Your saved vehicles, name and contact phone are stored with your Supabase account to prefill requests. You can edit these details or remove a saved vehicle in your account. Removing a saved vehicle does not remove the details already attached to past service requests.",
  },
  {
    title: "Location data",
    text: "We use the address or landmark you submit to understand your request. GPS is optional and requires your browser permission. Coordinates are sent to AutoRescue only when you submit a request, or to WhatsApp if you choose to send a support message there. Opening a map shares the selected location with Google Maps. We do not sell your location.",
  },
  {
    title: "Security",
    text: "Account authentication is handled by Supabase when online accounts are available. Passwords are hashed by the authentication provider. Session cookies keep you signed in.",
  },
  {
    title: "Analytics",
    text: "Analytics is currently disabled. The website uses necessary session cookies when you sign in.",
  },
  {
    title: "Your rights",
    text: "You can request access, correction, or deletion of your personal information by contacting support.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <section className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
          Privacy
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
          Privacy policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Last updated September 9, 2026.
        </p>

        <div className="mt-12 space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6"
            >
              <h2 className="text-2xl font-black text-white">
                {section.title}
              </h2>
              <p className="mt-4 leading-8 text-gray-400">{section.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 leading-8 text-gray-400">
          For privacy requests, email{" "}
          <a className="font-bold text-white hover:text-orange-400" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </main>
  );
}
