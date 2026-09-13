import { NextRequest, NextResponse } from "next/server";
import { createDatabase } from "@/lib/supabase";
import { apiError, guardRequest, readBody, requestOrigin } from "@/lib/api";

export async function GET() {
  try {
  const database = await createDatabase();
  const user = database ? (await database.auth.getUser()).data.user : null;
  return NextResponse.json({ success: true, authenticated: Boolean(user), data: user ? { id: user.id, email: user.email, name: user.user_metadata.full_name } : null }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return apiError("Account access is temporarily unavailable.", 503); }
}

export async function POST(request: NextRequest) {
  const blocked = await guardRequest(request, "auth");
  if (blocked) return blocked;
  const body = await readBody(request);
  if (!body) return apiError("Please send a valid form.", 400);
  try {
  const database = await createDatabase();
  if (!database) return apiError("Accounts are temporarily unavailable. You can still call us for roadside help.", 503);
  const action = String(body.action ?? "");
    if (action === "logout") {
      const { error } = await database.auth.signOut();
      return error ? apiError("Could not sign out. Please try again.", 503) : NextResponse.json({ success: true });
    }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (action !== "update-password" && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) return apiError("Enter a valid email address.", 400);
    if (action === "recover") {
      const { error } = await database.auth.resetPasswordForEmail(email, { redirectTo: `${requestOrigin(request)}/auth/callback?next=/reset-password` });
      if (error && error.status !== 400) return apiError("We could not send the email. Please try again later.", 503);
      return NextResponse.json({ success: true, message: "If an account exists for this email, you will receive a password reset link." });
    }
    if (!password || password.length > 128 || ((action === "register" || action === "update-password") && password.length < 12)) return apiError("Use a password between 12 and 128 characters.", 400);
    if (action === "register") {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      if (name.length < 2 || name.length > 100 || body.confirmPassword !== password || body.privacy !== true) return apiError("Check your name, confirm your password, and accept the privacy policy.", 400);
      const { data, error } = await database.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: `${requestOrigin(request)}/auth/callback` } });
      if (error) return apiError(error.status === 429 ? "Please wait before trying again." : "We could not create your account. Try signing in or resetting your password.", error.status === 429 ? 429 : 400);
      return NextResponse.json({ success: true, authenticated: Boolean(data.session), message: "Check your email for a confirmation link. If you already have an account, sign in." });
    }
    if (action === "login") {
      const { error } = await database.auth.signInWithPassword({ email, password });
      if (error) return apiError(error.code === "email_not_confirmed" ? "Confirm your email using the link in your inbox before signing in." : "Email or password is incorrect.", 401);
      return NextResponse.json({ success: true, authenticated: true });
    }
    if (action === "update-password") {
      const { data } = await database.auth.getUser();
      if (!data.user) return apiError("Your reset link has expired. Request a new one.", 401);
      if (body.confirmPassword !== password) return apiError("Passwords do not match.", 400);
      const { error } = await database.auth.updateUser({ password });
      if (error) return apiError("Could not update your password. Try a different password or request a new link.", 400);
      await database.auth.signOut({ scope: "global" });
      return NextResponse.json({ success: true, message: "Password updated. Please sign in with your new password." });
    }
    return apiError("Choose a valid account action.", 400);
  } catch { return apiError("Accounts are temporarily unavailable. Please try again later.", 503); }
}
