# AutoRescue security checks

## Implemented in source
- Supabase Auth server calls; no plaintext password database or browser-storage sessions.
- HttpOnly cookies, Secure in production, SameSite=Lax for email-link redirects.
- Same-origin checks, JSON body limits, and validation on write APIs.
- Shared Redis rate limiting; production writes fail closed without it.
- Owner-scoped booking queries, RLS SQL, restricted grants, and SDK queries.
- Security headers, disabled production browser source maps, and ignored environment files.

## Verify in the actual Supabase project
- Apply database/rls-policies.sql to the new project, not blindly over an existing database.
- Confirm RLS on every table and deny anonymous booking reads.
- Test two accounts: neither can read or insert another owner's booking.
- Verify email confirmation, recovery, logout, and persistence after restarts.
- Enable provider rate limits, CAPTCHA, and reliable SMTP.
- Address direct public database-endpoint abuse. App API limits do not protect direct Supabase calls. Public inquiry inserts need CAPTCHA/server-only protection before unrestricted launch.
- Never use user-editable profile metadata to grant staff or mechanic privileges.

## Operational launch blockers
- HTTPS hosting, real domain/callback URLs, backups and restore tests.
- Monitoring, privacy/retention review, incident-response ownership.
- Provider spending alerts and supported budget controls; not every service offers a hard cap.
- Realistic load tests and actual dispatch/support capacity.
- A valid G- analytics ID and consent implementation before enabling tracking.
- Verified coverage, prices, mechanic checks, and response commitments.

CSP permits inline scripts for Next.js hydration; nonce-based protection remains a hardening task.
No payment flow, staff dashboard, or live matching service is implemented.
There is no claim of 100% security or unlimited capacity.
