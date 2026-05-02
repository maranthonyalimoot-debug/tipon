# Tipon — Development Guidelines

> Standards, patterns, and best practices for building Tipon. Read before you write code.

---

## Principles

1. **Build for one, design for many.** Every feature starts for personal use but must be multi-tenant-ready.
2. **Boring tech is good tech.** Choose well-established tools over clever new ones. Tipon is a finance app — reliability matters more than novelty.
3. **Data integrity above all.** Financial data must be accurate, never silently lost or corrupted.
4. **Security by default.** RLS is always on. Never trust the client. Validate on the server.
5. **Progressive complexity.** Start simple. Add complexity only when you feel the pain of not having it.

---

## Architecture

### Overview

```
Browser (Next.js)
    │
    ├── Server Components (data fetching, auth checks)
    ├── Client Components (interactivity, forms)
    └── API Routes (mutations, webhooks)
         │
         └── Supabase
              ├── PostgreSQL (data)
              ├── Auth (users, sessions)
              ├── Storage (attachments, receipts — future)
              └── Edge Functions (future: recurring jobs, bank sync)
```

### Data Flow Rules

- **Reads:** Use Supabase server client in Server Components where possible. Avoids waterfall, keeps credentials server-side.
- **Mutations:** Go through Next.js API routes or Server Actions. Never mutate directly from client-side Supabase calls (except simple updates that don't bypass RLS).
- **Optimistic updates:** Use React Query's `onMutate` for a snappy UI. Always roll back on error.

---

## Folder Structure (enforced)

```
app/
  (auth)/         # Unauthenticated pages
  (dashboard)/    # Protected pages — layout wraps with auth check
  api/            # Route handlers for mutations/webhooks

components/
  ui/             # shadcn/ui base components — DO NOT customize here
  charts/         # Recharts wrappers with Tipon defaults (colors, fonts)
  features/       # Feature components (TransactionForm, BudgetCard, etc.)
  layout/         # Sidebar, Header, Shell

lib/
  supabase/
    client.ts     # Browser client (singleton)
    server.ts     # Server client (cookies-based, per-request)
    admin.ts      # Service-role client (server only, never in browser)
  utils/
    currency.ts   # Format, convert, validate currency amounts
    dates.ts      # Date helpers (always use date-fns, never native Date)
    cn.ts         # Tailwind class merger (clsx + twMerge)
  validations/    # Zod schemas — one file per domain (transaction.ts, etc.)

hooks/
  useTransactions.ts
  useAccounts.ts
  useBudgets.ts
  # Wrap React Query calls; components never call useQuery directly

stores/
  ui.ts           # Zustand: sidebar state, modals, dark mode
  # Do NOT store server data in Zustand — that's React Query's job

types/
  database.ts     # Auto-generated from Supabase (run: pnpm types)
  app.ts          # Application-level types (not DB-specific)
```

---

## Coding Standards

### TypeScript

- **Strict mode always on.** No `any`. No `as unknown as X`.
- Use Zod for all runtime validation (forms, API inputs, env vars).
- Generate Supabase types with `pnpm supabase gen types typescript` after every migration. Commit the generated file.
- Prefer `type` over `interface` for data shapes. Use `interface` only for class-like contracts.

```typescript
// ✅ Good
type Transaction = {
  id: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
}

// ❌ Bad
const data: any = await fetchTransaction()
```

### Components

- Server Components by default. Add `'use client'` only when needed (event handlers, hooks, browser APIs).
- Props are typed explicitly — no `React.FC<{}>`, use plain function signatures.
- Keep components focused. If a component exceeds ~150 lines, split it.
- Co-locate logic with the component when it's component-specific. Move to `lib/` or `hooks/` when shared.

```typescript
// ✅ Good — explicit typing
export function TransactionCard({ transaction, onEdit }: {
  transaction: Transaction
  onEdit: (id: string) => void
}) { ... }

// ❌ Bad — React.FC, implicit any
const TransactionCard: React.FC = ({ transaction, onEdit }) => { ... }
```

### Currency Handling

This is a finance app — currency must be handled correctly.

- **Never use `number` for currency in the database.** Use `NUMERIC(12,2)` in Postgres.
- **Never do floating-point math.** Use `decimal.js` or integer arithmetic (cents).
- Always format currency with `Intl.NumberFormat` using the user's locale and currency setting.

```typescript
// ✅ Good
import Decimal from 'decimal.js'
const total = new Decimal(100.10).plus(new Decimal(50.05)) // 150.15

// ❌ Bad
const total = 100.10 + 50.05 // 150.14999999999998
```

### Date Handling

- Always use `date-fns` — never `new Date()` math directly.
- Store dates as `DATE` (no time) or `TIMESTAMPTZ` (with timezone) in Postgres.
- Display dates using the user's timezone from their profile.
- Never assume UTC. Never assume local time.

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files (components) | PascalCase | `TransactionForm.tsx` |
| Files (utils/hooks) | camelCase | `useTransactions.ts` |
| Variables / functions | camelCase | `formatCurrency()` |
| Types | PascalCase | `TransactionWithCategory` |
| DB tables | snake_case | `transactions`, `budget_items` |
| DB columns | snake_case | `created_at`, `user_id` |
| CSS classes | Tailwind utilities only | `className="flex gap-4"` |
| Env vars | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SUPABASE_URL` |

---

## Database Rules

### Row Level Security (RLS)

RLS must be enabled on every user-facing table. Default policy: deny all, then allow only what's needed.

```sql
-- Template for user-owned data
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);
```

### Migrations

- Every schema change goes through a migration file. Never edit the DB directly in production.
- Migrations are named: `YYYYMMDD_description.sql` (e.g., `20240501_add_recurring_flag.sql`)
- Migrations must be **idempotent** where possible (`IF NOT EXISTS`, `IF EXISTS`).
- Always test migrations on a Supabase branch before applying to production.
- Never modify existing migrations that have been applied — create a new one instead.

### Soft Deletes

For transactions and accounts, use soft deletes instead of hard deletes:

```sql
-- Add to relevant tables
is_deleted BOOLEAN DEFAULT FALSE,
deleted_at TIMESTAMPTZ
```

This preserves financial history and allows undo functionality.

---

## Security Checklist (per feature)

Before shipping any feature, verify:

- [ ] All API routes validate input with Zod
- [ ] All DB queries go through authenticated Supabase client (not admin/service role)
- [ ] No sensitive data in client-side code or logs
- [ ] RLS policies tested with a second test user (to verify isolation)
- [ ] No direct SQL in components — all DB logic in `lib/supabase/` or API routes
- [ ] Error messages don't expose internal DB structure to users

---

## Testing Strategy

### Priorities

1. **Unit tests** for currency math, date helpers, and validation schemas (100% coverage)
2. **Integration tests** for API routes (especially mutations)
3. **E2E tests** for critical flows: login, add transaction, view dashboard

### Tools

- **Unit:** Vitest (fast, ESM-native, works with Next.js)
- **E2E:** Playwright
- **DB testing:** Supabase local dev with seed data

### Test File Location

Co-locate tests with source files:
```
lib/utils/currency.ts
lib/utils/currency.test.ts  ← right next to it
```

---

## Performance Guidelines

- Use `loading.tsx` files in the App Router for suspense boundaries.
- Paginate all lists — never fetch unbounded arrays from the DB.
- Use database indexes on: `user_id`, `date`, `category_id`, `type` on the transactions table.
- Memoize expensive chart computations with `useMemo`.
- Images: use `next/image` with explicit width/height always.
- Never block the main thread with large data processing — offload to Edge Functions if needed.

---

## Git Workflow

### Branch Naming
```
feat/phase-1-transaction-form
fix/dashboard-balance-calculation
chore/update-supabase-types
docs/update-readme
```

### Commit Message Format (Conventional Commits)
```
feat: add transaction form with category picker
fix: correct balance calculation for credit accounts
chore: regenerate Supabase types
docs: add RLS policy examples to guidelines
```

### PR Checklist
- [ ] Self-reviewed the diff
- [ ] No `console.log` left in code
- [ ] Types pass (`pnpm type-check`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Tests pass (`pnpm test`)
- [ ] Migration tested on branch (if schema change)

---

## Dependency Policy

### Approved Dependencies

| Category | Package | Why |
|---|---|---|
| UI components | shadcn/ui | Accessible, composable, easily customized |
| CSS | Tailwind CSS | Utility-first, consistent |
| Charts | Recharts | React-native, composable |
| Forms | React Hook Form | Performance, validation integration |
| Validation | Zod | TypeScript-first, runtime safety |
| Date handling | date-fns | Modular, tree-shakeable, no timezone surprises |
| Currency math | decimal.js | Correct decimal arithmetic |
| State (client) | Zustand | Minimal, no boilerplate |
| Data fetching | @tanstack/react-query | Cache, background refresh, optimistic updates |
| HTTP client | Native `fetch` (via server actions or API routes) | No extra abstraction needed |

### Before Adding a New Dependency

Ask:
1. Does a native Web API or already-installed package solve this?
2. Is the package actively maintained (commits in last 6 months)?
3. What's the bundle size impact (`bundlephobia.com`)?
4. Does it have TypeScript types?

If yes to all — add it. If unsure — ask first.
