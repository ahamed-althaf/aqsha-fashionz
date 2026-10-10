import { ArrowUpRight, Leaf, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CATEGORIES } from '@/data/products'
import { SITE, whatsappEnquiryUrl } from '@/data/site'

const SOCIALS = [
  { label: 'Instagram', href: SITE.socials.instagram.url },
  { label: 'Facebook', href: SITE.socials.facebook.url },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="size-4" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground text-pretty">
              Home-made soap, handcrafted in small batches with fresh, natural
              ingredients. {SITE.tagline}.
            </p>
          </div>

          <nav aria-label="Soaps">
            <h2 className="text-sm font-semibold text-foreground">Soaps</h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="rounded text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-foreground">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Our story', to: '/' },
                { label: 'All soaps', to: '/products' },
                { label: 'Contact us', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="rounded text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Order & follow</h2>
            <a
              href={whatsappEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {SITE.whatsappDisplay}
            </a>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {2026} {SITE.name}. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
