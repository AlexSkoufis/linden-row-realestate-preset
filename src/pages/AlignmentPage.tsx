import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { NextPage } from '../components/NextPage'
import { fit } from '../content/site'
import { useReveal } from '../lib/useReveal'
import { Alignment } from '../sections/home/Alignment'

const commitments = [
  { k: 'No acquisition fees', v: 'We do not charge a fee for buying a building.' },
  { k: 'Investors paid first', v: 'Our share of the profit starts only after your preferred return.' },
  { k: 'Partners invest too', v: 'Every Linden Row partner has personal capital in each fund.' },
  { k: 'Fewer, better deals', v: 'We would rather miss a deal than overpay for one.' },
]

export default function AlignmentPage() {
  const fees = useRef<HTMLElement>(null)
  const quote = useRef<HTMLElement>(null)
  useReveal(fees)
  useReveal(quote)

  return (
    <>
      <Seo
        title="Alignment of Interests"
        description="How Linden Row shares incentives with investors: no acquisition fees, a profit share that follows the preferred return, and partner capital in every fund."
      />
      <PageHero
        index="01"
        eyebrow="Alignment of Interests"
        lines={['On the same', 'side of the table.']}
        accent={1}
        image="tower-balconies"
        lead={<p>We are paid when our investors do well, and not before. That shapes which buildings we buy and how carefully we run them.</p>}
      />

      <section ref={fees} aria-labelledby="al-commit" className="bg-ivory text-ink section-y">
        <div className="container-x">
          <h2 id="al-commit" data-reveal-lines className="max-w-4xl font-display text-h1">
            How we are paid decides how we invest.
          </h2>
          <ol className="mt-16 grid gap-px bg-ink/10 md:grid-cols-2">
            {commitments.map((c, i) => (
              <li key={c.k} data-reveal className="group bg-ivory p-8 transition-colors duration-700 hover:bg-paper md:p-12">
                <span className="num label text-[0.62rem] text-cobalt">0{i + 1}</span>
                <h3 className="mt-6 font-display text-h2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {c.k}
                </h3>
                <p className="mt-4 max-w-md text-muted">{c.v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-sm text-muted">
            Shared incentives do not remove investment risk. Fees and sponsor compensation for each fund are set out in its
            offering documents.
          </p>
        </div>
      </section>

      <Alignment index="02" />

      <section ref={quote} aria-label="Partnership" className="on-dark bg-ink text-ivory section-y">
        <div className="container-x">
          <blockquote className="max-w-5xl">
            <p data-reveal-lines className="font-display text-h1">
              &ldquo;{fit.quote}&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      <NextPage to="/investors" label="Investor Information" image="interior-light" />
    </>
  )
}
