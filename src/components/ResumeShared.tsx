import { Link, useLocation } from 'react-router-dom'

/* Shared across every resume variant. Credentials, contact details and the
   education block are identical no matter which role the resume targets —
   keeping them here means adding a certification stays a one-line edit
   instead of one edit per variant that can drift out of sync. */

/* Proctored, verifiable credentials. Adding one here updates the header
   badge and the Certifications & Diplomas section on every variant. */
export const CERTIFICATIONS = [
  {
    name: 'Salesforce Certified Platform Developer',
    short: 'Platform Developer',
    meta: 'Salesforce · Jul 2026 · Credential ID 7976268',
  },
  {
    name: 'Salesforce Certified Platform Administrator',
    short: 'Platform Administrator',
    meta: 'Salesforce · Jul 2026 · Credential ID 7967987',
  },
]

/* Header pill. Uses the short names behind one "Salesforce Certified" so a
   second credential widens the badge by a few words, not a full line. */
export const CERTIFICATIONS_BADGE = `Salesforce Certified: ${CERTIFICATIONS.map((cert) => cert.short).join(' · ')}`

/* Completed university programs. Sit alongside certifications up top —
   these are graded, capstone-bearing programs, not course completions. */
export const DIPLOMAS = [
  {
    name: 'Machine Learning & AI with Python',
    meta: 'Harvard University — CS109x · 2024 · Diploma awarded',
  },
  {
    name: 'Full Stack Development (MERN)',
    meta: 'MIT xPro · 2021 · 100% on final capstone',
  },
]

/* Short-form course completions — kept at the end, subordinate to the
   credentials above so they don't dilute them. */
export const PROFESSIONAL_DEVELOPMENT = [
  'The Cybersecurity Threat Landscape',
  'SOC 2 Compliance Essential Training',
]

/* Vendor and institute training from the early career. */
export const TECHNICAL_TRAINING = [
  'Microsoft C# & WPF — LATU, Montevideo · 2009–2010',
  'ERP Development, SQL Server 2000 & Visual Basic 6 — Assist Ltda · 2007',
]

/* Screen-only switcher between resume variants. Hidden in print so an
   exported PDF never advertises that other versions exist. */
export function ResumeVersions() {
  const { pathname } = useLocation()
  return (
    <div className="resume-versions">
      <span>Version:</span>
      <Link to="/resume" className={pathname === '/resume' ? 'active' : ''}>
        Salesforce Developer
      </Link>
      <Link to="/resume-engineer" className={pathname === '/resume-engineer' ? 'active' : ''}>
        Software Engineer
      </Link>
    </div>
  )
}

export function ResumeHeader({ headline, badge }: { headline: string; badge?: string }) {
  return (
    <div className="resume-header">
      <div>
        <h1>RENZO DUPONT</h1>
        <div className="resume-title">
          <span className="resume-title-main">{headline}</span>
        </div>
        {badge && <div className="resume-certs-badge">{badge}</div>}
        <div className="resume-contact">
          <a href="mailto:renzo@renzodupont.com">renzo@renzodupont.com</a> |{' '}
          <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer"><span className="screen-only">LinkedIn</span><span className="print-only">linkedin.com/in/renzo-dupont-b9797941</span></a> |{' '}
          <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
          <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer"><span className="screen-only">GitHub</span><span className="print-only">github.com/renzodupont</span></a>
        </div>
        <div className="resume-personal">
          Lehi, Utah — on-site, hybrid, or remote | U.S. work authorized, no sponsorship | English &amp; Spanish
        </div>
      </div>
    </div>
  )
}

export function CredentialsSection() {
  return (
    <section className="resume-section" id="certifications">
      <h2>Certifications &amp; Diplomas</h2>
      {[...CERTIFICATIONS, ...DIPLOMAS].map((item) => (
        <div className="cert-item" key={item.name}>
          <span className="cert-name">{item.name}</span>
          <span className="cert-meta"> — {item.meta}</span>
        </div>
      ))}
    </section>
  )
}

export function EducationSection() {
  return (
    <section className="resume-section" id="education">
      <h2>Education &amp; Professional Development</h2>

      <div className="education-item">
        <span className="education-degree">Bachelor&rsquo;s Degree in Computer Science</span>
        <span className="education-school"> — Universidad del Trabajo del Uruguay (UTU) · 2008</span>
      </div>

      <div className="education-item">
        <span className="education-degree">U.S. Academic Equivalency</span>
        <span className="education-school"> — Bachelor of Science in Computer Science, concentrations in Software Development &amp; Entrepreneurship · Evaluated 2024 by a professor of the Murray Koppelman School of Business, Brooklyn College (CUNY)</span>
      </div>

      <div className="cert-development">
        <strong>Professional development:</strong> {PROFESSIONAL_DEVELOPMENT.join(' · ')} — LinkedIn, 2026
      </div>

      <div className="cert-development">
        <strong>Technical training:</strong> {TECHNICAL_TRAINING.join(' · ')}
      </div>
    </section>
  )
}
