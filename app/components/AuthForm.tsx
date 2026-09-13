"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export type AuthMode = "login" | "register" | "recover" | "update-password";
const labels: Record<AuthMode, string> = { login: "Sign in", register: "Create account", recover: "Send reset link", "update-password": "Save new password" };

export default function AuthForm({ mode, next = "/profile", initialError = "", available = true }: { mode: AuthMode; next?: string; initialError?: string; available?: boolean }) {
  const router = useRouter();
  const [error, setError] = useState(initialError);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !available) return;
    setError("");
    setMessage("");
    const fields = new FormData(event.currentTarget);
    const password = String(fields.get("password") ?? "");
    const confirmPassword = String(fields.get("confirmPassword") ?? "");
    if ((mode === "register" || mode === "update-password") && password !== confirmPassword) { setError("Passwords do not match."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        action: mode, email: fields.get("email"), password, confirmPassword, name: fields.get("name"), privacy: fields.get("privacy") === "on",
      }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "Please try again."); return; }
      if (result.authenticated) { router.push(next); router.refresh(); }
      else setMessage(result.message);
    } catch { setError("Connection interrupted. Please try again."); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      {!available && <p role="status" className="rounded-lg border border-white/15 p-4 text-sm leading-6 text-gray-300">Account access is currently unavailable. You can still <Link href="/booking" className="text-orange-300 underline">request help through support</Link>.</p>}
      <fieldset disabled={!available || busy} className="space-y-5 disabled:opacity-60">
      {mode === "register" && <label className="field-label">Full name<input className="field-input" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" /></label>}
      {mode !== "update-password" && <label className="field-label">Email address<input className="field-input" name="email" type="email" autoComplete="email" autoCapitalize="none" required maxLength={254} placeholder="you@example.com" /></label>}
      {mode !== "recover" && <label className="field-label">{mode === "update-password" ? "New password" : "Password"}
        <span className="relative block"><input className="field-input pr-20" name="password" aria-label={mode === "update-password" ? "New password" : "Password"} type={visible ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={mode === "login" ? 1 : 12} maxLength={128} required aria-describedby={mode !== "login" ? "password-help" : undefined} />
        <button className="absolute right-1 top-1 min-h-11 px-3 text-sm text-orange-300" type="button" aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? "Hide" : "Show"}</button></span>
        {mode !== "login" && <span id="password-help" className="text-xs font-normal leading-5 text-gray-400">Use at least 12 characters. A few unrelated words make a strong password.</span>}
      </label>}
      {(mode === "register" || mode === "update-password") && <label className="field-label">Confirm password<input className="field-input" name="confirmPassword" type={visible ? "text" : "password"} autoComplete="new-password" required minLength={12} maxLength={128} /></label>}
      {mode === "login" && <div className="text-right"><Link className="text-sm text-orange-300 underline-offset-4 hover:underline" href="/forgot-password">Forgot password?</Link></div>}
      {mode === "register" && <label className="flex items-start gap-3 text-sm leading-6 text-gray-300"><input className="mt-1 h-5 w-5 accent-orange-500" type="checkbox" name="privacy" required /><span>I agree to the <Link href="/privacy" className="underline">privacy policy</Link> and allow AutoRescue to contact me about my requests.</span></label>}
      {error && <p role="alert" className="rounded-lg bg-red-950/60 p-4 text-sm leading-6 text-red-100">{error}</p>}
      {message && <div role="status" className="rounded-lg bg-emerald-950/60 p-4 text-sm leading-6 text-emerald-100">{message}{mode === "update-password" && <Link href="/sign-in" className="mt-3 block underline">Return to sign in</Link>}</div>}
      <button type="submit" disabled={busy} className="button-primary w-full">{busy ? "Please wait..." : labels[mode]}</button>
      </fieldset>
      <p className="text-center text-sm leading-6 text-gray-400">{mode === "login" ? <>New to AutoRescue? <Link href={`/sign-up?next=${encodeURIComponent(next)}`} className="mt-2 block font-semibold text-white underline">Create an account</Link></> : <Link href="/sign-in" className="text-white underline">Back to sign in</Link>}</p>
    </form>
  );
}
