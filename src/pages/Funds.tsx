import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { NextPage } from '../components/NextPage'
import { CtaLink } from '../components/CtaLink'
import { Img } from '../components/Img'
import { funds, fit, links } from '../content/site'
import { useReveal } from '../lib/useReveal'
import { HowWeInvest } from '../sections/home/HowWeInvest'
import { ValueSources } from '../sections/home/ValueSources'

export default function Funds() {
  const body = useRef<HTMLElement>(null)
  const opp = useRef<HTMLElement>(null)
  useReveal(body)
  useReveal(opp)

  return (
    <>
      <Seo
        title="Real Estate Funds"
        description="How Linden Row real estate funds work: investors combine capital, our team buys and runs income-producing apartment homes, and investors share in the results."
      />
      <PageHero
        index="01"
        eyebrow={funds.eyebrow}
        lines={['Private', 'real estate funds.']}
        accent={1}
        image="multifamily-modern"
        lead={<p>{funds.body[0]}</p>}
      />

      <section ref={body} aria-labelledby="fd-why" className="bg-ivory text-ink section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
          <figure data-reveal-img className="media aspect-[4/5] lg:col-span-5">
            <Img name="townhomes" sizes="(min-width: 1024px) 40vw, 100vw" />
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal className="label text-muted">
              Why invest through a fund
            </p>
            <h2 id="fd-why" data-reveal-lines className="mt-6 font-display text-h1">
              More buildings. Less weight on any one.
            </h2>
            <p data-reveal className="mt-8 max-w-xl text-lead text-muted">
              {funds.body[1]}
            </p>
            <span data-reveal-rule aria-hidden className="mt-12 block h-px bg-ink/15" />
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {funds.profile.map((f) => (
                <div key={f.label} data-reveal className="border-b border-ink/10 py-6">
                  <dt className="label text-[0.62rem] text-muted">{f.label}</dt>
                  <dd className="mt-2 font-display text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <HowWeInvest index="02" />
      <ValueSources index="03" />

      <section ref={opp} aria-labelledby="fd-opp" className="bg-ivory text-ink section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="label text-muted">
              Open funds
            </p>
            <h2 id="fd-opp" data-reveal-lines className="mt-6 font-display text-h1">
              Our investor list hears about every new fund first.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal className="text-lead text-muted">
              {fit.list}
            </p>
            <div data-reveal className="on-light mt-8 flex flex-wrap gap-3">
              <CtaLink href={links.investorList}>Join the Investor List</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <NextPage to="/alignment" label="Alignment of Interests" image="tower-balconies" />
    </>
  )
}
