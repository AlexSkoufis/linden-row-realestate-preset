import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

type MotionApi = {
  lenis: Lenis | null
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void
  stop: () => void
  start: () => void
}

const MotionContext = createContext<MotionApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

/**
 * Smooth scrolling with Lenis, driven by the GSAP ticker so ScrollTrigger
 * and Lenis stay perfectly synchronised. Disabled entirely for reduced motion
 * and for coarse pointers (touch keeps native momentum scrolling).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion() || coarse) return

    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), autoRaf: false })
    lenisRef.current = instance
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  const api: MotionApi = {
    lenis,
    scrollTo: (target, opts = {}) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { immediate: opts.immediate, offset: opts.offset ?? 0, duration: 1.4 })
        return
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
      }
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }

  return <MotionContext.Provider value={api}>{children}</MotionContext.Provider>
}

export const useMotion = () => useContext(MotionContext)
