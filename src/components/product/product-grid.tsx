import { motion, useReducedMotion } from 'framer-motion'

import { ProductCard } from '@/components/product/product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'

interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  const prefersReduced = useReducedMotion()

  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {products.map((product, i) => (
        <motion.li
          key={product.id}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: prefersReduced ? 0 : Math.min(i * 0.05, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductCard product={product} />
        </motion.li>
      ))}
    </ul>
  )
}
