export const SITE_NAME = "AutoRescue";

const configuredSiteUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");

export const SITE_URL =
  configuredSiteUrl ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_DESCRIPTION =
  "Request roadside assistance for battery, tyre, towing, diagnostics, and emergency vehicle support.";

export const SUPPORT_PHONE_E164 =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_E164 ?? "+2348138268598";

export const SUPPORT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY ?? "+234 813 826 8598";

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "ehigieisaac820@gmail.com";

export const OFFICE_CITY =
  process.env.NEXT_PUBLIC_OFFICE_CITY ?? "Lagos";

export const OFFICE_COUNTRY =
  process.env.NEXT_PUBLIC_OFFICE_COUNTRY ?? "Nigeria";

export const SERVICE_AREA = `${OFFICE_CITY}, ${OFFICE_COUNTRY}`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Roadside Guide" },
  { href: "/mechanics", label: "Mechanics" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [
  { href: "/booking", label: "Request Help" },
  { href: "/services", label: "Services" },
  { href: "/mechanics", label: "For Mechanics" },
  { href: "/case-studies", label: "Roadside Guide" },
  { href: "/security", label: "Account Safety" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];
