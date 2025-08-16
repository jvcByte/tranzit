'use client'

import { HeroHeader } from '@/components/layout/header'
import FooterSection from '@/components/layout/footer-section'
import { PageTransition } from '@/components/ui/page-transition'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroHeader />
      <main className="flex-grow pt-24 md:pt-28 relative">
        <PageTransition>
          <div className="pb-20">
            {children}
          </div>
        </PageTransition>
      </main>
      <FooterSection />
    </div>
  )
}
