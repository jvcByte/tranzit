'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ 
          x: '0%',
          opacity: 1,
          transition: {
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96]
          }
        }}
        exit={{ 
          x: '-30%',
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: [0.43, 0.13, 0.23, 0.96]
          }
        }}
        style={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
