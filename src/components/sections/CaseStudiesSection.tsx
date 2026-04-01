import BlurText from '../BlurText'
import ScrollStack from '../ScrollStack'

const caseStudies = [
  { company: 'Credilit S.A.', description: '40-year fintech company — full digital transformation', details: 'Managed technology for a legacy credit administrator. Automated workflows, built client portals, accounting systems, and marketing tracking.', metric: '$20K+', metricLabel: 'saved annually', color: 'accent' as const },
  { company: 'DentalMarketing.net', description: 'SaaS platform optimization', details: 'Built data-driven platform. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%.', metric: '30%', metricLabel: 'productivity increase', color: 'pink' as const },
  { company: 'Digital Marketing Company', description: '80-person company — BI initiative', details: 'Led Business Intelligence initiative as sole senior engineer. Architected integrations across 15+ platforms serving 80+ employees.', metric: '20%', metricLabel: 'client retention increase', color: 'accent' as const },
]

const products = [
  { name: 'Startupp.ai', color: 'accent' },
  { name: 'Ava CRM', color: 'pink' },
  { name: 'Agency OS', color: 'accent' },
  { name: 'LivIQ', color: 'pink' },
  { name: 'Smart Test', color: 'accent' },
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
          <div className="stack-card card-glass rounded-2xl p-8 border-pink/10">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">My Products</h3>
            <div className="flex flex-wrap gap-3">
              {products.map(({ name, color }) => (
                <span key={name} className={`text-sm px-4 py-1.5 rounded-full border ${color === 'accent' ? 'text-accent border-accent/20 bg-accent/[0.04]' : 'text-pink border-pink/20 bg-pink/[0.04]'}`}>{name}</span>
              ))}
            </div>
          </div>
        </ScrollStack>
      </div>
    </section>
  )
}
