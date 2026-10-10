# Aqsha Fashionz

A modern, accessible, fully static **catalogue site** for Aqsha Fashionz —
home-made natural soaps — built with React 19, Vite, TypeScript, Tailwind CSS v4
and shadcn/ui. No backend required; ordering happens over WhatsApp.

## Features

- **Pages** — Home, Shop (soap listing), Product detail, Contact, and a 404.
- **WhatsApp ordering** — every soap has an "Order on WhatsApp" button that opens
  a chat with the product pre-filled; no prices or checkout.
- **Light / dark / system theme** with no flash on load, persisted to
  `localStorage`, and synced to the OS preference.
- **Accessible by default** — semantic landmarks, skip link, visible keyboard
  focus, `aria-*` on interactive widgets, labelled form fields, live regions for
  search results and toasts, and full `prefers-reduced-motion` support.
- **Soap listing** with URL-synced category filters and live search.
- **Product detail** with an image gallery, tabbed info, and an FAQ accordion.
- **Contact page** with a validated message form (react-hook-form + zod) plus
  direct WhatsApp / Instagram / Facebook links.
- **Responsive** across mobile → desktop, with a slide-out mobile menu.
- **Code-split routes** so each page loads on demand.

## Tech stack

| Area          | Choice                                              |
| ------------- | --------------------------------------------------- |
| Framework     | React 19 + TypeScript                               |
| Build tool    | Vite                                                |
| Routing       | React Router                                        |
| Styling       | Tailwind CSS v4 (OKLCH design tokens)               |
| UI components | shadcn/ui (Radix primitives)                        |
| Icons         | lucide-react                                        |
| Animation     | framer-motion (reduced-motion aware)                |
| Carousel      | embla-carousel                                      |
| Forms         | react-hook-form + zod                               |
| Toasts        | sonner                                              |

## Getting started

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server (http://localhost:5173)
pnpm build       # type-check + production build into /dist
pnpm preview     # preview the production build locally
pnpm lint        # run oxlint
```

Deploy the generated `dist/` folder to any static host (Netlify, Vercel,
GitHub Pages, Cloudflare Pages, S3, …). For history-API routing, add a SPA
fallback that rewrites unknown routes to `index.html`.

## Project structure

```
src/
  components/
    layout/      navbar, footer, root layout, scroll-to-top
    motion/      scroll-reveal wrapper
    product/     product card, grid, gallery, image
    theme/       theme provider + toggle
    ui/          shadcn/ui components
  data/          site.ts (brand + WhatsApp config) · products.ts (the catalogue)
  hooks/         useDocumentTitle
  lib/           cn util + category metadata
  pages/         home, products, product-detail, contact, not-found
  index.css      Tailwind entry + design tokens (light & dark)
public/
  products/      cropped soap photos used on the cards & detail pages
```

## Customizing

- **Brand, WhatsApp number & socials** — everything lives in `src/data/site.ts`
  (`SITE.whatsapp`, handles, tagline, etc.). The "Order on WhatsApp" links are
  built from `SITE.whatsapp`.
- **Soaps** — edit `src/data/products.ts`. Each product's `image` / `gallery`
  points at a photo in `public/products/`; drop in a new image and update the
  path. If you omit `image`, the card falls back to generated artwork.
- **Brand colours** — edit the OKLCH design tokens in `src/index.css`
  (`:root` for light, `.dark` for dark) — the deep green `--primary` and the
  `--gold` accent.
- **Contact form (email delivery)** — the message form posts to
  [FormSubmit](https://formsubmit.co) (no account needed). Put your inbox email
  in `src/data/site.ts` (`contactEmail`) or set `VITE_CONTACT_EMAIL` (see
  `.env.example`); the first message to a new address needs a one-time
  confirmation click. Until a real address is set, the form hands off to
  WhatsApp so no message is lost.
