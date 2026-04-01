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
