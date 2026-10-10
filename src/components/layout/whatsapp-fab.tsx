import { MessageCircle } from 'lucide-react'

import { whatsappEnquiryUrl } from '@/data/site'

/** Floating, always-visible WhatsApp order button (bottom-right on every page). */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappEnquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6 sm:bottom-6"
    >
      <span className="max-w-0 overflow-hidden pl-0 text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:pl-5 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pl-5 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
      <span className="flex size-14 items-center justify-center">
        <MessageCircle className="size-7" aria-hidden="true" />
      </span>
    </a>
  )
}
