"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function logout() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) });
      if (!response.ok) throw new Error();
      router.push("/sign-in");
      router.refresh();
    } catch { setError("Could not sign out. Please try again."); }
    finally { setBusy(false); }
  }
  return <div><button type="button" onClick={logout} disabled={busy} className="button-secondary">{busy ? "Signing out..." : "Sign out"}</button>{error && <p role="alert" className="mt-3 text-red-200">{error}</p>}</div>;
}
