"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORT_PHONE_E164 } from "@/lib/site";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  if (["/sign-in", "/sign-up", "/forgot-password", "/reset-password", "/profile"].includes(pathname)) return null;
  return <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[#080909] px-4 py-3 md:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}><div className="mx-auto grid max-w-md grid-cols-2 gap-3"><Link href="/booking" className="button-primary !px-3 !text-sm">Request help</Link><a href={`tel:${SUPPORT_PHONE_E164}`} className="button-secondary !px-3 !text-sm">Call support</a></div></div>;
}
