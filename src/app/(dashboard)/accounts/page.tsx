import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus, TrendingUp } from 'lucide-react'

const accounts = [
  {
    id: 1,
    name: 'BDO Savings',
    type: 'Bank',
    balance: 85000,
    description: 'Main savings account',
    gradient: 'from-blue-600 to-blue-900',
    initials: 'BD',
  },
  {
    id: 2,
    name: 'GCash',
    type: 'E-wallet',
    balance: 12500,
    description: 'Mobile wallet',
    gradient: 'from-sky-400 to-blue-600',
    initials: 'GC',
  },
  {
    id: 3,
    name: 'Maya',
    type: 'E-wallet',
    balance: 22000,
    description: 'Mobile wallet',
    gradient: 'from-violet-500 to-purple-800',
    initials: 'MY',
  },
  {
    id: 4,
    name: 'Cash',
    type: 'Cash',
    balance: 5000,
    description: 'Physical cash',
    gradient: 'from-amber-400 to-orange-600',
    initials: 'CA',
  },
]

const php = (n: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(n)

export default function AccountsPage() {
  const netWorth = accounts.reduce((s, a) => s + a.balance, 0)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Accounts" />
      <main className="flex-1 overflow-y-auto">

        {/* Net Worth Banner */}
        <div className="bg-linear-to-br from-primary via-[oklch(0.38_0.11_152)] to-[oklch(0.30_0.09_152)] px-6 py-8">
          <p className="text-sm font-medium text-white/60 mb-1">Total Net Worth</p>
          <p className="text-4xl font-bold text-white tracking-tight">{php(netWorth)}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
              <TrendingUp className="h-3 w-3" />
              +5.8% this month
            </span>
            <span className="text-xs text-white/50">{accounts.length} accounts</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Accounts</p>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" />
              Add Account
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-2xl bg-linear-to-br p-5 text-white shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5',
                  account.gradient
                )}
              >
                {/* Decorative circle */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                <div className="absolute -right-2 -bottom-8 h-32 w-32 rounded-full bg-white/5" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-sm font-bold">
                      {account.initials}
                    </div>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                      {account.type}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-white/70 mb-0.5">{account.name}</p>
                  <p className="text-2xl font-bold tracking-tight">{php(account.balance)}</p>
                  <p className="text-xs text-white/50 mt-1">{account.description}</p>
                </div>
              </div>
            ))}

            {/* Add Account Card */}
            <button className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/50 hover:text-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Add Account</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
