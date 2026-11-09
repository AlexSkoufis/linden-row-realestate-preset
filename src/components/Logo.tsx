type Props = { variant?: 'light' | 'dark'; className?: string; title?: string }

/**
 * Linden Row wordmark: three row-house gables under a linden canopy,
 * set beside the name in the display serif. "light" is for dark backgrounds.
 * The text uses the site fonts, so it always matches the page typography.
 */
export function Logo({ variant = 'light', className = '', title = 'Linden Row Real Estate Partners' }: Props) {
  const ink = variant === 'light' ? '#f5f2ec' : '#111413'
  return (
    <svg
      viewBox="0 0 300 62"
      role="img"
      aria-label={title}
      className={`block h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <LogoMark x={0} y={3} size={56} ink={ink} accent={variant === 'light' ? '#93a4ff' : '#1336e5'} />
      <text
        x="70"
        y="36"
        fill={ink}
        style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", fontSize: 38, letterSpacing: '-0.01em' }}
      >
        Linden Row
      </text>
      <text
        x="71.5"
        y="54"
        fill={ink}
        opacity={0.72}
        style={{ fontFamily: "'Manrope Variable', 'Manrope', sans-serif", fontSize: 8.4, fontWeight: 600, letterSpacing: '0.32em' }}
      >
        REAL ESTATE PARTNERS
      </text>
    </svg>
  )
}

/** The mark alone, reused by the page-transition curtain and the favicon. */
export function LogoMark({ x = 0, y = 0, size = 56, ink = '#f5f2ec', accent = '#93a4ff' }: { x?: number; y?: number; size?: number; ink?: string; accent?: string }) {
  const s = size / 56
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* canopy */}
      <path d="M4 22 C 12 4, 44 4, 52 22" fill="none" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
      {/* three gabled row houses */}
      <path d="M4 54 V34 L12 27 L20 34 V54" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 54 V30 L28 22 L36 30 V54" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 54 V34 L44 27 L52 34 V54" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M2 54 H54" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}
