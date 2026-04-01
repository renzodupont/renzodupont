import ScrollReveal from '../ScrollReveal'

const testimonials = [
  {
    quote: 'Renzo has a great mix of technical talent and people skills that make him an invaluable asset to any organization. He does a fantastic job melding together the technical and automation pieces to improve the company overall.',
    name: 'Jacob',
    role: 'Former CTO, Gargle',
  },
  {
    quote: 'Renzo brings a ton of technical talent to any engineering environment. He is highly effective in his communication skills and ensuring everyone he is working with is on the same page.',
    name: 'Skyler',
    role: 'Senior Frontend Engineer, Payscale',
  },
  {
    quote: 'Renzo is an exceptionally thoughtful engineer. He approaches system design with clarity and intention, always considering scalability, security, and long-term maintainability. His solutions shine with structure, reliability, and a vision for the future.',
    name: 'Oscar Vissani',
    role: 'CEO/CFO, Credilit S.A.',
  },
]

export default function TestimonialSection() {
  return (
    <ScrollReveal>
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Testimonials</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, name, role }) => (
              <div key={name} className="card-glass rounded-xl p-6">
                <div className="text-3xl text-accent/30 font-display mb-3">&ldquo;</div>
                <blockquote className="text-sm text-text-secondary italic leading-relaxed mb-6">
                  {quote}
                </blockquote>
                <div className="text-text-primary font-semibold text-sm">{name}</div>
                <div className="text-xs text-text-muted">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
