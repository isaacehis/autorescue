import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";
import { safeNext } from "@/lib/api";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const database = await createDatabase();
  if (code && database) {
    const { error } = await database.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(safeNext(request.nextUrl.searchParams.get("next")), request.url));
  }
  return NextResponse.redirect(new URL("/sign-in?error=expired-link", request.url));
}
