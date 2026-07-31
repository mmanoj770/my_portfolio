# Manoj M — Portfolio

A production-grade personal portfolio built with Next.js 15 (App Router),
React 19, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, and
Lenis smooth scrolling.

## Getting started

This sandbox has no network access, so dependencies have **not** been
installed or the dev server run here. On your own machine:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To build for production:

```bash
npm run build
npm run start
```

## Add your media

The code references these files, which are not included (see the `README.md`
inside each folder for the exact list):

- `public/videos/hero.mp4`, `public/videos/projects.mp4`
- `public/images/hero-poster.jpg`, `public/images/projects-poster.jpg`
- `public/images/projects/*.jpg` — one per project
- `public/protosem/*.jpg` — week hero/gallery images
- `public/pdfs/*.pdf` — week documentation PDFs
- `public/resume.pdf` — linked from the Home hero "Resume" button

Until you add these, the pages still render — videos/images simply show as
empty/transparent regions.

## Folder structure

```text
app/
  layout.tsx              — root layout, fonts, navbar/footer, smooth scroll
  page.tsx                — Home
  globals.css
  about/page.tsx          — About
  experience/page.tsx     — Experience
  skills/page.tsx         — Skills
  protosem/
    page.tsx              — Protosem overview (20 weeks)
    week/[id]/page.tsx     — Per-week documentation
  projects/
    page.tsx               — Projects (horizontal scroll)
    [slug]/page.tsx         — Project case study
components/
  Navbar.tsx, Footer.tsx, Reveal.tsx, MagneticButton.tsx,
  AmbientShapes.tsx, SmoothScroll.tsx, Timeline.tsx
  home/                   — Home page sections
  projects/               — HorizontalGallery (GSAP ScrollTrigger)
  skills/                 — IslandPanel (Dynamic-Island-style expandable panel)
  protosem/               — WeekGrid, PreviewModal (single vs. double click)
data/
  projects.ts, skills.ts, experience.ts, protosem.ts, social.ts
hooks/
  useLenis.ts
lib/
  utils.ts
public/
  videos/, images/, protosem/, pdfs/
```

## Notes on interaction rules implemented

- **Projects**: horizontal scroll pinned section (GSAP ScrollTrigger) on
  desktop, vertical stack on mobile/reduced-motion.
- **Skills**: expandable floating panel (`IslandPanel`) — tap a category to
  expand it, Dynamic-Island style, using Framer Motion layout animation.
- **Protosem**: single click on a week opens a quick preview modal; double
  click navigates straight to that week's full documentation page.
- **Motion**: blur/fade reveals, staggered text, magnetic buttons, smooth
  page scroll (Lenis), ambient floating shapes — all respect
  `prefers-reduced-motion`.
