import { AppSidebar } from "@/components/layout/app-sidebar"
import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive"
import { DataTable } from "@/components/layout/data-table"
import { SectionCards } from "@/components/layout/section-cards"
import { SiteHeader } from "@/components/layout/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { LayoutProvider } from "@/context/layout-provider"

import data from "./data.json"

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { TopNav } from "@/components/layout/top-nav"
import { Search } from "@/components/search"
import { SearchProvider } from "@/context/search-provider"
import { ThemeSwitch } from "@/components/theme-switch"
import { ProfileDropdown } from "@/components/profile-dropdown"

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider
          style={{
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties}
        >
          <AppSidebar user={{
            name: session.user.name,
            email: session.user.email,
            avatar: session.user.image || ""
          }} />
          <SidebarInset>
            <SiteHeader>
              <TopNav 
                title="Admin Dashboard"
                links={topNav.map(link => ({
                  ...link,
                  isActive: link.href === '/admin-dashboard' // Adjust this logic based on your active route
                }))} 
              />
              <div className='ms-auto flex items-center space-x-4'>
                <Search />
                <ThemeSwitch />
                <ProfileDropdown user={{
                  name: session.user.name,
                  email: session.user.email,
                  avatar: session.user.image || ""
                }} />
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
      </LayoutProvider>
    </SearchProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '/admin-dashboard',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'admin/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'admin/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'admin/settings',
    isActive: false,
    disabled: true,
  },
]
