"use client"

import {
  LayoutDashboard,
  Monitor,
  HelpCircle,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
} from 'lucide-react'
import { type SidebarData } from '../types'


export const sidebarData: SidebarData = {
  user: {
    name: 'User',
    email: 'user@email.com',
    avatar: '',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: 'admin/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: 'admin/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: 'admin/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: 'admin/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: 'admin/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: 'admin/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
