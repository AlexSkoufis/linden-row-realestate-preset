import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { NextPage } from '../components/NextPage'
import { links, clientAccess } from '../content/site'
import { useReveal } from '../lib/useReveal'
import { InvestorExperience } from '../sections/home/InvestorExperience'
import { JoinCta } from '../sections/home/JoinCta'

const path = [
  {
    n: '01',
    title: 'Join the investor list',
    body: 'Add your name and we will let you know when a fund opens that suits your goals.',
    cta: 'Join the Investor List',
    href: links.investorList,
  },
  {
    n: '02',
    title: 'Tell us about yourself',
    body: 'A short call helps us understand your timeline, income needs and appetite for risk before we suggest anything.',
    cta: 'Start a Conversation',
    href: links.aboutYou,
  },
  {
    n: '03',
    title: 'Follow your investment',
    body: 'Your online account shows holdings, performance, distributions, letters and tax documents.',
    cta: 'Investor Sign In',
    href: links.investorPortal,
  },
]

export default function Investors() {
  const steps = useRef<HTMLElement>(null)
  const access = useRef<HTMLElement>(null)
  useReveal(steps)
  useReveal(access)

  return (
    <>
      <Seo
        title="Investor Information"
        description="Join the Linden Row investor list, start a conversation with our partners, and follow your holdings, distributions and tax documents online."
      />
      <PageHero
        index="01"
        eyebrow="Investor Information"
        lines={['Ownership,', 'without the keys.']}
        accent={1}
        image="interior-light"
        lead={
          <p>
            Our investors share in the income and growth of well-run apartment buildings, while our teams take care of the
            tenants, the repairs and the paperwork.
          </p>
        }
      />

      <section ref={steps} aria-labelledby="inv-path" className="bg-ivory text-ink section-y">
        <div className="container-x">
          <p data-reveal className="label text-muted">
            Becoming a Linden Row investor
          </p>
          <h2 id="inv-path" data-reveal-lines className="mt-6 max-w-4xl font-display text-h1">
            Three simple steps to your first fund.
          </h2>
          <ol className="mt-16">
            {path.map((p) => (
              <li key={p.n} data-reveal className="group grid gap-6 border-t border-ink/12 py-10 md:grid-cols-12 md:items-baseline">
                <span className="num font-display text-5xl text-ink/25 md:col-span-2">{p.n}</span>
                <h3 className="font-display text-h2 md:col-span-4">{p.title}</h3>
                <p className="text-muted md:col-span-4">{p.body}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link label w-fit text-[0.64rem] text-cobalt md:col-span-2 md:justify-self-end"
                >
                  {p.cta}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <InvestorExperience index="02" />

      <section ref={access} aria-labelledby="inv-access" className="on-dark bg-charcoal text-ivory section-y">
        <div className="container-x">
          <h2 id="inv-access" data-reveal-lines className="font-display text-h1">
            Client Access.
          </h2>
          <ul className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-2">
            {clientAccess.map((c) => (
              <li key={c.label} data-reveal className="bg-charcoal">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[20rem] flex-col justify-between p-8 transition-colors duration-700 hover:bg-graphite md:p-12"
                >
                  <span className="label text-[0.62rem] text-mist">{c.label}</span>
                  <span>
                    <span className="block font-display text-h1 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {c.cta}
                    </span>
                    <span className="mt-4 block max-w-sm text-ivory/70">{c.body}</span>
                    <span className="label mt-8 inline-flex items-center gap-2 text-[0.64rem] text-cobalt-soft">
                      Open portal
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinCta index="04" />
      <NextPage to="/contact" label="Contact Linden Row" image="morning-home" />
    </>
  )
}
