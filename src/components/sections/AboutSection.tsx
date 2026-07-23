import BlurText from '../BlurText'
import ScrollTextReveal from '../ScrollTextReveal'
import ScrollReveal from '../ScrollReveal'

// "Led technology organizations of 80+ employees" was removed: 80 was the size of
// the company, not the org led. The resume says a 5-person team, and a recruiter
// who catches the gap discounts every other number on the page.
const aboutText = `I have about 18 years of experience building and supporting the business systems that companies rely on, with most of that time focused on Salesforce. I've worked as both an administrator and a developer — setting up CRM workflows, connecting different systems together, building custom tools and reports, and automating manual work. Over the years I've worked with a range of technologies, including Apex, Node.js, TypeScript, Python, C#/.NET, React, SQL databases, and the major cloud platforms. I've also led and mentored small engineering teams, handling planning, code reviews, and day-to-day delivery. I do my best work where business systems, hands-on development, and working with a team come together.`

export default function AboutSection() {
  return (
    <ScrollReveal morphTransition>
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-pink uppercase tracking-widest">About</span>
          </div>
          <BlurText
            text="About my experience"
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
