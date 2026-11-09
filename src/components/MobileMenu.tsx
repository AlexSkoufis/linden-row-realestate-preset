import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav, clientAccess, links, contact } from '../content/site'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { useMotion } from '../lib/motion'
import { TLink } from '../lib/transition'

type Props = { open: boolean; setOpen: (v: boolean) => void }

/** Fullscreen GSAP menu for tablet and mobile with a focus trap and Escape to close. */
export function MobileMenu({ open, setOpen }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const motion = useMotion()
  const { pathname } = useLocation()

  // Build the open/close timeline once.
  useEffect(() => {
    const el = panel.current
    if (!el) return
    const reduce = prefersReducedMotion()
    const t = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    t.set(el, { visibility: 'visible' })
      .fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0.01 : 0.8, ease: 'power4.inOut' })
      .fromTo(el.querySelectorAll('[data-menu-link]'), { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0.01 : 1, stagger: 0.06 }, reduce ? 0 : '-=0.35')
      .fromTo(el.querySelectorAll('[data-menu-meta]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: reduce ? 0.01 : 0.8, stagger: 0.05 }, reduce ? 0 : '-=0.8')
      .fromTo(el.querySelector('[data-menu-rule]'), { scaleX: 0 }, { scaleX: 1, duration: reduce ? 0.01 : 1.2, ease: 'power3.inOut' }, 0.2)
    t.eventCallback('onReverseComplete', () => {
      gsap.set(el, { visibility: 'hidden' })
    })
    tl.current = t
    return () => {
      t.kill()
    }
  }, [])

  // Play / reverse and manage scroll + focus.
  useEffect(() => {
    const t = tl.current
    if (!t) return
    if (open) {
      t.timeScale(1).play()
      motion.stop()
      document.documentElement.style.overflow = 'hidden'
      const first = panel.current?.querySelector<HTMLElement>('a, button')
      requestAnimationFrame(() => first?.focus())
    } else {
      t.timeScale(1.6).reverse()
      motion.start()
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Close when the route changes.
  useEffect(() => {
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Escape + focus trap.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [toggle.current, ...panel.current.querySelectorAll<HTMLElement>('a[href], button')].filter(Boolean) as HTMLElement[]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="label relative z-[61] flex min-h-11 items-center gap-3 text-[0.68rem]"
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <span aria-hidden className="relative block h-3 w-7">
          <span
            className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`}
          />
        </span>
      </button>

      {createPortal(
        <div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          aria-hidden={!open}
          inert={!open}
          style={{ visibility: 'hidden' }}
          className="on-dark grain fixed inset-0 z-[49] flex flex-col overflow-y-auto bg-ink pt-[var(--header-h)] text-ivory lg:hidden"
        >
          <div className="container-x flex flex-1 flex-col justify-between gap-12 pb-10 pt-8">
            <nav aria-label="Mobile">
              <ul>
                {[{ label: 'Home', to: '/' }, ...nav].map((item, i) => (
                  <li key={item.to} className="overflow-hidden border-b border-ivory/10">
                    <TLink
                      to={item.to}
                      data-menu-link
                      aria-current={pathname === item.to ? 'page' : undefined}
                      onClick={() => item.to === pathname && setOpen(false)}
                      className="flex items-baseline justify-between py-3 font-display text-[clamp(2.6rem,10vw,4.5rem)] leading-[1.05]"
                    >
                      <span>{item.label}</span>
                      <span className="num label text-[0.62rem] text-mist">0{i + 1}</span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative z-[2]">
              <span data-menu-rule aria-hidden className="mb-8 block h-px origin-left bg-cobalt-soft/60" />
              <div className="grid gap-8 sm:grid-cols-2">
                <div data-menu-meta>
                  <p className="label mb-4 text-[0.62rem] text-mist">Client Access</p>
                  <ul className="space-y-3">
                    {clientAccess.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="u-link text-lg">
                          {c.cta}
                          <ArrowUpRight className="size-4" aria-hidden />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-menu-meta>
                  <p className="label mb-4 text-[0.62rem] text-mist">Contact</p>
                  <a href={`mailto:${contact.email}`} className="u-link block w-fit text-lg">
                    {contact.email}
                  </a>
                  <a href={contact.phoneHref} className="u-link mt-2 block w-fit text-lg">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <a
                data-menu-meta
                href={links.investorList}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-10 w-full"
              >
                Join the Investor List
                <ArrowUpRight className="btn-icon size-4" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
