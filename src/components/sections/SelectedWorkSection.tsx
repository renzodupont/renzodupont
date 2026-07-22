import { ExternalLink } from 'lucide-react'
import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'
import { projects, type Project } from '../../data/projects'

function ProjectCard({ project }: { project: Project }) {
  const isAccent = project.accent === 'accent'
  const accentText = isAccent ? 'text-accent' : 'text-pink'
  const accentBorder = isAccent ? 'border-accent/20' : 'border-pink/20'
  const accentDot = isAccent ? 'bg-accent' : 'bg-pink'

  return (
    <article className="card-glass rounded-2xl p-6 md:p-10">
      {/* Header — company, role, period, outcomes */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="min-w-0">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
            {project.company}
          </h3>
          <p className={`text-sm font-medium mt-1 ${accentText}`}>{project.role}</p>
          <p className="text-xs font-mono text-text-muted mt-1">{project.period}</p>
        </div>

        <div className="flex flex-wrap gap-6 lg:gap-8 lg:justify-end shrink-0">
          {project.outcomes.map(({ value, label }) => (
            <div key={label} className="lg:text-right">
              <div className={`text-2xl md:text-3xl font-bold ${accentText}`}>{value}</div>
              <div className="text-xs text-text-muted max-w-[9rem] lg:ml-auto">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context + problem */}
      <p className="text-text-secondary leading-relaxed mb-5">{project.context}</p>

      <div className={`border-l-2 ${accentBorder} pl-5 mb-8`}>
        <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          The problem
        </div>
        <p className="text-text-secondary leading-relaxed">{project.problem}</p>
      </div>

      {/* Architecture — the part hiring panels actually read */}
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">
          What I built
        </div>
        <ul className="space-y-3">
          {project.architecture.map(item => (
            <li key={item} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
              <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${accentDot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack + links */}
      <div className="flex flex-wrap items-center gap-1.5 pt-6 border-t border-white/5">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-1 rounded bg-dark-700 text-text-muted border border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.links && (
        <div className="flex flex-wrap gap-5 mt-5">
          {project.links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm ${accentText} hover:underline underline-offset-4`}
            >
              {label}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function SelectedWorkSection() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-xs text-pink uppercase tracking-widest">Selected Work</span>
        </div>
        <BlurText
          text="Systems I've owned end to end"
          className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
          delay={0.05}
        />
        <p className="text-text-muted max-w-2xl mb-12 leading-relaxed">
          Four platforms across fintech, marketing SaaS, and multi-tenant product — the problem each
          one started from, the architecture I chose, and what changed as a result.
        </p>

        <div className="space-y-8">
          {projects.map(project => (
            <ScrollReveal key={project.slug}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
