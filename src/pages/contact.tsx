import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign, Camera, MessageCircle, Send } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useDocumentTitle } from '@/hooks/use-document-title'
import {
  getContactEmail,
  SITE,
  whatsappEnquiryUrl,
  whatsappUrl,
} from '@/data/site'

const SUBJECTS = [
  'General enquiry',
  'Product question',
  'Bulk / wholesale order',
  'Something else',
] as const

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  subject: z.string().min(1, 'Please choose a subject'),
  message: z
    .string()
    .trim()
    .min(10, 'Please share at least a sentence (10+ characters)')
    .max(1000, 'Message must be under 1000 characters'),
})

type ContactValues = z.infer<typeof contactSchema>

const CONTACT_DETAILS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: SITE.whatsappDisplay,
    href: whatsappEnquiryUrl(),
  },
  {
    icon: Camera,
    label: 'Instagram',
    value: SITE.socials.instagram.handle,
    href: SITE.socials.instagram.url,
  },
  {
    icon: AtSign,
    label: 'Facebook',
    value: SITE.socials.facebook.handle,
    href: SITE.socials.facebook.url,
  },
]

export function ContactPage() {
  useDocumentTitle('Contact us')

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  async function onSubmit(values: ContactValues) {
    const inbox = getContactEmail()

    // No inbox configured yet → hand off to WhatsApp so nothing is lost.
    if (!inbox) {
      const text = `Hi Aqsha Fashionz!\n\nName: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`
      window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
      toast('Opening WhatsApp…', {
        description: 'Send the message there to reach us.',
      })
      form.reset()
      return
    }

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            topic: values.subject,
            message: values.message,
            _subject: `${SITE.name} website — ${values.subject}`,
            _template: 'table',
          }),
        },
      )
      const data = await res.json()
      if (!res.ok || String(data.success) !== 'true') {
        throw new Error(data?.message ?? 'Submission failed')
      }
      toast.success('Message sent — thank you!', {
        description: `We’ll reply to ${values.email} soon.`,
      })
      form.reset()
    } catch {
      toast.error('Sorry, your message didn’t send', {
        description: 'Please try again, or reach us on WhatsApp.',
      })
    }
  }

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            We’d love to hear from you
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground text-pretty">
            The quickest way to order or ask a question is WhatsApp — or send us
            a message below and we’ll get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Contact details */}
          <aside>
            <h2 className="font-serif text-2xl font-medium">Order on WhatsApp</h2>
            <p className="mt-2 text-muted-foreground text-pretty">
              We take all orders and enquiries over WhatsApp — tap below to start
              a chat.
            </p>
            <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
              <a
                href={whatsappEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Message us on WhatsApp
              </a>
            </Button>

            <h3 className="mt-10 text-sm font-semibold text-foreground">
              Find us here
            </h3>
            <ul className="mt-4 space-y-3">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.label}>
                  <a
                    href={detail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl p-2 transition-colors outline-none hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <detail.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted-foreground">
                        {detail.label}
                      </span>
                      <span className="font-medium group-hover:text-primary">
                        {detail.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            placeholder="Jane Appleseed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="jane@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Tell us how we can help…"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    'Sending…'
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}
