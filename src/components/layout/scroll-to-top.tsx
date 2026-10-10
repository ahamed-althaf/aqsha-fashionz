import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position to the top on route change (ignores in-page anchors). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
