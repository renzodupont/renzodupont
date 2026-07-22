import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'

/**
 * Split by depth rather than by category. An undifferentiated wall of logos
 * invites the reader to assume the weakest item is representative; separating
 * "I own this" from "I've shipped with this" is a credibility signal on its own.
 */
const deep = [
  {
    group: 'Salesforce Platform',
    items: ['Apex', 'Lightning Web Components', 'Flows', 'SOQL / SOSL', 'REST Integrations', 'Sales & Service Cloud', 'Data Migration', 'Sandbox & Release Strategy', 'Security & Sharing'],
  },
  {
    group: 'Business Systems & Integration',
    items: ['System-of-record architecture', 'Order-to-cash', 'ChargeOver', 'QuickBooks', 'Stripe', 'Twilio', 'RingCentral', 'Executive BI', 'Org merges & splits'],
  },
  {
    group: 'Engineering',
    items: ['Node.js', 'TypeScript', 'C# / .NET', 'Python', 'React', 'REST API design', 'PostgreSQL', 'SQL Server'],
  },
]

const working = [
  {
    group: 'Cloud & Infrastructure',
    items: ['AWS', 'Azure', 'GCP', 'Cloudflare (Workers, D1, R2, KV)', 'Docker', 'GitHub Actions'],
  },
  {
    group: 'Front End & Data',
    items: ['Next.js', 'Angular', 'Astro', 'MongoDB', 'MySQL'],
  },
  {
    group: 'AI & Automation',
    items: ['LLM workflows', 'n8n', 'Zapier', 'Claude Code', 'Harvard CS109x (ML/AI with Python)'],
  },
]

function StackGroup({
  label,
  note,
  groups,
  accent,
}: {
  label: string
  note: string
  groups: { group: string; items: string[] }[]
  accent: 'accent' | 'pink'
}) {
  const isAccent = accent === 'accent'
  return (
    <div>
      <h3 className={`font-display font-bold text-lg mb-1 ${isAccent ? 'text-accent' : 'text-pink'}`}>
        {label}
      </h3>
      <p className="text-xs text-text-muted mb-6">{note}</p>
      <div className="space-y-6">
        {groups.map(({ group, items }) => (
          <div key={group}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2.5">
              {group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map(item => (
                <span
                  key={item}
                  className={`text-xs px-2.5 py-1 rounded-md border ${
                    isAccent
                      ? 'border-accent/15 bg-accent/[0.04] text-text-secondary'
                      : 'border-white/5 bg-dark-700 text-text-muted'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StackSection() {
  return (
    <ScrollReveal>
      <section id="stack" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-pink uppercase tracking-widest">Stack</span>
          </div>
          <BlurText
            text="What I go deep on, and what I've shipped with"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12"
            delay={0.05}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <StackGroup
              label="I own this"
              note="Primary responsibility in production, at depth, over years."
              groups={deep}
              accent="accent"
            />
            <StackGroup
              label="I've shipped with this"
              note="Used in delivered production work — productive, not my deepest specialty."
              groups={working}
              accent="pink"
            />
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
