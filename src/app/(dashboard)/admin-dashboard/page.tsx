import { AppSidebar } from "@/components/layout/app-sidebar"
import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive"
import { DataTable } from "@/components/layout/data-table"
import { SectionCards } from "@/components/layout/section-cards"
import { SiteHeader } from "@/components/layout/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { TopNav } from "@/components/layout/top-nav"
import { Search } from "@/components/search"
import { SearchProvider } from "@/context/search-provider"
import { ThemeSwitch } from "@/components/theme-switch"

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <SearchProvider>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader>
            <TopNav links={topNav} />
            <div className='ms-auto flex items-center space-x-4'>
              <Search />
              <ThemeSwitch />
            </div>
          </SiteHeader>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'admin-dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'admin-dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'admin-dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'admin-dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
