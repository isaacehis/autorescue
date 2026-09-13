"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/auth", { signal: controller.signal, cache: "no-store" }).then(response => response.json()).then(data => setAuthenticated(Boolean(data.authenticated))).catch(() => {});
    return () => controller.abort();
  }, [pathname]);
  return <header className="site-header">
    <nav aria-label="Main navigation" className="nav-inner">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>AutoRescue</Link>
      <div className="hidden items-center gap-6 lg:flex">{NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="nav-link">{link.label}</Link>)}</div>
      <div className="flex items-center gap-3"><Link href={authenticated ? "/profile" : "/sign-in"} className="nav-account" onClick={() => setOpen(false)}>{authenticated ? "My account" : "Sign in"}</Link>
        <button type="button" className="menu-toggle lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={open ? "M6 6l12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg></button>
      </div>
    </nav>
    {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-menu lg:hidden" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>{NAV_LINKS.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}<Link className="button-primary" href="/booking" onClick={() => setOpen(false)}>Request help</Link></nav>}
  </header>;
}
