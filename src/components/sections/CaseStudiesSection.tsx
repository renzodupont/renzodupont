import BlurText from '../BlurText'
import ScrollStack from '../ScrollStack'

const caseStudies = [
  { company: 'Credilit S.A.', description: '40-year fintech company — full digital transformation', details: 'Managed technology for a legacy credit administrator. Automated workflows, built client portals, accounting systems, and marketing tracking.', metric: '$20K+', metricLabel: 'saved annually', color: 'accent' as const },
  { company: 'DentalMarketing.net', description: 'SaaS platform optimization', details: 'Built data-driven platform. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%.', metric: '30%', metricLabel: 'productivity increase', color: 'pink' as const },
  { company: 'Digital Marketing Company', description: '80-person company — BI initiative', details: 'Led Business Intelligence initiative as sole senior engineer. Architected integrations across 15+ platforms serving 80+ employees.', metric: '20%', metricLabel: 'client retention increase', color: 'accent' as const },
]

const products = [
  {
    name: 'Ava CRM',
    color: 'accent' as const,
    description: 'AI-native CRM with 12+ modules — contacts, invoicing, projects, inventory, marketing, and more.',
    stack: ['React', 'TypeScript', 'Cloudflare Workers', 'D1', 'R2', 'REST API', 'Whitelabel-ready'],
  },
  {
    name: 'Agency OS',
    color: 'pink' as const,
    description: 'BYOK digital marketing agency platform with AI-powered campaign management and analytics.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Multi-tenant', 'Stripe Billing'],
  },
  {
    name: 'Your ID',
    color: 'accent' as const,
    description: 'Identity verification platform for the Mexican rental market with enterprise-grade encryption.',
    stack: ['React Native', 'Python', 'AES-256 Encryption', 'OCR/ML Pipeline', 'AWS', 'KYC Compliance'],
  },
]

export default function CaseStudiesSection() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-xs text-pink uppercase tracking-widest">Work</span>
        </div>
        <BlurText
          text="Case Studies & Products"
          className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12"
          delay={0.05}
        />
        <ScrollStack>
          {caseStudies.map(({ company, description, details, metric, metricLabel, color }) => (
            <div key={company} className="stack-card card-glass rounded-2xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary">{company}</h3>
                  <p className="text-sm text-text-muted">{description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${color === 'accent' ? 'text-accent' : 'text-pink'}`}>{metric}</div>
                  <div className="text-xs text-text-muted">{metricLabel}</div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{details}</p>
            </div>
          ))}
          <div className="stack-card card-glass rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">Products I've Built</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map(({ name, color, description, stack }) => (
                <div key={name} className={`rounded-xl border p-5 ${color === 'accent' ? 'border-accent/10 bg-accent/[0.02]' : 'border-pink/10 bg-pink/[0.02]'}`}>
                  <h4 className={`font-display font-bold mb-2 ${color === 'accent' ? 'text-accent' : 'text-pink'}`}>{name}</h4>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">{description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-700 text-text-muted border border-white/5">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollStack>
      </div>
    </section>
  )
}
