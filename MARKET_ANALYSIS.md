# Tipon — Market Analysis

> Understanding the personal finance app landscape before we build.

---

## Market Overview

Personal finance management software is a large, underserved market. Despite dozens of apps, most users still rely on spreadsheets or bank statements because existing tools are either too basic, too complex, or have eroded trust (Mint's shutdown, YNAB's price hikes, Copilot's US-only focus).

**Global personal finance software market:** ~$1.5B (2024), growing at ~5% CAGR
**Primary drivers:** Rising consumer debt awareness, gig economy income complexity, desire for financial autonomy

---

## Competitive Landscape

### Tier 1 — Dominant Players

| App | Price | Platform | Strengths | Weaknesses |
|---|---|---|---|---|
| YNAB | $109/yr | Web + Mobile | Strong methodology, loyal community | Steep learning curve, expensive |
| Copilot | $13/mo | iOS only | Beautiful UI, smart categorization | Apple-only, US-centric |
| Monarch Money | $100/yr | Web + Mobile | Clean UX, family sharing | Limited outside US, no free tier |
| Personal Capital / Empower | Free | Web + Mobile | Investment tracking, net worth | Pushed toward wealth management upsells |

### Tier 2 — Mid-Market

| App | Price | Platform | Strengths | Weaknesses |
|---|---|---|---|---|
| Mint (defunct 2023) | Was free | Web + Mobile | Mass adoption | Shut down — left millions of users homeless |
| Quicken | $35–$103/yr | Desktop + Web | Powerful, long track record | Dated UX, Windows-heavy |
| Simplifi by Quicken | $48/yr | Web + Mobile | Modern UX | Limited integrations |
| PocketGuard | $8/mo | Mobile | Simple, at-a-glance | Limited customization |

### Tier 3 — Niche / Regional

| App | Audience | Note |
|---|---|---|
| Wallet by BudgetBakers | International | Strong in EU/Asia, good multi-currency |
| Spendee | Young adults | Clean UI, couples focus |
| Goodbudget | Envelope budgeting | Simplified YNAB alternative |
| Toshl Finance | International | Fun branding, solid features |
| **Tarsi** | **SEA / Philippines** | **Direct benchmark — ₱299 iOS / ₱199 Android, one-time purchase. See full teardown below.** |

---

## Tarsi Deep-Dive — Benchmark & Gap Analysis

> Tarsi (by PocketDevs, Philippines) is the closest direct benchmark for Tipon. Study it carefully.
> App Store: [iOS](https://apps.apple.com/ph/app/tarsi-budget-tracker/id6760278399) | [Android](https://play.google.com/store/apps/details?id=com.tarsi.app)

### Pricing (Corrected)

| Platform | Price | Model |
|---|---|---|
| iOS (App Store PH) | ₱299 | One-time purchase |
| Android (Google Play PH) | ₱199 | One-time purchase |

**This is not freemium. Tarsi is a paid app.** Users pay once and own it forever — no subscription, no recurring revenue for PocketDevs. This is a critical strategic difference from Tipon's subscription model. See Revenue Model analysis in the teardown section.

### What Tarsi Does Well (Learn From These)

| Feature | How Tarsi Does It | Tipon Action |
|---|---|---|
| AI/Voice input | Natural language: "Starbucks 250", "Salary 30k last week" — AI parses amount, category, and date | Build this into Phase 2. It removes the biggest friction in expense logging. |
| OCR receipt scanning | Attach image or scan receipt, text extracted automatically | Phase 2–3 feature. Reduces manual entry for users with many receipts. |
| Cashflow forecasting | Shows upcoming bills vs expected income on a single timeline | Phase 2. Critical for "can I afford this?" use case. |
| Offline-first | No account required. All data local. Works with no internet. | Tipon is cloud-first but should work gracefully offline with local state. |
| Multiple account types | Cash, bank, e-wallets, credit cards, investments — unified view | Phase 1. Match this on day one. |
| Savings goals + debt tracking | Visual goal progress, debt payoff tracking, money owed | Phase 2. Goes beyond basic expense tracking. |
| Recurring transactions | Bills, subscriptions, salary — with calendar view of upcoming entries | Phase 2. Essential for real financial planning. |
| Clean, polished mobile UI | Universally praised in reviews for smoothness and design | Design bar to meet or exceed. |
| Apple Watch + Siri | Log expenses from wrist or voice on iOS | Phase 5 (post-launch mobile app). |
| Multiple profiles per device | Personal, family, business as separate buckets | Phase 4 (multi-user). |
| CSV + JSON export | Full data portability | Phase 1. Must-have from day one. |

### What Tarsi Lacks — Tipon's Competitive Advantages

#### 🚨 Gap 1: No Real Web App (Biggest Opportunity)

Tarsi's "web app" at `app.tarsi.cloud` is **a backup viewer only**. You import your JSON export and browse it read-only. You cannot:
- Log a transaction
- Create a budget
- Manage accounts
- See live data without first exporting from the phone

**Tipon is a full, native web app.** For anyone who spends their day on a laptop, opening a phone app to log every transaction creates massive friction. Tipon eliminates this entirely.

> This is Tipon's single biggest structural advantage over Tarsi.

#### 🚨 Gap 2: No Cloud Sync / Multi-Device Access

Tarsi is 100% local storage. Your data lives on one phone. Consequences:
- Switch phones → manual export/import required
- Lose or break phone → risk of data loss
- Can't view your finances on a tablet, laptop, or a different device
- No background sync, no always-available access

**Tipon:** Real-time sync across all devices via Supabase. Log on mobile, review on desktop. Always consistent.

#### 🚨 Gap 3: No Real Multi-User / Family Sharing

Tarsi's "multiple profiles" are per-device local profiles — not real cross-device sharing. A married couple cannot both see the same budget on their separate phones without manual export/import.

**Tipon Phase 4:** Real family plans where multiple users share accounts, see the same transactions, and manage budgets together — each with their own login.

#### Gap 4: AI Is Input-Only, Not Analytical

Tarsi's "Chat with Tarsi" is for logging entries via natural language — it understands and records. It does not analyze. You cannot ask:
- "Why did I spend more this month?"
- "What's my biggest expense category over 6 months?"
- "At this rate, will I hit my savings goal?"

**Tipon Phase 3+:** AI-powered insights layer that answers questions about your financial patterns, not just records transactions.

#### Gap 5: No API / Integrations / Automation

Tarsi is a closed system. No webhooks, no API, no Zapier/Make integration. Power users who want to:
- Automatically export to Google Sheets
- Trigger alerts on spending thresholds
- Connect to other financial tools

...have no path forward.

**Tipon Phase 5:** Developer API + webhooks for automation.

#### Gap 6: Limited Reporting Depth

Tarsi shows basic category breakdowns and a cashflow timeline. But there's no:
- Year-over-year comparison
- Net worth trend over time
- Category spend trends (is food creeping up month by month?)
- Custom date range reports
- Shareable/exportable report views

**Tipon Phase 2:** Deep analytics with full date range flexibility, trend comparisons, and exportable reports.

#### Gap 7: No Accountant / Advisor Access Mode

No read-only sharing link for a financial advisor, bookkeeper, or accountant to view your data without login credentials.

**Tipon Phase 4+:** Read-only share tokens for external advisors.

#### Gap 8: Mobile-Only Friction Points

Despite being a polished app, Tarsi requires you to:
- Have your phone available
- Open the app
- Navigate to add a transaction

For desktop workers, this is 4–5 steps of friction for every expense. Tipon's web app means a browser tab is always open.

### Feature Comparison: Tipon vs Tarsi

| Feature | Tarsi | Tipon |
|---|---|---|
| Full web app | ❌ Viewer only | ✅ |
| Cloud sync (multi-device) | ❌ Local only | ✅ |
| Real family/multi-user sharing | ❌ Per-device profiles | ✅ Phase 4 |
| AI voice/chat input | ✅ | ✅ Phase 2 |
| OCR receipt scanning | ✅ | ✅ Phase 2–3 |
| Cashflow forecasting | ✅ | ✅ Phase 2 |
| Analytical AI insights | ❌ | ✅ Phase 3 |
| Deep analytics / reports | Basic | ✅ Phase 2 |
| API / webhooks | ❌ | ✅ Phase 5 |
| Bank sync | ❌ | Optional Phase 5 |
| Offline mode | ✅ Native | ⚠️ Partial (PWA) |
| Apple Watch / Siri | ✅ | ❌ (native app only) |
| Export (CSV/JSON) | ✅ | ✅ Phase 1 |
| Free to use | ✅ (freemium) | ✅ Free tier |
| Accountant access mode | ❌ | ✅ Phase 4+ |
| Custom reports / date range | Limited | ✅ Phase 2 |

### Strategic Conclusion

Tarsi has nailed the **mobile-first, offline-first, privacy-first** experience. It's genuinely well-built for solo users on their phone. That's a real strength.

Tipon wins by being what Tarsi is **not**: a proper web app with cloud sync, real multi-user support, deep analytics, and a platform that grows beyond the phone. The user who outgrows Tarsi — because they want it on their laptop, want to share with a partner, or want deeper analysis — has nowhere to go. **Tipon is that next step.**

---

## Market Gap Analysis

After studying the landscape, the clearest opportunity is:

### Gap 1: The Mint Refugee Market
Mint shut down in January 2024 — displacing **~3.6 million active users** overnight. These users want something familiar (web-based, free-ish, simple entry) but haven't found a clean replacement. Most alternatives are either too expensive or too complex.

### Gap 2: International Users
Most top-tier apps are US-centric (Plaid, US bank sync, USD only). International users in Southeast Asia, Latin America, and other markets have far fewer quality options. Multi-currency + manual entry fills this gap.

### Gap 3: Privacy-Conscious Users
Bank sync (Plaid) requires granting third-party read access to bank accounts. A meaningful segment actively refuses this. Tipon can offer **full manual entry with zero bank connection** as a feature, not a limitation.

### Gap 4: Indie SaaS Price Point
$100/year is a significant commitment. There's a clear gap at $5–8/month for a full-featured product that isn't enterprise-priced.

---

## Target User Segments

### Segment A — Personal Power Users (Primary, Phase 1–3)
**Profile:** Mar and people like him — financially aware individuals who want full visibility without complexity.
- Age: 25–40
- Income: Middle to upper-middle class
- Tech savvy: moderate to high
- Need: Accurate picture of income, expenses, and trends
- Pain point: Spreadsheets are flexible but tedious; apps are opinionated but limited

### Segment B — Mint Refugees (Commercial Launch)
**Profile:** Former Mint users looking for a familiar, free-ish alternative.
- Want: Simple dashboard, categories, monthly summary
- Will pay: $5–8/month if the product is clean
- Acquisition: Target via SEO ("Mint alternative"), Reddit threads, Product Hunt

### Segment C — International Freelancers / Solopreneurs
**Profile:** Gig workers and freelancers with multiple income streams in multiple currencies.
- Need: Track irregular income + business expenses + personal spending separately
- Pain point: No good tools that handle both personal and light business finance
- Potential for: "Freelancer" tier with invoice tracking, tax category tagging

### Segment D — Couples / Families (Phase 4+)
**Profile:** Partners managing shared finances or parents with family budgets.
- Need: Shared visibility without merging finances completely
- Pain point: Most apps are built for one user
- Opportunity: Family plan ($14/mo) with shared accounts + individual views

---

## Positioning

### Where Tipon Sits

```
                    COMPLEX
                       |
           Quicken     |     YNAB
                       |
  BASIC ───────────────┼─────────────── POWERFUL
                       |
  PocketGuard  Tarsi   |   [TIPON]  Monarch
                       |
                    SIMPLE
```

Tarsi lives in the simple-but-capable mobile quadrant. Tipon targets the **powerful but approachable web** quadrant — matching Tarsi's ease of entry, but with the depth, analytics, and cross-device access that Tarsi cannot offer.

### Positioning Statement

> For individuals who want to understand their full financial picture without connecting their bank accounts or learning a new methodology, Tipon is a fast, clean finance tracker that works anywhere, respects your privacy, and grows with you — from personal use to household management.

---

## Differentiation

| Feature | Tipon | Tarsi | YNAB | Copilot | Monarch |
|---|---|---|---|---|---|
| Full web app | ✅ | ❌ viewer only | ✅ | ❌ iOS only | ✅ |
| Cloud sync (multi-device) | ✅ | ❌ local only | ✅ | ✅ | ✅ |
| Manual entry | ✅ | ✅ | ✅ | ❌ sync required | ✅ |
| AI/Voice input | ✅ Phase 2 | ✅ | ❌ | ❌ | ❌ |
| Analytical AI insights | ✅ Phase 3 | ❌ | ❌ | ❌ | ❌ |
| Family sharing | ✅ Phase 4 | ❌ real sharing | ✅ | ❌ | ✅ |
| Multi-currency | ✅ Phase 2 | ✅ | Limited | ❌ | Limited |
| Deep analytics | ✅ | Basic | ✅ | ✅ | ✅ |
| Free tier | ✅ | ❌ paid upfront | ❌ | ❌ | ❌ |
| API / integrations | ✅ Phase 5 | ❌ | ❌ | ❌ | ❌ |
| Open to non-US users | ✅ | ✅ | ✅ | ❌ | Limited |
| Offline mode | ⚠️ PWA | ✅ native | ⚠️ | ❌ | ⚠️ |
| Pricing model | Free + $7/mo Pro | ₱299 iOS / ₱199 Android one-time | $9/mo | $13/mo | $8/mo |

---

## Monetization Strategy

### Phase 4 Launch Model

**Freemium** with a meaningful free tier:

| Tier | Monthly Price | Annual Price |
|---|---|---|
| Free | $0 | $0 |
| Pro | $7/mo | $60/yr ($5/mo equiv) |
| Family | $14/mo | $110/yr |

### Revenue Projections (Conservative)

| Month | Paying Users | MRR |
|---|---|---|
| Month 1 (launch) | 10 | $70 |
| Month 3 | 50 | $350 |
| Month 6 | 150 | $1,050 |
| Month 12 | 400 | $2,800 |
| Year 2 | 1,200 | $8,400 |

At 1,200 paying users, Tipon generates ~$100K ARR — a sustainable indie SaaS business.

### Long-Term Revenue Options
- Plaid bank sync add-on (pass-through cost + markup)
- Accountant access seats (B2B lite)
- Data insights API (for power users / developers)
- White-label for financial coaches

---

## Go-To-Market Strategy

### Phase 1–3 (Personal Use)
No marketing needed. Just build something great that you use every day.

### Phase 4 (Pre-Launch)
1. Build a landing page + waitlist (collect emails before launch)
2. Post in r/personalfinance, r/YNAB, r/mintuit (Mint refugee community)
3. Post in Philippine tech/finance communities (Tarsi's home market — position as the web-first upgrade)
4. Product Hunt launch
5. SEO: Target "Mint alternative", "YNAB alternative cheaper", "Tarsi web app", "budget tracker web browser", "personal finance app manual entry"

### Phase 5 (Growth)
1. Content marketing: "How to track finances without a spreadsheet" etc.
2. YouTube demos / TikTok (finance content performs well)
3. Referral program (Pro users get 1 month free per referral)
4. Partnership with financial coaches / budgeting YouTubers

---

## Key Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Large player (Intuit, Apple) enters space | Low | High | Focus on niche (manual, privacy, international) |
| Tarsi launches real web app / cloud sync | Medium | High | Ship Tipon Phase 1 fast — establish web-first position before they close the gap |
| Plaid dependency for bank sync | Medium | Medium | Build without it first; add as optional premium |
| GDPR/privacy compliance burden | Medium | High | Build with data minimization from day one |
| User acquisition cost too high | Medium | High | Lead with SEO and community, not paid ads |
| Pricing resistance (vs free Tarsi) | Medium | Medium | Free tier must be genuinely useful; Pro justified by web + multi-device + analytics |
