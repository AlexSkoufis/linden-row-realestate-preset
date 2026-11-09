import { ArrowRight } from 'lucide-react'
import { TLink } from '../lib/transition'
import type { ImageName } from '../content/images'
import { Img } from './Img'

type Props = { to: string; label: string; image: ImageName }

/** Oversized "next chapter" link with an image that unmasks on hover. */
export function NextPage({ to, label, image }: Props) {
  return (
    <nav aria-label="Next page" className="bg-ivory text-ink">
      <TLink
        to={to}
        className="group container-x relative flex min-h-[50svh] flex-col justify-center overflow-hidden border-t border-ink/10 py-24"
      >
        <span className="label relative z-10 text-[0.64rem] text-muted transition-colors duration-700 group-hover:text-ivory/80">
          Next chapter
        </span>
        <span className="relative z-10 mt-6 flex items-end justify-between gap-6 font-display text-display transition-colors duration-700 group-hover:text-ivory">
          <span>{label}</span>
          <ArrowRight
            aria-hidden
            className="mb-[0.15em] size-[0.6em] shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3"
            strokeWidth={1}
          />
        </span>
        <span
          aria-hidden
          className="absolute inset-0 [clip-path:inset(100%_0%_0%_0%)] transition-[clip-path] duration-[1s] ease-[var(--ease-arch)] group-hover:[clip-path:inset(0%_0%_0%_0%)] group-focus-visible:[clip-path:inset(0%_0%_0%_0%)]"
        >
          <Img name={image} decorative sizes="100vw" className="h-full w-full object-cover" />
          <span className="absolute inset-0 bg-ink/60" />
        </span>
      </TLink>
    </nav>
  )
}
