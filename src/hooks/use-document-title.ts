import { useEffect } from 'react'

import { SITE } from '@/data/site'

const SITE_NAME = SITE.name

/** Sets `document.title` for the current route and restores it on unmount. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME
    return () => {
      document.title = previous
    }
  }, [title])
}
