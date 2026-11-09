import { Seo } from '../components/Seo'
import { TLink } from '../lib/transition'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." />
      <section className="on-dark grain flex min-h-svh items-center bg-ink text-ivory" aria-labelledby="nf-title">
        <div className="container-x relative z-[2] pt-[var(--header-h)]">
          <p className="label text-ivory/70">404</p>
          <h1 id="nf-title" className="mt-6 font-display text-display">
            This page has <em className="text-cobalt-soft">no foundation.</em>
          </h1>
          <TLink to="/" className="btn mt-12">
            Return home
          </TLink>
        </div>
      </section>
    </>
  )
}
