import { useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '../lib/useMagnetic'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  magnetic?: boolean
  className?: string
  /** External links open in a new tab with an accessible hint. */
  external?: boolean
}

/** Pill CTA with fill-wipe hover and optional magnetic pull. */
export function CtaLink({ href, children, variant = 'solid', magnetic = true, className = '', external = true }: Props) {
  const wrap = useRef<HTMLSpanElement>(null)
  useMagnetic(wrap, 0.28, magnetic)
  return (
    <span ref={wrap} className={`inline-flex ${className}`}>
      <a
        href={href}
        className={`btn ${variant === 'ghost' ? 'btn-ghost' : ''}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span>{children}</span>
        <ArrowUpRight className="btn-icon size-4" strokeWidth={1.75} aria-hidden />
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </span>
  )
}
