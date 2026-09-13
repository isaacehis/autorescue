# AutoRescue verification

Checked: 11 September 2026.

## Passed locally

- `npm run lint` completed successfully.
- `npm run build` completed successfully with Next.js 16.3.4.
- `npm audit --omit=dev --audit-level=high` reported zero known production dependency vulnerabilities.
- 56 local page, private-route, internal-link, and API guard checks passed without creating an account or request.
- Backend owner-binding checks passed against mocked providers: authentication required, same-origin checks, request validation, saved-vehicle validation, account revision checks, duplicate request handling, and owner-filtered reads.
- Homepage files were preserved. Hashes matched for `app/page.tsx`, `app/components/Hero.tsx`, `app/components/PhoneMockup.tsx`, and `app/components/DownloadApp.tsx`.
- Browser checks covered sign-in, sign-up, the driver workspace fixture, mobile navigation, and 320/390-pixel overflow checks.

## Still required before sharing the Vercel link

- Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel.
- Set `APP_ORIGIN` and `NEXT_PUBLIC_APP_URL` to the exact HTTPS Vercel URL.
- Add that Vercel URL in Supabase Auth redirect settings.
- Configure Supabase email delivery, then test sign-up, confirmation, sign-in, reset password, and sign-out.
- Test two separate accounts and confirm each account can only see its own bookings.
- Keep the first Vercel preview for team review only. Do not use real customer records yet.

## Deployment preflight

`npm run check:deploy` prints only variable names, never secret values. It currently passes Supabase settings and correctly reports the missing production Redis and HTTPS origin settings.
