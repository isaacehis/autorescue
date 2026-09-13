import type { Metadata } from "next";
import { requireDriver } from "@/lib/driver-session";
import DriverShell from "../components/driver/DriverShell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function DriverLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireDriver();
  return <DriverShell name={profile.name}>{children}</DriverShell>;
}
