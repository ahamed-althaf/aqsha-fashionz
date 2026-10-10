import { useState } from 'react'

import { CATEGORY_ICON } from '@/lib/category-meta'
import { cn } from '@/lib/utils'
import { CATEGORY_HUE, type Category } from '@/data/products'

interface ProductImageProps {
  name: string
  category: Category
  /** Optional real image URL; falls back to generated artwork on error/absence. */
  src?: string
  /** Gallery index — subtly varies the generated artwork per image. */
  index?: number
  className?: string
}

/** Prepend Vite's base path to a local asset so it works under a subpath (GitHub Pages). */
function resolveAsset(src: string): string {
  if (/^(https?:|data:)/.test(src)) return src
  return import.meta.env.BASE_URL + src.replace(/^\//, '')
}

/** Stable positive hash so generated art is deterministic per product. */
function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function ProductImage({
  name,
  category,
  src,
  index = 0,
  className,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)
  const showGenerated = !src || failed

  if (!showGenerated) {
    return (
      <img
        src={resolveAsset(src)}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('size-full object-cover', className)}
      />
    )
  }

  const Icon = CATEGORY_ICON[category]
  const hue = CATEGORY_HUE[category]
  const seed = hashString(`${name}-${index}`)
  const angle = 115 + (seed % 90)
  const hueShift = ((seed % 5) - 2) * 6
  const h = hue + hueShift + index * 4

  return (
    <div
      role="img"
      aria-label={name}
      className={cn('relative size-full overflow-hidden', className)}
      style={{
        background: `linear-gradient(${angle}deg, hsl(${h} 42% 86%), hsl(${
          h + 18
        } 38% 68%))`,
      }}
    >
      {/* soft organic light blooms */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(60% 55% at ${
            22 + (seed % 25)
          }% ${18 + (seed % 20)}%, hsl(${h} 55% 94% / 0.85), transparent 70%), radial-gradient(45% 45% at 82% 88%, hsl(${
            h + 30
          } 45% 40% / 0.35), transparent 70%)`,
        }}
      />
      {/* botanical motif */}
      <Icon
        aria-hidden="true"
        className="absolute -right-6 -bottom-6 size-40 rotate-12 text-white/25"
        strokeWidth={1.25}
      />
      <Icon
        aria-hidden="true"
        className="absolute top-5 left-5 size-9 text-white/45"
        strokeWidth={1.5}
      />
    </div>
  )
}
