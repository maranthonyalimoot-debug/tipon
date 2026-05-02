import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp, ArrowDownLeft, ArrowUpRight, ChevronRight } from 'lucide-react'

const accounts = [
  { id: 1, name: 'BDO Savings', type: 'Bank', balance: 85000, initials: 'BD', gradient: 'from-blue-600 to-blue-800' },
  { id: 2, name: 'GCash', type: 'E-wallet', balance: 12500, initials: 'GC', gradient: 'from-sky-400 to-blue-600' },
  { id: 3, name: 'Maya', type: 'E-wallet', balance: 22000, initials: 'MY', gradient: 'from-violet-500 to-purple-700' },
  { id: 4, name: 'Cash', type: 'Cash', balance: 5000, initials: 'CA', gradient: 'from-amber-500 to-orange-600' },
]

const recentTransactions = [
  { id: 1, description: 'Jollibee', category: 'Food & Dining', amount: 250, date: 'May 2', type: 'expense' },
  { id: 2, description: 'Salary', category: 'Income', amount: 45000, date: 'May 1', type: 'income' },
  { id: 3, description: 'Grab', category: 'Transport', amount: 180, date: 'May 1', type: 'expense' },
  { id: 4, description: 'SM Groceries', category: 'Groceries', amount: 2850, date: 'Apr 30', type: 'expense' },
  { id: 5, description: 'Meralco Bill', category: 'Utilities', amount: 3200, date: 'Apr 30', type: 'expense' },
  { id: 6, description: 'Freelance Project', category: 'Income', amount: 8500, date: 'Apr 28', type: 'income' },
]

const categoryColors: Record<string, string> = {
  'Food & Dining': 'bg-orange-100 text-orange-600',
  'Income': 'bg-emerald-100 text-emerald-600',
  'Transport': 'bg-blue-100 text-blue-600',
  'Groceries': 'bg-lime-100 text-lime-700',
  'Utilities': 'bg-yellow-100 text-yellow-700',
  'Subscriptions': 'bg-purple-100 text-purple-600',
  'Health': 'bg-rose-100 text-rose-600',
}

const php = (n: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(n)

export default function DashboardPage() {
  const netWorth = accounts.reduce((s, a) => s + a.balance, 0)
  const income = 53500
  const expenses = 28350

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto">

        {/* Net Worth Hero */}
        <div className="bg-linear-to-br from-primary via-[oklch(0.38_0.11_152)] to-[oklch(0.30_0.09_152)] px-6 py-8">
          <p className="text-sm font-medium text-white/60 mb-1">Total Net Worth</p>
          <p className="text-4xl font-bold text-white tracking-tight">{php(netWorth)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">
              <TrendingUp className="h-3 w-3" />
              +5.8%
            </span>
            <span className="text-xs text-white/50">vs last month · {accounts.length} accounts</span>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Income / Expenses */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Income · May</p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                </div>
                <p className="text-xl font-bold text-emerald-600">{php(income)}</p>
                <p className="text-xs text-muted-foreground mt-1">+18% vs last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expenses · May</p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                  </div>
                </div>
                <p className="text-xl font-bold">{php(expenses)}</p>
                <p className="text-xs text-muted-foreground mt-1">{php(income - expenses)} remaining</p>
              </CardContent>
            </Card>
          </div>

          {/* Accounts + Transactions */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Accounts */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-semibold">Accounts</CardTitle>
                <button className="flex items-center gap-0.5 text-xs font-medium text-primary hover:underline">
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3">
                {accounts.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/60 transition-colors cursor-pointer">
                    <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-xs font-bold text-white', a.gradient)}>
                      {a.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    <p className="text-sm font-bold tabular-nums">{php(a.balance)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
                <button className="flex items-center gap-0.5 text-xs font-medium text-primary hover:underline">
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-1">
                {recentTransactions.map((tx) => {
                  const iconStyle = categoryColors[tx.category] ?? (tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500')
                  return (
                    <div key={tx.id} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/60 transition-colors cursor-pointer">
                      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', iconStyle)}>
                        {tx.type === 'income'
                          ? <ArrowDownLeft className="h-3.5 w-3.5" />
                          : <ArrowUpRight className="h-3.5 w-3.5" />
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                      </div>
                      <p className={cn('text-sm font-bold tabular-nums shrink-0', tx.type === 'income' ? 'text-emerald-600' : 'text-foreground')}>
                        {tx.type === 'income' ? '+' : '−'}{php(tx.amount)}
                      </p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}
