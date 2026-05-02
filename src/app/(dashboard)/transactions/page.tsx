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

const typeStyle = {
  income: 'bg-emerald-100 text-emerald-600',
  expense: 'bg-red-50 text-red-500',
  transfer: 'bg-blue-50 text-blue-500',
}

const typeColor = {
  income: 'text-emerald-600',
  expense: '',
  transfer: 'text-blue-600',
}

const typePrefix = {
  income: '+',
  expense: '-',
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
          <p className="text-sm text-muted-foreground">{transactions.length} transactions</p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        <Card>
          <CardContent className="p-0 divide-y">
            {transactions.map((tx) => {
              const Icon = typeIcon[tx.type as keyof typeof typeIcon]
              return (
                <div
                  key={tx.id}
                  className="flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                    typeStyle[tx.type as keyof typeof typeStyle]
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.account} · {tx.date}</p>
                  </div>
                  <Badge variant="secondary" className="hidden shrink-0 text-xs sm:inline-flex">
                    {tx.category}
                  </Badge>
                  <p className={cn('shrink-0 text-sm font-semibold', typeColor[tx.type as keyof typeof typeColor])}>
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
