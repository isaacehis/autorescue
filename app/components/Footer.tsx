import Link from "next/link";
import {
  FOOTER_LINKS,
  SERVICE_AREA,
  SITE_DESCRIPTION,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_E164,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-3xl font-black text-orange-500">
            {SITE_NAME}
          </Link>
          <p className="mt-4 max-w-md text-base leading-7 text-gray-400">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-gray-300">
            Site Links
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 transition hover:text-orange-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-gray-300">
            Contact
          </h2>
          <div className="mt-5 space-y-3 text-sm text-gray-400">
            <p>{SERVICE_AREA}</p>
            <a
              href={`tel:${SUPPORT_PHONE_E164}`}
              className="block transition hover:text-orange-400"
            >
              {SUPPORT_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="block transition hover:text-orange-400"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <div className="min-h-5" aria-hidden="true" />
      </div>
    </footer>
  );
}
