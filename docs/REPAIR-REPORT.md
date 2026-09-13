# AutoRescue repair report

Checked: 11 September 2026.

## Restored design

The saved original PhoneMockup.tsx and DownloadApp.tsx components were recovered from the earlier outputs folder. Both phone sections are back, with their original map lines, orange route, mechanic card, dark phone frame, and tracking layout. Visible DEMO and sample-journey labels inside the phone were removed. No AI images were added.

Sizing changes prevent clipped phone controls and horizontal overflow on small screens. Reduced-motion preferences are respected. The lower homepage section again includes Apple and Google Play icons and buttons. No store listing exists yet, so clicking either explains availability and offers the working browser request flow instead of opening an invented store URL.

## Main source changes

- `app/components/PhoneMockup.tsx`: original phone restored; call, support, and account links connected.
- `app/components/DownloadApp.tsx`: original second phone restored; responsive layout and store-button feedback.
- `app/page.tsx`: lower app section restored.
- `app/components/AuthPage.tsx` and `AuthForm.tsx`: account availability, clear navigation, accessible forms, eager loading for the above-fold photo.
- `app/components/BookingForm.tsx`: preserve entered details when editing a prepared request; validate the phone number.
- `app/lib/utils.ts`: reject phone values without enough digits.
- `app/lib/api.ts`: repair local origin validation without weakening production origin checks.
- Booking, contact, mechanics, privacy, thank-you, and not-found pages: working skip-to-content targets.
- `README.md`, `public/llms.txt`, and security documentation: describe the real implementation and outstanding setup.

## Verification

- ESLint and production build passed, including TypeScript compilation.
- Production dependency audit reported zero known vulnerabilities at the time checked. This is not a security certification.
- Public and authentication routes returned expected responses; private profile redirected to sign-in; missing routes returned 404.
- API checks passed for cross-origin rejection, non-JSON requests, malformed JSON, oversized bodies, invalid bookings, and rate limiting with Retry-After.
- Browser checks covered desktop and 320/390-pixel mobile layouts, sign-in/sign-up navigation, mobile menu links, restored phone tracking, store buttons, and request editing. No document-level horizontal overflow was found at the checked widths.
- No React or hydration errors appeared in the checked browser flows. An image-loading warning was corrected.

## Not yet ready for public account access

The local app is connected to Supabase for authentication and database access. Production still needs Redis rate-limiting variables, final HTTPS origins, email delivery checks, and two-account data-isolation tests before team review.

Credentials are handled by Supabase Auth through server routes, with provider password hashing and HttpOnly session cookies. Database ownership rules are supplied in `database/rls-policies.sql`, and the owner reported the SQL ran successfully. No live dispatch, GPS tracking, payment processing, load test, or independent security review has been completed. Phone interfaces are illustrations, not evidence of these services being live.

Follow `TEAM-REVIEW.md` to connect Supabase, configure production services, and then create the GitHub/Vercel team-review deployment. No repository or deployment has been published during this repair. Keep `.env.local` and secrets out of Git.
