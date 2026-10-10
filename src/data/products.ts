/**
 * Product catalog for Aqsha Fashionz — home-made natural soaps.
 *
 * Images are cropped from the brand's product banners and live in
 * /public/products. Ordering is handled over WhatsApp, so there are no prices.
 */

export const CATEGORIES = ['Herbal Soaps', 'Goat Milk Soaps'] as const

export type Category = (typeof CATEGORIES)[number]

/** Perceptual hue (OKLCH) used to tint generated fallback artwork per category. */
export const CATEGORY_HUE: Record<Category, number> = {
  'Herbal Soaps': 150,
  'Goat Milk Soaps': 20,
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  category: Category
  badge?: 'Bestseller' | 'New' | 'Limited'
  featured?: boolean
  scent: string
  weight: string
  description: string
  benefits: string[]
  ingredients: string[]
  howToUse: string
  /** Real product image URL (served from /public). */
  image?: string
  gallery?: string[]
}

export const products: Product[] = [
  {
    id: 'p-01',
    slug: 'kuppameni-soap',
    name: 'Kuppameni Soap',
    tagline: 'Nature’s care for healthy, clear & glowing skin',
    category: 'Herbal Soaps',
    badge: 'Bestseller',
    featured: true,
    scent: 'Fresh herbal, green leaf',
    weight: 'Home-made bar',
    description:
      'Our signature home-made soap, made with fresh Kuppameni (Indian nettle) leaves — never powder — for maximum freshness and better benefits. A gentle, cooling bar that cleanses and purifies while leaving skin calm and refreshed.',
    benefits: [
      'Made with fresh Kuppameni leaves, not powder',
      'Cleanses & purifies for clear, healthy skin',
      'Soothes & refreshes with a cooling, calming feel',
      'Gentle & safe for daily use on all skin types',
    ],
    ingredients: [
      'Fresh Kuppameni (Acalypha indica) leaves',
      'Natural plant oils',
      'No synthetic fragrance or colour',
    ],
    howToUse:
      'Work into a lather with water, massage gently over damp skin, then rinse. Suitable for daily use on face and body. Keep on a draining dish between uses to help the bar last.',
    image: '/products/kuppameni-soap.jpg',
    gallery: [
      '/products/kuppameni-soap.jpg',
      '/products/kuppameni-leaves.jpg',
    ],
  },
  {
    id: 'p-02',
    slug: 'goatmilk-manjishtha-soap',
    name: 'Goatmilk & Manjishtha Soap',
    tagline: 'Radiant skin · natural glow · pure care',
    category: 'Goat Milk Soaps',
    badge: 'New',
    featured: true,
    scent: 'Warm, mild natural',
    weight: '100g bar',
    description:
      'A nourishing home-made soap enriched with goat milk, manjishtha extract and natural oils. Goat milk is rich in vitamins while manjishtha is prized for brightening — together they cleanse gently and leave skin soft, radiant and even-toned.',
    benefits: [
      'Made with natural ingredients, handmade with love',
      'Goodness of goat milk, rich in vitamins',
      'Brightens skin & improves complexion',
      'Deeply nourishes & moisturises',
      'Removes dirt & impurities gently',
      'Suitable for all skin types',
    ],
    ingredients: [
      'Goat milk',
      'Manjishtha (Indian madder) extract',
      'Natural oils',
      'No harsh chemicals',
    ],
    howToUse:
      'Lather over damp skin, massage gently in circular motions, then rinse with lukewarm water. Use daily for a brighter, nourished complexion.',
    image: '/products/goatmilk-manjishtha-soap.jpg',
    gallery: [
      '/products/goatmilk-manjishtha-soap.jpg',
      '/products/goatmilk-box.jpg',
      '/products/goatmilk-ingredients.jpg',
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter((product) => product.featured)
  return (featured.length ? featured : products).slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products.filter((p) => p.id !== product.id).slice(0, limit)
}
