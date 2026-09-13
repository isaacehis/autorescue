"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteFrame({ children, navigation, footer, sticky }: { children: ReactNode; navigation: ReactNode; footer: ReactNode; sticky: ReactNode }) {
  const pathname = usePathname();
  const workspace = pathname === "/booking" || pathname === "/profile" || pathname.startsWith("/profile/");
  return <div data-workspace={workspace}>{!workspace && navigation}{children}{!workspace && footer}{!workspace && sticky}</div>;
}
