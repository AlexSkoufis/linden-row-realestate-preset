import type { RefObject } from 'react'
import { gsap, useGSAP, mq, splitLines } from './gsap'

/**
 * Lightweight editorial reveals for supporting pages.
 * [data-reveal]       rises and fades in
 * [data-reveal-lines] splits into masked lines
 * [data-reveal-rule]  hairline that draws from the left
 * [data-reveal-img]   image plate that unmasks upward
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, { y: 36, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } })
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal-lines]').forEach((el) => {
          splitLines(el, (lines) =>
            gsap.from(lines, { yPercent: 110, stagger: 0.1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 84%' } }),
          )
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal-rule]').forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 90%' } })
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal-img]').forEach((el) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: 'top 82%' } })
            .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' })
            .fromTo(el.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
        })
      })
    },
    { scope },
  )
}
