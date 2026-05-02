# Tipon — Product Roadmap

> From personal tool to commercial SaaS. Each phase ships something real and usable.

---

## Phase Overview

| Phase | Name | Goal | Timeline Estimate |
|---|---|---|---|
| 0 | Foundation | Repo, DB schema, auth, CI/CD | Week 1 |
| 1 | Personal MVP | Core tracking + dashboard | Weeks 2–4 |
| 2 | Depth | Reports, analytics, budgeting | Weeks 5–8 |
| 3 | Polish | UX, mobile-responsive, performance | Weeks 9–10 |
| 4 | Pre-launch | Multi-user, payments, onboarding | Weeks 11–14 |
| 5 | Commercial | Public launch, integrations, growth | Month 4+ |

---

## Phase 0 — Foundation

**Goal:** Infrastructure everything sits on. Nothing user-facing yet.

### Tasks
- [ ] Initialize Next.js 14 project with TypeScript + Tailwind + shadcn/ui
- [ ] Set up Supabase project (dev + prod)
- [ ] Design and apply initial database schema (see below)
- [ ] Configure Supabase Auth (email/password + Google OAuth)
- [ ] Set up Row Level Security (RLS) policies for all tables
- [ ] Configure Vercel project with preview + production environments
- [ ] Set up GitHub Actions: lint → test → deploy pipeline
- [ ] Create `.env.example` with all required variables documented
- [ ] Set up pnpm workspace and define scripts
- [ ] Configure ESLint, Prettier, and Husky pre-commit hooks

### Database Schema (v1)

```sql
-- Users (extended from Supabase auth.users)
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  display_name TEXT,
  currency TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Accounts (bank accounts, wallets, credit cards)
accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('checking', 'savings', 'credit', 'cash', 'investment')),
  balance NUMERIC(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  color TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Categories
categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  type TEXT CHECK (type IN ('expense', 'income', 'both')),
  is_system BOOLEAN DEFAULT FALSE  -- system defaults vs user-created
)

-- Transactions
transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  account_id UUID REFERENCES accounts(id),
  category_id UUID REFERENCES categories(id),
  type TEXT CHECK (type IN ('expense', 'income', 'transfer')),
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  tags TEXT[],
  notes TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_rule TEXT,  -- iCal RRULE string
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

-- Budgets
budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES categories(id),
  amount NUMERIC(12,2) NOT NULL,
  period TEXT CHECK (period IN ('monthly', 'weekly', 'yearly')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Deliverable
Working login → blank dashboard. The skeleton is ready for features.

---

## Phase 1 — Personal MVP

**Goal:** Mar can use this daily. Real data, real value.

### Tasks
- [ ] Dashboard layout with sidebar navigation
- [ ] Transaction list view (filterable, sortable, paginated)
- [ ] Add/edit/delete transaction form (with category picker, date, amount)
- [ ] Account management (add accounts, set starting balance)
- [ ] Income entry (same form, `type: income`)
- [ ] Basic dashboard: total balance, monthly spend, recent transactions
- [ ] Category management (CRUD for custom categories)
- [ ] System default categories (seeded on signup)
- [ ] CSV import for historical data
- [ ] Search transactions by description, tags, or notes
- [ ] Mobile-responsive layout

### Key Screens
1. Dashboard — net balance, monthly snapshot, recent transactions
2. Transactions — full list with filters (date, category, type, account)
3. Add Transaction — modal or drawer form
4. Accounts — list of accounts with balances
5. Settings — profile, currency, categories

### Deliverable
You can log your full financial picture and see where you stand today.

---

## Phase 2 — Depth (Analytics + Budgets)

**Goal:** Answer "Am I doing better or worse than last month?"

### Tasks
- [ ] Monthly spending by category (bar chart breakdown)
- [ ] Income vs expense trend line (last 6 months)
- [ ] Net worth over time chart
- [ ] Budget creation and tracking (monthly category budgets)
- [ ] Budget progress cards (% spent, remaining, at-risk alerts)
- [ ] Recurring transaction support (weekly/monthly/custom RRULE)
- [ ] Date range picker for all reports
- [ ] Export transactions to CSV
- [ ] Tag-based filtering and reporting
- [ ] Spending insights: top categories, largest transactions, anomalies

### Charts to Build
- Monthly spending by category (stacked bar)
- Income vs expenses (grouped bar by month)
- Net worth trend (area chart)
- Budget progress (horizontal progress bars)
- Category pie/donut (monthly snapshot)

### Deliverable
A full analytics picture — comparable to Mint or YNAB's core reporting.

---

## Phase 3 — Polish

**Goal:** This feels like a real product someone would pay for.

### Tasks
- [ ] Full mobile responsiveness audit and fixes
- [ ] Dark mode support
- [ ] Keyboard shortcuts for power users
- [ ] Loading states, skeleton screens, and empty states
- [ ] Error boundaries and user-friendly error messages
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Onboarding flow for new users (guided setup wizard)
- [ ] Toast notifications for all actions
- [ ] Confirm dialogs for destructive actions
- [ ] PWA support (installable on mobile home screen)

### Deliverable
The app is fast, beautiful, accessible, and feels polished end-to-end.

---

## Phase 4 — Pre-Launch (Commercial Prep)

**Goal:** Ready to charge real users money.

### Tasks

**Multi-tenancy**
- [ ] Audit all RLS policies for multi-user correctness
- [ ] Admin dashboard (usage, user management)
- [ ] User invitation system (for family/team plans)

**Payments**
- [ ] Integrate Stripe (subscriptions + one-time)
- [ ] Define pricing tiers (Free / Pro / Family)
- [ ] Build pricing page
- [ ] Implement feature gates per tier
- [ ] Billing portal (upgrade, cancel, invoice history)

**Marketing**
- [ ] Landing page (separate from app)
- [ ] SEO fundamentals (meta, OG tags, sitemap)
- [ ] Email signup / waitlist
- [ ] In-app referral or share mechanism

**Legal & Compliance**
- [ ] Terms of Service
- [ ] Privacy Policy (GDPR + CCPA compliant)
- [ ] Cookie consent banner
- [ ] Data export (user data portability)
- [ ] Account deletion flow

### Pricing Tiers (Draft)

| Tier | Price | Limits | Key Features |
|---|---|---|---|
| Free | $0/mo | 1 account, 100 transactions/mo | Core tracking |
| Pro | $7/mo | Unlimited | Reports, budgets, CSV export, recurring |
| Family | $14/mo | Up to 5 users | Everything in Pro, shared accounts |

### Deliverable
A product you can publicly announce and start charging for.

---

## Phase 5 — Commercial Growth

**Goal:** Grow the user base and expand the feature set based on real feedback.

### Potential Features (Backlog)
- Bank account sync (Plaid integration)
- Investment portfolio tracking
- Goal-based savings tracking
- Bill reminders and due date tracking
- Multi-currency support
- AI-powered insights ("You spent 40% more on food last month")
- Mobile native app (React Native / Expo)
- Collaborative budgets (partners, roommates)
- Accountant/bookkeeper sharing mode
- Zapier / Make integration for automation
- Webhook support for power users
- API for developers

### Growth Channels
- SEO content (personal finance how-tos)
- Product Hunt launch
- Reddit communities (r/personalfinance, r/YNAB)
- Twitter/X finance community
- Referral program

---

## Skills to Input (Claude Cowork)

For each major phase, the following Cowork skills should be loaded and used:

| Phase | Skills to Use |
|---|---|
| 0 — Foundation | `engineering:architecture`, `engineering:documentation` |
| 1 — MVP Build | `engineering:code-review`, `engineering:debug`, `data:sql-queries` |
| 2 — Analytics | `data:create-viz`, `data:analyze`, `engineering:code-review` |
| 3 — Polish | `design:accessibility-review`, `design:design-critique`, `design:ux-copy` |
| 4 — Pre-launch | `legal:compliance-check`, `marketing:campaign-plan`, `finance:financial-statements` |
| 5 — Commercial | `marketing:seo-audit`, `marketing:content-creation`, `sales:account-research` |

---

## Success Metrics

| Phase | Metric | Target |
|---|---|---|
| 1 (MVP) | Daily active usage | Using it yourself every day |
| 2 (Depth) | Data completeness | 3+ months of real historical data entered |
| 3 (Polish) | Lighthouse score | 90+ across all categories |
| 4 (Pre-launch) | Waitlist signups | 100+ before launch |
| 5 (Commercial) | Paying users | 10 paying users in month 1 |
