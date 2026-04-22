# Platform Architecture

## Product surfaces

### 1. Embedded donor experience

- Supports one-time and recurring donations
- Lets donor choose `general fund` or a specific campaign
- Can be embedded on the public website through a lightweight widget shell
- Displays campaign cards with progress toward goal
- Captures tribute, employer match, cover-fee, and marketing consent fields later if needed

### 2. Donor portal

- Secure donor login via magic link or passwordless email flow
- View donation history and downloadable annual statements
- Manage recurring gifts
- Update payment method and billing details through Stripe customer portal or custom flows
- Manage communication preferences and Mailchimp subscription state

### 3. Admin dashboard

- Donation reporting, reconciliation, donor CRM view
- Campaign setup, progress tracking, and fund allocation rules
- Offline donation entry for checks, cash, ACH, stock, and in-kind gifts
- Sync status for QuickBooks and Mailchimp
- Receipt and statement delivery audit trail

## Recommended technical design

### Frontend

- Next.js App Router
- Server components for dashboard summaries and donor history
- A dedicated embeddable widget entry route that can be iframe-based first, then script-embedded later

### Backend

- Next.js route handlers for simple APIs
- Background worker for webhooks, statement generation, and outbound sync
- Webhook-driven Stripe ledger as system of record for online payment events

### Data

- PostgreSQL
- Prisma ORM
- Optional Redis for queues, rate limiting, and cache

## Core entities

### Donor

- Profile, contact info, communication preferences
- Stripe customer id
- Mailchimp subscriber id
- QuickBooks customer id

### Campaign

- Name, slug, description, status
- Goal amount, amount raised, visibility
- Optional close date and featured image

### Donation

- One-time or recurring installment
- Gross amount, fee amount, net amount
- Fund designation: general or campaign
- Source: embed, admin, import, portal
- Channel: card, ACH, check, cash, external

### Recurring donation

- Stripe subscription or custom recurring pledge record
- Schedule, status, payment method summary
- Links to installment donations

### Receipt

- Per-donation receipt email status and rendered payload
- Tax-deductible messaging and organization metadata

### Statement

- Year-end annual summary with PDF or HTML artifact
- Delivery status and timestamp

### Integration event

- Outbound sync queue for QuickBooks and Mailchimp
- Retry status, error payload, and reconciliation timestamps

## Stripe implementation notes

- Use Stripe Payment Element or Checkout for donation capture
- Use Stripe Billing for recurring gifts
- Create a Stripe customer for every donor
- Reconcile donations from webhook events rather than client success redirects alone
- Support payment method updates via Stripe Billing Portal or Setup Intents

## QuickBooks implementation notes

- Sync donors as customers
- Sync donations as sales receipts or journal entries depending on accounting policy
- Map campaign/fund selections to QuickBooks classes, products, or accounts
- Keep an idempotent outbound event table to prevent duplicate entries

## Mailchimp implementation notes

- Upsert donor into audience on first donation or portal signup
- Store consent source and timestamp
- Tag by campaign, recurring donor status, and donor tier

## Email and statements

- Donation receipt immediately after successful payment or offline entry confirmation
- Annual statement batch job each January for prior tax year
- Store delivery logs and generated artifact references

## Offline donations

- Admin enters manual gifts with payment channel and deposit date
- Optionally attach scanned check or memo later
- Trigger receipt workflows if appropriate
- Include in campaign progress and donor history
