import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react'

const transactions = [
  { id: 1, description: 'Jollibee', category: 'Food & Dining', amount: 250, date: 'May 2, 2026', type: 'expense', account: 'GCash' },
  { id: 2, description: 'Salary', category: 'Income', amount: 45000, date: 'May 1, 2026', type: 'income', account: 'BDO Savings' },
  { id: 3, description: 'Grab', category: 'Transport', amount: 180, date: 'May 1, 2026', type: 'expense', account: 'GCash' },
  { id: 4, description: 'SM Groceries', category: 'Groceries', amount: 2850, date: 'Apr 30, 2026', type: 'expense', account: 'BDO Savings' },
  { id: 5, description: 'Meralco Bill', category: 'Utilities', amount: 3200, date: 'Apr 30, 2026', type: 'expense', account: 'Maya' },
  { id: 6, description: 'Netflix', category: 'Subscriptions', amount: 549, date: 'Apr 29, 2026', type: 'expense', account: 'Maya' },
  { id: 7, description: 'Freelance Project', category: 'Income', amount: 8500, date: 'Apr 28, 2026', type: 'income', account: 'BDO Savings' },
  { id: 8, description: 'Mercury Drug', category: 'Health', amount: 420, date: 'Apr 28, 2026', type: 'expense', account: 'GCash' },
  { id: 9, description: 'Transfer to GCash', category: 'Transfer', amount: 5000, date: 'Apr 27, 2026', type: 'transfer', account: 'BDO Savings' },
  { id: 10, description: 'Shopee', category: 'Shopping', amount: 1350, date: 'Apr 26, 2026', type: 'expense', account: 'Maya' },
]

const typeIcon = {
  income: ArrowDownLeft,
  expense: ArrowUpRight,
  transfer: ArrowLeftRight,
}

const categoryColors: Record<string, string> = {
  'Food & Dining': 'bg-orange-100 text-orange-600',
  'Income':        'bg-emerald-100 text-emerald-600',
  'Transport':     'bg-blue-100 text-blue-600',
  'Groceries':     'bg-lime-100 text-lime-700',
  'Utilities':     'bg-yellow-100 text-yellow-700',
  'Subscriptions': 'bg-purple-100 text-purple-600',
  'Health':        'bg-rose-100 text-rose-600',
  'Shopping':      'bg-pink-100 text-pink-600',
  'Transfer':      'bg-sky-100 text-sky-600',
}

const typeColor = {
  income: 'text-emerald-600',
  expense: 'text-foreground',
  transfer: 'text-sky-600',
}

const typePrefix = {
  income: '+',
  expense: '−',
  transfer: '',
}

const php = (n: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(n)

export default function TransactionsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Transactions" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{transactions.length} transactions</p>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Transaction
          </Button>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0 divide-y divide-border/60">
            {transactions.map((tx) => {
              const Icon = typeIcon[tx.type as keyof typeof typeIcon]
              const iconStyle = categoryColors[tx.category] ?? 'bg-muted text-muted-foreground'
              return (
                <div
                  key={tx.id}
                  className="flex cursor-pointer items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/40"
                >
                  <div className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                    iconStyle
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.account} · {tx.date}</p>
                  </div>
                  <Badge variant="secondary" className="hidden shrink-0 text-xs sm:inline-flex rounded-full">
                    {tx.category}
                  </Badge>
                  <p className={cn('shrink-0 text-sm font-bold tabular-nums', typeColor[tx.type as keyof typeof typeColor])}>
                    {typePrefix[tx.type as keyof typeof typePrefix]}{php(tx.amount)}
                  </p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
