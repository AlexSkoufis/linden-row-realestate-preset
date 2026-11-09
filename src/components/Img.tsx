import type { ImgHTMLAttributes } from 'react'
import { images, type ImageName } from '../content/images'

const WIDTHS = [640, 1280, 2400] as const

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> & {
  name: ImageName
  /** Override alt text; pass decorative to hide from assistive tech. */
  alt?: string
  decorative?: boolean
  priority?: boolean
}

export const imageSrc = (name: ImageName, w: (typeof WIDTHS)[number] = 1280) => `/images/${name}-${w}.webp`

/** Responsive WebP image with intrinsic dimensions to prevent layout shift. */
export function Img({ name, alt, decorative, priority, sizes = '100vw', className, ...rest }: Props) {
  const meta = images[name]
  return (
    <img
      src={imageSrc(name)}
      srcSet={WIDTHS.map((w) => `${imageSrc(name, w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={decorative ? '' : (alt ?? meta.alt)}
      aria-hidden={decorative || undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      draggable={false}
      {...rest}
    />
  )
}
