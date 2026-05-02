import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart2, TrendingUp, PieChart, Calendar } from 'lucide-react'

const reports = [
  {
    title: 'Spending by Category',
    icon: PieChart,
    description: 'Where your money goes this month',
  },
  {
    title: 'Income vs Expenses',
    icon: BarChart2,
    description: '6-month income and spending trend',
  },
  {
    title: 'Net Worth Over Time',
    icon: TrendingUp,
    description: 'Track your wealth growth',
  },
  {
    title: 'Annual Summary',
    icon: Calendar,
    description: 'Full year breakdown by month',
  },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Reports" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <p className="text-sm text-muted-foreground">
          Analytics and insights — coming in Phase 2.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map((r) => {
            const Icon = r.icon
            return (
              <Card key={r.title} className="opacity-60">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{r.title}</CardTitle>
                    <CardDescription className="text-xs">{r.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex h-36 items-center justify-center rounded-lg bg-muted">
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
