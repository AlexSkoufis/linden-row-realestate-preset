import { useRef } from 'react'
import { horizon } from '../../content/site'
import { gsap, useGSAP, mq, splitLines } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 08 Investment horizon. Intentionally calm: a contrast of scale between
 * "quarters" and "years", layered imagery drifting at different speeds and a
 * single cadence line that draws itself across the four rhythms of ownership.
 */
export function Horizon({ index = '08' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: mq.motion, desktop: mq.desktop }, (ctx) => {
        const { desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        const title = root.current?.querySelector('[data-hz-title]')
        if (title)
          splitLines(title, (lines) =>
            gsap.from(lines, {
              yPercent: 110,
              stagger: 0.12,
              duration: 1.5,
              ease: 'expo.out',
              scrollTrigger: { trigger: title, start: 'top 80%' },
            }),
          )

        // Layered parallax
        gsap.fromTo('[data-hz-back]', { yPercent: 10 }, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '[data-hz-layers]', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('[data-hz-front]', { yPercent: 30 }, { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '[data-hz-layers]', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('[data-hz-word]', { xPercent: desktop ? 6 : 0 }, { xPercent: desktop ? -2 : 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })

        // Cadence line
        const steps = gsap.utils.toArray<HTMLElement>('[data-hz-step]')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '[data-hz-cadence]', start: 'top 75%', end: desktop ? 'bottom 45%' : 'bottom 60%', scrub: 0.6 },
        })
        tl.fromTo('[data-hz-line]', { scaleX: desktop ? 0 : 1, scaleY: desktop ? 1 : 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: steps.length }, 0)
        steps.forEach((s, i) => {
          tl.fromTo(s, { autoAlpha: 0.15, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.9 + 0.1)
          tl.fromTo(s.querySelector('[data-hz-dot]'), { scale: 0.4, backgroundColor: '#d9d6cf' }, { scale: 1, backgroundColor: '#1336e5', duration: 0.3 }, i * 0.9 + 0.1)
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="horizon" aria-labelledby="hz-title" className="relative overflow-hidden bg-ivory text-ink section-y">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow index={index}>{horizon.eyebrow}</Eyebrow>
            <h2 id="hz-title" data-hz-title className="mt-8 font-display text-h1">
              {horizon.title}
            </h2>
            <p className="mt-8 max-w-lg text-lead text-muted">{horizon.body}</p>
          </div>

          {/* Layered imagery */}
          <div data-hz-layers className="relative h-[26rem] sm:h-[32rem] lg:col-span-5 lg:col-start-8 lg:h-[38rem]">
            <div data-hz-back className="media absolute right-0 top-0 h-[78%] w-[78%]">
              <Img name="morning-home" sizes="(min-width: 1024px) 34vw, 78vw" />
            </div>
            <div data-hz-front className="media absolute bottom-0 left-0 h-[52%] w-[52%] shadow-[0_40px_80px_-30px_rgba(17,20,19,0.55)]">
              <Img name="apartments-sun" sizes="(min-width: 1024px) 24vw, 52vw" />
            </div>
          </div>
        </div>

        {/* Scale contrast */}
        <div aria-hidden className="mt-20 select-none overflow-hidden lg:mt-28">
          <p data-hz-word className="whitespace-nowrap font-display text-[clamp(2.6rem,10.5vw,13.5rem)] leading-none tracking-[-0.035em]">
            <span className="text-ink/15 line-through decoration-1">Quarters</span>{' '}
            <em className="text-ink">Years.</em>
          </p>
        </div>

        {/* Cadence */}
        <div data-hz-cadence className="relative mt-16 lg:mt-24">
          <h3 className="label text-[0.64rem] text-muted">The cadence of patient capital</h3>
          <div className="relative mt-10">
            <span aria-hidden className="absolute left-[5px] top-0 h-full w-px bg-ink/10 lg:left-0 lg:top-[5px] lg:h-px lg:w-full" />
            <span
              data-hz-line
              aria-hidden
              className="absolute left-[5px] top-0 h-full w-px origin-top bg-cobalt lg:left-0 lg:top-[5px] lg:h-px lg:w-full lg:origin-left"
            />
            <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
              {horizon.cadence.map((c) => (
                <li key={c.when} data-hz-step className="relative pl-10 lg:pl-0 lg:pt-12">
                  <span data-hz-dot aria-hidden className="absolute left-0 top-1 block size-[11px] rounded-full bg-cobalt lg:top-0" />
                  <p className="font-display text-h3">{c.when}</p>
                  <p className="mt-3 max-w-xs text-muted">{c.what}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-14 max-w-2xl text-sm text-muted">
            Our typical plan, not a promise. Hold periods, distributions and outcomes differ from fund to fund and are never
            guaranteed.
          </p>
        </div>
      </div>
    </section>
  )
}
