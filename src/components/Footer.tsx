import { useRef } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { nav, links, contact, clientAccess, disclosure, brand } from '../content/site'
import { gsap, useGSAP, mq } from '../lib/gsap'
import { TLink } from '../lib/transition'
import { useMotion } from '../lib/motion'
import { Logo } from './Logo'

export function Footer() {
  const root = useRef<HTMLElement>(null)
  const motion = useMotion()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        gsap.from('[data-foot-col]', {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%' },
        })
        gsap.from('[data-foot-rule]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 90%' },
        })
      })
    },
    { scope: root },
  )

  const year = new Date().getFullYear()

  return (
    <footer ref={root} className="on-dark grain relative overflow-hidden bg-ink text-ivory" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Linden Row site footer
      </h2>
      <div className="container-x relative z-[2] pb-10 pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4" data-foot-col>
            <Logo className="w-48 md:w-56" />
            <p className="mt-8 max-w-sm text-mist">
              Private real estate funds that buy, improve and hold apartment homes, run by our own property teams.
            </p>
            <a
              href={links.investorList}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-10"
            >
              Join the Investor List
              <ArrowUpRight className="btn-icon size-4" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <div data-foot-col>
              <p className="label mb-6 text-[0.62rem] text-mist">Explore</p>
              <ul className="space-y-3">
                <li>
                  <TLink to="/" className="u-link">
                    Home
                  </TLink>
                </li>
                {nav.map((n) => (
                  <li key={n.to}>
                    <TLink to={n.to} className="u-link">
                      {n.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div data-foot-col>
              <p className="label mb-6 text-[0.62rem] text-mist">Client Access</p>
              <ul className="space-y-3">
                {clientAccess.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="u-link">
                      {c.cta}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={links.aboutYou} target="_blank" rel="noopener noreferrer" className="u-link">
                    Start a Conversation
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
            <div data-foot-col className="col-span-2 sm:col-span-1">
              <p className="label mb-6 text-[0.62rem] text-mist">Offices</p>
              <ul className="space-y-6">
                {contact.offices.map((o) => (
                  <li key={o.name}>
                    <a href={o.map} target="_blank" rel="noopener noreferrer" className="group block">
                      <span className="block text-ivory">{o.name}</span>
                      <span className="block text-sm text-mist transition-colors group-hover:text-ivory">
                        {o.street}
                        <br />
                        {o.city}
                      </span>
                      <span className="sr-only"> (view on map, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div data-foot-col className="col-span-2 sm:col-span-1">
              <p className="label mb-6 text-[0.62rem] text-mist">Contact</p>
              <a href={`mailto:${contact.email}`} className="u-link [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
                {contact.email}
              </a>
              <br />
              <a href={contact.phoneHref} className="u-link mt-3">
                {contact.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>

        <div data-foot-rule aria-hidden className="mt-20 h-px bg-ivory/15" />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p className="text-[0.78rem] leading-relaxed text-mist lg:col-span-8">
            <span className="label mr-2 text-[0.6rem] text-ivory/80">Important information.</span>
            {disclosure}
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => motion.scrollTo(0)}
              className="label inline-flex min-h-11 items-center gap-3 text-[0.62rem] text-ivory/80 transition-colors hover:text-ivory"
            >
              Back to top
              <ArrowUp className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-ivory/10 pt-8 text-[0.78rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {brand.legal}. All rights reserved.</p>
          <p>Securities offered only through offering documents.</p>
        </div>
      </div>
    </footer>
  )
}
