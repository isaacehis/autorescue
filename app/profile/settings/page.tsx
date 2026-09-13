import type { Metadata } from "next";
import { requireDriver } from "@/lib/driver-session";
import AccountEditor from "../../components/driver/AccountEditor";
export const metadata: Metadata = { title: "Account settings", description: "Manage your contact details and account security.", alternates: { canonical: "/profile/settings" } };
export default async function SettingsPage() {
  const { profile } = await requireDriver();
  return <AccountEditor initialProfile={profile} mode="settings" />;
}
