'use client'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Download, Upload } from 'lucide-react'

const defaultCategories = [
  { name: 'Food & Dining', type: 'expense', color: '#f97316' },
  { name: 'Transport', type: 'expense', color: '#3b82f6' },
  { name: 'Groceries', type: 'expense', color: '#22c55e' },
  { name: 'Utilities', type: 'expense', color: '#8b5cf6' },
  { name: 'Health', type: 'expense', color: '#ef4444' },
  { name: 'Subscriptions', type: 'expense', color: '#06b6d4' },
  { name: 'Shopping', type: 'expense', color: '#ec4899' },
  { name: 'Salary', type: 'income', color: '#10b981' },
  { name: 'Freelance', type: 'income', color: '#14b8a6' },
  { name: 'Investment', type: 'both', color: '#f59e0b' },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Settings" />
      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="data">Import / Export</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input defaultValue="Mar Anthony" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="maranthonyalimoot@gmail.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Input defaultValue="PHP — Philippine Peso" disabled />
                </div>
                <Separator />
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>System and custom transaction categories.</CardDescription>
                </div>
                <Button size="sm">Add Category</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {defaultCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-sm font-medium">{cat.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {cat.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Download className="h-4 w-4" />
                    Export Data
                  </CardTitle>
                  <CardDescription>Download all your transactions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">Export as CSV</Button>
                  <Button variant="outline" className="w-full">Export as JSON</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Upload className="h-4 w-4" />
                    Import Data
                  </CardTitle>
                  <CardDescription>Import from CSV or Tarsi export.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">Import from CSV</Button>
                  <Button className="w-full">Import from Tarsi</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
