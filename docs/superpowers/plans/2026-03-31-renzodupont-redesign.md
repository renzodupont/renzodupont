# renzodupont.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate renzodupont.com from static HTML to React/Vite/Tailwind using the startupp-cloud-website design system, with all animations, SEO pre-rendering, and PDF-exportable resumes.

**Architecture:** Copy the startupp-cloud-website project structure, strip startupp-specific content (i18n, CRM/CTO pages), and rebuild as a single-page personal portfolio with 3 resume routes. Puppeteer pre-renders all routes at build time for SEO.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, OGL (Aurora), Lenis, Puppeteer, Cloudflare Pages

---

## File Structure

### Files to copy from startupp-cloud-website (as-is or with minor edits)
- `vite.config.ts` — as-is
- `tailwind.config.js` — as-is
- `postcss.config.js` — as-is
- `tsconfig.json` — as-is (remove tsconfig.node.json reference if not needed)
- `src/lib/gsap.ts` — as-is
- `src/hooks/useCanvasAnimation.ts` — as-is
- `src/hooks/useTiltCard.ts` — as-is
- `src/hooks/useSmoothScroll.ts` — remove i18n-related imports if any
- `src/components/Aurora.tsx` — as-is
- `src/components/CanvasHero.tsx` — as-is
- `src/components/hero/HeroEntrance.tsx` — as-is
- `src/components/TrueFocus.tsx` — as-is
- `src/components/BlurText.tsx` — as-is
- `src/components/ScrollTextReveal.tsx` — as-is
- `src/components/ScrollReveal.tsx` — as-is
- `src/components/TiltCard.tsx` — as-is
- `src/components/ScrollStack.tsx` — as-is
- `src/animations/geometricPulse.ts` — as-is
- `src/animations/simplex.ts` — as-is

### Files to copy and modify
- `index.html` — update meta tags, title, OG tags for renzodupont.com
- `src/index.css` — as-is (all utility classes reused)
- `src/components/PageMeta.tsx` — remove i18n dependency (use plain strings)
- `scripts/prerender.ts` — update ROUTES array

### New files to create
- `package.json` — based on startupp, remove i18n deps
- `wrangler.toml` — renzodupont config
- `src/main.tsx` — entry point (no i18n import)
- `src/App.tsx` — router with 4 routes
- `src/pages/HomePage.tsx` — main single-page layout
- `src/components/Header.tsx` — fixed header with anchor links
- `src/components/hero/HeroSection.tsx` — hero with Aurora + GeometricPulse + portrait
- `src/components/hero/PhotoFrame.tsx` — portrait with orbiting icons (adapted from CTOPhotoFrame)
- `src/components/sections/AboutSection.tsx` — ScrollTextReveal bio
- `src/components/sections/ExpertiseSection.tsx` — 6 TiltCards
- `src/components/sections/CaseStudiesSection.tsx` — ScrollStack cards
- `src/components/sections/TestimonialSection.tsx` — quote block
- `src/components/sections/ContactSection.tsx` — CTAs + social links
- `src/components/Footer.tsx` — minimal footer
- `src/pages/ResumeSenior.tsx` — senior engineer resume
- `src/pages/ResumeLeader.tsx` — technical leader resume
- `src/pages/ResumeSalesforce.tsx` — salesforce architect resume
- `src/styles/resume.css` — resume screen + print styles
- `public/robots.txt` — new
- `public/sitemap.xml` — new

### Files/images to copy from current renzodupont site
- `public/images/profile.jpg` — OG image
- `public/favicon.ico` — favicon

### Files/images to copy from startupp-cloud-website
- `public/images/renzo-no-bk.png` — hero portrait

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `wrangler.toml`
- Create: `index.html`
- Create: `.gitignore`

This task sets up the project skeleton by adapting the startupp-cloud-website configuration. We work in the existing `renzodupont/` directory, replacing the static site with the new React project. The old `public/` folder with static HTML will be backed up first.

- [ ] **Step 1: Back up the current static site**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
mv public public-old
```

- [ ] **Step 2: Create package.json**

Create `package.json` with startupp dependencies minus i18n:

```json
{
  "name": "renzodupont",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "postbuild": "npx tsx scripts/prerender.ts",
    "build:full": "npm run build && npm run postbuild",
    "preview": "vite preview",
    "deploy": "wrangler pages deploy dist"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "framer-motion": "^11.13.1",
    "gsap": "^3.14.2",
    "lenis": "^1.3.21",
    "lucide-react": "^0.468.0",
    "ogl": "^1.0.11",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "puppeteer": "^24.40.0",
    "tailwindcss": "^3.4.16",
    "tsx": "^4.21.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "wrangler": "^3.99.0"
  }
}
```

- [ ] **Step 3: Copy config files from startupp**

Copy these files as-is from `/home/renzo-dupont/Documents/Github/websites-monorepo/startupp-cloud-website/`:
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`

If `tsconfig.node.json` exists in startupp, copy it too (it's referenced by tsconfig.json).

- [ ] **Step 4: Create wrangler.toml**

```toml
name = "renzodupont"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"
```

No D1 database or vars needed for this site.

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a0a" />

    <!-- Default meta — overridden per-page by PageMeta component -->
    <meta name="description" content="Renzo Dupont — Fractional CTO & Full-Stack Engineer. 18+ years building scalable products." />
    <title>Renzo Dupont — Fractional CTO & Full-Stack Engineer</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Default OG tags — overridden per-page -->
    <meta property="og:title" content="Renzo Dupont — Fractional CTO & Full-Stack Engineer" />
    <meta property="og:description" content="18+ years building scalable products. Fractional CTO, AI, Salesforce, full-stack." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://renzodupont.com/" />
    <meta property="og:image" content="https://renzodupont.com/images/profile.jpg" />
    <meta property="og:site_name" content="Renzo Dupont" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create .gitignore**

```
node_modules
dist
.wrangler
*.local
.superpowers
```

- [ ] **Step 7: Create public/ directory with static assets**

```bash
mkdir -p public/images
cp public-old/favicon.ico public/
cp public-old/images/profile.jpg public/images/
cp /home/renzo-dupont/Documents/Github/websites-monorepo/startupp-cloud-website/public/images/renzo-no-bk.png public/images/
```

- [ ] **Step 8: Install dependencies**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
npm install
```

- [ ] **Step 9: Commit**

```bash
git add package.json vite.config.ts tailwind.config.js postcss.config.js tsconfig.json wrangler.toml index.html .gitignore public/
git commit -m "feat: scaffold React/Vite/Tailwind project for renzodupont.com redesign"
```

---

## Task 2: Copy shared animation components, hooks, and utilities

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/hooks/useCanvasAnimation.ts`
- Create: `src/hooks/useTiltCard.ts`
- Create: `src/hooks/useSmoothScroll.ts`
- Create: `src/components/Aurora.tsx`
- Create: `src/components/CanvasHero.tsx`
- Create: `src/components/hero/HeroEntrance.tsx`
- Create: `src/components/TrueFocus.tsx`
- Create: `src/components/BlurText.tsx`
- Create: `src/components/ScrollTextReveal.tsx`
- Create: `src/components/ScrollReveal.tsx`
- Create: `src/components/TiltCard.tsx`
- Create: `src/components/ScrollStack.tsx`
- Create: `src/components/PageMeta.tsx`
- Create: `src/animations/geometricPulse.ts`
- Create: `src/animations/simplex.ts`
- Create: `src/index.css`

These files are copied directly from startupp-cloud-website. Only `PageMeta.tsx` and `useSmoothScroll.ts` need modification (remove i18n references).

- [ ] **Step 1: Create directory structure**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
mkdir -p src/lib src/hooks src/components/hero src/animations
```

- [ ] **Step 2: Copy all animation components and utilities as-is**

Copy these files from `/home/renzo-dupont/Documents/Github/websites-monorepo/startupp-cloud-website/` to the corresponding paths in renzodupont:

```bash
STARTUPP=/home/renzo-dupont/Documents/Github/websites-monorepo/startupp-cloud-website
RENZO=/home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont

cp $STARTUPP/src/lib/gsap.ts $RENZO/src/lib/
cp $STARTUPP/src/hooks/useCanvasAnimation.ts $RENZO/src/hooks/
cp $STARTUPP/src/hooks/useTiltCard.ts $RENZO/src/hooks/
cp $STARTUPP/src/components/Aurora.tsx $RENZO/src/components/
cp $STARTUPP/src/components/CanvasHero.tsx $RENZO/src/components/
cp $STARTUPP/src/components/hero/HeroEntrance.tsx $RENZO/src/components/hero/
cp $STARTUPP/src/components/TrueFocus.tsx $RENZO/src/components/
cp $STARTUPP/src/components/BlurText.tsx $RENZO/src/components/
cp $STARTUPP/src/components/ScrollTextReveal.tsx $RENZO/src/components/
cp $STARTUPP/src/components/ScrollReveal.tsx $RENZO/src/components/
cp $STARTUPP/src/components/TiltCard.tsx $RENZO/src/components/
cp $STARTUPP/src/components/ScrollStack.tsx $RENZO/src/components/
cp $STARTUPP/src/animations/geometricPulse.ts $RENZO/src/animations/
cp $STARTUPP/src/animations/simplex.ts $RENZO/src/animations/
cp $STARTUPP/src/index.css $RENZO/src/
```

- [ ] **Step 3: Copy and modify useSmoothScroll.ts**

Copy from startupp, then remove any `useTranslation` or i18n imports. The hook should only use `lenis`, `gsap`, and `react-router-dom`. Check the file — if it has no i18n references, use as-is.

```bash
cp $STARTUPP/src/hooks/useSmoothScroll.ts $RENZO/src/hooks/
```

- [ ] **Step 4: Create PageMeta.tsx (simplified, no i18n)**

Copy from startupp and remove any `useTranslation` usage. The component takes plain string props — it should already work without i18n since it receives props directly. Check and copy:

```bash
cp $STARTUPP/src/components/PageMeta.tsx $RENZO/src/components/
```

If PageMeta imports from i18next, remove those imports. The component signature should be:

```tsx
interface PageMetaProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}
```

- [ ] **Step 5: Verify no i18n imports remain**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
grep -r "i18n\|useTranslation\|react-i18next\|i18next" src/ || echo "No i18n references found"
```

Expected: "No i18n references found"

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: copy shared animation components, hooks, and CSS from startupp design system"
```

---

## Task 3: Create app entry point and router

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/pages/HomePage.tsx` (placeholder)
- Create: `src/pages/ResumeSenior.tsx` (placeholder)
- Create: `src/pages/ResumeLeader.tsx` (placeholder)
- Create: `src/pages/ResumeSalesforce.tsx` (placeholder)

- [ ] **Step 1: Create src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 2: Create src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResumeSenior from './pages/ResumeSenior'
import ResumeLeader from './pages/ResumeLeader'
import ResumeSalesforce from './pages/ResumeSalesforce'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AppRoutes() {
  useSmoothScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resume" element={<ResumeSenior />} />
      <Route path="/resume-leader" element={<ResumeLeader />} />
      <Route path="/resume-salesforce" element={<ResumeSalesforce />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 3: Create placeholder page components**

Create `src/pages/HomePage.tsx`:
```tsx
export default function HomePage() {
  return <div className="min-h-screen bg-dark-900 text-text-primary">HomePage placeholder</div>
}
```

Create `src/pages/ResumeSenior.tsx`:
```tsx
export default function ResumeSenior() {
  return <div className="min-h-screen bg-dark-900 text-text-primary">Resume Senior placeholder</div>
}
```

Create `src/pages/ResumeLeader.tsx`:
```tsx
export default function ResumeLeader() {
  return <div className="min-h-screen bg-dark-900 text-text-primary">Resume Leader placeholder</div>
}
```

Create `src/pages/ResumeSalesforce.tsx`:
```tsx
export default function ResumeSalesforce() {
  return <div className="min-h-screen bg-dark-900 text-text-primary">Resume Salesforce placeholder</div>
}
```

- [ ] **Step 4: Verify the app compiles and runs**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
npx vite --port 3000
```

Expected: Dev server starts, homepage shows "HomePage placeholder" at http://localhost:3000

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/App.tsx src/pages/
git commit -m "feat: add app entry point, router, and placeholder pages"
```

---

## Task 4: Build the Header component

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/Header.tsx**

```tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl text-accent">
          RD
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('about')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('expertise')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Expertise
          </button>
          <button onClick={() => scrollToSection('work')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Contact
          </button>
          <a
            href="https://calendly.com/renzo-startupp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <button onClick={() => scrollToSection('about')} className="text-left text-text-secondary hover:text-text-primary">About</button>
          <button onClick={() => scrollToSection('expertise')} className="text-left text-text-secondary hover:text-text-primary">Expertise</button>
          <button onClick={() => scrollToSection('work')} className="text-left text-text-secondary hover:text-text-primary">Work</button>
          <button onClick={() => scrollToSection('contact')} className="text-left text-text-secondary hover:text-text-primary">Contact</button>
          <a
            href="https://calendly.com/renzo-startupp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2 text-center"
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Add Header to HomePage**

Update `src/pages/HomePage.tsx`:

```tsx
import Header from '../components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <Header />
      <main className="pt-16">
        <p className="p-8">HomePage placeholder</p>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify header renders and scroll blur works**

```bash
npx vite --port 3000
```

Expected: Header visible, "RD" logo in green, nav links, "Book a Call" button. Scroll adds blur.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/pages/HomePage.tsx
git commit -m "feat: add fixed header with anchor navigation and mobile menu"
```

---

## Task 5: Build the Hero section

**Files:**
- Create: `src/components/hero/HeroSection.tsx`
- Create: `src/components/hero/PhotoFrame.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/hero/PhotoFrame.tsx**

Adapted from startupp CTOPhotoFrame — portrait with orbiting Lucide icons:

```tsx
import { Target, Code2, Users, Shield, TrendingUp, Briefcase } from 'lucide-react'

const icons = [
  { Icon: Target, duration: '22s', delay: '0s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.6))' },
  { Icon: Code2, duration: '28s', delay: '-5s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.6))' },
  { Icon: Users, duration: '35s', delay: '-10s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.5))' },
  { Icon: Shield, duration: '25s', delay: '-3s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.5))' },
  { Icon: TrendingUp, duration: '30s', delay: '-8s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.4))' },
  { Icon: Briefcase, duration: '40s', delay: '-15s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.4))' },
]

export default function PhotoFrame() {
  return (
    <div className="relative hidden lg:flex items-center justify-center" data-hero="focal">
      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/[0.08] blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink/[0.05] blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-accent/10 animate-orbit" style={{ animationDuration: '40s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-pink/[0.08] animate-orbit-reverse" style={{ animationDuration: '30s' }} />

      {/* Photo */}
      <div className="relative w-48 h-60 z-10">
        <img
          src="/images/renzo-no-bk.png"
          alt="Renzo Dupont"
          className="w-full h-full object-cover object-top grayscale"
          style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        />
      </div>

      {/* Orbiting icons */}
      {icons.map(({ Icon, duration, delay, reverse, color }, i) => (
        <div
          key={i}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
          style={{ animationDuration: duration, animationDelay: delay }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2" style={{ filter: color }}>
            <Icon className="w-5 h-5 text-text-secondary" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/hero/HeroSection.tsx**

```tsx
import Aurora from '../Aurora'
import CanvasHero from '../CanvasHero'
import HeroEntrance from './HeroEntrance'
import TrueFocus from '../TrueFocus'
import PhotoFrame from './PhotoFrame'
import { createGeometricPulse } from '../../animations/geometricPulse'

const stats = [
  { value: '18+', label: 'Years Exp.' },
  { value: '5+', label: 'Companies' },
  { value: '16+', label: 'SF Years' },
  { value: '3', label: 'Countries' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <Aurora
        colorStops={['#64d386', '#0a0a0a', '#f472b6']}
        amplitude={1.0}
        blend={0.5}
        speed={0.8}
        opacity={0.3}
      />
      <CanvasHero scene={createGeometricPulse()} />

      {/* Content */}
      <HeroEntrance>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div
              data-hero="badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs font-mono text-accent">Available for Fractional CTO engagements</span>
            </div>

            {/* Headline */}
            <h1 data-hero="headline" className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-2">
              Renzo Dupont
            </h1>

            {/* Subtitle with TrueFocus */}
            <div data-hero="headline-accent" className="text-xl md:text-2xl text-text-secondary mb-4">
              <TrueFocus
                sentence="Full-Stack Engineer;AI Builder;Fractional CTO"
                separator=";"
                blurAmount={5}
                borderColor="#64d386"
                glowColor="rgba(100, 211, 134, 0.3)"
                animationDuration={0.5}
                pauseBetweenAnimations={2}
              />
            </div>

            {/* Subtext */}
            <p data-hero="subheadline" className="text-text-muted max-w-lg mb-8 leading-relaxed">
              18+ years turning complex ideas into scalable products. From startups to enterprises, Uruguay to Utah.
            </p>

            {/* CTAs */}
            <div data-hero="cta" className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://calendly.com/renzo-startupp/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3 text-sm font-semibold"
              >
                Book a Call
              </a>
              <a
                href="/resume"
                className="btn-secondary px-7 py-3 text-sm font-semibold"
              >
                View Resume
              </a>
            </div>

            {/* Stats */}
            <div data-hero="stats" className="flex gap-8">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-accent">{value}</div>
                  <div className="text-xs text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo with orbiting icons */}
          <PhotoFrame />
        </div>
      </HeroEntrance>
    </section>
  )
}
```

- [ ] **Step 3: Update HomePage to include HeroSection**

```tsx
import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Verify hero renders with all animations**

```bash
npx vite --port 3000
```

Expected: Full hero with Aurora background, geometric pulse canvas, staggered entrance animations, TrueFocus cycling roles, portrait with orbiting icons, stats row, and CTA buttons.

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/ src/pages/HomePage.tsx
git commit -m "feat: add hero section with Aurora, geometric pulse, portrait, and TrueFocus"
```

---

## Task 6: Build the About section

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/sections/AboutSection.tsx**

```tsx
import BlurText from '../BlurText'
import ScrollTextReveal from '../ScrollTextReveal'
import ScrollReveal from '../ScrollReveal'

const aboutText = `From founding fintechs in Uruguay to leading AI-native products in Utah, I've spent 18+ years at the intersection of engineering and entrepreneurship. Certified in Machine Learning and AI from Harvard and Full Stack Development from MIT. I've founded 5+ companies, managed international engineering teams, and delivered digital transformations that saved clients $20K+ annually. Currently building Startupp.ai — providing fractional CTO services and AI-native products for startups that move fast.`

export default function AboutSection() {
  return (
    <ScrollReveal morphTransition>
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-pink uppercase tracking-widest">About</span>
          </div>
          <BlurText
            text="Building the future, one product at a time"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-10"
            delay={0.05}
          />
          <ScrollTextReveal
            text={aboutText}
            as="p"
            className="text-lg leading-relaxed text-text-secondary"
            enableBlur
            baseOpacity={0.1}
            baseRotation={3}
            blurStrength={4}
          />
        </div>
      </section>
    </ScrollReveal>
  )
}
```

- [ ] **Step 2: Add AboutSection to HomePage**

```tsx
import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'
import AboutSection from '../components/sections/AboutSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify scroll-driven text reveal works**

Expected: Scrolling past the About section reveals words one-by-one with blur effect.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/AboutSection.tsx src/pages/HomePage.tsx
git commit -m "feat: add About section with BlurText heading and ScrollTextReveal"
```

---

## Task 7: Build the Expertise section

**Files:**
- Create: `src/components/sections/ExpertiseSection.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/sections/ExpertiseSection.tsx**

```tsx
import { Cloud, Database, Brain, Code2, Shield, Users } from 'lucide-react'
import BlurText from '../BlurText'
import TiltCard from '../TiltCard'
import ScrollReveal from '../ScrollReveal'

const expertise = [
  {
    icon: Shield,
    title: 'Salesforce Engineering',
    description: '16+ years. Apex, LWC, Flows, integrations, enterprise architecture.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'React, Node, Python, TypeScript, cloud infrastructure.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Harvard ML/AI. LLMs, agents, automation pipelines.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'AWS, Cloudflare, CI/CD, serverless, Docker.',
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'PostgreSQL, MongoDB, Redis, DynamoDB, SQL Server.',
  },
  {
    icon: Users,
    title: 'Leadership',
    description: 'CTO, hiring, team building, strategy, mentorship.',
  },
]

export default function ExpertiseSection() {
  return (
    <ScrollReveal morphTransition>
      <section id="expertise" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Expertise</span>
          </div>
          <BlurText
            text="What I bring to the table"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12"
            delay={0.05}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map(({ icon: Icon, title, description }) => (
              <TiltCard key={title} className="card-glass rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
```

- [ ] **Step 2: Add to HomePage**

Add `import ExpertiseSection from '../components/sections/ExpertiseSection'` and place `<ExpertiseSection />` after `<AboutSection />` in the main.

- [ ] **Step 3: Verify TiltCard hover effect works**

Expected: 6 cards in 3x2 grid. Hovering tilts cards in 3D with glow following cursor.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ExpertiseSection.tsx src/pages/HomePage.tsx
git commit -m "feat: add Expertise section with 6 TiltCards"
```

---

## Task 8: Build the Case Studies section

**Files:**
- Create: `src/components/sections/CaseStudiesSection.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/sections/CaseStudiesSection.tsx**

```tsx
import BlurText from '../BlurText'
import ScrollStack from '../ScrollStack'

const caseStudies = [
  {
    company: 'Credilit S.A.',
    description: '40-year fintech company — full digital transformation',
    details: 'Managed technology for a legacy credit administrator. Automated workflows, built client portals, accounting systems, and marketing tracking.',
    metric: '$20K+',
    metricLabel: 'saved annually',
    color: 'accent' as const,
  },
  {
    company: 'DentalMarketing.net',
    description: 'SaaS platform optimization',
    details: 'Built data-driven platform. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%.',
    metric: '30%',
    metricLabel: 'productivity increase',
    color: 'pink' as const,
  },
  {
    company: 'Gargle',
    description: '80-person company — BI initiative',
    details: 'Led Business Intelligence initiative as sole senior engineer. Architected integrations across 15+ platforms serving 80+ employees.',
    metric: '20%',
    metricLabel: 'client retention increase',
    color: 'accent' as const,
  },
]

const products = [
  { name: 'Startupp.ai', color: 'accent' },
  { name: 'Ava CRM', color: 'pink' },
  { name: 'Agency OS', color: 'accent' },
  { name: 'LivIQ', color: 'pink' },
  { name: 'Smart Test', color: 'accent' },
]

export default function CaseStudiesSection() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-xs text-pink uppercase tracking-widest">Work</span>
        </div>
        <BlurText
          text="Case Studies & Products"
          className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12"
          delay={0.05}
        />

        <ScrollStack>
          {caseStudies.map(({ company, description, details, metric, metricLabel, color }) => (
            <div key={company} className="stack-card card-glass rounded-2xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary">{company}</h3>
                  <p className="text-sm text-text-muted">{description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${color === 'accent' ? 'text-accent' : 'text-pink'}`}>
                    {metric}
                  </div>
                  <div className="text-xs text-text-muted">{metricLabel}</div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{details}</p>
            </div>
          ))}

          {/* Products card */}
          <div className="stack-card card-glass rounded-2xl p-8 border-pink/10">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">My Products</h3>
            <div className="flex flex-wrap gap-3">
              {products.map(({ name, color }) => (
                <span
                  key={name}
                  className={`text-sm px-4 py-1.5 rounded-full border ${
                    color === 'accent'
                      ? 'text-accent border-accent/20 bg-accent/[0.04]'
                      : 'text-pink border-pink/20 bg-pink/[0.04]'
                  }`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollStack>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to HomePage**

Add `import CaseStudiesSection from '../components/sections/CaseStudiesSection'` and place after ExpertiseSection.

- [ ] **Step 3: Verify ScrollStack pinning works on desktop**

Expected: Cards pin and stack as you scroll. On mobile, they show as a regular vertical stack.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/CaseStudiesSection.tsx src/pages/HomePage.tsx
git commit -m "feat: add Case Studies section with ScrollStack cards"
```

---

## Task 9: Build the Testimonial and Contact sections + Footer

**Files:**
- Create: `src/components/sections/TestimonialSection.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create src/components/sections/TestimonialSection.tsx**

```tsx
import ScrollReveal from '../ScrollReveal'

export default function TestimonialSection() {
  return (
    <ScrollReveal>
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl text-accent/30 font-display mb-6">&ldquo;</div>
          <blockquote className="text-lg md:text-xl text-text-secondary italic leading-relaxed mb-8">
            Renzo's engineering excellence and strategic thinking transformed our entire technology infrastructure. His ability to bridge business objectives with technical execution is exceptional — he delivered automation that saved us over $20,000 annually while modernizing systems that had been in place for decades.
          </blockquote>
          <div className="text-text-primary font-semibold">Oscar Vissani</div>
          <div className="text-sm text-text-muted">CEO/CFO, Credilit S.A.</div>
        </div>
      </section>
    </ScrollReveal>
  )
}
```

- [ ] **Step 2: Create src/components/sections/ContactSection.tsx**

```tsx
import { Linkedin, Github, Mail } from 'lucide-react'
import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'

export default function ContactSection() {
  return (
    <ScrollReveal>
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Let's Connect</span>
          </div>
          <BlurText
            text="Ready to build something great?"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
            delay={0.05}
          />
          <p className="text-text-muted mb-10 leading-relaxed">
            Whether you need a fractional CTO, a technical assessment, or a full build — let's talk.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="https://calendly.com/renzo-startupp/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 text-sm font-semibold"
            >
              Book a 30-min Call
            </a>
            <a
              href="mailto:renzo@startupp.ai"
              className="btn-secondary px-8 py-3 text-sm font-semibold"
            >
              Email Me
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/renzo-dupont-b9797941/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:renzo@startupp.ai" className="text-text-muted hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
```

- [ ] **Step 3: Create src/components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-text-muted">
        &copy; 2007–{new Date().getFullYear()} Renzo Dupont. Built with React + Vite &middot; Deployed on Cloudflare
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Complete HomePage with all sections**

```tsx
import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ExpertiseSection from '../components/sections/ExpertiseSection'
import CaseStudiesSection from '../components/sections/CaseStudiesSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Fractional CTO & Full-Stack Engineer"
        description="18+ years building scalable products. Fractional CTO, AI, Salesforce, full-stack engineering."
        canonicalUrl="https://renzodupont.com"
        ogImage="https://renzodupont.com/images/profile.jpg"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Renzo Dupont',
          jobTitle: 'Fractional CTO & Full-Stack Engineer',
          url: 'https://renzodupont.com',
          image: 'https://renzodupont.com/images/profile.jpg',
          sameAs: [
            'https://www.linkedin.com/in/renzo-dupont-b9797941/',
            'https://github.com/renzodupont',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Startupp.ai',
          },
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <CaseStudiesSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 5: Verify complete homepage scroll experience**

```bash
npx vite --port 3000
```

Expected: Full single-page scroll with all animations working — Aurora, geometric pulse, hero entrance, TrueFocus cycling, BlurText headings, ScrollTextReveal about, TiltCards, ScrollStack case studies, testimonial, contact CTA, and footer.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ src/components/Footer.tsx src/pages/HomePage.tsx
git commit -m "feat: add Testimonial, Contact, Footer sections — complete homepage"
```

---

## Task 10: Build the Resume pages

**Files:**
- Create: `src/styles/resume.css`
- Modify: `src/pages/ResumeSenior.tsx`
- Modify: `src/pages/ResumeLeader.tsx`
- Modify: `src/pages/ResumeSalesforce.tsx`

This is the most content-heavy task. Each resume is a self-contained page with all content hardcoded, styled for both screen (dark theme) and print (white, letter-size PDF).

- [ ] **Step 1: Create src/styles/resume.css**

This file contains both screen and print styles for resumes. Copy the resume-related CSS from the current site's `public-old/css/style.css` (lines 1260–1645) and adapt it to use Tailwind-compatible class names and the new design system's CSS variables.

The screen styles use the dark theme. The print styles (`@media print`) override everything with white background, Arial font, letter-size page — identical to the current site's print output.

```css
/* Resume screen styles */
.resume-web {
  padding-top: 5rem;
  min-height: 100vh;
}

.resume-web .resume-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.resume-web .resume-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(100, 211, 134, 0.3);
  text-align: center;
}

.resume-web .resume-header h1 {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #eaeaea;
  margin-bottom: 0.5rem;
}

.resume-web .resume-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #64d386;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

.resume-web .resume-contact {
  font-size: 0.9rem;
  color: #666666;
  margin-top: 0.5rem;
}
.resume-web .resume-contact a { color: #64d386; }
.print-only { display: none; }
.screen-only { display: inline; }
.print-page-break { display: none; }

.resume-web .resume-personal {
  font-size: 0.82rem;
  color: #666666;
  margin-top: 0.3rem;
}

.resume-web .resume-section {
  margin-bottom: 2.5rem;
}
.resume-web .resume-section h2 {
  font-family: 'Syne', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #eaeaea;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(100, 211, 134, 0.3);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.resume-web .resume-section p {
  color: #a0a0a0;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
}
.resume-web .resume-section li {
  color: #a0a0a0;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 0.4rem;
  padding-left: 1rem;
  position: relative;
}
.resume-web .resume-section li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  background: #64d386;
  border-radius: 50%;
}
.resume-web .resume-section ul {
  margin-bottom: 1rem;
  margin-left: 0.5rem;
}

.resume-web .job-header {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.resume-web .job-header:first-of-type { margin-top: 0; }
.resume-web .company-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #64d386;
}
.resume-web .job-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #eaeaea;
}
.resume-web .job-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #666666;
}

.resume-web .tech-compact {
  font-size: 0.92rem;
  color: #a0a0a0;
  line-height: 1.8;
}
.resume-web .tech-compact strong {
  color: #eaeaea;
  font-weight: 600;
}

.resume-web .education-item { margin-bottom: 1rem; }
.resume-web .education-degree { font-size: 0.95rem; font-weight: 600; color: #eaeaea; }
.resume-web .education-school { font-size: 0.88rem; color: #666666; }

/* Resume version selector */
.resume-versions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
}
.resume-versions span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-right: 0.25rem;
}
.resume-versions a {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #666666;
  padding: 0.35rem 0.9rem;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.resume-versions a:hover {
  color: #64d386;
  border-color: rgba(100, 211, 134, 0.3);
  background: rgba(100, 211, 134, 0.05);
}
.resume-versions a.active {
  color: #0a0a0a;
  background: #64d386;
  border-color: #64d386;
  font-weight: 600;
}

/* Print button */
.resume-web .print-button {
  position: fixed;
  top: 100px;
  right: 2rem;
  padding: 0.75rem 1.5rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  background: #121212;
  color: #64d386;
  border: 1px solid rgba(100, 211, 134, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.resume-web .print-button:hover {
  background: rgba(100, 211, 134, 0.05);
  border-color: #64d386;
  transform: translateY(-2px);
}
.resume-web .print-button svg { width: 18px; height: 18px; }

/* Responsive */
@media (max-width: 768px) {
  .resume-web .resume-header { text-align: center; }
  .resume-web .print-button { top: auto; bottom: 1.5rem; right: 1.5rem; }
  .resume-versions { flex-wrap: wrap; }
  .resume-versions span { width: 100%; text-align: center; margin-bottom: 0.25rem; }
}

/* ========== PRINT STYLES ========== */
@media print {
  @page { size: letter; margin: 0.5in 0.6in; }

  body {
    background: #fff;
    color: #1a1a1a;
    font-size: 9pt;
    line-height: 1.4;
    font-family: Arial, Helvetica, sans-serif !important;
  }

  header, footer, .scroll-to-top, .print-button, .scroll-indicator, .resume-versions { display: none !important; }

  .resume-web {
    padding: 0;
    background: #fff;
  }
  .resume-web .resume-container {
    max-width: 100%;
    padding: 1rem 0.5rem;
    margin: 0;
    font-size: 9pt;
    font-family: Arial, Helvetica, sans-serif !important;
    color: #1a1a1a;
  }

  .resume-web .resume-header {
    margin-bottom: 0.75rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid #06b6d4;
    display: block;
    text-align: center;
    width: 100%;
  }
  .resume-web .resume-header h1 {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 16pt;
    color: #0a0e27;
    margin-bottom: 0.3rem;
  }
  .resume-web .resume-title {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 8.5pt;
    color: #06b6d4;
    margin-bottom: 0.35rem;
  }
  .resume-web .resume-contact,
  .resume-web .resume-personal {
    font-size: 8pt;
    color: #4a5568;
    margin-top: 0.25rem;
  }
  .resume-web .resume-contact a {
    color: #06b6d4 !important;
    text-decoration: none;
  }
  .screen-only { display: none !important; }
  .print-only { display: inline !important; }

  .resume-web .resume-section { margin-bottom: 1.25rem; }
  .resume-web .resume-section h2 {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 10.5pt;
    color: #0a0e27;
    border-bottom: 2px solid #06b6d4;
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    page-break-after: avoid;
  }
  .resume-web .resume-section p,
  .resume-web .resume-section li {
    font-size: 8.5pt;
    line-height: 1.5;
    color: #374151;
    margin-bottom: 0.3rem;
  }
  .resume-web .resume-section li::before { background: #06b6d4; }

  .resume-web .company-name {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 9pt;
    color: #06b6d4;
  }
  .resume-web .job-title {
    font-size: 9pt;
    color: #0f172a;
  }
  .resume-web .job-period {
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 7.5pt;
    color: #64748b;
  }
  .resume-web .job-header {
    margin-top: 0.75rem;
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  .resume-web .job-header + ul {
    page-break-before: avoid;
    page-break-inside: avoid;
  }
  .resume-web .tech-compact {
    font-size: 8.5pt;
    color: #374151;
    line-height: 1.5;
  }
  .resume-web .tech-compact strong { color: #0f172a; }

  .resume-web .education-degree { font-size: 8.5pt; color: #0f172a; }
  .resume-web .education-school { font-size: 8pt; color: #475569; }

  .resume-web * { color: inherit; }
  .resume-web a { color: #06b6d4; text-decoration: none; }

  .print-page-break { display: block; page-break-before: always; break-before: page; }

  #summary, #competencies { page-break-inside: avoid; page-break-after: avoid; }
  #experience { page-break-inside: auto; }
  #education { page-break-inside: avoid; }

  .resume-web .resume-section li { page-break-inside: avoid; }
  .resume-web .job-header { page-break-after: avoid; }
  .resume-web .job-header + ul { page-break-before: avoid; }
}
```

- [ ] **Step 2: Create src/pages/ResumeSenior.tsx**

This is the full Senior Engineer resume. All HTML content is directly ported from `public-old/resume.html`. The resume uses a minimal header (back link + print button) instead of the full site header.

```tsx
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

export default function ResumeSenior() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Senior Engineer Resume"
        description="Senior Computer Science Engineer with 18+ years architecting and scaling enterprise systems."
        canonicalUrl="https://renzodupont.com/resume"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Renzo Dupont — Senior Engineer Resume' }}
      />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-6">
        <Link to="/" className="font-display font-bold text-accent">RD</Link>
        <span className="ml-4 text-sm text-text-muted">/ Resume</span>
      </header>

      <div className="resume-web">
        <button className="print-button" onClick={() => window.print()}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Export PDF
        </button>

        {/* Version selector */}
        <div className="resume-versions">
          <span>Version:</span>
          <Link to="/resume" className="active">Senior Engineer</Link>
          <Link to="/resume-leader">Technical Leader</Link>
          <Link to="/resume-salesforce">Salesforce Architect</Link>
        </div>

        <div className="resume-container">
          <div className="resume-header">
            <div>
              <h1>RENZO DUPONT</h1>
              <div className="resume-title">Senior Computer Science Engineer | Full-Stack Architect</div>
              <div className="resume-contact">
                <a href="mailto:renzo@startupp.ai">renzo@startupp.ai</a> |{' '}
                <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">LinkedIn</span>
                  <span className="print-only">linkedin.com/in/renzo-dupont</span>
                </a> |{' '}
                <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
                <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">GitHub</span>
                  <span className="print-only">github.com/renzodupont</span>
                </a>
              </div>
              <div className="resume-personal">Languages: Spanish (Native), English (Fluent)</div>
            </div>
          </div>

          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Senior Engineer with <strong>18+ years</strong> architecting and scaling enterprise systems, CRMs, and cloud infrastructure.
              Sole senior engineer responsible for the full technology stack at Gargle, Inc., serving 80+ employees across <strong>15+ integrated platforms</strong>.
              Founder &amp; CEO of Startupp.ai, delivering Fractional CTO services to startups and mid-market companies.
              Harvard-certified in Machine Learning and Artificial Intelligence (AI), with hands-on Large Language Model (LLM) implementation experience.
            </p>
          </section>

          <section className="resume-section" id="competencies">
            <h2>Core Competencies</h2>
            <div className="tech-compact">
              <strong>Languages:</strong> JavaScript/TypeScript · Python · C#/.NET · PHP · Apex · HTML/CSS<br />
              <strong>Frameworks &amp; Tools:</strong> React · Next.js · Astro · Node.js · Angular · Tailwind CSS · REST APIs · Salesforce (Lightning, Flows) · Docker · Git · CI/CD<br />
              <strong>Platforms &amp; Cloud:</strong> Cloudflare (Workers, Pages, D1, R2, KV) · AWS · Azure · GCP · Salesforce (16+ yrs)<br />
              <strong>Databases:</strong> SQL Server · MySQL · MongoDB (10+ years) · PostgreSQL · Airtable<br />
              <strong>AI/ML:</strong> Large Language Model (LLM) Integration · Python ML Pipelines · Harvard CS109xa<br />
              <strong>Architecture:</strong> Microservices · System Design · API Integrations · Business Intelligence
            </div>
          </section>

          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>
            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Sole senior engineer responsible for the full technology stack serving 80+ employees — architecting integrations across 15+ platforms (Salesforce, Twilio, RingCentral, AWS, GCP, Stripe, Calendly, AgencyAnalytics, Apollo, Google Workspace)</li>
              <li>Led a Business Intelligence initiative that <strong>increased client retention by 20%</strong>, directly impacting recurring revenue</li>
              <li>Designed and implemented AI/LLM-powered automation workflows using n8n, Zapier, and custom integrations, reducing manual workload across departments</li>
              <li>Bridge business and engineering teams, orchestrating Development and Analytics teams for seamless cross-functional delivery</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Maintained operational continuity through major company restructuring, <strong>reducing technology expenses by 75%</strong> while preserving full system functionality</li>
              <li>Orchestrated Development and Analytics teams, translating business requirements into technical execution across all product lines</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li><strong>Saved $25,000+</strong> through strategic data migrations and process automation, reducing errors by 20%</li>
              <li>Led hundreds of projects spanning CRM customization, third-party integrations, and workflow optimization</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>
            <div className="job-header">
              <div className="job-title">Founder &amp; Fractional CTO</div>
              <div className="job-period">April 2018 – Present (formalized as Startupp.Cloud LLC in 2022, rebranded to Startupp.ai in 2023)</div>
            </div>
            <ul>
              <li>Deliver Fractional CTO services to 5+ startups and mid-market companies, driving technical strategy that has generated <strong>$20K+ annual savings</strong> through automation, <strong>30% productivity increases</strong>, and <strong>60% efficiency improvements</strong></li>
              <li>Lead technical roadmap planning, architecture decisions, and engineering team mentorship from pre-seed through Series A</li>
              <li>Manage international engineering teams delivering full-stack development, AI implementation, and cloud infrastructure</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Managed technology for 40+ year credit administrator. Automated workflows saving $20,000+ annually. Led full digital transformation: client portals, accounting systems, marketing tracking</li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Built data-driven platform increasing team productivity by 30% and revenue by 15%. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2014) — Uruguay</div>
            </div>
            <ul>
              <li>Progressive roles across 6 companies: Software Developer → Project Manager → Team Lead → Co-Founder</li>
              <li>Led Salesforce GEMINI project at <strong>Altimetrik</strong> (contractor for Salesforce.com), co-founded 2 companies (HWDOTUY, GF Models International), built ERP solutions in C#/.NET at Loasoft S.A.</li>
            </ul>
          </section>

          <section className="resume-section" id="education">
            <h2>Certifications &amp; Education</h2>
            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python (CS109xa) — Harvard University (2024)</div>
            </div>
            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
            </div>
            <div className="education-item">
              <div className="education-degree">Salesforce Administrator ADM201 (2010) | Advanced Administrator (2019)</div>
            </div>
            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science</div>
              <div className="education-school">Escuela Tecnica Pedro Blanes, Uruguay (2005–2008) | U.S. equivalency: Brooklyn College, CUNY</div>
            </div>
            <div className="education-item">
              <div className="education-degree">Doctoral Studies in Computer Science (2 years)</div>
              <div className="education-school">Universidad Catolica del Uruguay (2008–2011)</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create src/pages/ResumeLeader.tsx**

Same structure as ResumeSenior but with Technical Leader content. Copy the full HTML content from `public-old/resume-leader.html` into the same React component pattern. Key differences:
- Title: "Fractional CTO | Director of Engineering | Technical Leader"
- Summary emphasizes leadership and team management
- Experience section leads with Startupp.ai, then Gargle
- Competencies focus on leadership skills
- Version selector: `active` class on "Technical Leader" link

- [ ] **Step 4: Create src/pages/ResumeSalesforce.tsx**

Same structure but with Salesforce Architect content from `public-old/resume-salesforce.html`. Key differences:
- Title: "Salesforce Architect | 16+ Years Salesforce | Advanced Admin & Developer"
- Summary emphasizes Salesforce expertise
- Experience leads with Gargle (Salesforce focus), then Startupp, then Altimetrik (Salesforce GEMINI)
- Competencies are Salesforce-specific
- Includes Altimetrik as a standalone entry
- Version selector: `active` class on "Salesforce Architect" link

- [ ] **Step 5: Verify all 3 resume pages render and PDF export works**

```bash
npx vite --port 3000
```

Test each route:
- http://localhost:3000/resume — Senior Engineer
- http://localhost:3000/resume-leader — Technical Leader
- http://localhost:3000/resume-salesforce — Salesforce Architect

For each: click "Export PDF", verify the print preview shows white background, letter-size, proper page breaks. Version selector links between resumes.

- [ ] **Step 6: Commit**

```bash
git add src/styles/resume.css src/pages/ResumeSenior.tsx src/pages/ResumeLeader.tsx src/pages/ResumeSalesforce.tsx
git commit -m "feat: add 3 resume pages with screen/print dual styling and PDF export"
```

---

## Task 11: Add SEO static files and prerender script

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `scripts/prerender.ts`

- [ ] **Step 1: Create public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://renzodupont.com/sitemap.xml
```

- [ ] **Step 2: Create public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://renzodupont.com/</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://renzodupont.com/resume</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://renzodupont.com/resume-leader</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://renzodupont.com/resume-salesforce</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Create scripts/prerender.ts**

```typescript
import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'

const DIST = join(process.cwd(), 'dist')
const PORT = 4173
const ROUTES = ['/', '/resume', '/resume-leader', '/resume-salesforce']

function startServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let url = req.url || '/'
      url = url.split('?')[0]

      let filePath = join(DIST, url)

      if (!extname(filePath)) {
        filePath = join(DIST, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = extname(filePath)
        const types: Record<string, string> = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.ico': 'image/x-icon',
          '.svg': 'image/svg+xml',
          '.json': 'application/json',
          '.woff2': 'font/woff2',
        }
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        try {
          const content = readFileSync(join(DIST, 'index.html'))
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content)
        } catch {
          res.writeHead(404)
          res.end('Not found')
        }
      }
    })

    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

async function prerender() {
  console.log('Starting pre-render...')

  const server = await startServer()
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

  for (const route of ROUTES) {
    console.log(`Pre-rendering ${route}...`)
    const page = await browser.newPage()

    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })

    await new Promise(r => setTimeout(r, 2000))

    const html = await page.content()

    let outPath: string
    if (route === '/') {
      outPath = join(DIST, 'index.html')
    } else {
      const dir = join(DIST, route.slice(1))
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
      outPath = join(dir, 'index.html')
    }

    writeFileSync(outPath, html)
    console.log(`  → Saved to ${outPath}`)
    await page.close()
  }

  await browser.close()
  server.close()
  console.log('Pre-render complete!')
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
```

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt public/sitemap.xml scripts/prerender.ts
git commit -m "feat: add SEO files (robots.txt, sitemap.xml) and Puppeteer prerender script"
```

---

## Task 12: Full build verification and cleanup

**Files:**
- Possibly modify: any file with build errors

- [ ] **Step 1: Run TypeScript compilation**

```bash
cd /home/renzo-dupont/Documents/Github/websites-monorepo/renzodupont
npx tsc --noEmit
```

Expected: No errors. Fix any type errors that come up.

- [ ] **Step 2: Run Vite build**

```bash
npm run build
```

Expected: Build succeeds, outputs to `dist/`.

- [ ] **Step 3: Run prerender**

```bash
npm run postbuild
```

Expected: Pre-renders all 4 routes. Output:
```
Pre-rendering /...
Pre-rendering /resume...
Pre-rendering /resume-leader...
Pre-rendering /resume-salesforce...
Pre-render complete!
```

- [ ] **Step 4: Verify pre-rendered HTML has correct meta tags**

```bash
head -20 dist/index.html
head -20 dist/resume/index.html
```

Expected: Each file has the correct `<title>`, `<meta name="description">`, and OG tags set by PageMeta.

- [ ] **Step 5: Preview the built site**

```bash
npm run preview
```

Open http://localhost:4173 and verify:
- Homepage loads with all sections and animations
- Resume pages load at /resume, /resume-leader, /resume-salesforce
- PDF export works on all resume pages
- Navigation between pages works
- Anchor links scroll to correct sections

- [ ] **Step 6: Remove old static site backup**

```bash
rm -rf public-old
```

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete renzodupont.com redesign — React/Vite/Tailwind with full animation suite"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Scaffold project | package.json, configs, index.html, .gitignore |
| 2 | Copy shared components | 17 files from startupp design system |
| 3 | App entry + router | main.tsx, App.tsx, 4 page placeholders |
| 4 | Header component | Header.tsx with anchor nav + mobile menu |
| 5 | Hero section | HeroSection.tsx, PhotoFrame.tsx |
| 6 | About section | AboutSection.tsx |
| 7 | Expertise section | ExpertiseSection.tsx with 6 TiltCards |
| 8 | Case Studies section | CaseStudiesSection.tsx with ScrollStack |
| 9 | Testimonial + Contact + Footer | 3 components, complete HomePage |
| 10 | Resume pages | 3 resume components + resume.css |
| 11 | SEO + prerender | robots.txt, sitemap.xml, prerender.ts |
| 12 | Build verification | Full build, prerender, cleanup |
