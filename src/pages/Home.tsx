import { Seo } from '../components/Seo'
import { contact } from '../content/site'
import { Hero } from '../sections/home/Hero'
import { Philosophy } from '../sections/home/Philosophy'
import { Principles } from '../sections/home/Principles'
import { HowWeInvest } from '../sections/home/HowWeInvest'
import { Operations } from '../sections/home/Operations'
import { Alignment } from '../sections/home/Alignment'
import { ValueSources } from '../sections/home/ValueSources'
import { Horizon } from '../sections/home/Horizon'
import { InvestorExperience } from '../sections/home/InvestorExperience'
import { JoinCta } from '../sections/home/JoinCta'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Linden Row Real Estate Partners',
  description: 'Private real estate funds investing in apartment homes across Southeast Wisconsin.',
  email: contact.email,
  telephone: contact.phoneHref.replace('tel:', ''),
  areaServed: contact.region,
  location: contact.offices.map((o) => ({
    '@type': 'Place',
    name: o.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.street,
      addressLocality: o.city.split(',')[0],
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: 'US',
    },
  })),
}

export default function Home() {
  return (
    <>
      <Seo
        title="Linden Row"
        description="Linden Row Real Estate Partners: private real estate funds built on steady income, moderate debt and in-house management of apartment homes across Southeast Wisconsin."
        jsonLd={jsonLd}
      />
      <Hero />
      <Philosophy />
      <Principles />
      <HowWeInvest />
      <Operations />
      <Alignment />
      <ValueSources />
      <Horizon />
      <InvestorExperience />
      <JoinCta />
    </>
  )
}
