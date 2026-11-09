import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, mq } from '../lib/gsap'
import { transitionState } from '../lib/transition'
import type { ImageName } from '../content/images'
import { Img } from './Img'

type Props = {
  eyebrow: string
  index: string
  lines: string[]
  /** Index of a line to set in italic cobalt. */
  accent?: number
  lead?: ReactNode
  image: ImageName
  children?: ReactNode
}

/**
 * Supporting page hero. A horizontal architectural band of photography slides
 * open beneath an oversized title.
 */
export function PageHero({ eyebrow, index, lines, accent, lead, image, children }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        const delay = transitionState.revealing ? 0.55 : 0.2
        gsap
          .timeline({ delay, defaults: { ease: 'expo.out' } })
          .from('[data-ph-line]', { yPercent: 115, stagger: 0.1, duration: 1.4 })
          .from('[data-ph-fade]', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.3)
          .fromTo('[data-ph-band]', { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' }, 0.2)
          .fromTo('[data-ph-img]', { scale: 1.4 }, { scale: 1.1, duration: 2, ease: 'power3.out' }, 0.2)

        gsap.to('[data-ph-img]', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '[data-ph-band]', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="on-dark grain relative overflow-hidden bg-ink text-ivory" aria-labelledby="page-title">
      <div className="container-x relative z-[2] pb-14 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <p data-ph-fade className="label flex items-center gap-4 text-ivory/70">
          <span className="num">{index}</span>
          <span aria-hidden className="inline-block h-px w-10 bg-cobalt-soft" />
          {eyebrow}
        </p>
        <h1 id="page-title" className="mt-8 font-display text-display">
          {lines.map((l, i) => (
            <span key={l} className="line-mask">
              <span data-ph-line className={`block ${i === accent ? 'italic text-cobalt-soft' : ''}`}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        {(lead || children) && (
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {lead && (
              <div data-ph-fade className="text-lead text-ivory/80 lg:col-span-6 lg:col-start-7">
                {lead}
              </div>
            )}
            {children && (
              <div data-ph-fade className="lg:col-span-6 lg:col-start-7">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
      <div data-ph-band className="media relative z-[2] h-[38svh] min-h-[16rem] md:h-[52svh]">
        <Img name={image} priority sizes="100vw" data-ph-img className="h-full w-full scale-110 object-cover" />
      </div>
    </section>
  )
}
