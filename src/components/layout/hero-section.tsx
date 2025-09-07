import React from 'react'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Dot, LocateFixed, TentTree } from 'lucide-react'
import { IconSquareFilled } from '@tabler/icons-react'
import DropdownMenuWithIcons from './drop-down-menu-with-icon'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const;

export default function HeroSection() {
    return (
        <>
            <main className="relative overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
                <div className="absolute inset-0 -z-10">
                    <div className="relative w-full h-full dark:brightness-0 dark:invert dark:opacity-7">
                        <Image
                            src="/hero-section-bg.svg"
                            alt=""
                            fill
                            className="scale-230 md:scale-90 md:object-contain"
                            priority
                        />
                    </div>
                </div>
                <section className="relative">
                    <div className="flex flex-col gap-48 md:flex-row items-center justify-center relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-7xl">
                            <div className='mb-9 mt-[-55] md:hidden'>
                                <DropdownMenuWithIcons />
                            </div>
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className=" md:leading-[4rem] font-[800] text-4xl md:text-[52px]">
                                Request a ride for now or later
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-4 max-w-5xl font-medium md:text-2xl text-pretty text-md">
                                Add your trip details, hop in, and go.
                            </TextEffect>
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-6 md:mt-12"
                            >
                                <div className="flex flex-col gap-4 relative">
                                    {/* Connecting line */}
                                    <div className="absolute left-6 top-8.5 h-12 w-0.25 bg-gray-400 z-10"></div>

                                    {/* Destination input */}
                                    <div className="relative flex items-center">
                                        <div className="absolute left-0 z-10">
                                            <Dot className="h-12 w-12 text-gray-400" strokeWidth={3} />
                                        </div>
                                        <Input
                                            className="py-6 pl-12 pr-4 bg-[#f3f3f3] relative z-0"
                                            placeholder="Enter your destination"
                                        />
                                        <div className="absolute right-5 z-10">
                                            <Link href="#destination" >
                                                <TentTree className="h-6 w-6" strokeWidth={1} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Pickup input */}
                                    <div className="relative flex items-center">
                                        <div className="absolute left-4 z-10">
                                            <IconSquareFilled className="h-3 w-4.5 text-gray-400" strokeWidth={3} />
                                        </div>
                                        <Input
                                            className="py-6 pl-12 pr-4 bg-[#f3f3f3] relative z-0"
                                            placeholder="Enter your pickup location"
                                        />
                                        <div className="absolute right-5 z-10">
                                            <Link href="#location" >
                                                <LocateFixed className="h-6 w-6" strokeWidth={1} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-6 flex-col items-start justify-start gap-2 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-8 py-5.5">
                                        <Link href="#link">
                                            <span className="text-nowrap text-[1.2rem]">See Prices</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="secondary"
                                        className="px-8 py-5.5 hidden md:inline-flex">
                                        <Link href="#link">
                                            <span className="text-nowrap text-[1.2rem]">Schedule for later</span>
                                        </Link>
                                    </Button>
                                </div>
                            </AnimatedGroup>
                        </div>
                        <div className="flex hidden md:block items-center justify-center">
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                            >
                                <Image
                                    src="/hero-section-image.png"
                                    alt="Hero"
                                    width={600}
                                    height={600}
                                    className="rounded-md w-[600px] h-auto md:w-[700px] lg:w-[800px] xl:w-[900px] transition-all duration-300"
                                    priority
                                />
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
