import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ProductImage } from '@/components/product/product-image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { type Product } from '@/data/products'

const BADGE_VARIANT = {
  Bestseller: 'default',
  New: 'secondary',
  Limited: 'outline',
} as const

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <Link
        to={`/products/${product.slug}`}
        className="flex h-full flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage
            name={product.name}
            category={product.category}
            src={product.image}
            className="transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.badge ? (
            <Badge
              variant={BADGE_VARIANT[product.badge]}
              className="absolute top-3 left-3 shadow-sm backdrop-blur-sm"
            >
              {product.badge}
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {product.category}
          </p>
          <h3 className="font-serif text-lg leading-tight font-medium text-card-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {product.tagline}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="text-sm text-muted-foreground">
              {product.weight}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              View
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
