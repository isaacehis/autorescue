import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const database = await createDatabase();
  if (tokenHash && database && (type === "email" || type === "recovery")) {
    const { error } = await database.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(type === "recovery" ? "/reset-password" : "/profile", request.url));
  }
  return NextResponse.redirect(new URL("/sign-in?error=expired-link", request.url));
}
