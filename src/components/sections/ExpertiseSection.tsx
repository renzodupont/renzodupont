import { Cloud, Database, Brain, Code2, Shield, Users } from 'lucide-react'
import BlurText from '../BlurText'
import TiltCard from '../TiltCard'
import ScrollReveal from '../ScrollReveal'

const expertise = [
  { icon: Shield, title: 'Salesforce Engineering', description: '16+ years. Apex, LWC, Flows, integrations, enterprise architecture.' },
  { icon: Code2, title: 'Full-Stack Development', description: 'React, Node, Python, TypeScript, cloud infrastructure.' },
  { icon: Brain, title: 'AI & Machine Learning', description: 'Harvard ML/AI. LLMs, agents, automation pipelines.' },
  { icon: Cloud, title: 'Cloud & Infrastructure', description: 'AWS, Cloudflare, CI/CD, serverless, Docker.' },
  { icon: Database, title: 'Database Management', description: 'PostgreSQL, MongoDB, Redis, DynamoDB, SQL Server.' },
  { icon: Users, title: 'Leadership', description: 'Team building, hiring, engineering strategy, mentorship.' },
]

export default function ExpertiseSection() {
  return (
    <ScrollReveal morphTransition>
      <section id="expertise" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Expertise</span>
          </div>
          <BlurText
            text="What I bring to the table"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12"
            delay={0.05}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map(({ icon: Icon, title, description }) => (
              <TiltCard key={title} className="card-glass rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
