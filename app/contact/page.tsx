import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import { databaseConfigured } from "@/lib/supabase";
import {
  SERVICE_AREA,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_E164,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact AutoRescue",
  description:
    "Contact AutoRescue for roadside support, mechanic onboarding, fleet partnerships, and business inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Lagos%2C%20Nigeria";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { subject } = await searchParams;
  return (
    <main id="main-content" className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <section className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
              Contact
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
              Talk to AutoRescue.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Call for roadside assistance. For mechanic partnerships, company vehicles, or other questions, contact our team by phone or email.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href={`tel:${SUPPORT_PHONE_E164}`}
                  className="mt-1 block text-xl font-bold text-white transition hover:text-orange-400"
                >
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-1 block text-xl font-bold text-white transition hover:text-orange-400"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service area</p>
                <p className="mt-1 text-xl font-bold text-white">
                  {SERVICE_AREA}
                </p>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                Explore service area
              </a>
            </div>
          </div>

          <ContactForm initialSubject={subject} available={databaseConfigured()} />
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
          <iframe
            title="Map showing AutoRescue service area in Lagos"
            src="https://www.google.com/maps?q=Lagos%2C%20Nigeria&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full"
          />
        </div>
      </section>
    </main>
  );
}
