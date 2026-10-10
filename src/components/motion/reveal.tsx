import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  /** Delay before the reveal animation begins, in seconds. */
  delay?: number
  /** Vertical offset the element rises from. */
  y?: number
}

/**
 * Fade + rise reveal triggered when the element scrolls into view.
 * Fully disabled for users who prefer reduced motion.
 */
export function Reveal({ children, delay = 0, y = 16, ...props }: RevealProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
