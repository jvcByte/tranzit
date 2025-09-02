"use client"
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

type NavLink = {
  title: string
  href: string
  isActive?: boolean
  disabled?: boolean
}

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links?: NavLink[]
  title?: string
}

export function TopNav({ className, links = [], title, ...props }: TopNavProps) {
  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      {title && (
        <h1 className='text-sm font-base md:text-xl'>{title}</h1>
      )}

      {links.length > 0 && (
        <>
          <div className='hidden lg:flex lg:items-center lg:gap-6'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  link.isActive ? 'text-foreground' : 'text-muted-foreground',
                  link.disabled && 'pointer-events-none opacity-60'
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className='lg:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='md:h-8 md:w-8'>
                  <Menu className='h-4 w-4' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-40'>
                {links.map((link) => (
                  <DropdownMenuItem key={link.href} asChild disabled={link.disabled}>
                    <Link
                      href={link.href}
                      className={link.isActive ? 'font-medium' : ''}
                    >
                      {link.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  )
}
