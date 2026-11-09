import { useEffect, type RefObject } from 'react'
import { gsap, mq } from './gsap'

/** Magnetic pull towards the cursor, only for fine pointers with motion allowed. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.32, enabled = true) {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el || !window.matchMedia(mq.fine).matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.45)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.45)' })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, strength, enabled])
}
