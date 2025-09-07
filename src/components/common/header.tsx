'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '../ui/button'
// import { Button } from '../ui/button'

const menuItems = [
    { name: 'Ride', href: '/how-it-works' },
    { name: 'Drive', href: '/choose-us' },
    { name: 'Business', href: '/for-partners' },
    { name: 'Affiliates', href: '/for-affiliates' },
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
                className={cn('fixed z-20 w-full border-b transition-colors duration-150 bg-background', scrolled)}>
                <div className="m-auto max-w-[1450px] px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6 lg:gap-0 md:py-1 py-3">
                        <div className="flex w-full items-center justify-between lg:w-auto gap-5">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <p className='sm:text-2xl md:text-[40px] text-xl font-700 font-bold text-[#99da3d]'>Tranzit</p>
                            </Link>
                            <div className='flex items-center gap-2'>
                                <div className="flex w-full flex-row gap-2 lg:hidden">
                                    <Button
                                        asChild
                                        // variant="outline"
                                        size="sm"
                                        className="border-0 bg-transparent text-"
                                    >
                                        <Link href="/login">
                                            <span>Login</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                    >
                                        <Link href="/signup">
                                            <span>Sign Up</span>
                                        </Link>
                                    </Button>
                                </div>
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="hidden lg:block">
                                <ul className="text-base lg:flex lg:gap-2 lg:text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-lg font-medium hover:bg-primary/20 hover:rounded px-3 block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
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
                            <div className="flex w-full flex-col space-y-3 hidden md:inline-flex sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="/signup">
                                        <span className='text-black'>Sign Up</span>
                                    </Link>
                                </Button>
                            </div>
                            <div className='text-black bg-primary rounded-md p-0 flex items-center justify-center'>
                                <ThemeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}