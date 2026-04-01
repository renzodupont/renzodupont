# renzodupont.com Redesign — Design Spec

**Date:** 2026-03-31
**Status:** Approved

## Overview

Upgrade renzodupont.com from a static HTML/CSS/JS site to a React/Vite/Tailwind site using the same design system as startupp-cloud-website. The migration follows a "copy & adapt" strategy — fork the startupp codebase, strip startupp-specific content, and rebuild as a personal portfolio site.

## Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (same config as startupp-cloud-website)
- **Animations:** GSAP + ScrollTrigger, Framer Motion, OGL (Aurora), Canvas 2D, Lenis (smooth scroll)
- **Deployment:** Cloudflare Pages
- **Pre-rendering:** Puppeteer at build time for SEO (static HTML for all routes)
- **No i18n** — English only

## Migration Strategy

**Copy from startupp-cloud-website:**
- Vite config, Tailwind config (colors, fonts, custom animations)
- All shared animation components: Aurora, CanvasHero, HeroEntrance, TrueFocus, BlurText, ScrollTextReveal, ScrollReveal, TiltCard, ScrollStack
- Canvas animation scene: geometricPulse (+ simplex noise utility)
- Hooks: useCanvasAnimation, useTiltCard, useSmoothScroll
- GSAP setup (lib/gsap.ts)
- Global CSS (gradient-text, card-glass, glow effects, noise overlay, orbit animations, scrollbar, selection)
- PageMeta component (simplified — no i18n)
- Prerender script (updated routes)
- Google Fonts link (Syne, DM Sans, JetBrains Mono)

**Remove from startupp fork:**
- react-i18next and all locale files
- CRM landing page, CTO landing page, and their section components (src/components/cto/*, CRM-specific components)
- Startupp-specific images, logos, branding
- Multi-route navigation structure
- Unused canvas scenes (constellation, dataFlow) — only geometricPulse is needed

**New content for renzodupont:**
- Homepage component with all sections
- 3 resume page components
- Personal content, images, branding

## Routes

| Route | Component | Pre-rendered |
|-------|-----------|-------------|
| `/` | HomePage | Yes |
| `/resume` | ResumeSenior | Yes |
| `/resume-leader` | ResumeLeader | Yes |
| `/resume-salesforce` | ResumeSalesforce | Yes |

## Homepage — Section-by-Section

### Header (Fixed)
- Logo: "RD" monogram in accent green
- Anchor links: About, Expertise, Work, Contact (smooth scroll to sections)
- CTA button: "Book a Call" (links to Calendly: https://calendly.com/renzo-startupp/30min)
- Scroll behavior: transparent on top, backdrop-blur + dark-900 background after 80px scroll
- Mobile: hamburger menu

### Section 1: Hero
**Background layers:**
1. Aurora — OGL WebGL shader, fixed position, green/pink color stops, fades in after 800ms
2. GeometricPulse — Canvas 2D animation (concentric rings, orbiters, particles)
3. CanvasHero wrapper with edge-fade overlays

**Content (HeroEntrance GSAP stagger):**
- Badge: pulsing green dot + "Available for Fractional CTO engagements"
- Headline: "Renzo Dupont"
- Subtitle with TrueFocus cycling through: "Full-Stack Engineer" / "AI Builder" / "Fractional CTO"
- Subtext: "18+ years turning complex ideas into scalable products. From startups to enterprises, Uruguay to Utah."
- Dual CTAs:
  - Primary: "Book a Call" → Calendly link
  - Secondary: "View Resume" → links to /resume
- Stats row: 18+ Years Exp. | 5+ Companies Founded | 16+ SF Years | 3 Countries

**Focal element (right side, desktop only):**
- B&W portrait (renzo-no-bk.png) with mask-image fade at bottom
- Orbiting Lucide icons (6 icons: Target, Code2, Users, Shield, TrendingUp, Briefcase)
- Orbital rings with accent/pink borders, varied rotation speeds
- Ambient radial gradient glow behind portrait
- Same implementation as CTOPhotoFrame from startupp
- Image source: copy `renzo-no-bk.png` from startupp-cloud-website `public/images/`
- OG image: use `profile.jpg` from current site (copy to `public/images/`)

### Section 2: About
- **Heading:** BlurText — "Building the future, one product at a time"
- **Body:** ScrollTextReveal (scroll-scrubbed word-by-word reveal)
- Content: Bio combining current site + memory profile. Background from Uruguay, 18+ years, Harvard ML/AI, MIT Full Stack, 5+ companies founded, currently building Startupp.ai.
- ScrollReveal morph entrance for the section

### Section 3: Expertise
- **Heading:** BlurText — "What I bring to the table"
- **Layout:** 3x2 grid of TiltCards (3D perspective tilt on hover)
- ScrollReveal morph entrance

**Cards:**
1. **Salesforce Engineering** — 16+ years. Apex, LWC, integrations, architecture.
2. **Full-Stack Development** — React, Node, Python, TypeScript, cloud infra.
3. **AI & Machine Learning** — Harvard ML/AI. LLMs, agents, automation.
4. **Cloud & Infrastructure** — AWS, Cloudflare, CI/CD, serverless.
5. **Database Management** — PostgreSQL, MongoDB, Redis, DynamoDB.
6. **Leadership** — CTO, hiring, team building, strategy.

Each card: Lucide icon + title + short description. card-glass styling.

### Section 4: Case Studies & Products
- **Heading:** BlurText — "Case Studies & Products"
- **Layout:** ScrollStack (cards pin and stack on scroll, desktop only; standard stack on mobile)

**Case study cards:**
1. **Credilit S.A.** — 40-year fintech, digital transformation. Metric: $20K+ saved annually.
2. **DentalMarketing.net** — SaaS platform. Metric: 30% productivity increase, 15% revenue growth.
3. **Gargle** — 80-person company, BI initiative. Metric: 20% client retention increase.

**Products card:**
4. **My Products** — Tags/badges for: Startupp.ai, Ava CRM, Agency OS / Benjamin Labs, LivIQ, Smart Test

### Section 5: Testimonial
- Oscar Vissani quote (CEO/CFO, Credilit S.A.) — actual quote text to be extracted from current site's content or provided by Renzo
- Large decorative quotation mark in accent green
- ScrollReveal entrance
- Centered layout, italic text

### Section 6: Contact + CTA
- **Heading:** BlurText — "Ready to build something great?"
- Subtext: "Whether you need a fractional CTO, a technical assessment, or a full build — let's talk."
- Dual CTAs:
  - Primary: "Book a 30-min Call" → https://calendly.com/renzo-startupp/30min
  - Secondary: "Email Me" → mailto:renzo@startupp.ai
- Social links: LinkedIn, GitHub, email
- ScrollReveal entrance

### Footer
- Minimal: copyright line, year, "Built with React + Vite · Deployed on Cloudflare"

## Resume Pages

### Shared Structure (all 3 variants)
- **Screen view:** Dark theme matching site design system. Fixed header with "RD" logo + "Back to Home" link. "Export PDF" button fixed top-right.
- **Print view:** CSS `@media print` overrides — white background, dark text (#1a1a1a), cyan accents (#06b6d4), Arial/Helvetica font, letter-size page, 0.5in/0.6in margins.
- PDF export: `window.print()` triggered by button click.
- `.print-only` / `.screen-only` classes for view-specific content.
- Page break control: `page-break-before: always` for section breaks, `page-break-inside: avoid` for summary/competencies, `page-break-inside: auto` for experience.

### Content (carried over from current site)
All resume content is preserved exactly:
- `/resume` — Senior Computer Science Engineer focus
- `/resume-leader` — Fractional CTO / Director of Engineering focus
- `/resume-salesforce` — Salesforce Architect (16+ years) focus

Each includes: contact header, professional summary, core competencies, professional experience with bullet achievements, certifications & education, languages (Spanish native, English fluent).

## SEO

### PageMeta Component
Simplified from startupp (no i18n). Sets per-route:
- `<title>`, `<meta name="description">`
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Twitter Card: summary_large_image
- Canonical URL
- JSON-LD structured data

### Per-Route Meta

| Route | Title | Description |
|-------|-------|-------------|
| `/` | Renzo Dupont — Fractional CTO & Full-Stack Engineer | 18+ years building scalable products. Fractional CTO, AI, Salesforce, full-stack. |
| `/resume` | Renzo Dupont — Senior Engineer Resume | Senior Computer Science Engineer with 18+ years experience. |
| `/resume-leader` | Renzo Dupont — Technical Leader Resume | Fractional CTO / Director of Engineering resume. |
| `/resume-salesforce` | Renzo Dupont — Salesforce Architect Resume | Salesforce Architect with 16+ years experience. |

### JSON-LD
- Homepage: `Person` schema (name, jobTitle, url, sameAs links, worksFor)
- Resume pages: `ProfilePage` schema

### Static Files
- `robots.txt` — Allow all, reference sitemap
- `sitemap.xml` — All 4 routes, weekly change frequency, homepage priority 1.0, resumes 0.8

### Pre-rendering
Puppeteer script runs at build time (`npm run postbuild`):
- Starts static server on port 4173
- Renders each route, waits for networkidle0
- 2-second wait for React + PageMeta to hydrate
- Outputs: `dist/index.html`, `dist/resume/index.html`, `dist/resume-leader/index.html`, `dist/resume-salesforce/index.html`

## Design System Reference

### Colors (Tailwind)
- Dark: #0a0a0a (900), #121212 (800), #1a1a1a (700), #242424 (600), #2d2d2d (500)
- Accent green: #64d386 (primary), #8de4a6 (light), #4cb86d (dark)
- Pink: #f472b6 (secondary), #f9a8d4 (light), #ec4899 (dark)
- Text: #eaeaea (primary), #a0a0a0 (secondary), #666666 (muted)

### Typography
- Display: Syne (headings, 400-800 weight)
- Body: DM Sans (text, 300-600 weight)
- Mono: JetBrains Mono (labels, 400-500 weight)

### Effects
- `.gradient-text` — green gradient on text
- `.gradient-text-pink` — pink gradient on text
- `.card-glass` — semi-transparent dark card with border
- `.glow-accent` / `.glow-pink` — multi-layer box-shadow glow
- `.noise-overlay` — fixed full-screen grain texture

## Build & Deploy

```bash
npm run build      # TypeScript + Vite build
npm run postbuild  # Puppeteer pre-render
npm run build:full # Combined
npm run deploy     # Wrangler deploy to Cloudflare Pages
```

### wrangler.toml
```toml
name = "renzodupont"
pages_build_output_dir = "dist"
compatibility_date = "2024-01-01"
```
