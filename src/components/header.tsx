'use client'
import Link from 'next/link'
import Image from 'next/image'
// import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const { scrollYProgress } = useScroll()

    // Handle initial mount and scroll position
    React.useEffect(() => {
        // Check initial scroll position on mount
        const checkInitialScroll = () => {
            const scrollY = window.scrollY
            setScrolled(scrollY > 50)
            setMounted(true)
        }

        checkInitialScroll()

        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })

        return () => unsubscribe()
    }, [scrollYProgress])

    // Close menu when clicking outside or pressing escape
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuState(false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element
            if (menuState && !target.closest('[data-mobile-menu]') && !target.closest('[data-menu-toggle]')) {
                setMenuState(false)
            }
        }

        if (menuState) {
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [menuState])

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="fixed z-20 w-full pt-2">
                <motion.div
                    className={cn(
                        'mx-auto max-w-7xl rounded-3xl px-6 lg:px-12 transition-all duration-500 ease-out',
                        // Only apply background effects when scrolled AND mounted
                        mounted && scrolled && 'bg-background/80 backdrop-blur-xl shadow-lg border border-border/20'
                    )}
                    initial={false}
                    animate={{
                        y: 0,
                        scale: mounted && scrolled ? 0.98 : 1,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <motion.div
                        className={cn(
                            'relative flex flex-wrap items-center justify-between gap-6 lg:gap-0',
                            // Fixed height to prevent layout shift - using responsive classes
                            'h-16 lg:h-20',
                            mounted && scrolled && 'lg:h-16'
                        )}
                        initial={false}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2 group">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Image src="/window.svg" alt="Logo" width={32} height={32} />
                                </motion.div>
                            </Link>

                            <div className="flex items-center gap-5 pr-5 lg:hidden">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}>
                                    <ModeToggle />
                                </motion.div>
                                <button
                                    data-menu-toggle
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">

                                    {/* Menu Icon */}
                                    <motion.div
                                        animate={{
                                            rotate: menuState ? 180 : 0,
                                            scale: menuState ? 0 : 1,
                                            opacity: menuState ? 0 : 1,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 m-auto"
                                    >
                                        <Menu className="size-6" />
                                    </motion.div>

                                    {/* X Icon */}
                                    <motion.div
                                        animate={{
                                            rotate: menuState ? 0 : -180,
                                            scale: menuState ? 1 : 0,
                                            opacity: menuState ? 1 : 0,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 m-auto"
                                    >
                                        <X className="size-6" />
                                    </motion.div>
                                </button>
                            </div>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ y: -2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-300 relative group">
                                                <span className="relative z-10">{item.name}</span>
                                                <motion.div
                                                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-accent-foreground rounded-full"
                                                    initial={{ scaleX: 0 }}
                                                    whileHover={{ scaleX: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Mobile Menu Overlay */}
                        <AnimatePresence>
                            {menuState && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-25 lg:hidden"
                                    onClick={() => setMenuState(false)}
                                />
                            )}
                        </AnimatePresence>

                        {/* Mobile Nav Menu */}
                        <AnimatePresence>
                            {menuState && (
                                <motion.div
                                    data-mobile-menu
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    transition={{
                                        type: 'spring',
                                        damping: 30,
                                        stiffness: 300,
                                        duration: 0.4
                                    }}
                                    className="fixed top-0 right-0 z-30 h-full w-4/5 max-w-xs bg-background/95 backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-8 rounded-l-3xl border-l border-border/20 lg:hidden"
                                >
                                    <div className="flex justify-end mb-6">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setMenuState(false)}
                                            aria-label="Close Menu"
                                            className="p-2 rounded-full hover:bg-accent/20 transition-colors duration-200"
                                        >
                                            <X className="size-6" />
                                        </motion.button>
                                    </div>

                                    <motion.ul
                                        className="space-y-6 text-base"
                                        initial="closed"
                                        animate="open"
                                        variants={{
                                            closed: { opacity: 0 },
                                            open: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.1,
                                                    delayChildren: 0.2
                                                }
                                            }
                                        }}
                                    >
                                        {menuItems.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={{
                                                    closed: { opacity: 0, x: 20 },
                                                    open: { opacity: 1, x: 0 }
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-300 py-2 px-4 rounded-lg hover:bg-accent/10 transition-all"
                                                    onClick={() => setMenuState(false)}
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <motion.div
                                        className="mt-auto pt-4 border-t border-border/20"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.2 }}
                                    >
                                        <div className="flex flex-col space-y-3">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <Link href="/login">Login</Link>
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button asChild size="sm" className="w-full">
                                                    <Link href="/signup">Sign Up</Link>
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Desktop/Tablet Nav Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}>
                                <ModeToggle />
                                
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/login">Login</Link>
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button asChild size="sm">
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </nav>
        </header>
    )
}