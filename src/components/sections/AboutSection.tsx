import BlurText from '../BlurText'
import ScrollTextReveal from '../ScrollTextReveal'
import ScrollReveal from '../ScrollReveal'

// "Led technology organizations of 80+ employees" was removed: 80 was the size of
// the company, not the org led. The resume says a 5-person team, and a recruiter
// who catches the gap discounts every other number on the page.
const aboutText = `I started as a direct contractor to Salesforce.com in Montevideo, delivering the GEMINI project and Partner Portal, and have spent the 18 years since owning the systems businesses run on — CRM architecture, finance and order-to-cash integrations, data migrations, and executive reporting. Today I'm the sole architect of a heavily customized Salesforce org and a 15+ platform stack at Gargle, where I also led a 5-person development and analytics team. Alongside that I build OpenAva, a multi-tenant business platform, which keeps me hands-on with Postgres, API design, and product engineering rather than only architecture diagrams. Formal training includes Machine Learning and AI with Python through Harvard CS109x and Full Stack Development through MIT xPro. I work best where business systems, hands-on engineering, and technical leadership meet.`

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
