# Vibe Giving Platform

A starter codebase for a Stripe-powered donation platform inspired by Donorbox, with room for:

- Embedded donor-facing donation forms
- Donor portal for history and recurring gift management
- Admin dashboard for campaigns, receipts, statements, and offline gifts
- Campaign progress tracking with goal bars
- QuickBooks and Mailchimp integration touchpoints

## Suggested stack

- Next.js App Router for frontend and backend routes
- Stripe for one-time and recurring donation processing
- PostgreSQL plus Prisma for persistence
- Background jobs for receipts, statements, and sync tasks
- Mail provider such as Postmark, Resend, or SendGrid for receipts/statements

## Local setup

1. Install dependencies with your preferred package manager.
2. Copy `.env.example` to `.env.local`.
3. Add Stripe, QuickBooks, Mailchimp, and email credentials.
4. Run `npm run dev`.

## What is included right now

- Product architecture and data model notes in [docs/architecture.md](/C:/Users/Jesse%20Hodge/Documents/Codex/2026-04-21-i-want-to-vibe-code-a/docs/architecture.md)
- Initial Prisma schema in [prisma/schema.prisma](/C:/Users/Jesse%20Hodge/Documents/Codex/2026-04-21-i-want-to-vibe-code-a/prisma/schema.prisma)
- Donor homepage, donation flow, donor portal, and admin dashboard UI scaffold
- API route placeholders for donations, campaigns, offline gifts, and sync events
- Shared domain types and integration service stubs

## Recommended next build steps

1. Add Prisma schema and database migrations.
2. Replace mock data with real persistence.
3. Implement Stripe Checkout or Payment Element plus webhook reconciliation.
4. Add authentication for donors and admins.
5. Wire QuickBooks and Mailchimp sync jobs.
6. Generate PDF statements and queue emails.
