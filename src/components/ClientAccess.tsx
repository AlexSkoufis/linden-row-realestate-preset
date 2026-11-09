import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { clientAccess } from '../content/site'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/** "Client Login" disclosure with the two portal destinations. */
export function ClientAccess() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        root.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    if (panel.current && !prefersReducedMotion()) {
      gsap.fromTo(
        panel.current,
        { autoAlpha: 0, y: -10, clipPath: 'inset(0% 0% 100% 0%)' },
        { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' },
      )
      gsap.fromTo(
        panel.current.querySelectorAll('[data-item]'),
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6, delay: 0.1, ease: 'expo.out' },
      )
    }
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="label flex min-h-11 items-center gap-2 px-1 text-[0.68rem] transition-opacity hover:opacity-70"
      >
        Client Login
        <ChevronDown className={`size-3.5 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div
        ref={panel}
        id={id}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.9rem)] w-[23rem] bg-ivory p-2 text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
      >
        <p data-item className="label px-4 pb-2 pt-3 text-[0.62rem] text-muted">
          Linden Row Client Access
        </p>
        <ul>
          {clientAccess.map((c) => (
            <li key={c.label} data-item>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t border-ink/10 px-4 py-5 transition-colors hover:bg-paper focus-visible:bg-paper"
              >
                <span className="block font-display text-[1.7rem] leading-none">{c.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{c.body}</span>
                <span className="label mt-4 flex items-center gap-2 text-[0.64rem] text-cobalt">
                  {c.cta}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
