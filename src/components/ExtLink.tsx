import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** External link that always opens safely in a new tab. */
export function ExtLink({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
