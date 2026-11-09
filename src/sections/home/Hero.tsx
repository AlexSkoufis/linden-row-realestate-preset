import { useRef } from 'react'
import { hero, links, contact } from '../../content/site'
import { gsap, useGSAP, mq } from '../../lib/gsap'
import { transitionState } from '../../lib/transition'
import { Img } from '../../components/Img'
import { CtaLink } from '../../components/CtaLink'

/**
 * 01 Cinematic hero. A small architectural frame opens to full bleed while the
 * photograph settles from a deep zoom, then the headline rises line by line.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: mq.motion, desktop: mq.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return
        const delay = transitionState.revealing ? 0.55 : 0.15
        const tl = gsap.timeline({ delay, defaults: { ease: 'expo.out' } })

        tl.fromTo(
          '[data-hero-frame]',
          { clipPath: ctx.conditions.desktop ? 'inset(24% 36% 24% 36%)' : 'inset(30% 18% 30% 18%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'power4.inOut' },
        )
          .fromTo('[data-hero-img]', { scale: 1.55 }, { scale: 1.08, duration: 2.2, ease: 'power3.inOut' }, 0)
          .from('[data-hero-shade]', { autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, 0.9)
          .from('[data-hero-grid] span', { scaleY: 0, transformOrigin: 'top', stagger: 0.05, duration: 1.4, ease: 'power3.inOut' }, 0.5)
          .from('[data-hero-line]', { yPercent: 115, rotate: 2, duration: 1.4, stagger: 0.11 }, 1.05)
          .from('[data-hero-fade]', { y: 26, autoAlpha: 0, duration: 1.2, stagger: 0.08 }, 1.35)
          .from('[data-hero-pillar]', { y: 18, autoAlpha: 0, duration: 1, stagger: 0.07 }, 1.6)

        // Scroll: slow parallax on the photograph, headline lifts and dims.
        gsap.to('[data-hero-img]', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-content]', {
          y: -120,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-frame]', {
          clipPath: 'inset(0% 0% 8% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'center top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="on-dark relative isolate h-svh min-h-[40rem] overflow-hidden bg-ink text-ivory"
    >
      <div data-hero-frame className="absolute inset-0 overflow-hidden will-change-[clip-path]">
        <Img
          name="hero-facade"
          priority
          sizes="100vw"
          data-hero-img
          className="h-full w-full scale-[1.08] object-cover object-[60%_40%] will-change-transform"
        />
        <div
          data-hero-shade
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,20,19,0.55)_0%,rgba(17,20,19,0.05)_30%,rgba(17,20,19,0.35)_60%,rgba(17,20,19,0.92)_100%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(17,20,19,0.7),transparent_60%)]" />
      </div>

      {/* Architectural column lines */}
      <div data-hero-grid aria-hidden className="container-x pointer-events-none absolute inset-0 hidden grid-cols-12 md:grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`h-full border-l border-ivory/[0.07] ${i === 0 ? 'border-l-0' : ''}`} />
        ))}
      </div>

      <div data-hero-content className="container-x relative z-10 flex h-full flex-col justify-end pb-8 pt-[calc(var(--header-h)+2rem)] md:pb-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-hero-fade className="label mb-6 flex items-center gap-4 text-ivory/80 md:mb-8">
              <span aria-hidden className="inline-block h-px w-10 bg-cobalt-soft" />
              {hero.eyebrow}
            </p>
            <h1 id="hero-title" className="font-display text-mega">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="line-mask">
                  <span data-hero-line className={`block origin-bottom-left ${i === 2 ? 'italic text-cobalt-soft' : ''}`}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p data-hero-fade className="max-w-md text-lead text-ivory/85">
              {hero.lead}
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={links.investorList}>Join the Investor List</CtaLink>
              <CtaLink href={links.aboutYou} variant="ghost">
                Start a Conversation
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-5 md:mt-14 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Investment priorities">
            {hero.pillars.map((p, i) => (
              <li key={p} data-hero-pillar className="label flex items-center gap-3 text-[0.64rem] text-ivory/75">
                <span className="num text-cobalt-soft">0{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <p data-hero-pillar className="text-[0.72rem] text-ivory/60">
              Serving {contact.region}
            </p>
            <span data-hero-pillar aria-hidden className="relative hidden h-10 w-px overflow-hidden bg-ivory/20 md:block">
              <span className="absolute left-0 top-0 h-1/2 w-full animate-[scrollcue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-ivory" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
