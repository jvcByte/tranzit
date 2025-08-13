import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function BecomeAffiliate() {
    return (
        <section className="pt-0 pb-12 md:pb-52">
            <div className="mx-auto max-w-[1660px] px-6">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
                    <div className="col-span-6 flex items-center justify-center w-full h-full">
                        <div className="relative w-full h-0 pb-[100%]">
                            <Image
                                src="/become-affiliate-image.png"
                                alt="Become Affiliate"
                                fill
                                className="border-2 rounded-md object-contain transition-all duration-300"
                                priority
                            />
                        </div>
                    </div>
                    <div className="space-y-6 col-span-6">
                        <div>
                            <p className='flex items-start justify-start rounded-full border-2 border-[#f6eec7] p-2 px-4 max-w-fit text-sm font-medium bg-[#fff9e6] text-[#655010]'>Earn as an affiliate</p>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-medium md:font-bold">Earn for every partner you bring</h2>
                        <p className="text-lg md:text-2xl font-medium">
                            Share Tranzit with potential drivers and car owners. Every successful signup earns you a commission, no driving required.
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="gap-1 bg-[#333333] text-white p-4 md:p-6 dark:bg-white dark:text-black md:text-lg">
                            <Link href="#">
                                <span>Join as an Affiliate</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}