import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 text-center md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
          404
        </p>
        <h1 className="mt-4 text-5xl font-black text-white">
          Page not found.
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-300">
          The page you opened does not exist. Use the links below to get back to
          the main AutoRescue flow.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Go Home
          </Link>
          <Link
            href="/booking"
            className="rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition hover:border-orange-500"
          >
            Request Help
          </Link>
        </div>
      </section>
    </main>
  );
}
