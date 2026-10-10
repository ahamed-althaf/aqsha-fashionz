import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { Toaster } from '@/components/ui/sonner'

function PageFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <Loader2 className="size-6 animate-spin text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFab />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
