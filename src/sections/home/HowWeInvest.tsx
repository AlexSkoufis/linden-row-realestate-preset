import { useRef } from 'react'
import { journey } from '../../content/site'
import { gsap, useGSAP, mq, ScrollTrigger, splitLines } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 04 How Linden Row invests. A sticky image panel is synchronised with five
 * stages on the right while an architectural line draws itself down the page.
 */
export function HowWeInvest({ index = '04' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const title = root.current?.querySelector('[data-hw-title]')
        if (title)
          splitLines(title, (lines) =>
            gsap.from(lines, {
              yPercent: 110,
              stagger: 0.1,
              duration: 1.3,
              ease: 'expo.out',
              scrollTrigger: { trigger: title, start: 'top 82%' },
            }),
          )

        // The spine draws with scroll
        gsap.fromTo(
          '[data-hw-spine]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hw-steps]', start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
          },
        )

        gsap.utils.toArray<HTMLElement>('[data-hw-step]').forEach((step) => {
          gsap.from(step.querySelectorAll('[data-hw-fade]'), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: step, start: 'top 78%' },
          })
        })
      })

      // Desktop: swap the sticky image as each stage crosses the centre line.
      mm.add(mq.desktop, () => {
        const frames = gsap.utils.toArray<HTMLElement>('[data-hw-frame]')
        const counter = root.current?.querySelector('[data-hw-count]')
        let current = 0
        gsap.set(frames.slice(1), { clipPath: 'inset(0% 0% 100% 0%)' })

        const show = (i: number) => {
          if (i === current) return
          const down = i > current
          const next = frames[i]
          gsap.set(next, { zIndex: 3 })
          gsap.set(frames[current], { zIndex: 2 })
          frames.forEach((f, k) => k !== i && k !== current && gsap.set(f, { zIndex: 1 }))
          gsap.fromTo(
            next,
            { clipPath: down ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut', overwrite: true },
          )
          gsap.fromTo(next.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.4, ease: 'power3.out', overwrite: true })
          if (counter) counter.textContent = journey[i].n
          current = i
        }

        gsap.utils.toArray<HTMLElement>('[data-hw-step]').forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              step.toggleAttribute('data-active', self.isActive)
              if (self.isActive) show(i)
            },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="how-we-invest" aria-labelledby="hw-title" className="relative bg-ivory text-ink section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={index}>How a Fund Works</Eyebrow>
            <h2 id="hw-title" data-hw-title className="mt-8 font-display text-h1">
              From first commitment to quarterly letter, step by step.
            </h2>
          </div>
          <p className="self-end text-lead text-muted lg:col-span-4 lg:col-start-9">
            A Linden Row fund combines investors’ capital, buys several buildings at once and leaves the daily work to our
            teams. Here is who does what, from the first call to the quarterly letter.
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
          {/* Sticky media (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
                {journey.map((s, i) => (
                  <figure key={s.n} data-hw-frame className="media absolute inset-0" style={{ zIndex: i === 0 ? 3 : 1 }}>
                    <Img name={s.image} sizes="40vw" className="h-full w-full object-cover" />
                  </figure>
                ))}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 text-ivory">
                  <span className="label text-[0.6rem] text-ivory/80">Stage</span>
                  <span data-hw-count className="num font-display text-7xl leading-none" aria-hidden>
                    01
                  </span>
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </div>
              <p className="label mt-4 text-[0.6rem] text-muted">Illustrative photography. Not Linden Row properties.</p>
            </div>
          </div>

          {/* Stages with the drawing spine */}
          <ol data-hw-steps className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute bottom-0 left-[0.4rem] top-0 w-px bg-ink/10" />
            <span aria-hidden data-hw-spine className="absolute bottom-0 left-[0.4rem] top-0 w-px origin-top bg-cobalt" />
            {journey.map((s) => (
              <li
                key={s.n}
                data-hw-step
                className="group relative pb-20 pl-12 last:pb-0 md:pl-16 lg:min-h-[52vh] lg:pb-24"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-3 size-[0.85rem] rounded-full border border-ink/30 bg-ivory transition-colors duration-700 group-data-[active]:border-cobalt group-data-[active]:bg-cobalt"
                />
                <p data-hw-fade className="label num text-[0.64rem] text-muted">
                  Stage {s.n}
                </p>
                <h3 data-hw-fade className="mt-3 font-display text-h2 transition-colors duration-700">
                  {s.title}
                </h3>
                <p data-hw-fade className="mt-5 max-w-lg text-muted">
                  {s.body}
                </p>
                <div data-hw-fade className="media mt-8 aspect-[16/10] lg:hidden">
                  <Img name={s.image} sizes="100vw" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-20 max-w-3xl border-t border-ink/15 pt-6 text-sm text-muted">
          Real estate investing carries risk, including the loss of capital. The terms, risks and eligibility for any Linden
          Row fund are set out in its offering documents.
        </p>
      </div>
    </section>
  )
}
