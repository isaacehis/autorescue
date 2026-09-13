# AutoRescue: review and setup

## What changed
The driver area now has a compact application layout rather than the marketing navigation: Overview, Requests, Vehicles, Account and Support, with mobile bottom navigation. Service buttons open a four-step request flow. Requests have owner-scoped detail pages with saved status, location, map links and support actions. The homepage, hero and both phone mockups were left unchanged.

Saved vehicles (up to five), name and contact phone persist as personal preferences in Supabase Auth user metadata. These are not roles or permission flags, and are never used to authorize database access. The account API accepts only known fields after verifying the signed-in user. The revision field detects stale edits; it is not a transactional concurrency guarantee. No additional SQL migration is needed for this feature. A future fleet product should move shared vehicle management to normalized, owner-protected tables.

The old account, booking, and inquiry handlers stored records in JavaScript arrays. Those arrays were temporary and were not a database. The old login also used a local signing secret that was missing in production. That implementation has been removed.

The app now uses Supabase Auth through server-side SDK calls. Passwords are sent over HTTPS to Supabase for authentication and hashing, not saved in this project's source files, browser storage, or logs. The browser receives an HttpOnly session cookie. The account page checks the user with Supabase before reading their records.

## What Supabase is
Supabase provides the online PostgreSQL database and account system. Your Vercel website is the shop front; Supabase holds the account and request records. GitHub holds the source code, not customer passwords.

The local app is connected to Supabase through the ignored `.env.local` file. Email sign-up is enabled and email confirmation is required. The owner ran the database SQL successfully on 7 September 2026. Both tables now reject anonymous reads with permission-denied responses, rather than missing-table errors. Do not rerun setup simply because the SQL reports no rows. Complete the authentication URL and email settings, then perform the two-account tests below. No user account or booking was created by the connection checks.

The application uses `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` on the server. The public values supplied with `NEXT_PUBLIC_` names were mapped to these existing names; they were not added to client code. Do not commit `.env.local`.

## Step 1: create your database
1. Open https://supabase.com/dashboard and sign in, using GitHub if you prefer.
2. From Your organizations, choose New organization, name it AutoRescue, and select the Free plan. Then create a project named AutoRescue. Choose a region appropriate for your users.
3. Save the database password privately. Do not paste it into chat or source code.
4. Open the project's Connect dialog for the Project URL and publishable key. Keys are also under Settings > API Keys. Use the sb_publishable_ key, not a secret or service-role key.
5. Add them as SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local.
6. Open the SQL Editor. Paste database/rls-policies.sql and run it once against the new project.
7. Enable email confirmation under Authentication. Configure a minimum password length of 12.
8. In Authentication URL settings, use http://localhost:3000 for local development. Add your exact Vercel URL and /auth/callback path when deployed.
9. Configure your own SMTP provider before inviting testers. Supabase's default mail service has restricted delivery and rate limits.
10. Set the confirmation email link to:
    {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
    Set the recovery email link to:
    {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery

The sign-up, sign-in, password recovery, reset, session refresh, sign-out, and account-history code is implemented. Live provider operation still needs testing after these settings are applied.

## Step 2: protect requests across Vercel servers
Create an Upstash Redis database, then copy its REST URL and REST token into UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. These stay on the server. The application uses an atomic counter shared across instances. Production write requests fail closed if the limiter is missing or unavailable.

Enable Supabase Auth rate limits and CAPTCHA before unrestricted registration. Application API rate limits cannot protect direct calls to a public Supabase endpoint. The inquiry table permits insert-only public messages; use a CAPTCHA-validated server endpoint or restrict inserts before high-traffic public launch.

## Step 3: verify before team access
The driver components are checked in an isolated local fixture with synthetic records; there is no production authentication bypass. Earlier checks covered desktop layout, mobile navigation, vehicle add/edit/remove, service selection, saved-vehicle prefilling, step navigation and booking confirmation. Backend checks verify validation, authenticated-owner binding and retry handling using a mocked database. Local HTTP checks verify page responses and signed-out access rejection. These do not replace signed-in end-to-end tests against Supabase. See `VERIFICATION.md` for the latest check results and boundaries.

Run npm run lint and npm run build. Then test with two separate accounts:
- Sign up, receive the email, confirm it, and sign in.
- Sign out, sign in again, and reset the password.
- Create one booking with each account; confirm each sees only their own records.
- Restart the website; accounts and bookings must still exist.
- Add, edit and remove a saved vehicle. Sign out and in again to verify persistence.
- Update your name and phone; confirm the next request is prefilled correctly.
- Open a request's detail URL with the other account. It must not reveal the first account's data.
- Use the public database key with each user's session to verify another owner's records are inaccessible.
- Submit an inquiry and confirm it exists in Supabase Table Editor.
- Review bookings and inquiries in Supabase Table Editor. Automated dispatch, operator notifications, mechanic tracking, and payment collection are not implemented.

## Step 4: upload source to GitHub
Open C:\Projects\AutoRescue in VS Code. Source Control > Initialize Repository > Publish to GitHub > choose a PRIVATE repository for your team.
Review the file list first. .env.local, .next, node_modules, and .vercel must be excluded. .env.example is a safe blank template.
Invite teammates through repository Settings > Collaborators. Do not publish credentials with the source.

## Step 5: deploy with Vercel
1. Sign in to Vercel and choose Add New > Project.
2. Import the AutoRescue GitHub repository. Framework: Next.js. Root directory: project root.
3. Set the Supabase and Upstash variables under Environment Variables.
4. Set NEXT_PUBLIC_APP_URL and APP_ORIGIN to the exact Vercel hostname. Add this hostname to Supabase's URL configuration.
5. Deploy. Share the resulting HTTPS .vercel.app URL with your team.
6. Vercel previews can use Deployment Protection if available in your account. Do not add real customer records for an unrestricted team preview.
7. Changes to NEXT_PUBLIC variables require redeployment.

Use Node.js 22 or newer. `npm run check:deploy` checks an ignored env file and prints only variable names, never values. Production currently needs `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `APP_ORIGIN`, and a matching HTTPS `NEXT_PUBLIC_APP_URL`. Supabase is configured locally, but Redis and the final deployment origins have not been supplied. Do not disable the production limiter to bypass setup: authentication and other POST actions intentionally return a safe unavailable response without it. Configure the real values in Vercel for the environment your team will use, then redeploy and test that URL.

Share a test checklist with your team, not a promise of public-launch readiness. Keep the preview protected and use test records. No GitHub repository or Vercel deployment has been created in this task.

Your accounts have not been accessed and nothing has been uploaded or deployed in this task.

## Analytics, search, photos
407001918 is stored as a Google Analytics property ID. Tracking stays disabled until a valid G- measurement ID and an appropriate consent setup are provided. Search Console can be added later. Missing social profiles and team pictures are hidden without visitor-facing setup notes.

The account-page roadside tyre-repair photograph is by Yura Forrat: https://www.pexels.com/photo/man-changing-a-flat-tire-12216205/
License: https://www.pexels.com/license/
The person is stock photography, not represented as an AutoRescue employee. The local WebP is compressed. No generative imagery was used.

Supabase Free is $0/month with two active projects, a 500 MB database per project, and other usage limits. Free projects can pause after a week of inactivity. It is suitable for initial setup and team tests, not an unlimited production hosting promise. Check https://supabase.com/pricing before enabling paid features. Pricing checked on 7 September 2026.

## Security scope
Implemented: server-side authentication, HttpOnly/Secure/SameSite cookies, strict same-origin POST checks, body-size limits, validation, shared production rate limits, owner-scoped booking queries, database constraints, RLS SQL, no service-role key, security headers, no browser source maps, and ignored environment files.
Verified checks include anonymous table-read denial, signed-out account redirection, API rejection of unauthenticated reads/writes, cross-origin writes, incorrect content types, and malformed JSON. Lint and production build pass after the dashboard repair. Authenticated per-user database policies, email delivery, durable writes, Vercel HTTPS deployment, provider billing alerts, backups, and load capacity still require live verification.
CSP currently permits inline scripts for Next.js hydration. A nonce-based policy is a later hardening task. There is no claim of 100% security.
Before public launch, confirm operational coverage, response commitments, data retention, privacy review, backups, spending limits, abuse monitoring, and operator workflows.
