import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 1 })
gsap.config({ nullTargetWarn: false })

// Custom eases tuned for slow, architectural motion
export const ease = {
  arch: 'power4.inOut',
  out: 'expo.out',
  soft: 'power2.out',
}

/** Shared media query conditions for gsap.matchMedia(). */
export const mq = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  fine: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(mq.reduce).matches

/**
 * Split an element into masked lines and return the inner line targets.
 * Uses GSAP SplitText with autoSplit so lines re-flow on resize and font load.
 */
export function splitLines(
  el: Element,
  onSplit: (lines: HTMLElement[], words: HTMLElement[]) => gsap.core.Animation | void,
) {
  return SplitText.create(el, {
    type: 'lines,words',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    aria: 'auto',
    onSplit: (self) => onSplit(self.lines as HTMLElement[], self.words as HTMLElement[]),
  })
}

export { gsap, ScrollTrigger, Flip, SplitText, useGSAP }
