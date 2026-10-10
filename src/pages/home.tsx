import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Reveal } from '@/components/motion/reveal'
import { ProductGrid } from '@/components/product/product-grid'
import { ProductImage } from '@/components/product/product-image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { CATEGORY_ICON } from '@/lib/category-meta'
import { CATEGORIES, getFeaturedProducts, products } from '@/data/products'
import { whatsappEnquiryUrl } from '@/data/site'

const FEATURES = [
  { icon: Leaf, title: '100% natural', copy: 'Fresh, plant-based ingredients' },
  { icon: Sparkles, title: 'Handmade', copy: 'Made in small batches with love' },
  { icon: ShieldCheck, title: 'Chemical-free', copy: 'No harsh additives' },
  { icon: HeartHandshake, title: 'Cruelty-free', copy: 'Never tested on animals' },
]

const STATS = [
  { value: '100%', label: 'Natural ingredients' },
  { value: 'Fresh', label: 'Leaves, not powder' },
  { value: '0', label: 'Harsh chemicals' },
  { value: '♥', label: 'Handmade with love' },
]

const TESTIMONIALS = [
  {
    quote:
      'The Kuppameni soap left my skin feeling so fresh and clear — you can tell it’s made with real leaves.',
    name: 'Priya R.',
    role: 'Verified buyer',
  },
  {
    quote:
      'Gentle enough for my whole family, and my skin feels calmer and softer after just a week.',
    name: 'Karthik S.',
    role: 'Verified buyer',
  },
  {
    quote:
      'The Goatmilk & Manjishtha bar gave my skin a real glow. Beautifully made and so gentle.',
    name: 'Fathima A.',
    role: 'Verified buyer',
  },
]

function Hero() {
  const hero = getFeaturedProducts(1)[0]

  return (
    <section className="relative overflow-hidden">
      {/* decorative blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-accent/40 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal>
          <Badge variant="secondary" className="mb-5 gap-1.5">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Home-made soap · 100% natural
          </Badge>
          <h1 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Nature’s care for healthy, glowing skin.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground text-pretty">
            Home-made soaps handcrafted in small batches with fresh, natural
            ingredients — never powders or harsh chemicals. Pure nature, pure
            care, pure you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/products">
                Browse our soaps
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={whatsappEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </Button>
          </div>
          <dl className="mt-10 flex gap-8">
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl font-semibold">
                  {stat.value}
                </dd>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          {hero ? (
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-2xl shadow-primary/10">
                <div className="aspect-[4/5]">
                  <ProductImage
                    name={hero.name}
                    category={hero.category}
                    src={hero.image}
                  />
                </div>
              </div>
              {/* floating product chip */}
              <div className="absolute -bottom-5 -left-5 w-56 rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-md">
                <p className="text-xs text-muted-foreground">Bestseller</p>
                <p className="font-serif text-base font-medium">{hero.name}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary">
                  <Leaf className="size-3.5" aria-hidden="true" />
                  Fresh leaves, not powder
                </p>
              </div>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

function FeatureStrip() {
  return (
    <section
      aria-label="Our promise"
      className="border-y border-border/60 bg-muted/30"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const featured = getFeaturedProducts(4)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Made fresh, by hand
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Our soaps
          </h2>
        </div>
        <Button asChild variant="ghost">
          <Link to="/products">
            View all soaps
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
      <div className="mt-10">
        <ProductGrid products={featured} />
      </div>
    </section>
  )
}

function CategoryShowcase() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse by type
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Herbal bars made with fresh leaves, and nourishing goat-milk soaps —
            find the one for your skin.
          </p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:max-w-2xl sm:grid-cols-2">
          {CATEGORIES.map((category, i) => {
            const Icon = CATEGORY_ICON[category]
            const count = products.filter((p) => p.category === category).length
            return (
              <li key={category}>
                <Reveal delay={i * 0.05}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all outline-none hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-medium">{category}</span>
                    <span className="text-sm text-muted-foreground">
                      {count} {count === 1 ? 'product' : 'products'}
                    </span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 2).map((p, i) => (
              <div
                key={p.id}
                className={`overflow-hidden rounded-2xl border border-border/60 ${
                  i % 2 === 1 ? 'translate-y-6' : ''
                }`}
              >
                <div className="aspect-square">
                  <ProductImage
                    name={p.name}
                    category={p.category}
                    src={p.image}
                    index={i}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Our story
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Rooted in simple, honest ingredients
          </h2>
          <p className="mt-5 text-muted-foreground text-pretty">
            Aqsha Fashionz makes soap the home-made way — in small batches, with
            fresh leaves and natural ingredients you can actually name. For our
            Kuppameni soap we use fresh leaves, never powder, for maximum
            freshness and better benefits.
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            No harsh chemicals, no shortcuts — just pure, gentle care your skin
            will love. Pure nature, pure care, pure you.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-3xl font-semibold text-primary">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What our community says
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <Quote
                    className="size-7 text-primary/50"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-4 flex-1 text-pretty">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border/60 pt-4">
                    <span className="font-medium">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {t.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 size-64 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready for pure, natural care?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-primary-foreground/90 text-pretty">
            Message us on WhatsApp to order your home-made soaps — handmade in
            small batches, just for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <a
                href={whatsappEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/products">
                Browse soaps
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <FeatureStrip />
      <FeaturedProducts />
      <CategoryShowcase />
      <Story />
      <Testimonials />
      <CtaBand />
    </>
  )
}
