type Props = { children: string; index?: string; className?: string }

/** Section label with an architectural index marker. */
export function Eyebrow({ children, index, className = '' }: Props) {
  return (
    <p className={`label flex items-center gap-4 ${className}`}>
      {index && <span className="num opacity-60">{index}</span>}
      <span aria-hidden className="inline-block h-px w-10 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  )
}
