import HeroSection from '@/components/layout/hero-section'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Welcome to Tranzit Mobility</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Your journey starts here. Explore our services and find the perfect ride for you.
          </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/choose-us">Why Choose Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
