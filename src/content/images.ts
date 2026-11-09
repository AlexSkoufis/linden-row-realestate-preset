/** Supplementary photography licensed under the Unsplash License (free for commercial use).
 *  Images are illustrative only and do not depict Linden Row properties. */

export type ImageMeta = { w: number; h: number; alt: string; unsplash: string }

export const images = {
  'hero-facade': { w: 2600, h: 1740, alt: 'Corner of a contemporary residential building clad in grey stone against a deep blue sky', unsplash: 'photo-1448630360428-65456885c650' },
  'multifamily-modern': { w: 2600, h: 1733, alt: 'Modern multifamily building with dark framed windows under a clear sky', unsplash: 'photo-1515263487990-61b07816b324' },
  'balconies': { w: 2600, h: 1733, alt: 'Repeating balconies across the facade of an apartment building', unsplash: 'photo-1460317442991-0ec209397118' },
  'apartments-sun': { w: 2600, h: 1924, alt: 'Low-rise apartment building with balconies in late afternoon sun', unsplash: 'photo-1574362848149-11496d93a7c7' },
  'townhomes': { w: 2600, h: 1733, alt: 'Row of attached townhomes with gabled roofs and painted siding', unsplash: 'photo-1567496898669-ee935f5f647a' },
  'brick-homes': { w: 2600, h: 1733, alt: 'Pair of traditional brick homes with chimneys and slate roofs', unsplash: 'photo-1430285561322-7808604715df' },
  'blueprint': { w: 2600, h: 1463, alt: 'Hands reviewing architectural plans on a desk', unsplash: 'photo-1503387762-592deb58ef4e' },
  'construction': { w: 2600, h: 1722, alt: 'Overhead view of a construction crew placing rebar on a building deck', unsplash: 'photo-1504307651254-35680f356dfd' },
  'site-team': { w: 2600, h: 1733, alt: 'Construction team in safety gear reviewing a large site from above', unsplash: 'photo-1541888946425-d81bb19240f5' },
  'renovation': { w: 2600, h: 1730, alt: 'Interior under renovation with exposed brick and framing', unsplash: 'photo-1517581177682-a085bb7ffb15' },
  'maintenance': { w: 2600, h: 1733, alt: 'Maintenance technician working with tools', unsplash: 'photo-1558618666-fcd25c85cd64' },
  'structure-lines': { w: 2600, h: 1733, alt: 'Abstract close up of angled architectural metal fins', unsplash: 'photo-1488972685288-c3fd157d7c7a' },
  'white-stack': { w: 2600, h: 3680, alt: 'White stacked residential building against a pale sky', unsplash: 'photo-1479839672679-a46483c0e7c8' },
  'kitchen': { w: 2600, h: 1727, alt: 'Bright apartment kitchen with white cabinets and pendant lights', unsplash: 'photo-1484154218962-a197022b5858' },
  'tower-balconies': { w: 2600, h: 3250, alt: 'White residential tower with layered balconies against a cobalt sky', unsplash: 'photo-1551361415-69c87624334f' },
  'winter-dusk': { w: 2600, h: 1745, alt: 'Contemporary home glowing at dusk in a snowy winter landscape', unsplash: 'photo-1513584684374-8bab748fbf90' },
  'living': { w: 2600, h: 1735, alt: 'Sunlit apartment living room with a blue sofa and herringbone floor', unsplash: 'photo-1493809842364-78817add7ffb' },
  'morning-home': { w: 2600, h: 1733, alt: 'Timber home among tall trees in early morning light', unsplash: 'photo-1449844908441-8829872d2607' },
  'interior-light': { w: 2600, h: 1950, alt: 'Calm, sunlit living space with tall windows and natural materials', unsplash: 'photo-1600210492486-724fe5c67fb0' },
} satisfies Record<string, ImageMeta>

export type ImageName = keyof typeof images
