/** Central brand + contact configuration for Aqsha Fashionz. */
export const SITE = {
  name: 'Aqsha Fashionz',
  shortName: 'Aqsha',
  tagline: 'Pure Nature · Pure Care · Pure You',
  blurb: 'Home-made soap · Nature’s care for healthy, clear & glowing skin',
  description:
    'Aqsha Fashionz makes 100% natural home-made soaps — including Kuppameni and Goatmilk & Manjishtha — handcrafted in small batches with fresh leaves and pure ingredients.',
  /** WhatsApp number in E.164 (no plus), used for wa.me links. */
  whatsapp: '916380773705',
  whatsappDisplay: '+91 63807 73705',
  socials: {
    instagram: {
      handle: '@aqshafashionz',
      url: 'https://instagram.com/aqshafashionz',
    },
    facebook: {
      handle: 'AQSHAfashionZ',
      url: 'https://facebook.com/AQSHAfashionZ',
    },
  },
  /**
   * Email that receives contact-form messages, delivered via FormSubmit
   * (https://formsubmit.co) — no account or key needed. Replace this dummy
   * placeholder with your real address (or set VITE_CONTACT_EMAIL). The first
   * message to a new address needs a one-time confirmation click. Until a real
   * address is set, the form hands off to WhatsApp.
   */
  contactEmail: 'your-email@example.com',
} as const

/** Resolve the contact inbox email from env or config; null while still a placeholder. */
export function getContactEmail(): string | null {
  const envEmail = (import.meta.env as Record<string, string | undefined>)
    .VITE_CONTACT_EMAIL
  const email = (envEmail || SITE.contactEmail).trim()
  return email && email !== 'your-email@example.com' ? email : null
}

/** Build a wa.me link with a pre-filled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Pre-filled WhatsApp order message for a specific product. */
export function whatsappOrderUrl(productName: string): string {
  return whatsappUrl(
    `Hi Aqsha Fashionz! I'd like to order the ${productName}. Is it available?`,
  )
}

/** Pre-filled WhatsApp message for a general enquiry. */
export function whatsappEnquiryUrl(): string {
  return whatsappUrl('Hi Aqsha Fashionz! I have a question about your soaps.')
}
