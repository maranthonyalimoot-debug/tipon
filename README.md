# Tipon 💸

> Personal finance tracking app — built for clarity, designed to scale.

Tipon is a web-based finance tracker that helps you understand where your money goes, where it comes from, and where you stand — without the noise. Built first for personal use, architected to grow into a commercial SaaS product.

---

## Vision

Most finance apps are either too simple (basic spreadsheets) or too complex (full accounting software). Tipon lives in between: fast to use, opinionated in its defaults, and powerful enough for users who care about their financial picture.

**Personal phase:** A private, self-hosted or Supabase-backed tracker for one user.
**Commercial phase:** Multi-user SaaS with team/family plans, integrations, and a freemium model.

---

## Core Features (v1)

| Feature | Description |
|---|---|
| Expense tracking | Log and categorize spending with tags and notes |
| Income tracking | Track salary, freelance, dividends, and other sources |
| Reports & analytics | Monthly summaries, trends, category breakdowns, net worth |
| Dashboard | Live snapshot of balances, recent transactions, budget health |

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Server components, file-based routing, great DX |
| Database | Supabase (PostgreSQL) | Auth, RLS, real-time, scales to multi-tenant easily |
| Auth | Supabase Auth | Email/password + social login (Google, GitHub) |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, accessible components |
| State | Zustand + React Query | Lightweight client state + server sync |
| Charts | Recharts | Composable, React-native charting |
| Hosting | Vercel | Zero-config Next.js deploys, edge functions |
| CI/CD | GitHub Actions | Automated lint, test, deploy pipeline |
| Package manager | pnpm | Faster installs, disk-efficient |

---

## Project Structure

```
tipon/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, signup, onboarding
│   ├── (dashboard)/        # Main app pages (protected)
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── income/
│   │   └── reports/
│   └── api/                # API route handlers
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── charts/             # Recharts wrappers
│   └── features/           # Feature-specific components
├── lib/
│   ├── supabase/           # Supabase client + server helpers
│   ├── utils/              # Shared utilities
│   └── validations/        # Zod schemas
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand stores
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── supabase/
    ├── migrations/         # Database migration files
    └── seed.sql            # Dev seed data
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Supabase account (free tier works)
- Vercel account (for deployment)

### Local Development

```bash
# Clone the repo
git clone https://github.com/[your-username]/tipon.git
cd tipon

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# Run database migrations
pnpm supabase db push

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # server-side only
```

---

## Documentation

| Doc | Purpose |
|---|---|
| [ROADMAP.md](./ROADMAP.md) | Phase-by-phase build plan |
| [MARKET_ANALYSIS.md](./MARKET_ANALYSIS.md) | Competitive landscape and positioning |
| [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) | Architecture, standards, best practices |
| [CLAUDE_BUILD_GUIDE.md](./CLAUDE_BUILD_GUIDE.md) | How to use Claude/Cowork to build autonomously |

---

## License

Private use only until commercial launch. See [LICENSE](./LICENSE) for details.

---

*Built with Claude Code + Cowork. See [CLAUDE_BUILD_GUIDE.md](./CLAUDE_BUILD_GUIDE.md) for how AI assists throughout the build.*
