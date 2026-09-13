import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you for contacting AutoRescue. Your inquiry has been received.",
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <section className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Thank You" }]} />

        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 text-center md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
            Message received
          </p>
          <h1 className="mt-4 text-5xl font-black text-white">Thank you.</h1>
          <p className="mt-5 text-lg leading-8 text-gray-300">
            Your inquiry has been received. For emergency roadside help, use the
            booking page or call support immediately.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
            >
              Request Help
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition hover:border-orange-500"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
