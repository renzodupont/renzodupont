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
            enableBlur
            baseOpacity={0.1}
            baseRotation={3}
            blurStrength={4}
            className="text-lg leading-relaxed text-text-secondary"
          >
            {aboutText}
          </ScrollTextReveal>
        </div>
      </section>
    </ScrollReveal>
  )
}
