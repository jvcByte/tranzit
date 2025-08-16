import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Car, DollarSign, ShieldCheck, Wrench } from 'lucide-react'

export default function ForPartners() {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: 'Earn Consistently',
      description: 'Generate steady income with our managed vehicle program.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Risk-Free',
      description: 'We handle all operational aspects including maintenance and insurance.'
    },
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: 'Hassle-Free',
      description: 'No need to worry about finding drivers or managing operations.'
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: 'Flexible Options',
      description: 'Choose to purchase a new vehicle through us or enroll your existing one.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner with Tranzit</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Own a car or rent out your existing one and earn passive income with our managed vehicle program.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Partner With Us?</h2>
              <p className="text-muted-foreground mb-8">
                Our partner program is designed to provide you with a hassle-free way to earn from your vehicle. 
                Whether you want to purchase a new car through our program or enroll your existing vehicle, 
                we handle all the operational aspects while you earn.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Apply to Partner</h4>
                    <p className="text-muted-foreground">Complete our partner application form with your details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Vehicle Approval</h4>
                    <p className="text-muted-foreground">We&apos;ll inspect and approve your vehicle or help you purchase a new one.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Earning</h4>
                    <p className="text-muted-foreground">We&apos;ll match your vehicle with drivers and you&apos;ll start earning.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/join-waitlist?type=partner">Become a Partner</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Our partnership team is here to help you understand how our program works and how you can maximize your earnings.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
