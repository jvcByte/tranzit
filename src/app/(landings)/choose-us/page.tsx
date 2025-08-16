import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function ChooseUs() {
  const features = [
    {
      title: 'Affordable Rides',
      description: 'Our hybrid vehicle model keeps costs low, allowing us to offer you the most competitive rates in the market.'
    },
    {
      title: 'Eco-Friendly',
      description: 'We prioritize the environment by using hybrid vehicles that reduce emissions and fuel consumption.'
    },
    {
      title: 'Safety First',
      description: 'All our drivers undergo rigorous background checks and our vehicles are regularly inspected to ensure your safety.'
    },
    {
      title: 'Reliable Service',
      description: 'With real-time tracking and 24/7 customer support, you can always count on us to get you where you need to go.'
    },
    {
      title: 'Seamless Experience',
      description: 'From booking to payment, our app provides a smooth and intuitive experience for all users.'
    },
    {
      title: 'Local Expertise',
      description: 'As a Nigerian company, we understand the unique transportation challenges and have tailored our service accordingly.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Section className="py-16 md:py-24 bg-muted/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Tranzit?</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re redefining urban mobility in Nigeria with a focus on affordability, safety, and sustainability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to experience the difference?</h2>
            <Button size="lg" asChild>
              <Link href="/join-waitlist">Join the Waitlist</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
