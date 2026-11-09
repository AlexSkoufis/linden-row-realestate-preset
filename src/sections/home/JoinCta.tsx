import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fit, links } from '../../content/site'
import { gsap, useGSAP, mq } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { CtaLink } from '../../components/CtaLink'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 10 Join the investor list. The photograph opens from a centred window to
 * full bleed, the headline rises, and magnetic CTAs lead to the investor
 * registration and contact destinations.
 */
export function JoinCta({ index = '10' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 15%', scrub: 0.8 } })
          .fromTo('[data-cta-frame]', { clipPath: 'inset(12% 10% 12% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
          .fromTo('[data-cta-img]', { scale: 1.3 }, { scale: 1.05, ease: 'none' }, 0)

        gsap
          .timeline({ scrollTrigger: { trigger: '[data-cta-copy]', start: 'top 75%' } })
          .from('[data-cta-line]', { yPercent: 115, stagger: 0.12, duration: 1.5, ease: 'expo.out' })
          .from('[data-cta-fade]', { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.2, ease: 'expo.out' }, 0.4)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="join" aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-ink text-ivory">
      <div data-cta-frame className="absolute inset-0 overflow-hidden">
        <Img name="winter-dusk" sizes="100vw" data-cta-img className="h-full w-full object-cover object-center" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,20,19,0.75)_0%,rgba(17,20,19,0.45)_45%,rgba(17,20,19,1)_100%)]" />
      </div>

      <div data-cta-copy className="container-x relative z-10 flex min-h-[110svh] flex-col justify-center py-32">
        <Eyebrow index={index} className="text-ivory/75">
          Join the Investor List
        </Eyebrow>
        <h2 id="cta-title" className="mt-8 font-display text-mega">
          <span className="line-mask">
            <span data-cta-line className="block">
              Invest for
            </span>
          </span>
          <span className="line-mask">
            <span data-cta-line className="block italic text-cobalt-soft">
              the long run.
            </span>
          </span>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <blockquote data-cta-fade className="max-w-xl text-lead text-ivory/85 lg:col-span-6">
            <p>{fit.quote}</p>
          </blockquote>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-cta-fade className="text-ivory/75">
              {fit.list}
            </p>
            <div data-cta-fade className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={links.investorList}>Join the Investor List</CtaLink>
              <CtaLink href={links.aboutYou} variant="ghost">
                Start a Conversation
              </CtaLink>
            </div>
            <a
              data-cta-fade
              href={links.investorPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link label mt-8 text-[0.64rem] text-ivory/80"
            >
              Already invested? Sign in
              <ArrowUpRight className="size-3.5" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
