import { Link } from 'react-router-dom'
import Aurora from '../Aurora'
import CanvasHero from '../CanvasHero'
import HeroEntrance from './HeroEntrance'
import PhotoFrame from './PhotoFrame'
import { createGeometricPulse } from '../../animations/geometricPulse'
import { profile, stats } from '../../data/profile'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background layers */}
      <Aurora
        colorStops={['#64d386', '#0a0a0a', '#f472b6']}
        amplitude={1.0}
        blend={0.5}
        speed={0.8}
        opacity={0.3}
      />
      <CanvasHero scene={createGeometricPulse()} />

      {/* Photo — absolutely positioned on the right */}
      <PhotoFrame />

      {/* Gradient overlay — keeps text readable over photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/70 via-dark-900/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <HeroEntrance>
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              data-hero="badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs font-mono text-accent">
                {profile.currentRole} · {profile.location}
              </span>
            </div>

            {/* Headline */}
            <h1
              data-hero="headline"
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-3"
            >
              {profile.name}
            </h1>

            {/* Single title — recruiters filter on one, not three */}
            <div data-hero="headline-accent" className="text-xl md:text-2xl mb-6">
              <span className="gradient-text font-semibold">{profile.title}</span>
            </div>

            {/* Subtext */}
            <p data-hero="subheadline" className="text-text-muted max-w-lg mb-8 leading-relaxed">
              18 years owning the systems a business actually runs on — Salesforce architecture,
              order-to-cash and finance integrations, zero-downtime data migrations, executive
              reporting, and the small engineering teams that ship them.
            </p>

            {/* CTAs */}
            <div data-hero="cta" className="flex flex-wrap gap-4 mb-10">
              <a
                href="#work"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary px-7 py-3 text-sm font-semibold"
              >
                See my work
              </a>
              <Link to="/resume" className="btn-secondary px-7 py-3 text-sm font-semibold">
                Read my resume
              </Link>
            </div>

            {/* Stats */}
            <div data-hero="stats" className="flex flex-wrap gap-x-8 gap-y-4">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-accent">{value}</div>
                  <div className="text-xs text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </HeroEntrance>
      </div>
    </section>
  )
}
