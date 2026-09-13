import type { Metadata } from "next";
import { requireDriver } from "@/lib/driver-session";
import AccountEditor from "../../components/driver/AccountEditor";
export const metadata: Metadata = { title: "Your vehicles", description: "Manage saved vehicle details for faster roadside requests.", alternates: { canonical: "/profile/vehicles" } };
export default async function VehiclesPage() {
  const { profile } = await requireDriver();
  return <AccountEditor initialProfile={profile} mode="vehicles" />;
}
