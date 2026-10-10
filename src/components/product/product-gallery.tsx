import { useEffect, useState } from 'react'

import { ProductImage } from '@/components/product/product-image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import type { Category } from '@/data/products'

interface ProductGalleryProps {
  name: string
  category: Category
  images?: string[]
}

export function ProductGallery({ name, category, images }: ProductGalleryProps) {
  const count = images?.length ?? 4
  const slides = Array.from({ length: count }, (_, i) => i)
  const hasMultiple = count > 1

  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        setApi={setApi}
        className="overflow-hidden rounded-3xl border border-border/60"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((i) => (
            <CarouselItem key={i}>
              <div className="aspect-square">
                <ProductImage
                  name={name}
                  category={category}
                  src={images?.[i]}
                  index={i}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultiple ? (
          <>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </>
        ) : null}
      </Carousel>

      {/* Thumbnails */}
      {hasMultiple ? (
        <div
          role="group"
          aria-label="Product image thumbnails"
          className="grid grid-cols-4 gap-3"
        >
        {slides.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`View image ${i + 1} of ${count}`}
            aria-current={selected === i}
            className={cn(
              'aspect-square overflow-hidden rounded-xl border-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              selected === i
                ? 'border-primary'
                : 'border-transparent opacity-70 hover:opacity-100',
            )}
          >
            <ProductImage
              name={name}
              category={category}
              src={images?.[i]}
              index={i}
            />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
