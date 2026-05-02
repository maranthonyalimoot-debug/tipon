import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Plus, CreditCard } from 'lucide-react'

const accounts = [
  { id: 1, name: 'BDO Savings', type: 'Bank', balance: 85000, color: 'bg-blue-600', description: 'Main savings account' },
  { id: 2, name: 'GCash', type: 'E-wallet', balance: 12500, color: 'bg-sky-500', description: 'Mobile wallet' },
  { id: 3, name: 'Maya', type: 'E-wallet', balance: 22000, color: 'bg-violet-600', description: 'Mobile wallet' },
  { id: 4, name: 'Cash', type: 'Cash', balance: 5000, color: 'bg-amber-600', description: 'Physical cash' },
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
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Net Worth</p>
              <p className="text-3xl font-bold mt-1">{php(netWorth)}</p>
              <p className="text-xs text-muted-foreground mt-1">{accounts.length} accounts</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {accounts.map((account) => (
            <Card key={account.id} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white', account.color)}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-xs">{account.type}</Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-1 text-base">{account.name}</CardTitle>
                <p className="mb-3 text-xs text-muted-foreground">{account.description}</p>
                <p className="text-2xl font-bold">{php(account.balance)}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="flex min-h-[160px] cursor-pointer items-center justify-center border-dashed transition-colors hover:bg-muted/50">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Add Account</span>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
