import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp, Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

const accounts = [
  { id: 1, name: 'BDO Savings', type: 'Bank', balance: 85000, initials: 'BD', color: 'bg-blue-600' },
  { id: 2, name: 'GCash', type: 'E-wallet', balance: 12500, initials: 'GC', color: 'bg-sky-500' },
  { id: 3, name: 'Maya', type: 'E-wallet', balance: 22000, initials: 'MY', color: 'bg-violet-600' },
  { id: 4, name: 'Cash', type: 'Cash', balance: 5000, initials: 'CA', color: 'bg-amber-600' },
]

const recentTransactions = [
  { id: 1, description: 'Jollibee', category: 'Food & Dining', amount: 250, date: 'May 2', type: 'expense' },
  { id: 2, description: 'Salary', category: 'Income', amount: 45000, date: 'May 1', type: 'income' },
  { id: 3, description: 'Grab', category: 'Transport', amount: 180, date: 'May 1', type: 'expense' },
  { id: 4, description: 'SM Groceries', category: 'Groceries', amount: 2850, date: 'Apr 30', type: 'expense' },
  { id: 5, description: 'Meralco Bill', category: 'Utilities', amount: 3200, date: 'Apr 30', type: 'expense' },
  { id: 6, description: 'Netflix', category: 'Subscriptions', amount: 549, date: 'Apr 29', type: 'expense' },
  { id: 7, description: 'Freelance Project', category: 'Income', amount: 8500, date: 'Apr 28', type: 'income' },
]

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
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{php(netWorth)}</div>
              <p className="text-xs text-muted-foreground mt-1">Across {accounts.length} accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Income · May</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{php(income)}</div>
              <p className="text-xs text-muted-foreground mt-1">+18% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expenses · May</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{php(expenses)}</div>
              <p className="text-xs text-muted-foreground mt-1">{php(income - expenses)} remaining</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accounts.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white', a.color)}>
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{php(a.balance)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full',
                      tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-50 text-red-500'
                    )}>
                      {tx.type === 'income'
                        ? <ArrowDownLeft className="h-3.5 w-3.5" />
                        : <ArrowUpRight className="h-3.5 w-3.5" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                    </div>
                  </div>
                  <p className={cn('text-sm font-semibold', tx.type === 'income' ? 'text-emerald-600' : '')}>
                    {tx.type === 'income' ? '+' : '-'}{php(tx.amount)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
