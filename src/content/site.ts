/**
 * All copy, links and contact data for the Linden Row demo.
 * Linden Row Real Estate Partners is a fictional firm: names, addresses, the email
 * (.example) and the phone number (555) are placeholders. Replace them with your own.
 */

export const brand = {
  name: 'Linden Row',
  legal: 'Linden Row Real Estate Partners',
  tagline: 'Private Real Estate Funds',
} as const

/**
 * Portal and form destinations. In the demo they point to the contact page;
 * swap in your investor portal, onboarding form and borrower portal URLs.
 */
export const links = {
  investorPortal: '/contact',
  investorList: '/contact',
  aboutYou: '/contact',
  borrowerPortal: '/contact',
} as const

export const contact = {
  email: 'ir@lindenrow.example',
  phoneDisplay: '(414) 555-0142',
  phoneHref: 'tel:+14145550142',
  region: 'Southeast Wisconsin',
  offices: [
    {
      name: 'Third Ward Office',
      street: '240 N Linden Row',
      city: 'Milwaukee, WI 53202',
      region: 'WI',
      postalCode: '53202',
      map: 'https://www.google.com/maps/search/?api=1&query=Historic+Third+Ward+Milwaukee+WI',
    },
    {
      name: 'Tosa Village Office',
      street: '7410 Harmon Ave.',
      city: 'Wauwatosa, WI 53213',
      region: 'WI',
      postalCode: '53213',
      map: 'https://www.google.com/maps/search/?api=1&query=Wauwatosa+Village+WI',
    },
  ],
} as const

export const nav = [
  { label: 'Approach', to: '/approach' },
  { label: 'Funds', to: '/funds' },
  { label: 'Alignment', to: '/alignment' },
  { label: 'Investors', to: '/investors' },
  { label: 'Contact', to: '/contact' },
] as const

export const clientAccess = [
  {
    label: 'Investors',
    body: 'Statements, distributions, quarterly letters and K-1s, whenever you want them.',
    cta: 'Investor Portal',
    href: links.investorPortal,
  },
  {
    label: 'Borrowers',
    body: 'Check your balance, schedule payments and download loan documents.',
    cta: 'Borrower Portal',
    href: links.borrowerPortal,
  },
] as const

export const hero = {
  eyebrow: 'Private Real Estate Funds',
  titleLines: ['Patient capital.', 'Well-kept', 'buildings.'],
  lead: 'Linden Row brings investors together in funds that buy, improve and hold apartment homes across Southeast Wisconsin, with modest debt and our own team running every property.',
  pillars: ['Steady Income', 'Protected Principal', 'Compounding Equity'],
}

export const philosophy = {
  eyebrow: 'How We Think',
  statement:
    'A good deal is rarely the loudest one. We look for buildings where the price, the rents, the loan and the plan to run them all point the same way, and we pass on the rest.',
  highlight: ['price,', 'rents,', 'loan', 'plan'],
  body: [
    'A shared fund can buy buildings, and absorb surprises, that no single investor would want to take on alone.',
    'We favour properties that pay their own way from the first month, so new capital calls stay rare and money goes to work sooner.',
  ],
  tenets: ['Steady income', 'Protected principal', 'Compounding equity', 'A spread of buildings'],
}

export const principles = [
  {
    n: '01',
    title: 'Patient',
    kicker: 'Years, not quarters',
    body: 'We plan most holds for five years or longer. Time lets a building settle, rents mature and improvements earn their keep.',
    image: 'brick-homes',
  },
  {
    n: '02',
    title: 'Hands-on',
    kicker: 'We run what we own',
    body: 'Our own leasing, maintenance and accounting teams look after every property, so the plan on paper is the plan on site.',
    image: 'construction',
  },
  {
    n: '03',
    title: 'Modest Debt',
    kicker: 'Room to breathe',
    body: 'Borrowing can lift returns, and it can sink them. We keep leverage moderate and reserves generous, so a soft year stays a soft year.',
    image: 'white-stack',
  },
  {
    n: '04',
    title: 'Local',
    kicker: 'Neighbourhoods we know',
    body: 'We buy within an hour of our offices, in streets we walk every week. Knowing the block is worth more than any market report.',
    image: 'townhomes',
  },
] as const

export const journey = [
  {
    n: '01',
    title: 'Investors commit',
    body: 'Investors subscribe to a Linden Row fund alongside our partners. Pooling commitments gives the fund the scale to buy well and spreads risk across several buildings.',
    image: 'structure-lines',
  },
  {
    n: '02',
    title: 'We underwrite',
    body: 'Our acquisitions team walks every property, rebuilds the rent roll and stress-tests the loan. Most buildings we look at do not make it past this stage.',
    image: 'site-team',
  },
  {
    n: '03',
    title: 'We acquire',
    body: 'The fund buys income-producing homes with moderate debt and a reserve set aside on day one, so distributions do not depend on everything going right.',
    image: 'apartments-sun',
  },
  {
    n: '04',
    title: 'We operate',
    body: 'Closing is the start of the work. Our teams handle leasing, repairs, capital projects, bookkeeping and refinancing, and decide when to hold and when to sell.',
    image: 'maintenance',
  },
  {
    n: '05',
    title: 'You stay informed',
    body: 'Investors own a share of a managed portfolio without the late-night calls, and can follow statements, distributions and tax documents online.',
    image: 'kitchen',
  },
] as const

export const operations = {
  eyebrow: 'Operating Discipline',
  title: ['Returns are earned', 'on site.'],
  body: 'Spreadsheets do not fix boilers. Our results come from the everyday decisions our own teams make in the buildings our investors own.',
  labels: ['Repairs', 'Rent setting', 'Refinancing', 'Resident care', 'Contractor schedules', 'Hold or sell'],
  credentials: [
    { big: '1,400+', small: 'apartment homes under our management' },
    { big: '38', small: 'buildings acquired since our first fund' },
    { big: 'Two offices', small: 'within an hour of every property' },
    { big: 'Quarterly', small: 'letters, statements and distribution reviews' },
  ],
}

export const roles = [
  {
    title: 'Linden Row',
    tag: 'The Sponsor',
    body: 'As sponsor we find the buildings, arrange the financing and carry the plan. Our job is to bring the fund only the deals we would buy on our own.',
    image: 'blueprint',
  },
  {
    title: 'Shared Stakes',
    tag: 'Our capital first',
    body: 'Our partners invest in every fund we raise. There are no acquisition fees up front; most of what we earn comes after investors have been paid their preferred return.',
    image: 'tower-balconies',
  },
  {
    title: 'Investors',
    tag: 'Ownership without the keys',
    body: 'Investors share in the income and growth of a professionally run portfolio, without tenants, contractors or 2 a.m. phone calls.',
    image: 'living',
  },
  {
    title: 'Property Teams',
    tag: 'Where the plan happens',
    body: 'Every building needs care, and most need improvement. Our property teams handle the leasing, the repairs, the books and the capital projects.',
    image: 'maintenance',
  },
] as const

export const values = [
  {
    key: 'cash-flow',
    n: 'I',
    title: 'Income',
    short: 'Rent, net of costs',
    body: 'What a building earns after expenses and debt service is the heart of each fund. Our target is to distribute quarterly when there is income to share.',
    image: 'multifamily-modern',
  },
  {
    key: 'appreciation',
    n: 'II',
    title: 'Growth',
    short: 'Value you can add',
    body: 'Property values tend to rise over long periods, though they can also fall. Thoughtful upgrades and better management can add value of their own.',
    image: 'renovation',
  },
  {
    key: 'principal',
    n: 'III',
    title: 'Equity Build',
    short: 'Paid down by rent',
    body: 'Every loan payment retires a little more of the mortgage. Over a long hold, residents’ rent quietly builds the fund’s equity.',
    image: 'living',
  },
  {
    key: 'tax',
    n: 'IV',
    title: 'Tax Efficiency',
    short: 'Depreciation and more',
    body: 'Owning real property can carry tax advantages such as depreciation, which may improve after-tax returns. Everyone’s situation differs, so speak to your own tax advisor.',
    image: 'structure-lines',
  },
] as const

export const horizon = {
  eyebrow: 'Holding Period',
  title: 'Built to be held.',
  body: 'We plan most investments for five years or more. A long hold gives each building time to be run properly, rather than dressed up for a quick sale.',
  cadence: [
    { when: 'Monthly', what: 'Loan payments chip away at the mortgage balance.' },
    { when: 'Quarterly', what: 'Results are reviewed and income is distributed when it is there.' },
    { when: 'Year by year', what: 'Upgrades, rent growth and time give value room to build.' },
    { when: 'Five years +', what: 'Our typical planned hold for each fund.' },
  ],
}

export const portal = {
  eyebrow: 'Investor Experience',
  title: 'Your fund, in your pocket.',
  body: 'Every Linden Row investor gets a secure online account to follow their holdings whenever it suits them.',
  features: [
    { title: 'Holdings', body: 'See each fund and building you own a share of.' },
    { title: 'Performance', body: 'Follow returns fund by fund over time.' },
    { title: 'Distributions', body: 'A clear history of every payment made.' },
    { title: 'Tax Documents', body: 'Download K-1s as soon as they are ready.' },
    { title: 'Letters', body: 'Quarterly updates from our partners, all in one place.' },
  ],
}

export const fit = {
  quote:
    'We would rather have fewer investors who stay for decades than many who stay for a year. So we take time to understand what you need before we suggest a fund.',
  list: 'New funds and co-investments open to our investor list first. Add your name and we will be in touch.',
}

export const funds = {
  eyebrow: 'Our Funds',
  title: 'Private real estate funds.',
  body: [
    'Buying a building alone ties up a lot of capital for a long time, and puts every surprise on one person’s shoulders. Good opportunities also rarely wait for you to be ready.',
    'A fund lets investors combine their capital, own a share of several buildings at once and leave the day-to-day work to an experienced team, so real estate can become genuinely passive income.',
  ],
  profile: [
    { label: 'Property type', value: 'Apartments and small mixed-use' },
    { label: 'Planned hold', value: 'Five years or longer' },
    { label: 'Our advantage', value: 'In-house property management' },
    { label: 'First priority', value: 'Protecting principal' },
  ],
}

export const disclosure =
  'This website is for information only and is not an offer to sell, or a solicitation of an offer to buy, any security. Real estate investments carry risk, including the loss of capital, and are generally illiquid. Distributions are not guaranteed, and past performance does not predict future results. Any offering is made solely through its offering documents and may be limited to accredited investors. Photography is illustrative and does not show Linden Row properties.'
