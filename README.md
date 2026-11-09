# Linden Row Real Estate Partners — Real Estate Fund Preset

A cinematic, multi-page website for a **fictional** private real estate fund sponsor that buys, improves and holds apartment homes in Southeast Wisconsin. Architectural neutrals (ink, charcoal, ivory and concrete) with a single cobalt signal colour; Instrument Serif + Manrope. The logo is three row-house gables under a linden canopy, drawn in SVG.

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, Flip, SplitText) · Lenis · React Router 7 · Lucide.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into ./dist
npm run preview    # serve the production build on :4173
```

## Pages

| Route | Page | Composition |
|---|---|---|
| `/` | Home | The ten chapters below |
| `/approach` | Investment Approach | Philosophy intro and fund profile, then Principles, Horizon and Operations |
| `/funds` | Our Funds | Why a fund, How a Fund Works, Where Returns Come From, open funds call to action |
| `/alignment` | Shared Incentives | Four commitments, the roles split screen and a partnership quote |
| `/investors` | Investor Information | Three steps to a first fund, investor experience, client access cards |
| `/contact` | Contact | Office cards with map links, email and phone |
| `*` | 404 | "This page has no foundation." |

Page changes run through a curtain transition that shows the logo mark.

## Homepage chapters

| # | Section | Anchor | Composition |
|---|---|---|---|
| 01 | Hero | `#hero-title` | A small architectural frame opens to full bleed, the photo settles from a deep zoom, the headline rises line by line |
| 02 | Philosophy | `#philosophy` | Pinned statement whose key words light up on scroll while the page shifts from ivory to charcoal |
| 03 | Principles | `#principles` | Four pinned chapters with image wipes, an odometer numeral and a progress rail (vertical sequence on mobile) |
| 04 | How a Fund Works | `#how-we-invest` | Sticky image panel synchronised with five stages and a self-drawing line |
| 05 | Operations | `#operations` | An architectural plate grows to full bleed, labels pin around it, operating figures resolve below |
| 06 | Shared Incentives | `#alignment` | Sticky statement beside four roles, cursor-following image preview on fine pointers |
| 07 | Where Returns Come From | `#value` | Four panels that expand with GSAP Flip on hover, click, tap or keyboard |
| 08 | Holding Period | `#horizon` | Layered parallax imagery and a cadence line across four rhythms of ownership |
| 09 | Investor Experience | `#investor-experience` | A fan of abstract document plates that opens on scroll |
| 10 | Join | `#join` | Photo opens from a centred window, magnetic CTAs |

## Re-skin

- **Copy & data**: almost everything is in `src/content/site.ts`: brand, contact and offices, navigation, client access, every homepage chapter, fund profile and the footer disclosure. Page-level headlines and SEO descriptions sit at the top of each file in `src/pages/`. The default page title and description are in `index.html`.
- **Links**: `links` in `site.ts` holds the investor portal, investor list, onboarding and borrower portal destinations. In the demo they all point to `/contact`; replace them with your own URLs.
- **Logo**: `src/components/Logo.tsx` (wordmark + `LogoMark`, used by the header, footer and page curtain). Favicons and the social image are in `public/brand/`.
- **Photos**: `public/images/` holds 640 / 1280 / 2400 px WebP ladders, registered with alt text in `src/content/images.ts`. Add a ladder, register it, and reference it by key.
- **Colour & type**: tokens in `src/styles/index.css`. The cobalt accent is also hard-coded in the Philosophy word highlight (`src/sections/home/Philosophy.tsx`) and the logo.

## Imagery

All photographs are from Unsplash under the Unsplash License (free for commercial use); the source IDs are listed in `src/content/images.ts`. They are illustrative and captioned as such on the site.

## Motion and safety

- Animation runs in `useGSAP` / `gsap.matchMedia` scopes that revert on unmount and respect `prefers-reduced-motion`.
- Lenis smooth scrolling is driven by the GSAP ticker; pinned chapters fall back to vertical sequences on small screens.
- The disclosure in `site.ts` is sample language. Have your counsel review it before launch.

## Deploy

Static SPA in `dist/`. All routes must fall back to `index.html`: `vercel.json` and `public/_redirects` (Netlify) already do this. The demo ships with `noindex` (in `index.html`, the `Seo` component, `vercel.json` and `public/robots.txt`); remove it when the site goes live.

## Demo content

Linden Row Real Estate Partners, its funds, figures, offices and email (`.example`) are fictional, and the phone number is a 555 placeholder.
