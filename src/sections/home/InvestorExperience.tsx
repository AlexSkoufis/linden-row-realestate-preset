import { useRef } from 'react'
import { Briefcase, TrendingUp, Landmark, FileText, Files, type LucideIcon } from 'lucide-react'
import { portal, links } from '../../content/site'
import { gsap, useGSAP, mq, splitLines } from '../../lib/gsap'
import { Eyebrow } from '../../components/Eyebrow'
import { CtaLink } from '../../components/CtaLink'

const ICONS: LucideIcon[] = [Briefcase, TrendingUp, Landmark, FileText, Files]

/**
 * 09 Investor experience. Rather than mocking up a dashboard, the portal's
 * capabilities are expressed as a fan of abstract document plates that opens
 * as the visitor scrolls.
 */
export function InvestorExperience({ index = '09' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: mq.motion, desktop: mq.desktop }, (ctx) => {
        const { desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        const title = root.current?.querySelector('[data-ie-title]')
        if (title)
          splitLines(title, (lines) =>
            gsap.from(lines, {
              yPercent: 110,
              stagger: 0.1,
              duration: 1.3,
              ease: 'expo.out',
              scrollTrigger: { trigger: title, start: 'top 82%' },
            }),
          )

        const cards = gsap.utils.toArray<HTMLElement>('[data-ie-card]')
        const spread = desktop ? 0.8 : 0.5
        const mid = (cards.length - 1) / 2
        gsap
          .timeline({
            scrollTrigger: { trigger: '[data-ie-fan]', start: 'top 85%', end: 'center 45%', scrub: 0.8 },
          })
          .fromTo(
            cards,
            { rotate: 0, xPercent: 0, yPercent: 12, opacity: 0.4 },
            {
              rotate: (i) => (i - mid) * 11 * spread,
              xPercent: (i) => (i - mid) * 46 * spread,
              yPercent: (i) => Math.abs(i - mid) * 8 * spread,
              opacity: 1,
              ease: 'power2.out',
              stagger: 0.04,
            },
          )

        gsap.from('[data-ie-feature]', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-ie-features]', start: 'top 82%' },
        })
      })

      // Hover: lift the matching card
      mm.add(mq.fine, () => {
        const feats = gsap.utils.toArray<HTMLElement>('[data-ie-feature]')
        const cards = gsap.utils.toArray<HTMLElement>('[data-ie-card] > div')
        const off = feats.map((f, i) => {
          const on = () => gsap.to(cards[i], { y: -28, duration: 0.6, ease: 'power3.out' })
          const out = () => gsap.to(cards[i], { y: 0, duration: 0.6, ease: 'power3.out' })
          f.addEventListener('pointerenter', on)
          f.addEventListener('pointerleave', out)
          return () => {
            f.removeEventListener('pointerenter', on)
            f.removeEventListener('pointerleave', out)
          }
        })
        return () => off.forEach((o) => o())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="investor-experience" aria-labelledby="ie-title" className="relative overflow-hidden bg-paper text-ink section-y">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Eyebrow index={index}>{portal.eyebrow}</Eyebrow>
            <h2 id="ie-title" data-ie-title className="mt-8 font-display text-h1">
              {portal.title}
            </h2>
            <p className="mt-8 max-w-md text-lead text-muted">{portal.body}</p>

            <ul data-ie-features className="mt-12" aria-label="Investor portal features">
              {portal.features.map((f, i) => {
                const Icon = ICONS[i]
                return (
                  <li
                    key={f.title}
                    data-ie-feature
                    className="group flex items-center gap-5 border-t border-ink/12 py-4 last:border-b"
                  >
                    <Icon className="size-5 shrink-0 text-cobalt transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
                    <span className="font-display text-2xl leading-none">{f.title}</span>
                    <span className="ml-auto hidden text-right text-sm text-muted sm:block">{f.body}</span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <CtaLink href={links.investorPortal}>Investor Sign In</CtaLink>
              <CtaLink href={links.investorList} variant="ghost" className="on-light">
                Request an Account
              </CtaLink>
            </div>
          </div>

          {/* Document fan */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <div data-ie-fan className="relative mx-auto flex h-[22rem] items-center justify-center sm:h-[28rem] lg:h-[36rem]" aria-hidden>
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink/10" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-ink/10" />
              {portal.features.map((f, i) => {
                const Icon = ICONS[i]
                return (
                  <div key={f.title} data-ie-card className="absolute w-36 origin-bottom sm:w-44 lg:w-56" style={{
                      zIndex: 10 - Math.abs(i - 2),
                      // Resting fan for reduced motion; GSAP drives this when motion is allowed.
                      transform: `translate(${(i - 2) * 32}%, ${Math.abs(i - 2) * 6}%) rotate(${(i - 2) * 8}deg)`,
                    }}>
                    <div className="flex aspect-[3/4] flex-col justify-between border border-ink/10 bg-ivory p-4 shadow-[0_30px_60px_-35px_rgba(17,20,19,0.6)] lg:p-6">
                      <div className="flex items-start justify-between">
                        <Icon className="size-5 text-cobalt lg:size-6" strokeWidth={1.4} />
                        <span className="num label text-[0.55rem] text-muted">0{i + 1}</span>
                      </div>
                      <div>
                        <span className="mb-4 block h-px w-full bg-ink/10" />
                        <span className="mb-2 block h-px w-3/4 bg-ink/10" />
                        <span className="mb-5 block h-px w-1/2 bg-ink/10" />
                        <p className="font-display text-xl leading-none lg:text-[1.7rem]">{f.title}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="label mt-6 text-center text-[0.58rem] text-muted">
              Abstract illustration. Not a depiction of the portal interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
