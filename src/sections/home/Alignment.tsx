import { useRef } from 'react'
import { roles, links } from '../../content/site'
import { gsap, useGSAP, mq, ScrollTrigger, splitLines } from '../../lib/gsap'
import { Img, imageSrc } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'
import { CtaLink } from '../../components/CtaLink'

/**
 * 06 Alignment of interests. Split screen: a sticky charcoal statement on the
 * left with scroll-synchronised imagery, the four roles on the right. A cobalt
 * divider grows between them. Fine pointers get a cursor-following preview.
 */
export function Alignment({ index = '06' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const title = root.current?.querySelector('[data-al-title]')
        if (title)
          splitLines(title, (lines) =>
            gsap.from(lines, {
              yPercent: 110,
              stagger: 0.12,
              duration: 1.4,
              ease: 'expo.out',
              scrollTrigger: { trigger: title, start: 'top 80%' },
            }),
          )

        gsap.utils.toArray<HTMLElement>('[data-al-role]').forEach((row) => {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: 'top 80%' } })
            .from(row.querySelector('[data-al-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut' })
            .from(row.querySelectorAll('[data-al-fade]'), { y: 34, autoAlpha: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out' }, 0.2)
        })
      })

      mm.add(mq.desktop, () => {
        gsap.fromTo(
          '[data-al-divider]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom bottom', scrub: true } },
        )

        // Swap the sticky image as each role becomes active.
        const frames = gsap.utils.toArray<HTMLElement>('[data-al-frame]')
        gsap.set(frames.slice(1), { autoAlpha: 0 })
        gsap.utils.toArray<HTMLElement>('[data-al-role]').forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: 'top 60%',
            end: 'bottom 60%',
            onToggle: (self) => {
              row.toggleAttribute('data-active', self.isActive)
              if (!self.isActive) return
              frames.forEach((f, k) =>
                gsap.to(f, { autoAlpha: k === i ? 1 : 0, scale: k === i ? 1 : 1.08, duration: 1.2, ease: 'power3.out', overwrite: true }),
              )
            },
          })
        })
        gsap.to('[data-al-frames]', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // Cursor-following preview on fine pointers
      mm.add(mq.fine, () => {
        const el = preview.current
        if (!el) return
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
        const img = el.querySelector('img')!
        const rows = gsap.utils.toArray<HTMLElement>('[data-al-role]')
        const cleanups = rows.map((row) => {
          const enter = () => {
            img.src = row.dataset.preview ?? ''
            gsap.to(el, { autoAlpha: 1, scale: 1, rotate: -3, duration: 0.5, ease: 'power3.out' })
          }
          const leave = () => gsap.to(el, { autoAlpha: 0, scale: 0.85, rotate: 0, duration: 0.4, ease: 'power3.in' })
          const move = (e: PointerEvent) => {
            xTo(e.clientX + 24)
            yTo(e.clientY - 90)
          }
          row.addEventListener('pointerenter', enter)
          row.addEventListener('pointerleave', leave)
          row.addEventListener('pointermove', move)
          return () => {
            row.removeEventListener('pointerenter', enter)
            row.removeEventListener('pointerleave', leave)
            row.removeEventListener('pointermove', move)
          }
        })
        return () => cleanups.forEach((c) => c())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="alignment" aria-labelledby="al-title" className="relative bg-ivory text-ink">
      <div className="lg:grid lg:grid-cols-2">
        {/* Left: statement */}
        <div className="on-dark relative bg-ink text-ivory">
          <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-svh">
            <div data-al-frames className="absolute inset-0 hidden h-[112%] lg:block" aria-hidden>
              {roles.map((r) => (
                <div key={r.title} data-al-frame className="absolute inset-0">
                  <Img name={r.image} sizes="50vw" decorative className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 lg:hidden" aria-hidden>
              <Img name="tower-balconies" sizes="100vw" decorative className="h-full w-full object-cover" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90" />

            <div className="container-x relative z-10 flex h-full flex-col justify-between gap-16 py-24 lg:py-[calc(var(--header-h)+2rem)] lg:pr-12 xl:pr-20">
              <Eyebrow index={index} className="text-ivory/75">
                Shared Incentives
              </Eyebrow>
              <div>
                <h2 id="al-title" data-al-title className="font-display text-display">
                  On the same <em className="text-cobalt-soft">side of the table.</em>
                </h2>
                <p className="mt-8 max-w-md text-lead text-ivory/80">
                  Linden Row is paid the way our investors are: by buildings that perform. Our partners invest in every fund,
                  and most of what we earn arrives only after investors have received their preferred return.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <CtaLink href={links.investorList}>Join the Investor List</CtaLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: roles */}
        <div className="relative">
          <span
            data-al-divider
            aria-hidden
            className="absolute bottom-0 left-0 top-0 hidden w-[2px] origin-top bg-cobalt lg:block"
          />
          <ol className="container-x py-20 lg:px-16 lg:py-[calc(var(--header-h)+4rem)] xl:px-24" aria-label="Roles in a Linden Row fund">
            {roles.map((r, i) => (
              <li
                key={r.title}
                data-al-role
                data-preview={imageSrc(r.image, 640)}
                className="group relative py-10 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center lg:py-16"
              >
                <span data-al-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/15" />
                <div className="flex items-baseline justify-between gap-6">
                  <p data-al-fade className="label text-[0.62rem] text-muted">
                    <span className="num mr-3 text-cobalt">0{i + 1}</span>
                    {r.tag}
                  </p>
                </div>
                <h3 data-al-fade className="mt-5 font-display text-h1">
                  <span className="inline-block transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 lg:text-ink/35 lg:group-data-[active]:text-ink motion-reduce:lg:text-ink">
                    {r.title}
                  </span>
                </h3>
                <p data-al-fade className="mt-6 max-w-lg text-muted">
                  {r.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Floating preview */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/5] w-56 overflow-hidden opacity-0 shadow-2xl [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ visibility: 'hidden' }}
      >
        <img alt="" src={imageSrc(roles[0].image, 640)} className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
