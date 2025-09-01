import type { LinkProps } from 'next/link'

type User = {
    name: string
    email: string
    avatar: string
}

type BaseNavItem = {
    title: string
    badge?: string
    icon?: React.ElementType
}

type NavLink = BaseNavItem & {
    url: LinkProps['href']
    items?: never
}

type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: LinkProps['href'] })[]
    url?: undefined
}

type NavItem = NavCollapsible | NavLink

type NavGroup = {
    title: string
    items: NavItem[]
}

type SidebarData = {
    user: User
    navGroups: NavGroup[]
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink }
