import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "./rate-limit";

export const apiError = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status, headers: { "Cache-Control": "no-store" } });

export function requestOrigin(request: NextRequest) {
  const configured = process.env.APP_ORIGIN?.trim().replace(/\/$/, "");
  const current = request.nextUrl.origin;
  const submitted = request.headers.get("origin")?.replace(/\/$/, "");
  return submitted && (!configured || submitted === current) ? submitted : configured || current;
}

export async function guardRequest(request: NextRequest, keyPrefix: string, limit = 8) {
  const origin = request.headers.get("origin");
  const allowed = new Set([request.nextUrl.origin]);
  const configured = process.env.APP_ORIGIN?.trim().replace(/\/$/, "");
  if (configured) allowed.add(configured);
  const host = request.headers.get("host") ?? "";
  if (!process.env.APP_ORIGIN && process.env.NODE_ENV === "development" && request.nextUrl.hostname === "localhost" && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) {
    allowed.add(`${request.nextUrl.protocol}//${host}`);
  }
  if (!origin || !allowed.has(origin.replace(/\/$/, "")) || request.headers.get("sec-fetch-site") === "cross-site") {
    return apiError("This request could not be verified. Please reload the page.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) return apiError("JSON required.", 415);
  const result = await rateLimit(request, { keyPrefix, limit, windowMs: 60_000 });
  if (!result.allowed) {
    const response = apiError(result.unavailable ? "Online requests are temporarily unavailable. Please call or email us." : "Too many attempts. Please wait a minute.", result.unavailable ? 503 : 429);
    response.headers.set("Retry-After", String(result.retryAfter));
    return response;
  }
  return null;
}

export async function readBody(request: NextRequest): Promise<Record<string, unknown> | null> {
  try {
  if (Number(request.headers.get("content-length")) > 16384) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) { await reader.cancel(); return null; }
    chunks.push(value);
  }
    const data = JSON.parse(Buffer.concat(chunks).toString());
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch { return null; }
}

export function safeNext(value: unknown) {
  return typeof value === "string" && ["/profile", "/profile/requests", "/profile/vehicles", "/profile/settings", "/profile/support", "/booking", "/reset-password"].includes(value) ? value : "/profile";
}
