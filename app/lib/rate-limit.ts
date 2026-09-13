import "server-only";
import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();
type Options = { keyPrefix: string; limit: number; windowMs: number };

async function rateLimitWithSupabase(key: string, options: Options, retryAfter: number) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const token = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !token) return null;
  try {
    const response = await fetch(`${url}/rest/v1/rpc/take_rate_limit`, {
      method: "POST",
      headers: {
        apikey: token,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_key: key,
        p_limit: options.limit,
        p_window_ms: options.windowMs,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    const data = await response.json();
    const row = Array.isArray(data) ? data[0] : data;
    if (!response.ok || typeof row?.allowed !== "boolean") throw new Error("Rate limit unavailable");
    return {
      allowed: row.allowed,
      retryAfter: Number(row.retry_after) || retryAfter,
      unavailable: false,
    };
  } catch {
    return { allowed: false, retryAfter, unavailable: true };
  }
}

export async function rateLimit(request: NextRequest, options: Options) {
  const now = Date.now();
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0] || "unknown" : "local";
  const digest = createHash("sha256").update(ip).digest("hex");
  const key = `${options.keyPrefix}:${digest}:${Math.floor(now / options.windowMs)}`;
  const retryAfter = Math.ceil((options.windowMs - now % options.windowMs) / 1000);
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]); end; return count", 1, key, options.windowMs]),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      const data = await response.json();
      if (!response.ok || typeof data.result !== "number") throw new Error("Rate limit unavailable");
      return { allowed: data.result <= options.limit, retryAfter, unavailable: false };
    } catch { return { allowed: false, retryAfter, unavailable: true }; }
  }
  const supabaseLimit = await rateLimitWithSupabase(key, options, retryAfter);
  if (supabaseLimit) return supabaseLimit;
  if (process.env.NODE_ENV === "production") return { allowed: false, retryAfter, unavailable: true };
  for (const [entry, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(entry);
  const bucket = buckets.get(key) ?? { count: 0, resetAt: now + options.windowMs };
  bucket.count += 1;
  buckets.set(key, bucket);
  return { allowed: bucket.count <= options.limit, retryAfter, unavailable: false };
}
