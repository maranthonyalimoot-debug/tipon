# Tipon — Master Build Plan

> Single source of truth. Stack, features, and build process — start to commercial launch.
> Last updated: May 2026

---

## Part 1 — The Stack (Finalized)

### Why This Stack

Built for one reality: **start as a personal tool, scale to paying SaaS without rewriting anything.**
Every choice below is reversible or upgradeable. None create lock-in that blocks commercial growth.

---

### Layer-by-Layer Breakdown

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                     │
│         Next.js 14 App Router (TypeScript)          │
│   Server Components + Client Components + PWA       │
├─────────────────────────────────────────────────────┤
│                   STYLING LAYER                     │
│         Tailwind CSS + shadcn/ui components         │
├─────────────────────────────────────────────────────┤
│                   STATE LAYER                       │
│   TanStack Query (server state) + Zustand (UI)      │
├─────────────────────────────────────────────────────┤
│                    DATA LAYER                       │
│        React Hook Form + Zod (validation)           │
│        decimal.js (currency math)                   │
│        date-fns (date operations)                   │
├─────────────────────────────────────────────────────┤
│                  CHARTS LAYER                       │
│               Recharts (all charts)                 │
├─────────────────────────────────────────────────────┤
│                  BACKEND LAYER                      │
│    Supabase: PostgreSQL + Auth + Storage + RLS      │
│    Next.js API Routes / Server Actions (mutations)  │
├─────────────────────────────────────────────────────┤
│                 PAYMENTS LAYER (Phase 4)            │
│                     Stripe                          │
├─────────────────────────────────────────────────────┤
│              INFRASTRUCTURE LAYER                   │
│    Vercel (hosting) + GitHub Actions (CI/CD)        │
│              pnpm (package manager)                 │
└─────────────────────────────────────────────────────┘
```

---

### Full Dependency Table

| Category | Package | Version | Purpose | When Used |
|---|---|---|---|---|
| **Framework** | next | 14.x | App Router, SSR, API routes | Phase 0 |
| **Language** | typescript | 5.x | Type safety across entire codebase | Phase 0 |
| **Styling** | tailwindcss | 3.x | Utility-first CSS | Phase 0 |
| **Components** | shadcn/ui | latest | Accessible, composable UI components | Phase 0 |
| **Icons** | lucide-react | latest | Icon library (matches shadcn) | Phase 0 |
| **Forms** | react-hook-form | 7.x | Performant form state management | Phase 1 |
| **Validation** | zod | 3.x | Runtime type validation, schema definition | Phase 0 |
| **DB Client** | @supabase/supabase-js | 2.x | Database + Auth + Storage client | Phase 0 |
| **SSR Auth** | @supabase/ssr | latest | Cookie-based auth for Next.js App Router | Phase 0 |
| **Server State** | @tanstack/react-query | 5.x | Data fetching, caching, optimistic updates | Phase 1 |
| **Client State** | zustand | 4.x | UI state (sidebar, modals, theme) | Phase 1 |
| **Currency Math** | decimal.js | 10.x | Correct decimal arithmetic — never floats | Phase 1 |
| **Dates** | date-fns | 3.x | Date manipulation, formatting, timezone | Phase 1 |
| **Charts** | recharts | 2.x | All data visualizations | Phase 2 |
| **Recurring** | rrule | 2.x | iCal RRULE parsing for recurring transactions | Phase 2 |
| **Payments** | stripe | latest | Subscription billing | Phase 4 |
| **Email** | resend | latest | Transactional email (summaries, invites) | Phase 4 |
| **Testing (unit)** | vitest | latest | Fast unit tests | Phase 1+ |
| **Testing (e2e)** | playwright | latest | End-to-end test flows | Phase 3 |
| **Linting** | eslint + prettier | latest | Code quality enforcement | Phase 0 |
| **Git hooks** | husky + lint-staged | latest | Pre-commit checks | Phase 0 |

---

### Infrastructure Setup

| Service | Purpose | Tier | Cost |
|---|---|---|---|
| **Supabase** | Database, Auth, Storage | Free → Pro ($25/mo when needed) | Free to start |
| **Vercel** | Hosting + preview deployments | Hobby → Pro ($20/mo) | Free to start |
| **GitHub** | Source control + Actions CI/CD | Free | Free |
| **Resend** | Transactional email | Free (3,000/mo) → paid | Free to start |
| **Stripe** | Payments (Phase 4) | Pay per transaction (2.9% + 30¢) | Zero until revenue |
| **Brankas** | Bank/GCash sync (Phase 5) | TBD — monitor API maturity | Future |

**Total infrastructure cost at launch: ~$0–$45/month.**

---

## Part 2 — Complete Feature Map

> Features are organized by phase. Each phase must be fully shipped before the next begins.
> Competitive benchmark: features marked 🎯 are direct gaps vs Tarsi.

---

### Phase 0 — Foundation (Week 1)
*No user-facing features. Infrastructure only.*

| # | Task | Type | Notes |
|---|---|---|---|
| 0.1 | Initialize Next.js 14 project (TypeScript, Tailwind, shadcn/ui) | Setup | Use `create-next-app` with App Router |
| 0.2 | Configure pnpm workspace + scripts | Setup | `dev`, `build`, `test`, `lint`, `type-check` |
| 0.3 | Set up ESLint + Prettier + Husky + lint-staged | Config | Pre-commit hook: lint + type-check |
| 0.4 | Create Supabase project (dev environment) | DB | Free tier |
| 0.5 | Design and apply v1 database schema | DB | See schema below |
| 0.6 | Write RLS policies for all tables | Security | Template in DEVELOPMENT_GUIDELINES.md |
| 0.7 | Configure Supabase Auth (email/password + Google OAuth) | Auth | |
| 0.8 | Set up Supabase server + browser clients in Next.js | Code | `lib/supabase/client.ts`, `server.ts`, `admin.ts` |
| 0.9 | Create Vercel project (link to GitHub repo) | Deploy | Enable preview deployments on PRs |
| 0.10 | Set up GitHub Actions CI pipeline | CI/CD | Lint → type-check → test → deploy |
| 0.11 | Create `.env.example` with all variables documented | Config | Never commit `.env.local` |
| 0.12 | Generate initial Supabase TypeScript types | Code | `pnpm supabase gen types typescript` |
| 0.13 | Create production Supabase project | DB | Separate from dev |
| 0.14 | Write seed.sql for development data | DB | Sample accounts, categories, transactions |

**Database Schema v1:**

```sql
-- Core tables (apply in this order)

profiles            -- extends auth.users (display_name, currency, timezone)
accounts            -- bank, cash, e-wallet, credit, investment
categories          -- system defaults + user-created (expense / income / both)
transactions        -- expense, income, transfer (with soft delete)
budgets             -- monthly category budgets
savings_goals       -- target amount, deadline, linked account
debts               -- what you owe (creditor, amount, due date)
receivables         -- what others owe you
recurring_rules     -- RRULE definitions, linked to transactions
```

**Deliverable:** `pnpm dev` runs. Login page exists. Blank dashboard after login. Nothing breaks.

---

### Phase 1 — Personal MVP (Weeks 2–4)
*Mar can use this as his daily finance tracker.*

#### 1A — Account Management

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 1.1 | Create/edit/delete accounts | Name, type, starting balance, currency, color | Matches Tarsi |
| 1.2 | Account types | Cash, Bank, E-wallet (GCash, Maya), Credit Card, Investment | Matches Tarsi |
| 1.3 | Account list view | Balance per account, total net worth at top | Matches Tarsi |
| 1.4 | Account balance history | Track running balance over time | Matches Tarsi |

#### 1B — Transaction Management

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 1.5 | Add transaction (expense) | Amount, category, account, date, description, tags, notes | Matches Tarsi |
| 1.6 | Add transaction (income) | Amount, category, account, date, source | Matches Tarsi |
| 1.7 | Add transaction (transfer) | From account → To account, amount, date | Matches Tarsi |
| 1.8 | Edit transaction | Full edit of any field | Matches Tarsi |
| 1.9 | Soft delete transaction | `is_deleted = TRUE`, never hard-delete financial records | DEVELOPMENT_GUIDELINES rule |
| 1.10 | Transaction list view | Paginated, sortable by date/amount | Matches Tarsi |
| 1.11 | Filter transactions | By account, category, type, date range, tags | 🎯 Better than Tarsi |
| 1.12 | Search transactions | Full-text search on description, notes, tags | Matches Tarsi |
| 1.13 | Transaction detail view | Full details + edit/delete actions | |

#### 1C — Category Management

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 1.14 | System default categories | Seeded on signup: Food, Transport, Rent, Salary, etc. | Matches Tarsi |
| 1.15 | Custom category creation | Name, icon, color, type (expense/income/both) | Matches Tarsi |
| 1.16 | Edit/delete custom categories | Cannot delete system categories | |
| 1.17 | Category picker in forms | Searchable dropdown with icons + colors | |

#### 1D — Dashboard

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 1.18 | Net worth summary card | Total assets minus liabilities | Matches Tarsi |
| 1.19 | Monthly income vs expense summary | Current month at a glance | Matches Tarsi |
| 1.20 | Account balances overview | All accounts, ranked by balance | Matches Tarsi |
| 1.21 | Recent transactions list | Last 10, with quick-add button | Matches Tarsi |
| 1.22 | Monthly budget health (basic) | % of total monthly budget used | Matches Tarsi |

#### 1E — Data Portability

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 1.23 | Export transactions (CSV) | All transactions, filterable date range | Matches Tarsi |
| 1.24 | Export transactions (JSON) | Full data dump for backup | Matches Tarsi |
| 1.25 | Import transactions (CSV) | Map columns, preview before import | 🎯 Better than Tarsi |
| 1.26 | **Import from Tarsi (JSON/CSV)** | Accept Tarsi's exact export format — one-click migration | 🎯 Unique — steal their users |

#### 1F — UX Foundation

| # | Feature | Description |
|---|---|---|
| 1.27 | Sidebar navigation | Accounts, Transactions, Dashboard, Reports, Settings |
| 1.28 | Mobile-responsive layout | Works on phone browser without native app |
| 1.29 | PWA manifest | Installable on mobile home screen |
| 1.30 | Toast notifications | All create/update/delete actions |
| 1.31 | Confirm dialogs | All destructive actions |
| 1.32 | Empty states | All list screens when no data |
| 1.33 | Loading skeletons | All data-dependent screens |

**Deliverable:** Mar logs all his income, expenses, and transfers. Can see where his money goes. Can export everything. Can import from Tarsi.

---

### Phase 2 — Depth (Weeks 5–8)
*Answer: "Am I doing better than last month? Can I afford this?"*

#### 2A — Budgeting

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 2.1 | Create monthly category budgets | Set ₱ limit per category per month | Matches Tarsi |
| 2.2 | Budget progress cards | Visual % used, amount remaining, color-coded | Matches Tarsi |
| 2.3 | Over-budget alerts | In-app notification when 80% and 100% used | 🎯 Better than Tarsi |
| 2.4 | Budget vs actual comparison | Side-by-side per category | 🎯 Better than Tarsi |
| 2.5 | Budget history | See how you tracked vs budget each month | 🎯 Better than Tarsi |

#### 2B — Goals & Debt

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 2.6 | Savings goals | Name, target amount, target date, linked account | Matches Tarsi |
| 2.7 | Goal progress tracking | Visual progress bar, projected completion date | Matches Tarsi |
| 2.8 | Debt tracking | Creditor, total owed, interest rate, minimum payment | Matches Tarsi |
| 2.9 | Debt payment logging | Log payments, see remaining balance | Matches Tarsi |
| 2.10 | Money owed (receivables) | Who owes you, how much, due when | Matches Tarsi |

#### 2C — Recurring Transactions

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 2.11 | Create recurring expense | Bills, subscriptions, rent — RRULE based | Matches Tarsi |
| 2.12 | Create recurring income | Salary, freelance retainer | Matches Tarsi |
| 2.13 | Recurring transaction calendar | See all upcoming entries on a timeline | Matches Tarsi |
| 2.14 | Skip / edit single occurrence | Without affecting the full recurring series | 🎯 Better than Tarsi |
| 2.15 | Cashflow forecast | 30/60/90-day income vs bills projection | Matches Tarsi |

#### 2D — Analytics Suite

| # | Feature | Chart Type | Competitive Note |
|---|---|---|---|
| 2.16 | Spending by category | Donut chart (monthly snapshot) | 🎯 Better than Tarsi (depth) |
| 2.17 | Category spending trend | Stacked bar (6 months) | 🎯 Better than Tarsi |
| 2.18 | Income vs expense | Grouped bar by month | 🎯 Better than Tarsi |
| 2.19 | Net worth over time | Area chart (all time) | 🎯 Better than Tarsi |
| 2.20 | Top spending categories | Ranked list with amounts + % | 🎯 Better than Tarsi |
| 2.21 | Month-over-month comparison | Current vs previous month, delta % | 🎯 Unique vs Tarsi |
| 2.22 | Custom date range picker | Apply to all reports | 🎯 Unique vs Tarsi |
| 2.23 | Annual summary report | Full year breakdown | 🎯 Unique vs Tarsi |

#### 2E — AI-Assisted Input

| # | Feature | Description | Competitive Note |
|---|---|---|---|
| 2.24 | Natural language transaction entry | "Starbucks 250 yesterday" → parsed automatically | Matches Tarsi — must have |
| 2.25 | OCR receipt scanning | Upload photo, extract merchant + amount | Matches Tarsi — must have |
| 2.26 | Smart category suggestion | Auto-suggest category based on description history | 🎯 Better than Tarsi |

**Deliverable:** Full financial picture — budgets, goals, debt, recurring bills, cashflow forecast, and deep analytics. Comparable to YNAB's core feature set.

---

### Phase 3 — Polish (Weeks 9–10)
*This feels like a ₱500/month product.*

| # | Feature | Description |
|---|---|---|
| 3.1 | Dark mode | System preference detection + manual toggle |
| 3.2 | Full accessibility audit | WCAG 2.1 AA — keyboard nav, screen reader, color contrast |
| 3.3 | Performance audit | Core Web Vitals 90+ on Lighthouse |
| 3.4 | Onboarding wizard | New user guided setup: add account → first transaction → first budget |
| 3.5 | AI analytical insights | "You spent 40% more on food this month vs last month" |
| 3.6 | Keyboard shortcuts | Power user navigation (add transaction, switch views) |
| 3.7 | PWA offline support | View recent transactions offline, queue adds for sync |
| 3.8 | Error boundaries | App never fully crashes — graceful fallbacks |
| 3.9 | Shareable report links | Generate a read-only summary link (optional, privacy-controlled) |
| 3.10 | Monthly email summary | Auto-generated: "Your April in numbers" — sent on 1st of month |

**Deliverable:** Lighthouse 90+ across all categories. Onboarding takes under 3 minutes. Zero rough edges.

---

### Phase 4 — Pre-Launch / Commercial (Weeks 11–14)
*Ready to charge real people real money.*

#### 4A — Multi-User

| # | Feature | Description |
|---|---|---|
| 4.1 | Invite user to shared workspace | Email invite → join → shared account visibility |
| 4.2 | Per-user roles | Owner, Member, Read-only (advisor access) |
| 4.3 | Shared accounts | Couple/family can contribute to same account |
| 4.4 | Individual private accounts | Personal accounts hidden from other members |
| 4.5 | Family dashboard | Aggregate view across all members |

#### 4B — Payments (Stripe)

| # | Feature | Description |
|---|---|---|
| 4.6 | Pricing tiers | Free / Pro (₱399/mo or ₱3,299/yr) / Family (₱799/mo or ₱6,499/yr) |
| 4.7 | Stripe Checkout integration | Upgrade flow from within app |
| 4.8 | Feature gating | Free: 1 account, 100 tx/mo, basic reports. Pro: unlimited. Family: multi-user. |
| 4.9 | Billing portal | Stripe Customer Portal — manage, cancel, view invoices |
| 4.10 | Webhook handling | `customer.subscription.updated`, `payment_failed`, etc. |
| 4.11 | Grace period on payment failure | 7-day grace before downgrade |

**Pricing rationale vs Tarsi:**
- Tarsi charges ₱299 once for a phone-only app
- Tipon Free is already better than that (web + cloud + multi-device)
- Tipon Pro at ₱399/mo = ₱4,788/yr — justified by features Tarsi structurally cannot offer
- Annual plan at ₱3,299/yr = ₱275/mo — comparable to Tarsi's one-time price, but monthly and multi-device

#### 4C — Legal & Compliance

| # | Feature | Description |
|---|---|---|
| 4.12 | Terms of Service | Written, linked from footer + signup |
| 4.13 | Privacy Policy | GDPR + PH Data Privacy Act (RA 10173) compliant |
| 4.14 | Cookie consent banner | Accept/reject non-essential cookies |
| 4.15 | Data export (portability) | Full user data export (GDPR Art. 20) |
| 4.16 | Account deletion | Full data purge within 30 days of request |
| 4.17 | Register as PIC | Personal Information Controller under NPC (PH) |

#### 4D — Marketing Surface

| # | Feature | Description |
|---|---|---|
| 4.18 | Landing page | Separate from app — features, pricing, social proof |
| 4.19 | "Switch from Tarsi" page | `/from-tarsi` — direct migration messaging + import tool |
| 4.20 | Email waitlist | Capture leads before launch |
| 4.21 | SEO fundamentals | Meta tags, OG images, sitemap, robots.txt |
| 4.22 | Admin dashboard | User counts, MRR, churn, active subscriptions |

**Deliverable:** Publicly launchable. Accept payment. Handle GDPR/PDPA. Migrate Tarsi users.

---

### Phase 5 — Commercial Growth (Month 4+)
*Based on real user feedback — don't build until Phase 4 is shipping.*

| # | Feature | Priority | Trigger Condition |
|---|---|---|---|
| 5.1 | Bank/GCash sync via Brankas | 🔴 High | When Brankas account aggregation API is production-ready |
| 5.2 | Multi-currency (full) | 🔴 High | When international user base > 20% |
| 5.3 | AI spending insights (deeper) | 🟡 Medium | Phase 3 insights validated by user feedback |
| 5.4 | Mobile native app (React Native/Expo) | 🟡 Medium | When web MAU > 1,000 |
| 5.5 | Developer API + webhooks | 🟡 Medium | When power users request it |
| 5.6 | Zapier / Make integration | 🟡 Medium | Follows developer API |
| 5.7 | Investment portfolio tracking | 🟡 Medium | User request validation |
| 5.8 | Accountant mode (client sharing) | 🟡 Medium | B2B lite opportunity |
| 5.9 | Bill reminder push notifications | 🟢 Low | After PWA + native app |
| 5.10 | Referral program | 🟢 Low | When NPS > 50 |

---

## Part 3 — Step-by-Step Build Process

> This is the actual construction sequence. Follow it in order. Each step has a clear done condition.

---

### Step 1: Project Bootstrap (Day 1)

```bash
# 1. Create project
pnpm create next-app@latest tipon \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd tipon

# 2. Install core dependencies
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add @tanstack/react-query zustand
pnpm add react-hook-form @hookform/resolvers zod
pnpm add decimal.js date-fns
pnpm add lucide-react class-variance-authority clsx tailwind-merge

# 3. Install shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label card dialog \
  dropdown-menu select separator sheet tabs toast \
  form popover calendar command badge avatar

# 4. Dev dependencies
pnpm add -D vitest @vitejs/plugin-react
pnpm add -D husky lint-staged
pnpm add -D @playwright/test

# 5. Initialize Husky
pnpm dlx husky init
```

**Done when:** `pnpm dev` runs at localhost:3000 with Next.js default page.

---

### Step 2: Supabase Setup (Day 1–2)

```bash
# Install Supabase CLI
pnpm add -D supabase

# Initialize local Supabase
pnpm supabase init
pnpm supabase start

# Create first migration
pnpm supabase migration new initial_schema
```

Write the full schema migration (profiles, accounts, categories, transactions, budgets, savings_goals, debts, receivables, recurring_rules).

Write RLS policies for each table using the template from `DEVELOPMENT_GUIDELINES.md`.

Write seed data (`supabase/seed.sql`) with:
- 5 system categories per type (expense + income)
- 3 sample accounts
- 10 sample transactions

```bash
pnpm supabase db push
pnpm supabase gen types typescript --local > src/types/database.ts
```

**Done when:** Schema is applied, types are generated, seed data loads.

---

### Step 3: Authentication (Day 2–3)

Build in this order:
1. `lib/supabase/client.ts` — browser client (singleton)
2. `lib/supabase/server.ts` — server client (cookies, per-request)
3. `middleware.ts` — protect `/dashboard/*` routes, redirect unauthenticated users
4. `app/(auth)/login/page.tsx` — email + Google login
5. `app/(auth)/signup/page.tsx` — email signup with display name
6. `app/(auth)/callback/route.ts` — OAuth callback handler
7. `app/(auth)/reset-password/page.tsx` — forgot password flow
8. Profile creation trigger — Supabase DB function that creates a `profiles` row on `auth.users` insert

**Done when:** User can sign up, log in with email + Google, and be redirected to `/dashboard`.

---

### Step 4: App Shell (Day 3–4)

1. `app/(dashboard)/layout.tsx` — protected layout with auth check
2. `components/layout/Sidebar.tsx` — navigation with links to all sections
3. `components/layout/Header.tsx` — page title + user menu (avatar, logout)
4. `components/layout/Shell.tsx` — wraps sidebar + main content area
5. Responsive behavior — sidebar collapses to hamburger on mobile
6. Zustand store for sidebar open/close state (`stores/ui.ts`)

**Done when:** Logged-in user sees a navigation shell with working links and a user menu.

---

### Step 5: Accounts (Day 4–5)

1. `hooks/useAccounts.ts` — React Query hook for fetching accounts
2. `app/(dashboard)/accounts/page.tsx` — accounts list with balances + total net worth
3. `components/features/AccountCard.tsx` — individual account display
4. `components/features/AccountForm.tsx` — create/edit form (name, type, balance, color)
5. API route: `POST /api/accounts` — create account
6. API route: `PATCH /api/accounts/[id]` — update account
7. API route: `DELETE /api/accounts/[id]` — soft delete

**Done when:** Can create a GCash account, a BDO account, and a Cash account. Balances display correctly.

---

### Step 6: Categories (Day 5)

1. Seed system categories (run once at migration level)
2. `hooks/useCategories.ts`
3. `app/(dashboard)/settings/categories/page.tsx` — manage custom categories
4. `components/features/CategoryForm.tsx` — name, icon picker, color picker, type
5. API routes: CRUD for categories

**Done when:** System categories exist on signup. User can create "Grab" as a transport subcategory.

---

### Step 7: Transactions (Day 6–9)

This is the core. Take your time.

1. `hooks/useTransactions.ts` — paginated, filterable query
2. `app/(dashboard)/transactions/page.tsx` — transaction list with filters
3. `components/features/TransactionList.tsx` — virtualized list
4. `components/features/TransactionFilters.tsx` — account, category, type, date range
5. `components/features/TransactionForm.tsx` — add/edit (most complex form in the app)
   - Amount input (decimal.js formatted)
   - Type selector (expense / income / transfer)
   - Category picker (searchable)
   - Account picker
   - Date picker (date-fns)
   - Description, tags, notes
   - Recurring toggle (opens RRULE builder)
6. `components/features/TransactionSheet.tsx` — slide-in drawer for add/edit on mobile
7. API routes: CRUD + soft delete + bulk import
8. `lib/utils/currency.ts` — format, parse, validate amounts
9. `lib/utils/transactions.ts` — running balance calculation

**Done when:** Full transaction CRUD works. Adding "Jollibee ₱250 today" takes under 10 seconds.

---

### Step 8: Dashboard (Day 10)

1. `app/(dashboard)/dashboard/page.tsx` — Server Component, fetches all dashboard data
2. `components/features/NetWorthCard.tsx` — total assets - liabilities
3. `components/features/MonthSummaryCard.tsx` — month income, expenses, net
4. `components/features/AccountsOverview.tsx` — mini list of all account balances
5. `components/features/RecentTransactions.tsx` — last 10 with quick-add button
6. Database function: `get_dashboard_summary(user_id, month)` — single DB call for all numbers

**Done when:** Opening the app shows a useful financial snapshot without any clicks.

---

### Step 9: Data Portability (Day 11)

1. `lib/utils/csv.ts` — CSV parser + generator
2. `lib/utils/tarsi-import.ts` — parse Tarsi's JSON export format specifically
3. `app/(dashboard)/settings/import/page.tsx` — upload + preview + confirm import
4. `app/(dashboard)/settings/export/page.tsx` — export CSV + JSON with date range
5. API route: `POST /api/import` — bulk transaction insert with deduplication

**Done when:** Can import Tarsi JSON export in under 60 seconds. Can export all transactions to CSV.

---

### Step 10: Deploy Phase 1 (Day 12)

1. Create production Supabase project
2. Apply schema migrations to production
3. Set environment variables in Vercel
4. Connect GitHub repo to Vercel
5. Set up GitHub Actions workflow (`/.github/workflows/ci.yml`)
   - On PR: lint → type-check → test
   - On merge to main: deploy to production
6. Test the full flow on production URL

**Done when:** App is live on `tipon.vercel.app`. Login → add transaction → view dashboard → export CSV — all work in production.

---

### Step 11: Budgets (Phase 2, Day 13–14)

1. `hooks/useBudgets.ts`
2. Budget creation form (category, monthly amount)
3. `components/features/BudgetCard.tsx` — progress bar, amount used, remaining
4. Budget list page
5. `components/features/BudgetAlert.tsx` — toast when 80%/100% threshold hit
6. Database view: `budget_summary` — joins budgets + transactions for current month

---

### Step 12: Goals, Debt & Receivables (Phase 2, Day 15–16)

1. Savings goals — CRUD + progress tracking + projected completion date
2. Debt tracking — creditor, amount, interest, payment log
3. Receivables — who owes you, how much, mark as received
4. Dashboard cards for each

---

### Step 13: Recurring Transactions (Phase 2, Day 17–18)

1. Integrate `rrule` package
2. RRULE builder component (daily / weekly / monthly / custom)
3. Recurring transaction list + calendar view
4. Edge Function or cron job: auto-create transactions from recurring rules
5. Cashflow forecast: next 90 days of expected income vs bills

---

### Step 14: Analytics (Phase 2, Day 19–22)

Build one chart at a time. Each gets its own component and data hook.

1. `app/(dashboard)/reports/page.tsx` — reports shell with date range picker
2. Spending by category — donut chart
3. Income vs expense trend — grouped bar (6 months)
4. Net worth over time — area chart
5. Top categories — ranked list
6. Month-over-month delta — comparison cards
7. Annual summary — full year breakdown
8. Database functions for each report query (never raw queries in components)

---

### Step 15: AI Input (Phase 2, Day 23–25)

1. Natural language parser — integrate Claude API (haiku model, low cost)
   - Input: "Starbucks 250 last Tuesday"
   - Output: `{ amount: 250, category: "Food & Drink", date: "2026-04-28", description: "Starbucks" }`
2. Input component — chat-style text field above the transaction form
3. Parsed result preview — show parsed values before confirm
4. OCR receipt upload — `Supabase Storage` + vision model to extract merchant + amount

---

### Step 16: Polish (Phase 3, Day 26–30)

1. Dark mode — `next-themes` + Tailwind dark variants
2. Onboarding wizard — multi-step: add account → add transaction → set budget
3. Accessibility audit — run axe-core, fix all errors
4. Performance audit — Lighthouse CI in GitHub Actions
5. Monthly email summary — Resend + React Email template
6. Keyboard shortcuts — command palette (⌘K)
7. Playwright e2e tests — login, add transaction, view dashboard, export

---

### Step 17: Multi-User & Stripe (Phase 4, Day 31–42)

1. Workspace model — each user belongs to a workspace (1:1 to start, 1:many for family)
2. Invitation system — email invite via Resend, accept via magic link
3. Role system — owner, member, read-only
4. Stripe integration — products, prices, checkout, webhooks
5. Feature gates — middleware checks subscription tier before gating features
6. Billing portal — Stripe Customer Portal
7. Legal pages — Terms of Service, Privacy Policy
8. Landing page — marketing site (can be Next.js, same repo under `/` route)
9. "Switch from Tarsi" page — prominent import + messaging

---

### Step 18: Launch (Phase 4, Week 14)

**Pre-launch checklist:**
- [ ] All Lighthouse scores 90+
- [ ] PDPA Privacy Policy published
- [ ] Terms of Service published
- [ ] Stripe live mode tested with real card
- [ ] Supabase production backups enabled
- [ ] Error monitoring set up (Sentry or Vercel monitoring)
- [ ] Analytics set up (Plausible — privacy-respecting)
- [ ] "Switch from Tarsi" import tested with real Tarsi export
- [ ] At least 5 non-Mar users have tested the app

**Launch channels (same day):**
1. Product Hunt submission
2. r/personalfinance, r/phmoneytalk, r/phfinance
3. Facebook: PH Budget & Finance groups
4. Twitter/X: personal finance community
5. Direct outreach to Tarsi users who've complained about web access

---

## Part 4 — Claude / Cowork Usage Per Step

| Step | Invoke With |
|---|---|
| Database schema / migrations | "Use the data:sql-queries skill to write the [table] migration with RLS" |
| Any new feature | "Build [feature] end-to-end following DEVELOPMENT_GUIDELINES.md" |
| Code review before merge | "Use the engineering:code-review skill on [file/feature]" |
| Debug a bug | "Use the engineering:debug skill — [describe issue]" |
| Chart / visualization | "Use the data:create-viz skill to build [chart type] for [data]" |
| UX copy / empty states | "Use the design:ux-copy skill to write [screen] empty state" |
| Accessibility check | "Use the design:accessibility-review skill on [screen]" |
| Legal / compliance | "Use the legal:compliance-check skill on [feature/data flow]" |
| Landing page copy | "Use the marketing:content-creation skill to write the Tipon landing page" |
| Competitor research | "Competitor Teardown [name]" |
| New market opportunity | "Analyze Market Entry" |

**Standard session opener:**
> "Read README.md, DEVELOPMENT_GUIDELINES.md, and MASTER_BUILD_PLAN.md. Tell me where we are in the build steps, then let's continue."

---

## Summary Timeline

| Week | Phase | Milestone |
|---|---|---|
| 1 | Foundation | Repo live, DB schema applied, auth working |
| 2 | MVP | Accounts + transactions + dashboard working |
| 3 | MVP | Import/export, filters, search, mobile-responsive |
| 4 | MVP | **Phase 1 deployed. Mar uses it daily.** |
| 5–6 | Depth | Budgets, goals, debt, recurring transactions |
| 7–8 | Depth | Analytics suite + AI input + OCR |
| 9–10 | Polish | Dark mode, onboarding, accessibility, email summaries |
| 11–12 | Commercial | Multi-user, Stripe, feature gates |
| 13–14 | Commercial | Legal, landing page, "Switch from Tarsi" page |
| **Week 14** | 🚀 | **Public launch** |
| Month 4+ | Growth | Bank sync (Brankas), mobile app, API |
