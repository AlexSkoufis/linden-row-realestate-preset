import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { NextPage } from '../components/NextPage'
import { Img } from '../components/Img'
import { philosophy, funds } from '../content/site'
import { useReveal } from '../lib/useReveal'
import { Principles } from '../sections/home/Principles'
import { Horizon } from '../sections/home/Horizon'
import { Operations } from '../sections/home/Operations'

export default function Approach() {
  const intro = useRef<HTMLElement>(null)
  useReveal(intro)

  return (
    <>
      <Seo
        title="Investment Approach"
        description="Linden Row’s investment approach: holds of five years or more, moderate debt, income-producing apartment homes and in-house property management."
      />
      <PageHero
        index="01"
        eyebrow="Investment Approach"
        lines={['Steady income.', 'Protected principal.', 'Compounding equity.']}
        accent={2}
        image="white-stack"
        lead={<p>{philosophy.statement}</p>}
      />

      <section ref={intro} aria-labelledby="ap-intro" className="bg-ivory text-ink section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="label text-muted">
              {philosophy.eyebrow}
            </p>
            <h2 id="ap-intro" data-reveal-lines className="mt-6 font-display text-h1">
              Spread the risk. Keep the discipline.
            </h2>
          </div>
          <div className="space-y-6 text-lead text-muted lg:col-span-5 lg:col-start-8">
            {philosophy.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <dl className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {funds.profile.map((f) => (
              <div key={f.label} data-reveal className="bg-ivory py-8 pr-6 sm:px-6 lg:first:pl-0">
                <dt className="label text-[0.62rem] text-muted">{f.label}</dt>
                <dd className="mt-3 font-display text-h3">{f.value}</dd>
              </div>
            ))}
          </dl>
          <figure data-reveal-img className="media aspect-[21/9] lg:col-span-12">
            <Img name="site-team" sizes="100vw" />
          </figure>
        </div>
      </section>

      <Principles index="02" />
      <Horizon index="03" />
      <Operations index="04" />
      <NextPage to="/funds" label="Real Estate Funds" image="apartments-sun" />
    </>
  )
}
