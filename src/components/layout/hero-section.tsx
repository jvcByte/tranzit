import React from 'react'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import Image from 'next/image'
import { JoinTheWaitlistDialog } from '../forms/join-the-wait-list-dialog'

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
                    <div className="relative mx-auto max-w-9xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-7xl text-center">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-balance font-black text-5xl md:text-8xl">
                                Your Ride, Your Way!
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-6 max-w-5xl font-medium md:text-2xl text-pretty text-lg">
                                Experience safe, reliable, and affordable rides with Tranzit, the new way to move around your city. Join our wait-list and be the first to ride when we launch.
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
                                <div className="flex flex-col gap-2 items-center justify-center">

                                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 md:-top-10 w-auto h-auto animate-shake ml-28 ">
                                        <Image
                                            src="/join-waitlist-arrow.svg"
                                            alt="Join Waitlist Arrow"
                                            width={24}
                                            height={24}
                                            className="w-14 h-16 md:w-16 md:h-16 scale-x-100"
                                            priority
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 items-center md:gap-4">
                                        <JoinTheWaitlistDialog />
                                        <Image
                                            src="/trust-bar.svg"
                                            alt="Trust By"
                                            width={344}
                                            height={75}
                                            className="w-[244px] h-[45px] lg:w-[344px] lg:h-[75px] transition-all duration-300"
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Image
                                        src="/ride-sharing-illustration.png"
                                        alt="Hero"
                                        width={600}
                                        height={600}
                                        className="w-[400px] h-auto md:w-[500px] lg:w-[600px] xl:w-[800px] transition-all duration-300"
                                        priority
                                    />
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
