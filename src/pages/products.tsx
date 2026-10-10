import { useMemo, useState } from 'react'
import { Search, SproutIcon, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { ProductGrid } from '@/components/product/product-grid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { cn } from '@/lib/utils'
import { CATEGORIES, products, type Category } from '@/data/products'

const ALL = 'All' as const

export function ProductsPage() {
  useDocumentTitle('Our soaps')

  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const rawCategory = searchParams.get('category')
  const activeCategory: Category | typeof ALL =
    rawCategory && (CATEGORIES as readonly string[]).includes(rawCategory)
      ? (rawCategory as Category)
      : ALL

  function selectCategory(category: Category | typeof ALL) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (category === ALL) next.delete('category')
        else next.set('category', category)
        return next
      },
      { replace: true },
    )
  }

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === ALL || product.category === activeCategory
      const matchesQuery =
        normalizedQuery === '' ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.tagline.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const filterOptions: (Category | typeof ALL)[] = [ALL, ...CATEGORIES]

  return (
    <>
      {/* Page header */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Our collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Our soaps
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground text-pretty">
            Every bar is home-made in small batches with fresh, natural
            ingredients — never powders or harsh chemicals. Browse below and
            order on WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col gap-5">
          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((option) => {
              const isActive = option === activeCategory
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectCategory(option)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Label htmlFor="product-search" className="sr-only">
              Search soaps
            </Label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="product-search"
              type="search"
              placeholder="Search soaps…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-9"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Live result count */}
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {results.length}{' '}
          {results.length === 1 ? 'product' : 'products'}
          {activeCategory !== ALL ? ` in ${activeCategory}` : ''}
        </p>

        {/* Results */}
        <div className="mt-6">
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <SproutIcon className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-xl font-medium">
                No products found
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try a different search term or clear the filters to see the full
                collection.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setQuery('')
                  selectCategory(ALL)
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
