import { ArrowLeft, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/use-document-title'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Leaf className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 font-serif text-5xl font-semibold text-primary">404</p>
      <h1 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
        This page has wandered off
      </h1>
      <p className="mt-3 text-muted-foreground text-pretty">
        The page you’re looking for doesn’t exist or may have been moved. Let’s
        get you back to something lovely.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    </div>
  )
}
