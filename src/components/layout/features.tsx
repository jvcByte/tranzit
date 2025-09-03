import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export default function IntegrationsSection() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-start">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Options</h2>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {/* First three cards - always visible */}
                        <IntegrationCard
                            title="Ride"
                            description="Go anywhere, anytime with Tranzit. Request a ride, hop in, and go!"
                            link="#ride">
                            <Image
                                src="/ride.png"
                                alt="Ride"
                                width={300}
                                height={300}
                                className=""
                            />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Reserve"
                            description="Book a car in advance and save time on the road."
                            link="#reserve">
                            <Image
                                src="/reserve.png"
                                alt="Reserve"
                                width={300}
                                height={300}
                                className=""
                            />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Rental cars"
                            description="Rent a car from Tranzit and save money while you travel."
                            link="#rental">
                            <Image
                                src="/rental-car.png"
                                alt="Rental"
                                width={300}
                                height={300}
                                className=""
                            />
                        </IntegrationCard>

                        {/* Last three cards - hidden on mobile */}
                        <div className="hidden sm:block">
                            <IntegrationCard
                                title="Intercity"
                                description="Travel between cities with Tranzit. Book a ride and go!"
                                link="#intercity">
                                <Image
                                    src="/intercity.png"
                                    alt="Intercity"
                                    width={300}
                                    height={300}
                                    className=""
                                />
                            </IntegrationCard>
                        </div>

                        <div className="hidden sm:block">
                            <IntegrationCard
                                title="Food"
                                description="Order food from your favorite restaurants and have it delivered to your doorstep."
                                link="#food">
                                <Image
                                    src="/food.png"
                                    alt="Food"
                                    width={300}
                                    height={300}
                                    className=""
                                />
                            </IntegrationCard>
                        </div>

                        <div className="hidden sm:block">
                            <IntegrationCard
                                title="Grocery"
                                description="Order grocery from your favorite stores and have it delivered to your doorstep."
                                link="#grocery">
                                <Image
                                    src="/grocery.png"
                                    alt="Grocery"
                                    width={300}
                                    height={300}
                                    className=""
                                />
                            </IntegrationCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/jvcByte' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    return (
        <Card className="p-6 h-full">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col">
                    <div className="mb-4 flex-1">
                        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                            {children}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{description}</p>
                    </div>
                    
                    <div className="mt-auto">
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="w-full justify-between">
                            <Link href={link}>
                                <span>Details</span>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}