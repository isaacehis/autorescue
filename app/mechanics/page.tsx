import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mechanic Partners",
  description:
    "Learn how mechanics can join AutoRescue, pass verification, and receive roadside assistance requests.",
  alternates: {
    canonical: "/mechanics",
  },
};

const requirements = [
  "Valid identity and contact information",
  "Proof of mechanical skill or workshop experience",
  "Service areas and availability schedule",
  "Clear pricing rules before accepting jobs",
  "Agreement to customer safety and review policies",
];

export default function MechanicsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <section className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: "Mechanic Partners" }]} />

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
              Mechanics
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
              Bring your skills to the roadside.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Tell us about your skills, workshop experience, and service area. Contact the team to discuss partner requirements and the kinds of roadside work you can take on.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact?subject=mechanic"
                className="rounded-xl bg-orange-500 px-7 py-4 text-center font-bold text-white transition hover:bg-orange-600"
              >
                Apply as Mechanic
              </Link>
              <Link
                href="/security"
                className="rounded-xl border border-white/15 px-7 py-4 text-center font-bold text-white transition hover:border-orange-500"
              >
                View Safety Rules
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-7">
            <h2 className="text-2xl font-black text-white">
              Verification checklist
            </h2>
            <ul className="mt-6 space-y-4 text-gray-300">
              {requirements.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-black p-4">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
