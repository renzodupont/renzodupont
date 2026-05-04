import BlurText from '../BlurText'
import ScrollTextReveal from '../ScrollTextReveal'
import ScrollReveal from '../ScrollReveal'

const aboutText = `From building financial platforms in Uruguay to leading engineering teams in Utah, I've spent 18+ years building enterprise systems, Salesforce platforms, GTM workflows, and AI automation that teams rely on every day. My background includes Machine Learning and AI with Python through Harvard CS109x and Full Stack Development through MIT xPro. I've led technology organizations of 80+ employees, managed 5-person development and analytics teams, and driven digital transformations that saved $20K+ annually, improved productivity, and reduced operational cost. I thrive where business systems, hands-on engineering, and strategic technical leadership intersect.`

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
