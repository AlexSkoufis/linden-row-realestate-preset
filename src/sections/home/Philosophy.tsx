import { useRef } from 'react'
import { philosophy } from '../../content/site'
import { gsap, useGSAP, mq, SplitText } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 02 Investment philosophy. A pinned typographic sequence: each word of the
 * statement lights up with scroll while the page shifts from ivory to charcoal.
 */
export function Philosophy() {
  const root = useRef<HTMLElement>(null)
  const statement = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: mq.desktop, mobile: mq.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean }
        if (!statement.current) return

        const split = SplitText.create(statement.current, { type: 'words', aria: 'auto' })
        const words = split.words as HTMLElement[]
        const highlights = words.filter((w) => philosophy.highlight.includes(w.textContent?.trim() ?? ''))
        highlights.forEach((w) => w.setAttribute('data-hl', ''))

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop
            ? { trigger: root.current, start: 'top top', end: '+=210%', scrub: 0.8, pin: true, anticipatePin: 1 }
            : { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
        })

        tl.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.04, duration: 0.3 }, 0)
          .to(highlights, { color: '#1336e5', stagger: 0.05, duration: 0.2 }, 0.25)
          .fromTo('[data-phil-frame]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 }, 0.5)
          .fromTo('[data-phil-img]', { scale: 1.35, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.2 }, 0.5)
          .from('[data-phil-fade]', { autoAlpha: 0, y: 30, stagger: 0.12, duration: 0.5 }, 0.8)

        if (desktop) {
          // Ivory to charcoal: the room darkens as the thought completes.
          tl.to(root.current, { backgroundColor: '#111413', color: '#f5f2ec', duration: 0.8 }, 1.35)
            .to(highlights, { color: '#93a4ff', duration: 0.6 }, 1.35)
            .to('[data-phil-muted]', { color: 'rgba(245,242,236,0.68)', duration: 0.6 }, 1.35)
            .to('[data-phil-rule]', { backgroundColor: 'rgba(245,242,236,0.18)', duration: 0.6 }, 1.35)
            .to({}, { duration: 0.35 })
        }

        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ivory py-24 text-ink lg:h-svh lg:py-0"
    >
      <div className="container-x pt-[calc(var(--header-h)*0.5)]">
        <div className="flex items-end justify-between gap-6">
          <Eyebrow index="02">{philosophy.eyebrow}</Eyebrow>
          <h2 id="philosophy-title" className="label hidden text-[0.64rem] opacity-60 md:block">
            Our Philosophy
          </h2>
        </div>
        <div data-phil-rule className="mt-6 h-px bg-ink/15" />

        <p
          ref={statement}
          className="mt-10 max-w-[22ch] font-display text-[clamp(2.3rem,4.6vw,5.4rem)] leading-[1.02] tracking-[-0.02em] md:mt-14 lg:max-w-[26ch]"
        >
          {philosophy.statement}
        </p>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <div data-phil-frame className="media aspect-[4/3] md:col-span-4 lg:col-span-3">
            <Img name="blueprint" sizes="(min-width: 768px) 30vw, 100vw" data-phil-img />
          </div>
          <div className="space-y-4 md:col-span-4 lg:col-start-5" data-phil-muted>
            {philosophy.body.map((p) => (
              <p key={p} data-phil-fade className="max-w-md text-muted" data-phil-muted>
                {p}
              </p>
            ))}
          </div>
          <ul className="md:col-span-4 lg:col-span-3 lg:col-start-10" aria-label="Core tenets">
            {philosophy.tenets.map((t, i) => (
              <li key={t} data-phil-fade className="flex items-baseline gap-4 border-t border-current/15 py-3">
                <span className="num label text-[0.6rem] opacity-50">0{i + 1}</span>
                <span className="font-display text-2xl">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
