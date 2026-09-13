import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function databaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

export async function createDatabase() {
  if (!databaseConfigured()) return null;
  const cookieStore = await cookies();
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createServerClient(process.env.SUPABASE_URL!, publishableKey, {
    cookieOptions: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(values) {
        try { values.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
      },
    },
  });
}

export async function currentUser() {
  const database = await createDatabase();
  if (!database) return null;
  const { data, error } = await database.auth.getUser();
  return error ? null : data.user;
}
