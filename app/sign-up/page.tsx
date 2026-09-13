import type { Metadata } from "next";
import AuthPage from "../components/AuthPage";
import { safeNext } from "@/lib/api";


export const metadata: Metadata = { title: "Create account", description: "Create account for your AutoRescue account.", alternates: { canonical: "/sign-up" }, robots: { index: false, follow: true } };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  
  const query = await searchParams;
  return <AuthPage mode="register" next={safeNext(query.next)} initialError={query.error ? "This email link has expired or was already used. Request a new link or sign in." : ""} />;
}
