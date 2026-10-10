import { Droplets, Leaf, type LucideIcon } from 'lucide-react'

import type { Category } from '@/data/products'

/** Icon paired with each product category, reused across cards, filters and art. */
export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  'Herbal Soaps': Leaf,
  'Goat Milk Soaps': Droplets,
}
