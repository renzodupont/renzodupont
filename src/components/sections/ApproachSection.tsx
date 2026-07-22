import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'

/**
 * Replaces the old six-buzzword-card "Expertise" grid. Skill lists are
 * unfalsifiable and every candidate has one; stated positions on how to build
 * are what a hiring panel can actually interrogate in an interview.
 */
const principles = [
  {
    title: 'One system of record, always',
    body: 'Most business-systems failures are not code failures — they are two systems that both think they are authoritative. I keep the CRM (or the database) as the single source of truth and expose everything else through a controlled API layer, even when a direct sync would ship faster.',
  },
  {
    title: 'Migrations are engineering, not data entry',
    body: 'Org merges, splits, and platform migrations get treated as staged, reversible, tested work — batch jobs, validation triggers, integrity controls, and a rollback story — not a weekend of Data Loader runs. That is what makes zero-downtime cutovers repeatable instead of lucky.',
  },
  {
    title: 'Integration is a contract problem',
    body: 'Connecting fifteen platforms is easy; keeping them connected through five years of vendor API changes is the actual job. I design integrations around explicit contracts and failure behavior, so a partner outage degrades one workflow instead of corrupting the pipeline.',
  },
  {
    title: 'Reporting should change a decision',
    body: 'A dashboard that nobody acts on is cost, not value. I build reporting backwards from the decision it should inform — which is why the client-health work at Gargle surfaced churn risk before renewal conversations rather than after them.',
  },
  {
    title: 'Leverage juniors, do not gatekeep them',
    body: 'Leading a small team means the constraint is review capacity, not typing speed. I put guardrails in place — CI/CD, sandbox strategy, test coverage standards, review checklists — so less-experienced engineers, including ones using AI coding tools, can ship to production safely.',
  },
  {
    title: 'Cut spend by removing systems, not features',
    body: 'The 75% reduction at Gargle came from consolidating redundant tools and reallocating licenses, not from degrading what the business could do. Knowing what a stack actually needs is the prerequisite to knowing what it can lose.',
  },
]

export default function ApproachSection() {
  return (
    <ScrollReveal morphTransition>
      <section id="approach" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Approach</span>
          </div>
          <BlurText
            text="How I build"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
            delay={0.05}
          />
          <p className="text-text-muted max-w-2xl mb-12 leading-relaxed">
            Positions I've arrived at from 18 years of owning production systems — and would defend
            in a design review.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {principles.map(({ title, body }, i) => (
              <div key={title}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-accent/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-text-primary">{title}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed pl-8">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
