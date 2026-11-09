import { useRef } from 'react'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { NextPage } from '../components/NextPage'
import { CtaLink } from '../components/CtaLink'
import { contact, links } from '../content/site'
import { useReveal } from '../lib/useReveal'

export default function Contact() {
  const body = useRef<HTMLElement>(null)
  useReveal(body)

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Linden Row Real Estate Partners at our Milwaukee and Wauwatosa offices, by email or by phone."
      />
      <PageHero index="01" eyebrow="Contact" lines={['Two offices.', 'One neighbourhood view.']} accent={1} image="brick-homes">
        <div className="on-dark flex flex-wrap gap-3">
          <CtaLink href={links.aboutYou}>Start a Conversation</CtaLink>
          <CtaLink href={links.investorList} variant="ghost">
            Join the Investor List
          </CtaLink>
        </div>
      </PageHero>

      <section ref={body} aria-labelledby="ct-title" className="bg-ivory text-ink section-y">
        <div className="container-x">
          <h2 id="ct-title" className="sr-only">
            Contact details
          </h2>
          <div className="grid gap-px bg-ink/10 md:grid-cols-2">
            {contact.offices.map((o) => (
              <a
                key={o.name}
                href={o.map}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group flex min-h-[18rem] flex-col justify-between bg-ivory p-8 transition-colors duration-700 hover:bg-paper md:p-12"
              >
                <span className="flex items-center justify-between">
                  <span className="label text-[0.62rem] text-muted">{o.name}</span>
                  <MapPin className="size-5 text-cobalt" strokeWidth={1.5} aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-h2">{o.street}</span>
                  <span className="mt-2 block font-display text-h3 text-muted">{o.city}</span>
                  <span className="label mt-8 inline-flex items-center gap-2 text-[0.64rem] text-cobalt">
                    View on map
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <div className="mt-px grid gap-px bg-ink/10 md:grid-cols-2">
            <a href={`mailto:${contact.email}`} data-reveal className="group flex items-center justify-between gap-6 bg-ivory p-8 md:p-12">
              <span>
                <span className="label block text-[0.62rem] text-muted">Email</span>
                <span className="u-link mt-3 font-display text-h3 break-all">{contact.email}</span>
              </span>
              <Mail className="size-6 shrink-0 text-cobalt" strokeWidth={1.4} aria-hidden />
            </a>
            <a href={contact.phoneHref} data-reveal className="group flex items-center justify-between gap-6 bg-ivory p-8 md:p-12">
              <span>
                <span className="label block text-[0.62rem] text-muted">Phone</span>
                <span className="u-link mt-3 font-display text-h3">{contact.phoneDisplay}</span>
              </span>
              <Phone className="size-6 shrink-0 text-cobalt" strokeWidth={1.4} aria-hidden />
            </a>
          </div>

          <p data-reveal className="mt-14 max-w-2xl text-muted">
            New investors are welcome to call, write or visit either office. Existing investors and borrowers can sign in
            through Client Login at the top of every page.
          </p>
        </div>
      </section>

      <NextPage to="/" label="Back to the beginning" image="hero-facade" />
    </>
  )
}
