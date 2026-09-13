"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
import LogoutButton from "../LogoutButton";
import Icon from "./Icon";
import styles from "./driver.module.css";

const links = [
  { href: "/profile", label: "Overview", icon: "home" },
  { href: "/profile/requests", label: "Requests", icon: "requests" },
  { href: "/profile/vehicles", label: "Vehicles", icon: "vehicle" },
  { href: "/profile/settings", label: "Account", icon: "account" },
  { href: "/profile/support", label: "Support", icon: "support" },
];
export default function DriverShell({ children, name = "Driver", signedIn = true }: { children: ReactNode; name?: string; signedIn?: boolean }) {
  const pathname = usePathname();
  const active = (href: string) => pathname === href || (href !== "/profile" && pathname.startsWith(href + "/"));
  const title = pathname === "/booking" ? "New request" : links.find(link => active(link.href))?.label ?? "My account";
  const initial = name.trim().charAt(0).toUpperCase() || "A";
  return <div className={styles.workspace}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}>AutoRescue</Link>
      <p className={styles.sidebarLabel}>DRIVER WORKSPACE</p>
      <nav aria-label="Driver navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined}><Icon name={link.icon} />{link.label}</Link>)}</nav>
      <div className={styles.sidebarBottom}><Link href="/booking" className={styles.primary}><Icon name="plus" size={18} />Request help</Link><Link href="/" className={styles.backToSite}>Back to website <Icon name="arrow" size={16} /></Link>{signedIn && <LogoutButton />}</div>
    </aside>
    <div className={styles.workspaceBody}>
      <header className={styles.topbar}><div><Link className={styles.mobileBrand} href="/">AutoRescue</Link><span className={styles.topbarTitle}>{title}</span></div><div className={styles.topbarActions}><a href={"tel:" + SUPPORT_PHONE_E164}><Icon name="support" size={19} /><span>Call support</span></a><Link href={signedIn ? "/profile/settings" : "/sign-in?next=/booking"} className={styles.userPill}><span>{initial}</span><b>{signedIn ? name.split(/\s+/)[0] : "Sign in"}</b></Link></div></header>
      <main id="main-content" className={styles.content}>{children}</main>
      <footer className={styles.workspaceFooter}><span>© {new Date().getFullYear()} AutoRescue</span><Link href="/privacy">Privacy</Link><Link href="/profile/support">Help</Link></footer>
    </div>
    <nav className={styles.bottomNav} aria-label="Mobile driver navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined}><Icon name={link.icon} size={21} /><span>{link.label}</span></Link>)}</nav>
  </div>;
}
