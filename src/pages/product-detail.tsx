import {
  ArrowLeft,
  Check,
  ChevronRight,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Reveal } from '@/components/motion/reveal'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductGrid } from '@/components/product/product-grid'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { SITE, whatsappOrderUrl } from '@/data/site'

const FAQ = [
  {
    q: 'Is this suitable for sensitive skin?',
    a: 'Yes. Our soaps are made with natural ingredients and no harsh chemicals. For very reactive skin we recommend patch-testing first.',
  },
  {
    q: 'How do I order?',
    a: `Tap “Order on WhatsApp” and send us a message — it opens a chat with your soap already filled in. You can also message us directly at ${SITE.whatsappDisplay}.`,
  },
  {
    q: 'How is it made?',
    a: 'Every bar is home-made in small batches with fresh, natural ingredients — for the Kuppameni soap we use fresh leaves, not powder, for maximum freshness and better benefits.',
  },
]

const PRODUCT_HIGHLIGHTS = [
  { icon: Leaf, label: '100% natural ingredients' },
  { icon: Sparkles, label: 'Handmade in small batches' },
  { icon: ShieldCheck, label: 'No harsh chemicals' },
]

function NotFound() {
  useDocumentTitle('Product not found')
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn’t find the product you were looking for. It may have sold out
        or moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/products">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to all products
        </Link>
      </Button>
    </div>
  )
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  // Hook must run unconditionally; title falls back when product is missing.
  useDocumentTitle(product?.name)

  if (!product) return <NotFound />

  const related = getRelatedProducts(product)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              to="/"
              className="rounded transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Home
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <li>
            <Link
              to="/products"
              className="rounded transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Soaps
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <li>
            <span aria-current="page" className="text-foreground">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <ProductGallery
          name={product.name}
          category={product.category}
          images={product.gallery}
        />

        {/* Purchase panel */}
        <div>
          <div className="flex items-center gap-3">
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="rounded text-sm font-medium tracking-wide text-primary uppercase transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {product.category}
            </Link>
            {product.badge ? (
              <Badge variant="secondary">{product.badge}</Badge>
            ) : null}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {product.tagline}
          </p>

          <p className="mt-6 text-muted-foreground text-pretty">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-7" />

          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                Scent
              </dt>
              <dd className="mt-1 font-medium">{product.scent}</dd>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                Size
              </dt>
              <dd className="mt-1 font-medium">{product.weight}</dd>
            </div>
          </dl>

          {/* Ordering happens over WhatsApp */}
          <div className="mt-7">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={whatsappOrderUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Opens a WhatsApp chat with your soap filled in. Prefer to ask
              first?{' '}
              <Link
                to="/contact"
                className="rounded font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                Send us a message
              </Link>
              .
            </p>
          </div>

          <ul className="mt-6 grid gap-2 border-t border-border/60 pt-6 sm:grid-cols-3">
            {PRODUCT_HIGHLIGHTS.map((perk) => (
              <li
                key={perk.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <perk.icon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {perk.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Details tabs + FAQ */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="sr-only">
            Product details
          </h2>
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="how-to-use">How to use</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="mt-5 text-muted-foreground text-pretty"
            >
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-5">
              <ul className="space-y-2">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-start gap-2.5 text-muted-foreground"
                  >
                    <Leaf
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="how-to-use"
              className="mt-5 text-muted-foreground text-pretty"
            >
              <p>{product.howToUse}</p>
            </TabsContent>
          </Tabs>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-serif text-xl font-medium">
            Good to know
          </h2>
          <Accordion type="single" collapsible className="mt-3">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-20">
          <Reveal>
            <h2
              id="related-heading"
              className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              You might also like
            </h2>
          </Reveal>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  )
}
