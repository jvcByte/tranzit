'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { ModeToggle } from '../common/mode-toggle'

const menuItems = [
    { name: 'How it works', href: '#link' },
    { name: 'Choose us', href: '#link' },
    { name: 'For partners', href: '#link' },
    { name: 'For affiliates', href: '#link' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150 bg-background', scrolled )}>
                <div className="m-auto max-w-[1660px] px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <p className='text-[45px] font-700 font-bold text-[#99da3d]'>Tranzit</p>
                            </Link>

                            <div className='flex items-center space-x-2'>
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                                <div className='lg:hidden'>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:pr-4">
                                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-foreground font-400 hover:text-[#99da3d] block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='hidden lg:block'>
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}