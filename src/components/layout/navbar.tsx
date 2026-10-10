import { useState } from 'react'
import { Leaf, Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
]

function BrandMark() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Leaf className="size-5" aria-hidden="true" />
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight whitespace-nowrap">
        Aqsha Fashionz
      </span>
    </Link>
  )
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-md px-1 py-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
    isActive
      ? 'text-foreground'
      : 'text-muted-foreground hover:text-foreground',
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="relative">
                <NavLink to={link.to} end={link.end} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute -bottom-[21px] left-0 h-0.5 w-full rounded-full bg-primary transition-opacity',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/products">Browse products</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl">
                  Aqsha Fashionz
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                      <SheetClose asChild>
                        <NavLink
                          to={link.to}
                          end={link.end}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                              isActive
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                            )
                          }
                        >
                          {link.label}
                        </NavLink>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
