import type { Metadata } from "next";
import AuthPage from "../components/AuthPage";
import { safeNext } from "@/lib/api";


export const metadata: Metadata = { title: "Sign in", description: "Sign in for your AutoRescue account.", alternates: { canonical: "/sign-in" }, robots: { index: false, follow: true } };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  
  const query = await searchParams;
  return <AuthPage mode="login" next={safeNext(query.next)} initialError={query.error ? "This email link has expired or was already used. Request a new link or sign in." : ""} />;
}
