"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/layout/nav-documents"
import { NavMain } from "@/components/layout/nav-main"
import { NavSecondary } from "@/components/layout/nav-secondary"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth/auth-client"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  const data = {
    user: {
      name: user?.name || 'User',
      email: user?.email || '',
      avatar: user?.image || '',
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "Lifecycle",
        url: "#",
        icon: IconListDetails,
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Reports",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: IconFileWord,
      },
    ],
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!user) {
    console.error("User not found");
  }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {isPending ? (
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ) : (
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">{user?.name}</span>
                </a>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isPending ? (
          <div className="space-y-4">
            {/* Main Nav Items */}
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={`nav-${i}`} className="h-8 w-full" />
              ))}
            </div>

            {/* Documents Section */}
            <div className="space-y-2 pt-4">
              <Skeleton className="h-5 w-24" />
              <div className="pl-4 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={`doc-${i}`} className="h-6 w-full" />
                ))}
              </div>
            </div>

            {/* Secondary Nav */}
            <div className="space-y-2 pt-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={`sec-${i}`} className="h-8 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <NavMain items={data.navMain} />
            <NavDocuments items={data.documents} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <div className="flex items-center space-x-3 w-full p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-5" />
          </div>
        ) : (
          <NavUser user={data.user} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
};