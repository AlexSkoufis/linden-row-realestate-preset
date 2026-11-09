import { useLocation } from 'react-router-dom'

type Props = { title: string; description: string; image?: string; jsonLd?: object }

const SITE = 'Linden Row'

/** Page level metadata. React 19 hoists these tags into <head>. */
export function Seo({ title, description, image = '/brand/og.jpg', jsonLd }: Props) {
  const { pathname } = useLocation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = `${origin}${pathname}`
  const full = title === SITE ? `${SITE} | Private Real Estate Funds` : `${title} | ${SITE}`
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${origin}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
