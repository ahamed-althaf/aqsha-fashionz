import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RootLayout } from '@/components/layout/root-layout'

// Route-level code splitting keeps the initial bundle small; each page loads
// on demand behind the layout's Suspense boundary.
const HomePage = lazy(() =>
  import('@/pages/home').then((m) => ({ default: m.HomePage })),
)
const ProductsPage = lazy(() =>
  import('@/pages/products').then((m) => ({ default: m.ProductsPage })),
)
const ProductDetailPage = lazy(() =>
  import('@/pages/product-detail').then((m) => ({
    default: m.ProductDetailPage,
  })),
)
const ContactPage = lazy(() =>
  import('@/pages/contact').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
)

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
