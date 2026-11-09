import { useRef } from 'react'
import { principles } from '../../content/site'
import { gsap, useGSAP, mq } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 03 Four habits that guide every fund as cinematic chapters.
 * Desktop: one pinned stage, scroll advances chapter by chapter with image wipes,
 * an odometer numeral and a segmented progress rail.
 * Mobile: an editorial vertical sequence with masked image reveals.
 */
export function Principles({ index = '03' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.desktop, () => {
        const n = principles.length
        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            trigger: '[data-pr-stage]',
            start: 'top top',
            end: `+=${(n - 1) * 100 + 40}%`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            snap: { snapTo: 'labelsDirectional', duration: { min: 0.3, max: 0.9 }, delay: 0.1, ease: 'power2.inOut' },
          },
        })

        // Initial states for chapters 2..n
        gsap.set('[data-pr-media]:not(:first-child)', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('[data-pr-copy]:not(:first-child) [data-pr-line]', { yPercent: 140 })
        gsap.set('[data-pr-copy]:not(:first-child) [data-pr-body]', { autoAlpha: 0, y: 30 })

        tl.addLabel('c0')
        for (let i = 1; i < n; i++) {
          const at = `c${i - 1}+=0.15`
          tl.to(`[data-pr-copy]:nth-child(${i}) [data-pr-line]`, { yPercent: -140, duration: 0.6, stagger: 0.04 }, at)
            .to(`[data-pr-copy]:nth-child(${i}) [data-pr-body]`, { autoAlpha: 0, y: -30, duration: 0.5 }, at)
            .to(`[data-pr-media]:nth-child(${i}) img`, { scale: 1.12, yPercent: -6, duration: 1 }, at)
            .to(`[data-pr-media]:nth-child(${i + 1})`, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, at)
            .fromTo(`[data-pr-media]:nth-child(${i + 1}) img`, { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.1 }, at)
            .to(`[data-pr-copy]:nth-child(${i + 1}) [data-pr-line]`, { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, `${at}+=0.45`)
            .to(`[data-pr-copy]:nth-child(${i + 1}) [data-pr-body]`, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }, `${at}+=0.55`)
            .to('[data-pr-odometer]', { yPercent: (-100 / n) * i, duration: 0.9 }, at)
            .to(`[data-pr-seg]:nth-child(${i + 1}) [data-pr-fill]`, { scaleX: 1, duration: 0.9 }, at)
            .to(`[data-pr-seg]:nth-child(${i + 1})`, { color: '#f5f2ec', duration: 0.3 }, at)
            .addLabel(`c${i}`, '+=0.05')
        }
        tl.to({}, { duration: 0.25 })

        // Drifting architectural lines in the background
        gsap.to('[data-pr-drift]', {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      mm.add(mq.mobile, () => {
        gsap.utils.toArray<HTMLElement>('[data-pm-item]').forEach((item) => {
          const media = item.querySelector('[data-pm-media]')
          gsap
            .timeline({ scrollTrigger: { trigger: item, start: 'top 80%' } })
            .fromTo(media, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' })
            .fromTo(item.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0)
            .from(item.querySelectorAll('[data-pm-fade]'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out' }, 0.4)
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="principles" aria-labelledby="principles-title" className="on-dark relative bg-ink text-ivory">
      {/* Desktop pinned stage */}
      <div data-pr-stage className="grain relative hidden h-svh overflow-hidden motion-safe:lg:block">
        <div
          data-pr-drift
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[130%] bg-[repeating-linear-gradient(90deg,rgba(245,242,236,0.045)_0_1px,transparent_1px_8.333%)]"
        />
        <div className="container-x relative z-[2] grid h-full grid-cols-12 gap-x-8 pb-12 pt-[calc(var(--header-h)+1.5rem)]">
          <div className="col-span-5 flex flex-col">
            <Eyebrow index={index} className="text-ivory/70">
              Four Principles
            </Eyebrow>
            <h2 id="principles-title" className="sr-only">
              Four habits that guide every fund
            </h2>

            <div className="relative mt-auto h-[clamp(9rem,17vw,16rem)] overflow-hidden" aria-hidden>
              <div data-pr-odometer className="num font-display text-[clamp(9rem,17vw,16rem)] leading-none text-ivory/[0.14]">
                {principles.map((p) => (
                  <div key={p.n} className="h-[clamp(9rem,17vw,16rem)]">
                    {p.n}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-6 grid min-h-[18rem]">
              {principles.map((p) => (
                <article key={p.n} data-pr-copy className="col-start-1 row-start-1">
                  <p className="overflow-hidden">
                    <span data-pr-line className="label block text-[0.66rem] text-cobalt-soft">
                      {p.kicker}
                    </span>
                  </p>
                  <h3 className="mt-4 font-display text-h1">
                    <span className="line-mask">
                      <span data-pr-line className="block">
                        {p.title}
                      </span>
                    </span>
                  </h3>
                  <p data-pr-body className="mt-6 max-w-md text-lead text-ivory/75">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>

            <ol className="mt-10 grid grid-cols-4 gap-3" aria-label="Chapter progress">
              {principles.map((p, i) => (
                <li key={p.n} data-pr-seg className={`label text-[0.6rem] ${i === 0 ? 'text-ivory' : 'text-ivory/40'}`}>
                  <span className="relative mb-3 block h-px bg-ivory/15">
                    <span
                      data-pr-fill
                      className="absolute inset-0 origin-left bg-cobalt-soft"
                      style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }}
                    />
                  </span>
                  <span className="num">{p.n}</span> <span className="hidden xl:inline">{p.title.split(' ')[0]}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative col-span-7 col-start-6 h-full">
            {principles.map((p, i) => (
              <figure
                key={p.n}
                data-pr-media
                className="media absolute inset-0"
                style={{ zIndex: i + 1 }}
              >
                <Img name={p.image} sizes="58vw" className="h-full w-full object-cover will-change-transform" />
                <figcaption className="absolute bottom-0 left-0 flex w-full items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-6">
                  <span className="label text-[0.6rem] text-ivory/80">
                    Principle {p.n} / {p.title}
                  </span>
                </figcaption>
              </figure>
            ))}
            {/* Corner registration marks */}
            <span aria-hidden className="absolute -left-3 -top-3 z-10 size-6 border-l border-t border-ivory/40" />
            <span aria-hidden className="absolute -bottom-3 -right-3 z-10 size-6 border-b border-r border-ivory/40" />
          </div>
        </div>
      </div>

      {/* Mobile and tablet editorial sequence */}
      <div className="container-x section-y motion-safe:lg:hidden">
        <Eyebrow index={index} className="text-ivory/70">
          Four Principles
        </Eyebrow>
        <h2 className="mt-8 font-display text-h1">
          Four principles.
          <br />
          <em className="text-cobalt-soft">One discipline.</em>
        </h2>
        <ol className="mt-16 space-y-20">
          {principles.map((p, i) => (
            <li key={p.n} data-pm-item className={`grid gap-6 sm:grid-cols-2 sm:items-end ${i % 2 ? 'sm:[&>*:first-child]:order-2' : ''}`}>
              <div data-pm-media className="media aspect-[4/5]">
                <Img name={p.image} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <div>
                <p data-pm-fade className="num font-display text-[5rem] leading-none text-ivory/20" aria-hidden>
                  {p.n}
                </p>
                <p data-pm-fade className="label mt-4 text-[0.64rem] text-cobalt-soft">
                  {p.kicker}
                </p>
                <h3 data-pm-fade className="mt-3 font-display text-h2">
                  {p.title}
                </h3>
                <p data-pm-fade className="mt-4 text-ivory/75">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
