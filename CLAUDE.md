# Tipon — Claude Code Context

> This file is read automatically by Claude Code at the start of every session.
> Keep it updated as the build progresses.

---

## What This Project Is

**Tipon** is a personal finance tracking web app being built by Mar.
- Personal use first, commercial SaaS later
- Direct competitor / benchmark: Tarsi (₱299 iOS / ₱199 Android, one-time purchase, mobile-only, no real web app)
- Tipon's core advantage: full web app + cloud sync + analytics + eventual PH bank/GCash integration

---

## Current Build Phase

**PHASE: 0 — Foundation (IN PROGRESS)**

Completed: Step 1 — Project Bootstrap (2026-05-02)
Next step: **Step 2 — Supabase Setup**
Refer to `MASTER_BUILD_PLAN.md` → Part 3 → Step 2 for exact commands and done condition.

> Update this section every session. Example: "PHASE: 1 — MVP, currently on Step 7 (Transactions)"

---

## Must-Read Docs (Read These Before Writing Any Code)

| File | When to Read |
|---|---|
| `MASTER_BUILD_PLAN.md` | Every session — your primary build reference |
| `DEVELOPMENT_GUIDELINES.md` | Before writing any code |
| `ROADMAP.md` | When planning what's next |
| `MARKET_ANALYSIS.md` | When making product decisions |

---

## Tech Stack (Non-Negotiable)

```
Framework:    Next.js 14 (App Router, TypeScript)
Database:     Supabase (PostgreSQL + Auth + Storage + RLS)
Styling:      Tailwind CSS + shadcn/ui
Forms:        React Hook Form + Zod
Server state: TanStack React Query v5
Client state: Zustand
Currency:     decimal.js (NEVER native float math)
Dates:        date-fns (NEVER native Date math)
Charts:       Recharts
Payments:     Stripe (Phase 4)
Email:        Resend (Phase 4)
Hosting:      Vercel
CI/CD:        GitHub Actions
Package mgr:  pnpm
```

---

## Folder Structure (Enforce This)

```
src/
  app/
    (auth)/           # login, signup, reset-password, callback
    (dashboard)/      # all protected pages
      dashboard/
      transactions/
      accounts/
      reports/
      settings/
    api/              # API route handlers (mutations only)
  components/
    ui/               # shadcn/ui base components — do not customize here
    charts/           # Recharts wrappers with Tipon color defaults
    features/         # feature-specific components
    layout/           # Sidebar, Header, Shell
  lib/
    supabase/
      client.ts       # browser client (singleton)
      server.ts       # server client (cookies, per-request)
      admin.ts        # service-role client (server only, never browser)
    utils/
      currency.ts     # format, parse, validate — uses decimal.js
      dates.ts        # all date ops — uses date-fns
      cn.ts           # Tailwind class merger
    validations/      # Zod schemas — one file per domain
  hooks/              # React Query wrappers — components never call useQuery directly
  stores/             # Zustand — UI state only, never server data
  types/
    database.ts       # auto-generated from Supabase — never edit manually
    app.ts            # app-level types
supabase/
  migrations/         # all schema changes go here
  seed.sql            # dev seed data
```

---

## Absolute Rules (Never Break These)

### Data Integrity
- **Never hard-delete transactions or accounts** — use `is_deleted = TRUE` (soft delete)
- **Never use `number` for currency math** — always `decimal.js`
- **Never use native `Date` math** — always `date-fns`
- **Every financial calculation must be tested** — unit tests in `lib/utils/*.test.ts`

### Security
- **RLS must be enabled on every user-facing table** — no exceptions
- **Service role key (`admin.ts`) is server-only** — never import in browser code or components
- **All API routes validate input with Zod** before touching the database
- **Never expose internal error messages to the client** — log server-side, return generic message

### TypeScript
- **Strict mode always on** — no `any`, no `as unknown as X`
- **After every DB migration**, run: `pnpm supabase gen types typescript --local > src/types/database.ts`
- **Commit the generated types file** — it's not gitignored

### Architecture
- **Server Components by default** — add `'use client'` only when needed
- **All DB reads in Server Components or hooks** — never raw Supabase calls in components
- **All mutations through API routes or Server Actions** — never direct client mutations that bypass RLS
- **Optimistic updates with rollback** — use React Query's `onMutate` + `onError`

---

## Database Rules

### RLS Policy Template (apply to every new table)
```sql
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own [table]"
  ON [table] FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own [table]"
  ON [table] FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own [table]"
  ON [table] FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own [table]"
  ON [table] FOR DELETE USING (auth.uid() = user_id);
```

### Migration Naming
```
supabase/migrations/YYYYMMDD_description.sql
Example: 20260502_initial_schema.sql
```

### Never modify applied migrations — create a new one instead.

---

## Component Pattern

```typescript
// ✅ Correct — explicit props, no React.FC
export function TransactionCard({ transaction, onEdit }: {
  transaction: Transaction
  onEdit: (id: string) => void
}) {
  return (...)
}

// ❌ Wrong
const TransactionCard: React.FC = ({ transaction }) => { ... }
const TransactionCard = ({ transaction }: any) => { ... }
```

---

## Currency Pattern

```typescript
// ✅ Always
import Decimal from 'decimal.js'
const total = new Decimal(amount1).plus(new Decimal(amount2))
const formatted = new Intl.NumberFormat('en-PH', {
  style: 'currency', currency: 'PHP'
}).format(total.toNumber())

// ❌ Never
const total = amount1 + amount2  // floating point error
```

---

## How to Start Each Session

1. Read this file (CLAUDE.md) — already done automatically
2. Check **Current Build Phase** section above
3. Open `MASTER_BUILD_PLAN.md` and find the current step
4. Build the next step following `DEVELOPMENT_GUIDELINES.md`
5. After completing a step, update **Current Build Phase** in this file
6. Run `pnpm type-check && pnpm lint && pnpm test` before considering any step done

---

## Approved Dependencies Only

Before `pnpm add [package]`, check the approved list in `DEVELOPMENT_GUIDELINES.md`.
If the package isn't listed, check:
1. Does a native API or existing package solve this?
2. Is it actively maintained?
3. Bundle size impact (bundlephobia.com)?
4. TypeScript types included?

---

## Key Business Context

- **Primary competitor:** Tarsi — mobile-only, one-time purchase (₱299 iOS / ₱199 Android), no real web app, no cloud sync
- **Tipon's #1 advantage:** Full web app + cloud sync. Tarsi users who want desktop access have nowhere else to go.
- **Tarsi importer is Phase 1** — must be ready at launch to capture migrating users
- **Pricing:** Free tier + Pro (₱399/mo or ₱3,299/yr) + Family (₱799/mo or ₱6,499/yr)
- **Phase 5 watch:** Brankas API for PH bank/GCash sync — first mover wins the market

---

## Useful Commands

```bash
pnpm dev                    # start dev server
pnpm build                  # production build
pnpm type-check             # TypeScript check
pnpm lint                   # ESLint
pnpm test                   # Vitest unit tests
pnpm test:e2e               # Playwright e2e

# Supabase
pnpm supabase start         # start local Supabase
pnpm supabase stop          # stop local Supabase
pnpm supabase db push       # apply migrations
pnpm supabase gen types typescript --local > src/types/database.ts

# Shortcuts
pnpm check                  # type-check + lint + test (run before every commit)
```

---

## Self-Review Checklist (Before Marking Any Feature Done)

- [ ] TypeScript passes (`pnpm type-check`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Unit tests written for any `lib/utils/` changes
- [ ] RLS policies written for any new DB tables
- [ ] Supabase types regenerated after any schema change
- [ ] No `console.log` left in code
- [ ] No `any` types introduced
- [ ] Soft delete used (not hard delete) for financial records
- [ ] Decimal.js used for all currency operations
- [ ] Mobile-responsive (check at 375px width)
- [ ] Empty state exists for any new list screen
- [ ] Loading state exists for any data-dependent screen
