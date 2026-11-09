import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav, links } from '../content/site'
import { gsap, ScrollTrigger, useGSAP, mq } from '../lib/gsap'
import { TLink } from '../lib/transition'
import { Logo } from './Logo'
import { ClientAccess } from './ClientAccess'
import { MobileMenu } from './MobileMenu'

/**
 * Transparent header over each page's dark hero. After scrolling it condenses
 * into a blurred charcoal bar, hides on scroll down and returns on scroll up.
 */
export function Header() {
  const root = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          setSolid(y > 40)
          setHidden(self.direction === 1 && y > window.innerHeight * 0.75)
        },
      })

      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        gsap.from('[data-nav-item]', {
          y: -24,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.06,
          ease: 'expo.out',
          delay: pathname === '/' ? 1.25 : 0.2,
        })
      })
    },
    { scope: root },
  )

  const isActive = (to: string) => pathname === to

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[90] -translate-y-24 bg-cobalt px-4 py-3 text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={root}
        className={`on-dark fixed inset-x-0 top-0 z-50 text-ivory transition-[transform,background-color,backdrop-filter] duration-700 ease-[var(--ease-out-expo)] ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${solid && !menuOpen ? 'bg-ink/80 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <TLink to="/" aria-label="Linden Row home" className="relative z-[61] shrink-0" data-nav-item>
            <Logo className="w-[8.75rem] md:w-[10.5rem]" />
          </TLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.to} data-nav-item>
                  <TLink
                    to={item.to}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={`u-link label text-[0.68rem] ${isActive(item.to) ? '!bg-[length:100%_1px] !bg-left-bottom' : ''}`}
                  >
                    {item.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden lg:block" data-nav-item>
              <ClientAccess />
            </div>
            <a
              data-nav-item
              href={links.investorList}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden !min-h-11 !px-5 !text-[0.66rem] md:inline-flex"
            >
              Join Investor List
              <ArrowUpRight className="btn-icon size-3.5" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="lg:hidden" data-nav-item>
              <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
            </div>
          </div>
        </div>
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px bg-ivory/10 transition-opacity duration-700 ${solid ? 'opacity-100' : 'opacity-0'}`}
        />
      </header>
    </>
  )
}
