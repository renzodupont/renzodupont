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
