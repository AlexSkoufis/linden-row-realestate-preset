import { useRef } from 'react'
import { operations } from '../../content/site'
import { gsap, useGSAP, mq } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

// Label positions around the frame (desktop), as % of the stage.
const SPOTS = [
  { top: '24%', right: '6%' },
  { top: '35%', right: '15%' },
  { top: '46%', right: '4%' },
  { top: '57%', right: '17%' },
  { top: '68%', right: '7%' },
  { top: '79%', right: '19%' },
] as const

/**
 * 05 Operational expertise. Pinned desktop stage where an architectural plate
 * grows to full bleed, editorial labels pin themselves around it, then the
 * operating figures resolve beneath.
 */
export function Operations({ index = '05' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '[data-op-stage]', start: 'top top', end: '+=170%', scrub: 0.8, pin: true, anticipatePin: 1 },
        })
        tl.fromTo('[data-op-frame]', { clipPath: 'inset(16% 30% 16% 30%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
          .fromTo('[data-op-img]', { scale: 1.45 }, { scale: 1.05, duration: 1.4 }, 0)
          .fromTo('[data-op-shade]', { opacity: 0.2 }, { opacity: 0.7, duration: 0.8 }, 0.3)
          .from('[data-op-title] > span > span', { yPercent: 110, stagger: 0.12, duration: 0.45, ease: 'power3.out' }, 0.45)
          .from('[data-op-label]', { autoAlpha: 0, y: 24, stagger: 0.09, duration: 0.3, ease: 'power2.out' }, 0.55)
          .from('[data-op-tick]', { scaleX: 0, stagger: 0.09, duration: 0.3 }, 0.6)
          .from('[data-op-body]', { autoAlpha: 0, y: 20, duration: 0.3 }, 1.0)
          .to({}, { duration: 0.3 })
      })

      mm.add(mq.mobile, () => {
        gsap.fromTo(
          '[data-op-img]',
          { scale: 1.3 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-op-stage]', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.from('[data-op-label]', {
          autoAlpha: 0,
          y: 16,
          stagger: 0.06,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-op-labels]', start: 'top 85%' },
        })
      })

      mm.add(mq.motion, () => {
        gsap.from('[data-op-cred]', {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-op-creds]', start: 'top 80%' },
        })
        gsap.from('[data-op-cred-rule]', {
          scaleX: 0,
          transformOrigin: 'left',
          stagger: 0.1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-op-creds]', start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="operations" aria-labelledby="op-title" className="on-dark relative bg-ink text-ivory">
      <div data-op-stage className="relative overflow-hidden lg:h-svh">
        {/* Image plate */}
        <div data-op-frame className="relative h-[70svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
          <Img name="balconies" sizes="100vw" data-op-img className="h-full w-full object-cover will-change-transform" />
          <div data-op-shade aria-hidden className="absolute inset-0 bg-ink opacity-50 lg:opacity-70" />
        </div>

        {/* Overlay copy */}
        <div className="container-x relative z-10 -mt-48 pb-6 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:pb-0">
          <Eyebrow index={index} className="text-ivory/75">
            {operations.eyebrow}
          </Eyebrow>
          <h2 id="op-title" data-op-title className="mt-6 max-w-[16ch] font-display text-display">
            {operations.title.map((t, i) => (
              <span key={t} className="line-mask">
                <span className={`block ${i === 1 ? 'italic text-cobalt-soft' : ''}`}>{t}</span>
              </span>
            ))}
          </h2>
          <p data-op-body className="mt-8 max-w-md text-lead text-ivory/80">
            {operations.body}
          </p>
        </div>

        {/* Labels: scattered on desktop, a tidy list on mobile */}
        <ul data-op-labels aria-label="Operational disciplines" className="container-x relative z-10 mt-10 flex flex-wrap gap-2 pb-4 lg:static lg:mt-0 lg:p-0">
          {operations.labels.map((l, i) => (
            <li
              key={l}
              data-op-label
              className="label flex items-center gap-3 border border-ivory/20 px-4 py-2.5 text-[0.62rem] text-ivory/85 lg:absolute lg:border-0 lg:p-0"
              style={{ ...(SPOTS[i] as object) }}
            >
              <span data-op-tick aria-hidden className="hidden h-px w-10 origin-left bg-cobalt-soft lg:block" />
              <span className="num text-cobalt-soft">0{i + 1}</span>
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* Operating figures */}
      <div data-op-creds className="container-x py-20 lg:py-28">
        <h3 className="sr-only">Operating credentials</h3>
        <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {operations.credentials.map((c) => (
            <div key={c.big} data-op-cred>
              <span data-op-cred-rule aria-hidden className="mb-6 block h-px bg-ivory/20" />
              <dt className="font-display text-[clamp(2.4rem,3.6vw,3.8rem)] leading-none">{c.big}</dt>
              <dd className="mt-3 max-w-[22ch] text-ivory/70">{c.small}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
