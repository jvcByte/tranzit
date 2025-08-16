import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">How Tranzit Works</h1>
          
          <div className="space-y-12 mt-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Book a Ride</h2>
                <p className="text-muted-foreground">
                  Download the Tranzit app, enter your destination, and get matched with the nearest available driver. 
                  Our algorithm ensures the most efficient routes and the best prices.
                </p>
              </div>
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                <span className="text-muted-foreground">App Screenshot</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <h2 className="text-2xl font-bold mb-4">2. Track Your Ride</h2>
                <p className="text-muted-foreground">
                  Watch your driver approach in real-time on the map. Get notifications when they&apos;re nearby and ready to pick you up.
                </p>
              </div>
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center md:order-1">
                <span className="text-muted-foreground">Map View</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">3. Enjoy the Ride</h2>
                <p className="text-muted-foreground">
                  Travel comfortably in our hybrid vehicles. All our drivers are vetted professionals committed to your safety and comfort.
                </p>
              </div>
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                <span className="text-muted-foreground">Vehicle Image</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <h2 className="text-2xl font-bold mb-4">4. Cashless Payment</h2>
                <p className="text-muted-foreground">
                  Pay seamlessly through the app using your preferred payment method. No need for cash - just rate your driver and you&apos;re done!
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/join-waitlist">Join the Waitlist</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center md:order-1">
                <span className="text-muted-foreground">Payment Methods</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
