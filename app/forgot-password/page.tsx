import type { Metadata } from "next";
import AuthPage from "../components/AuthPage";
import { safeNext } from "@/lib/api";


export const metadata: Metadata = { title: "Reset your password", description: "Reset your password for your AutoRescue account.", alternates: { canonical: "/forgot-password" }, robots: { index: false, follow: true } };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  
  const query = await searchParams;
  return <AuthPage mode="recover" next={safeNext(query.next)} initialError={query.error ? "This email link has expired or was already used. Request a new link or sign in." : ""} />;
}
