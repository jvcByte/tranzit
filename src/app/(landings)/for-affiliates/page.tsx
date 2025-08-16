import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DollarSign, Users, TrendingUp, Zap } from 'lucide-react'

export default function ForAffiliates() {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: 'Earn Commissions',
      description: 'Get paid for every successful referral you bring to Tranzit.'
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Multiple Streams',
      description: 'Earn from drivers, riders, and partners you refer.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: 'Unlimited Potential',
      description: 'No cap on how much you can earn. The more you refer, the more you make.'
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: 'Quick Payouts',
      description: 'Get paid weekly with our reliable payment system.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Section className="py-16 md:py-24 bg-muted/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tranzit Affiliate Program</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn your network into income by referring drivers, riders, and vehicle owners to Tranzit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-muted-foreground mb-8">
                Our affiliate program makes it easy to earn money by promoting Tranzit. 
                Share your unique referral link and earn commissions for every new user who signs up through you.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Sign Up</h3>
                    <p className="text-muted-foreground">Join our affiliate program in minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Share Your Link</h3>
                    <p className="text-muted-foreground">Use your unique referral link to promote Tranzit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Earn Commissions</h3>
                    <p className="text-muted-foreground">Get paid for every successful referral.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6">Affiliate Benefits</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/join-waitlist?type=affiliate">Join the Affiliate Program</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto mt-12 space-y-6 text-left">
              <div>
                <h3 className="font-semibold text-lg">How much can I earn as an affiliate?</h3>
                <p className="text-muted-foreground mt-2">
                  Our commission rates are competitive and vary based on the type of referral. Contact our team for specific details about our commission structure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">When do I get paid?</h3>
                <p className="text-muted-foreground mt-2">
                  We process affiliate payments weekly, with a minimum payout threshold of ₦10,000.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">How do I track my referrals?</h3>
                <p className="text-muted-foreground mt-2">
                  Once you join our affiliate program, you&apos;ll get access to a dashboard where you can track your referrals, earnings, and performance in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
