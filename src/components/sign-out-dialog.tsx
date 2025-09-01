"use client"

import { useRouter, usePathname } from 'next/navigation'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { authClient } from '@/lib/auth/auth-client'
interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = () => {
    authClient.signOut()
    // Preserve current path for redirect after sign-in
    const searchParams = new URLSearchParams()
    searchParams.set('redirect', pathname || '/')
    router.replace(`/login?${searchParams.toString()}`)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
