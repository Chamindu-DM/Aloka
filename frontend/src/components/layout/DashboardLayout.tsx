import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <aside className="w-64 bg-gray-50 border-r p-4">
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Overview
            </a>
            <a
              href="/dashboard/campaigns"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              My Campaigns
            </a>
            <a
              href="/dashboard/donations"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              My Donations
            </a>
            <a
              href="/dashboard/settings"
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              Settings
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
