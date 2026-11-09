import { useLayoutEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { values } from '../../content/site'
import { gsap, useGSAP, mq, Flip, ScrollTrigger, prefersReducedMotion, splitLines } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Eyebrow } from '../../components/Eyebrow'

/**
 * 07 Sources of real estate value. An architectural grid of four panels:
 * selecting one expands it with GSAP Flip while the others compress into
 * vertical columns. Works with hover, click, tap and keyboard.
 */
export function ValueSources({ index = '07' }: { index?: string }) {
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)
  const [active, setActive] = useState(0)

  const activate = (i: number) => {
    if (i === active) return
    if (grid.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(grid.current.querySelectorAll('[data-vs-panel]'))
    }
    setActive(i)
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    Flip.from(state, {
      duration: 0.95,
      ease: 'power3.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [active])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        const title = root.current?.querySelector('[data-vs-title]')
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
        gsap.from('[data-vs-panel]', {
          clipPath: 'inset(100% 0% 0% 0%)',
          stagger: 0.1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: grid.current, start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  const hoverable = typeof window !== 'undefined' && window.matchMedia(mq.fine).matches

  return (
    <section ref={root} id="value" aria-labelledby="vs-title" className="on-dark relative bg-charcoal text-ivory section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index={index} className="text-ivory/70">
              Where Returns Come From
            </Eyebrow>
            <h2 id="vs-title" data-vs-title className="mt-8 font-display text-h1">
              Four ways a building earns its keep.
            </h2>
          </div>
          <p className="text-ivory/70 lg:col-span-4 lg:col-start-9">
            A well-run building can create value in more than one way at once. None of them is certain, and each depends on
            the property, the market and the quality of its management.
          </p>
        </div>

        <div
          ref={grid}
          className="mt-16 flex flex-col gap-2 lg:mt-20 lg:h-[min(76vh,46rem)] lg:flex-row"
        >
          {values.map((v, i) => {
            const isActive = i === active
            return (
              <article
                key={v.key}
                data-vs-panel
                data-active={isActive || undefined}
                onMouseEnter={hoverable ? () => activate(i) : undefined}
                onClick={() => activate(i)}
                className={`group relative cursor-pointer overflow-hidden bg-graphite ${
                  isActive ? 'min-h-[30rem] lg:min-h-0 lg:flex-[3.4]' : 'min-h-[5.5rem] lg:min-h-0 lg:flex-1'
                }`}
              >
                <Img
                  name={v.image}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  decorative
                  className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-[1.2s] ease-[var(--ease-out-expo)] ${
                    isActive ? 'scale-100 opacity-100 grayscale-0' : 'scale-110 opacity-40 grayscale'
                  }`}
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? 'bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10' : 'bg-ink/55'
                  }`}
                />

                <h3 className="relative z-10 h-full">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`vs-body-${v.key}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      activate(i)
                    }}
                    className={`flex w-full items-center justify-between gap-4 p-6 text-left lg:h-full lg:flex-col lg:items-start lg:justify-between lg:p-7 ${
                      isActive ? 'lg:h-auto' : ''
                    }`}
                  >
                    <span className="num font-display text-2xl text-cobalt-soft">{v.n}</span>
                    <span
                      className={`flex-1 font-display text-[1.75rem] leading-none transition-opacity duration-500 lg:flex-none lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[2.2rem] ${
                        isActive ? 'lg:opacity-0' : ''
                      } ${isActive ? 'max-lg:opacity-100' : ''}`}
                    >
                      {v.title}
                    </span>
                    <Plus
                      aria-hidden
                      className={`size-5 shrink-0 transition-transform duration-500 lg:hidden ${isActive ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>

                <div
                  id={`vs-body-${v.key}`}
                  role="region"
                  aria-label={v.title}
                  inert={!isActive}
                  className={`absolute inset-x-0 bottom-0 z-10 p-6 transition-[opacity,transform] lg:p-10 ${
                    isActive
                      ? 'translate-y-0 opacity-100 delay-300 duration-700'
                      : 'pointer-events-none translate-y-6 opacity-0 duration-300'
                  }`}
                >
                  <p className="label text-[0.62rem] text-cobalt-soft">{v.short}</p>
                  <p className="mt-3 hidden font-display text-h2 lg:block" aria-hidden>
                    {v.title}
                  </p>
                  <p className="mt-4 max-w-md text-ivory/85">{v.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
