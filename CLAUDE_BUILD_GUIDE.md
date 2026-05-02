# Tipon — Claude / Cowork Build Guide

> How to use Claude Code and Cowork to build Tipon autonomously, consistently, and at high quality.

This document is your operating manual for working with Claude throughout the build. Following these patterns means you can hand off tasks to Claude and get production-quality output without micromanaging every step.

---

## The Core Idea

Claude works best when it has:
1. **Context** — what the project is and what the current state is
2. **Standards** — the guidelines it should follow (this repo provides those)
3. **Scope** — a clear description of what "done" looks like for a task
4. **Autonomy** — permission to read the codebase, make decisions, and execute

This guide tells you exactly how to invoke Claude for each type of task in this project.

---

## Before Every Session

Always start by telling Claude:

```
Read the following files before starting:
- README.md
- DEVELOPMENT_GUIDELINES.md
- ROADMAP.md (check current phase)
```

Or simply say:

> "Read the project docs and tell me where we are, then let's continue with Phase X."

Claude will orient itself and pick up where you left off.

---

## Skills Reference (Cowork)

The following skills are pre-loaded and ready to use. Call them by saying "use the [skill name] skill" or prefix with `/`.

### Building & Coding

| Task | Skill | How to Invoke |
|---|---|---|
| Plan a new feature | `engineering:architecture` | "Use the architecture skill to plan how we should build recurring transactions" |
| Review code before merge | `engineering:code-review` | "Use the code-review skill on the TransactionForm component" |
| Debug an issue | `engineering:debug` | "Use the debug skill — the balance is wrong for credit accounts" |
| Write a feature spec | `product-management:write-spec` | "Use the write-spec skill for the budget tracking feature" |
| Write SQL / DB queries | `data:sql-queries` | "Use the sql-queries skill to write a query for monthly spending by category" |

### Data & Analysis

| Task | Skill | How to Invoke |
|---|---|---|
| Build a chart/viz | `data:create-viz` | "Use the create-viz skill to build a spending by category bar chart" |
| Analyze financial data | `data:analyze` | "Use the analyze skill on my transaction export to find patterns" |
| Build a dashboard | `data:build-dashboard` | "Use the build-dashboard skill to create an admin usage overview" |

### Design & UX

| Task | Skill | How to Invoke |
|---|---|---|
| Review UI design | `design:design-critique` | "Use the design-critique skill on the dashboard layout" |
| Check accessibility | `design:accessibility-review` | "Use the accessibility-review skill on the transaction form" |
| Write UI copy | `design:ux-copy` | "Use the ux-copy skill to write the empty state for no transactions" |
| Review design system | `design:design-system` | "Use the design-system skill to audit our component library" |

### Pre-Launch / Legal

| Task | Skill | How to Invoke |
|---|---|---|
| Check compliance | `legal:compliance-check` | "Use the compliance-check skill on the user data collection for GDPR" |
| Draft terms/privacy | `legal:legal-response` | "Use the legal-response skill to draft a privacy policy for Tipon" |
| Review risk | `legal:legal-risk-assessment` | "Use the legal-risk-assessment skill on the Stripe integration plan" |

### Marketing & Growth

| Task | Skill | How to Invoke |
|---|---|---|
| Write landing page copy | `marketing:content-creation` | "Use the content-creation skill to write the Tipon landing page" |
| SEO audit | `marketing:seo-audit` | "Use the seo-audit skill on the Tipon landing page" |
| Campaign plan | `marketing:campaign-plan` | "Use the campaign-plan skill for the Product Hunt launch" |
| Competitive research | `marketing:competitive-brief` | "Use the competitive-brief skill to compare Tipon to YNAB" |

---

## Prompt Templates by Task Type

Use these exact prompts (or adapt them) when delegating work to Claude.

### Starting a New Feature

```
Read README.md and DEVELOPMENT_GUIDELINES.md first.

I want to build [FEATURE NAME]. Here's what it should do:
[2-3 sentence description]

Use the project structure in README.md. Follow all standards in DEVELOPMENT_GUIDELINES.md.
Build it end-to-end: DB migration (if needed), API route, component, and hook.
After building, use the engineering:code-review skill to check your own work.
```

### Fixing a Bug

```
Read the file at [PATH]. There's a bug: [DESCRIBE WHAT'S WRONG].

Expected behavior: [WHAT SHOULD HAPPEN]
Actual behavior: [WHAT ACTUALLY HAPPENS]

Use the engineering:debug skill to diagnose it, then fix it. Show me the diff before applying.
```

### Writing a New Database Migration

```
I need to add [FEATURE/COLUMN/TABLE] to the database.

Read supabase/migrations/ to understand existing schema.
Write a migration file following the naming convention in DEVELOPMENT_GUIDELINES.md.
Include RLS policies using the template in DEVELOPMENT_GUIDELINES.md.
Show me the SQL before applying it.
```

### Generating TypeScript Types After Migration

```
I just applied a migration. Run: pnpm supabase gen types typescript --local > types/database.ts
Then check that all existing usages of affected types still compile.
```

### Adding a New Page

```
Read the App Router structure in README.md.

Create a new page at [ROUTE PATH]. It should:
- [list what it shows]
- [list what actions it supports]
- Be a Server Component where possible
- Use existing components from components/ui/ and components/features/
- Match the layout of [similar existing page]
```

### Building a Chart / Analytics View

```
Use the data:create-viz skill.

I want a [CHART TYPE] that shows [DATA]. The data comes from the transactions table.
The chart should use Recharts and match the color palette in components/charts/.
Write the React component and the data-fetching hook that powers it.
```

### Pre-Launch Legal / Compliance Check

```
Use the legal:compliance-check skill.

Review [FEATURE/DATA FLOW] for compliance with GDPR and CCPA.
We collect: [list data points].
We store in: Supabase (PostgreSQL, EU region).
Flag any risks and recommend what we need to add.
```

---

## Autonomous Build Mode

For larger tasks, you can put Claude into autonomous mode:

```
I'm going to be away for a few hours. Build Phase [X] of the roadmap from ROADMAP.md.

Autonomous mode:
1. Read ROADMAP.md and identify all Phase X tasks
2. Work through them in dependency order
3. Follow all standards in DEVELOPMENT_GUIDELINES.md
4. After each major piece, use the engineering:code-review skill to self-review
5. Create a build log at LOGS/phase-X-build.md documenting what you built
6. Stop and ask me before making any database changes
```

This gives Claude a clear objective, self-review loop, and a hard stop before DB mutations.

---

## Code Review Loops

Build this into your workflow — always ask Claude to review its own output:

```
Now use the engineering:code-review skill to review what you just built.
Check for: security issues, missing error handling, type safety, and performance.
Fix anything you find before we consider this done.
```

---

## What Claude Should Always Do for This Project

When building Tipon, Claude should:

1. **Read project docs first** — README.md, DEVELOPMENT_GUIDELINES.md before writing any code
2. **Follow the folder structure** — never create files outside the defined structure without discussing it
3. **Generate types after schema changes** — always run `pnpm supabase gen types typescript`
4. **Include RLS policies with every new table** — non-negotiable
5. **Use decimal.js for any currency math** — never floating-point arithmetic
6. **Write tests for anything in `lib/utils/`** — especially currency and date helpers
7. **Use soft deletes for transactions and accounts** — never hard delete financial records
8. **Self-review with `engineering:code-review`** — before declaring any feature done

---

## What Claude Should Never Do

- **Hard delete financial records** — use soft deletes (`is_deleted = TRUE`)
- **Store sensitive data in localStorage** — use Supabase sessions only
- **Write currency math with native `number`** — use decimal.js
- **Expose service role key on the client** — server-only, never in browser code
- **Skip RLS policies** — every user table must have policies
- **Add dependencies without checking the Approved Dependencies list** in DEVELOPMENT_GUIDELINES.md

---

## Session Workflow (Daily)

```
1. Start session:
   "Read README.md, ROADMAP.md, and DEVELOPMENT_GUIDELINES.md. 
    Tell me what phase we're in and what's next."

2. Pick a task from ROADMAP.md

3. Delegate with the appropriate template above

4. Review the output (diff, SQL, component)

5. Ask Claude to self-review: "Use the engineering:code-review skill"

6. Approve and apply, or iterate

7. End session:
   "Update ROADMAP.md to mark completed tasks. 
    Save a brief session summary to LOGS/session-[date].md"
```

---

## Log Files

Claude should maintain build logs in a `LOGS/` folder:

```
LOGS/
  phase-0-foundation.md       # What was built, decisions made
  phase-1-mvp.md
  session-2026-05-02.md       # Per-session notes
```

This gives you an auditable history of what was built and why — useful when debugging and when onboarding future collaborators.

---

## MCP Connections (Planned)

For Phase 4+, connect the following to unlock additional Claude capabilities:

| Tool | Purpose | Skill Unlocked |
|---|---|---|
| Supabase MCP | Direct DB queries from Claude | `data:analyze` on live data |
| Vercel MCP | Deploy and monitor from Claude | `engineering:deploy-checklist` |
| GitHub (via Claude Code) | PR creation, review | `engineering:code-review` on PRs |
| Stripe (future) | Revenue monitoring | `finance:financial-statements` |

---

## Quick Reference Card

```
ORIENT:    "Read project docs and tell me where we are"
BUILD:     "Build [feature] end-to-end following DEVELOPMENT_GUIDELINES.md"
FIX:       "Use engineering:debug to diagnose [issue], then fix it"
REVIEW:    "Use engineering:code-review on [file/feature]"
SCHEMA:    "Write a migration for [change], include RLS policies"
TYPES:     "Regenerate Supabase types and check for breakage"
ANALYZE:   "Use data:analyze to [question about the data]"
DESIGN:    "Use design:design-critique on [screen]"
LAUNCH:    "Use legal:compliance-check on [feature]"
LOG:       "Save a session summary to LOGS/session-[date].md"
```
