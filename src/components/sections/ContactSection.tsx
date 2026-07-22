import { Linkedin, Github, Mail, MapPin, Compass, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'
import { profile } from '../../data/profile'

/**
 * Standing professional facts, not availability. Anything phrased as "looking
 * for X" dates the page the moment a role is signed and is uncomfortable to
 * leave up while employed — whereas focus, location, and languages stay true
 * across jobs and still tell a recruiter everything they need to open a
 * conversation.
 */
const atAGlance = [
  {
    icon: Compass,
    label: 'Focus',
    value: profile.focus,
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: `${profile.location} — working with distributed teams across the U.S. and Latin America`,
  },
  {
    icon: Languages,
    label: 'Languages',
    value: profile.languages,
  },
]

export default function ContactSection() {
  return (
    <ScrollReveal>
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 text-center">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Contact</span>
          </div>
          {/* BlurText's root is an inline-flex span, so it shrinks to content and
              `text-center` on it does nothing — the centering has to come from
              the parent block. */}
          <div className="text-center mb-4">
            <BlurText
              text="Get in touch"
              className="font-display text-3xl md:text-4xl font-bold text-text-primary"
              delay={0.05}
            />
          </div>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-10 leading-relaxed">
            I'm always glad to talk through a gnarly integration, a migration nobody wants to own,
            or how a business should be structuring its systems. Email is the fastest way to reach
            me.
          </p>

          <div className="card-glass rounded-2xl p-6 md:p-8 mb-10 space-y-5 text-left">
            {atAGlance.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
                    {label}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href={`mailto:${profile.email}`} className="btn-primary px-8 py-3 text-sm font-semibold">
              Email me
            </a>
            <Link to="/resume" className="btn-secondary px-8 py-3 text-sm font-semibold">
              Read my resume
            </Link>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
