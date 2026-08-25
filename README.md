# Anjila Portfolio Clone

Pixel-accurate Next.js 15 clone of anjicodes.co/cv

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — all animations
- **Lenis** — smooth scroll
- **Lucide React** — icons
- **Bebas Neue + DM Sans** — fonts

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Customize Your Content

**ONE FILE to change:** `constants/content.ts`

Edit:
- `siteConfig` — name, title, email, socials, resume URL
- `passionStatement` — the large stacked text lines
- `journey` — work experience entries
- `expertise` — skill categories with percentages
- `education` — schools with CGPA
- `achievements` — awards with descriptions

## Add Your Photos

1. **Hero photo** — put file in `/public/hero.jpg`
   Then in `components/sections/HeroSection.tsx`, replace the placeholder div with:
   ```tsx
   import Image from "next/image";
   <Image src="/hero.jpg" fill alt="Profile" className="object-cover object-top" />
   ```

2. **Achievement photos** — put in `/public/achievements/`
   Update image paths in `constants/content.ts`

3. **Resume PDF** — put in `/public/resume.pdf`

## Structure

```
/app
  layout.tsx          — root layout (fonts, cursor, Lenis)
  page.tsx            — main page (all sections assembled)
  globals.css         — global styles, CSS vars, cursor, noise

/components
  /layout
    Navbar.tsx        — sticky nav with blur on scroll
    Footer.tsx        — footer with email CTA
    SmoothScrollProvider.tsx — Lenis wrapper

  /sections
    HeroSection.tsx   — hero with watermark, photo, stats
    PassionSection.tsx — large stacked low-opacity text
    JourneySection.tsx — work experience timeline
    ExpertiseSection.tsx — numbered skill categories
    EducationSection.tsx — education cards with watermark
    AchievementsSection.tsx — numbered achievement items

  /ui
    CustomCursor.tsx  — orange dot + ring cursor

/constants
  content.ts          — ALL personal data here

/lib
  animations.ts       — reusable Framer Motion variants
  utils.ts            — cn() utility

/hooks
  useSmoothScroll.ts  — Lenis hook (used via SmoothScrollProvider)
```

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#0a0a0a` | Page background |
| `surface` | `#111111` | Cards |
| `border` | `#1e1e1e` | Borders |
| `accent` | `#FF5C00` | Orange highlights |
| `text` | `#e0e0e0` | Body text |
| `muted` | `#555555` | Dimmed text |

## Deploying

```bash
npm run build
# Deploy /out or connect to Vercel
```
