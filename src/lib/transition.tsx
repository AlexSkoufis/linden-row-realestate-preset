import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'
import { useMotion } from './motion'
import { LogoMark } from '../components/Logo'

type Api = { go: (to: string) => void }
const TransitionContext = createContext<Api>({ go: () => {} })

/** True while a page is being revealed from behind the curtain. Intros read this to add a delay. */
export const transitionState = { revealing: false }

/**
 * Architectural curtain page transition: a charcoal panel rises to cover the
 * page, the route swaps underneath, then the panel lifts away.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const motion = useMotion()
  const curtain = useRef<HTMLDivElement>(null)
  const covered = useRef(false)
  const busy = useRef(false)

  const go = useCallback(
    (to: string) => {
      if (busy.current) return
      if (to === pathname) {
        motion.scrollTo(0)
        return
      }
      const el = curtain.current
      if (!el || prefersReducedMotion()) {
        navigate(to)
        return
      }
      busy.current = true
      motion.stop()
      gsap
        .timeline()
        .set(el, { visibility: 'visible' })
        .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power4.inOut' })
        .fromTo(el.querySelector('[data-curtain-mark]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, '-=0.25')
        .add(() => {
          covered.current = true
          transitionState.revealing = true
          navigate(to)
        })
    },
    [navigate, pathname, motion],
  )

  // After each route change: reset scroll, recalculate triggers, lift the curtain.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    motion.lenis?.scrollTo(0, { immediate: true, force: true })
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    const el = curtain.current
    if (covered.current && el) {
      covered.current = false
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { visibility: 'hidden' })
            busy.current = false
            transitionState.revealing = false
            motion.start()
          },
        })
        .to(el.querySelector('[data-curtain-mark]'), { autoAlpha: 0, y: -16, duration: 0.3, ease: 'power2.in' })
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power4.inOut' }, '-=0.05')
    }
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
        style={{ visibility: 'hidden', clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <div data-curtain-mark className="flex flex-col items-center gap-5 opacity-0">
          <svg viewBox="0 0 56 56" className="w-14 opacity-90" aria-hidden>
            <LogoMark />
          </svg>
          <span className="block h-px w-16 bg-cobalt-soft" />
        </div>
      </div>
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)

type TLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode }

/** Internal link that routes through the curtain transition. */
export function TLink({ to, onClick, children, ...rest }: TLinkProps) {
  const { go } = useTransition()
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
