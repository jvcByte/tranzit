import { Card } from '@/components/ui/card'
import { CarFront, Handshake, Users } from 'lucide-react'
import * as React from 'react'

export default function IntegrationsSection() {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-[1660px] px-6">
                    <div className="text-start">
                        <h2 className="text-balance text-3xl font-extrabold md:text-6xl">How it works</h2>
                    </div>

                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <IntegrationCard
                            title="Ride better"
                            description="Book solo or shared rides at competitive rates"
                            cardClassName="border-2 rounded-md bg-[#fff9e6] [box-shadow:-11px_12px_2px_2px_#ffd873]"
                            iconColor="bg-[#ffd873] border-[#ffd873]">
                            <CarFront />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Earn more"
                            description="Partner with and grow your income"
                            cardClassName="border-2 mt-4 md:mt-0 rounded-md bg-[#f4faec] [box-shadow:-11px_12px_2px_2px_#c3e893]"
                            iconColor="bg-[#c3e893] border-[#c3e893]">
                            <Handshake />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Share and earn"
                            description="Refer partners and earn commissions as an affiliate"
                            cardClassName="bg-[#fff9e6] mt-4 md:mt-0 [box-shadow:-11px_12px_0_0_#ffd873]"
                            iconColor="bg-[#ffd873] border-[#ffd873]">
                            <Users />
                        </IntegrationCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ 
    title, 
    description, 
    children, 
    cardClassName = '',
    iconColor = ''
}: { 
    title: string; 
    description: string; 
    children: React.ReactNode;
    cardClassName?: string;
    iconColor?: string;
}) => {
    return (
        <Card className={`p-6 mx-2 ${cardClassName}`}>
            <div className="relative">
                <div className={`flex items-center justify-center size-10 rounded-full border-2 p-2 ${iconColor}`}>
                    <div className="*:size-7 text-white">{children}</div>
                </div>

                <div className="space-y-2 py-6">
                    <h3 className="text-3xl font-bold text-gray-800">{title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-xl">{description}</p>
                </div>
            </div>
        </Card>
    )
}