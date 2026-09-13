# AutoRescue

Next.js, React, TypeScript, Tailwind CSS, and Framer Motion roadside assistance application.
Open this folder in VS Code: `C:\Projects\AutoRescue`.

## Run and check
```sh
npm ci
npm run dev
npm run lint
npm run build
```
Visit http://localhost:3000. Copy .env.example to .env.local only for a new environment; do not overwrite existing values.

## Code guide
- `app/page.tsx`: homepage sections.
- `app/components/Hero.tsx`: Roadside / Rescue / Anytime messaging.
- `app/components/PhoneMockup.tsx`: interactive sample journey, not live dispatch.
- `app/booking/page.tsx` and `BookingForm.tsx`: request details and confirmation.
- `app/api/auth/route.ts`: Supabase Auth server calls.
- `app/api/bookings/route.ts`: the authenticated owner's requests.
- `app/profile/`: driver overview, request history/details, vehicles, settings and support.
- `app/components/driver/`: responsive driver interface, including mobile bottom navigation.
- `app/api/account/route.ts`: validated changes to the signed-in user's personal preferences.
- `app/lib/driver-data.ts`: normalized profile and saved-vehicle data. These fields never grant permissions.
- `app/lib/supabase.ts` and `proxy.ts`: user verification and session cookies.
- `app/lib/api.ts` and `rate-limit.ts`: request validation and throttling.
- `database/rls-policies.sql`: tables, grants, and ownership policies.

## Current limits
The local app is connected to Supabase. The authentication endpoint responds and requires email confirmation. The owner ran `database/rls-policies.sql` successfully on 7 September 2026; subsequent anonymous reads of both tables were denied. Test authenticated booking creation and two-account isolation next. Email delivery and complete account flows still need verification. Email and phone links work independently of the database.

The driver workspace includes service selection, searchable/filterable request history, individual request pages, saved vehicles, editable contact details and support. Booking is a four-step flow: service, vehicle, location and review. The server binds every booking to the authenticated user's ID and email. Failed history reads are not displayed as an empty account. If booking storage is unavailable, users can prepare a WhatsApp message without being told it was sent. Submission retries reuse a request reference to avoid duplicate records.

Up to five saved vehicles, name and contact phone are personal preferences stored in Supabase Auth user metadata, not a separate fleet database. They are never used for authorization. A revision check catches stale edits but is not a transactional multi-user locking system. No new SQL migration is required for these preferences. The homepage, hero and phone mockups were preserved.

Configured accounts use Supabase's password hashing, not a homemade password store. Provider setup, email delivery, and two-user authorization checks remain required. This folder is source code, not a customer database.

Automated dispatch, live GPS, payments, and published customer reviews are not implemented. The phone mockups are interface illustrations, not live dispatch. Statistics and testimonials remain hidden until real evidence is available.

## Team review and launch
Follow [TEAM-REVIEW.md](docs/TEAM-REVIEW.md) for Supabase, Redis, GitHub, and Vercel setup.
Run `npm run check:deploy` to identify missing deployment configuration without printing secrets. It uses `.env.local` by default; pass another ignored env file with `npm run check:deploy -- .env.vercel.local`. Run with Node.js 22 or newer. Do not replace the local development origin with a production hostname while using localhost.
Review [security-checklist.md](docs/security-checklist.md) before public launch.

Keep .env.local, .next, node_modules, and private credentials out of Git. This integration uses a Supabase publishable key, never a service-role/admin key.

The supplied Analytics number is a property ID, not a G- measurement ID. Tracking is disabled. Search Console, team photos, social profiles, case studies, and response commitments need verified business details.
