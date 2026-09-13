import type { Metadata } from "next";
import AuthPage from "../components/AuthPage";
import { safeNext } from "@/lib/api";
import { currentUser } from "@/lib/supabase";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Choose a new password", description: "Choose a new password for your AutoRescue account.", alternates: { canonical: "/reset-password" }, robots: { index: false, follow: true } };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  if (!await currentUser()) redirect("/forgot-password");
  const query = await searchParams;
  return <AuthPage mode="update-password" next={safeNext(query.next)} initialError={query.error ? "This email link has expired or was already used. Request a new link or sign in." : ""} />;
}
