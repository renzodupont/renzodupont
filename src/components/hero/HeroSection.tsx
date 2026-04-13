import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Aurora from '../Aurora'
import CanvasHero from '../CanvasHero'
import HeroEntrance from './HeroEntrance'
import PhotoFrame from './PhotoFrame'
import { createGeometricPulse } from '../../animations/geometricPulse'

const roles = ['Full-Stack Engineer', 'AI Builder', 'Technical Leader']

const stats = [
  { value: '18+', label: 'Years Exp.' },
  { value: '80+', label: 'Team Size Led' },
  { value: '15+', label: 'Platforms Integrated' },
  { value: '20%', label: 'Retention Increase' },
]

function RoleCycler() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block gradient-text"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

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
              <span className="text-xs font-mono text-accent">Open to Senior Engineering & Leadership Opportunities</span>
            </div>

            {/* Headline */}
            <h1 data-hero="headline" className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-3">
              Renzo Dupont
            </h1>

            {/* Subtitle with cycling roles */}
            <div data-hero="headline-accent" className="text-xl md:text-2xl text-text-secondary mb-6">
              <RoleCycler />
            </div>

            {/* Subtext */}
            <p data-hero="subheadline" className="text-text-muted max-w-lg mb-8 leading-relaxed">
              18+ years building and scaling enterprise systems, leading engineering teams, and shipping products. From startups to enterprises, Uruguay to Utah.
            </p>

            {/* CTAs */}
            <div data-hero="cta" className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://calendly.com/renzo-startupp/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3 text-sm font-semibold"
              >
                Let's Talk
              </a>
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-secondary px-7 py-3 text-sm font-semibold"
              >
                See My Work
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
        </HeroEntrance>
      </div>
    </section>
  )
}
