import { Linkedin } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'
import { profile } from '../../data/profile'

/**
 * A first-name-only quote reads as unverifiable. Fill in `name` with the full
 * name and `linkedin` with a link to the person's profile (or to the specific
 * LinkedIn recommendation) — an attributable reference is worth several
 * anonymous ones.
 */
interface Testimonial {
  quote: string
  name: string
  role: string
  linkedin?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Renzo has a great mix of technical talent and people skills that make him an invaluable asset to any organization. He does a fantastic job melding together the technical and automation pieces to improve the company overall.',
    // TODO(renzo): add last name + LinkedIn URL
    name: 'Jacob',
    role: 'Former CTO, Gargle',
  },
  {
    quote:
      'Renzo brings a ton of technical talent to any engineering environment. He is highly effective in his communication skills and ensuring everyone he is working with is on the same page.',
    // TODO(renzo): add last name + LinkedIn URL
    name: 'Skyler',
    role: 'Senior Frontend Engineer, Payscale',
  },
  {
    quote:
      'Renzo is an exceptionally thoughtful engineer. He approaches system design with clarity and intention, always considering scalability, security, and long-term maintainability. His solutions shine with structure, reliability, and a vision for the future.',
    name: 'Oscar Vissani',
    role: 'CEO/CFO, Credilit S.A.',
  },
]

export default function TestimonialSection() {
  return (
    <ScrollReveal>
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">
              References
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, name, role, linkedin }) => (
              <div key={name} className="card-glass rounded-xl p-6 flex flex-col">
                <div className="text-3xl text-accent/30 font-display mb-3">&ldquo;</div>
                <blockquote className="text-sm text-text-secondary italic leading-relaxed mb-6 flex-1">
                  {quote}
                </blockquote>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-text-primary font-semibold text-sm">{name}</div>
                    <div className="text-xs text-text-muted">{role}</div>
                  </div>
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} on LinkedIn`}
                      className="ml-auto text-text-muted hover:text-accent transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-8">
            More recommendations on{' '}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </ScrollReveal>
  )
}
