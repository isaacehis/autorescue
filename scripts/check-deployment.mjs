import { existsSync } from "node:fs";

const envFile = process.argv[2] || ".env.local";
if (existsSync(envFile)) process.loadEnvFile(envFile);
let missing = 0;
function check(name, valid) {
  console.log(`${valid ? "OK" : "NEEDS SETUP"} ${name}`);
  if (!valid) missing += 1;
}
function httpsOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && url.origin === value;
  } catch { return false; }
}
check("SUPABASE_URL", httpsOrigin(process.env.SUPABASE_URL));
check("SUPABASE_PUBLISHABLE_KEY", /^sb_publishable_[\w-]+$/.test(process.env.SUPABASE_PUBLISHABLE_KEY || ""));
const hasUpstashRateLimiter = httpsOrigin(process.env.UPSTASH_REDIS_REST_URL) && Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);
const hasSupabaseRateLimiter = httpsOrigin(process.env.SUPABASE_URL) && /^sb_publishable_[\w-]+$/.test(process.env.SUPABASE_PUBLISHABLE_KEY || "");
check("rate limiter backend (Upstash Redis or Supabase RPC)", hasUpstashRateLimiter || hasSupabaseRateLimiter);
check("APP_ORIGIN (exact HTTPS deployment origin)", httpsOrigin(process.env.APP_ORIGIN));
check("NEXT_PUBLIC_APP_URL (must match APP_ORIGIN)", httpsOrigin(process.env.NEXT_PUBLIC_APP_URL) && process.env.NEXT_PUBLIC_APP_URL === process.env.APP_ORIGIN);
console.log("No environment values were printed. This checks configuration shape, not provider connectivity or security.");
console.log("Also verify Supabase email delivery, redirect URLs, two-user data isolation and the production rate limiter. See docs/TEAM-REVIEW.md.");
process.exitCode = missing ? 1 : 0;
