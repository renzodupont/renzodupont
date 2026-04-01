import { Link, useLocation } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

export default function ResumeSenior() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Senior Engineer Resume"
        description="Senior Computer Science Engineer with 18+ years experience."
        canonicalUrl="https://renzodupont.com/resume"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Renzo Dupont — Senior Engineer Resume' }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-6">
        <Link to="/" className="font-display font-bold text-accent">RD</Link>
        <span className="ml-4 text-sm text-text-muted">/ Resume</span>
      </header>

      <div className="resume-web">
        <button className="print-button" onClick={() => window.print()}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Export PDF
        </button>

        <div className="resume-versions">
          <span>Version:</span>
          <Link to="/resume" className={location.pathname === '/resume' ? 'active' : ''}>Senior Engineer</Link>
          <Link to="/resume-leader" className={location.pathname === '/resume-leader' ? 'active' : ''}>Technical Leader</Link>
          <Link to="/resume-salesforce" className={location.pathname === '/resume-salesforce' ? 'active' : ''}>Salesforce Architect</Link>
        </div>

        <div className="resume-container">
          {/* HEADER */}
          <div className="resume-header">
            <div>
              <h1>RENZO DUPONT</h1>
              <div className="resume-title">Senior Computer Science Engineer | Full-Stack Architect</div>
              <div className="resume-contact">
                <a href="mailto:renzo@startupp.ai">renzo@startupp.ai</a> |{' '}
                <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer"><span className="screen-only">LinkedIn</span><span className="print-only">linkedin.com/in/renzo-dupont</span></a> |{' '}
                <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
                <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer"><span className="screen-only">GitHub</span><span className="print-only">github.com/renzodupont</span></a>
              </div>
              <div className="resume-personal">
                Languages: Spanish (Native), English (Fluent)
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Senior Engineer with <strong>18+ years</strong> architecting and scaling enterprise systems, CRMs, and cloud infrastructure.
              Sole senior engineer responsible for the full technology stack at Gargle, Inc., serving 80+ employees across <strong>15+ integrated platforms</strong>.
              Founder &amp; CEO of Startupp.ai, delivering Fractional CTO services to startups and mid-market companies.
              Harvard-certified in Machine Learning and Artificial Intelligence (AI), with hands-on Large Language Model (LLM) implementation experience.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="resume-section" id="competencies">
            <h2>Core Competencies</h2>
            <div className="tech-compact">
              <strong>Languages:</strong> JavaScript/TypeScript · Python · C#/.NET · PHP · Apex · HTML/CSS<br />
              <strong>Frameworks &amp; Tools:</strong> React · Next.js · Astro · Node.js · Angular · Tailwind CSS · REST APIs · Salesforce (Lightning, Flows) · Docker · Git · CI/CD<br />
              <strong>Platforms &amp; Cloud:</strong> Cloudflare (Workers, Pages, D1, R2, KV) · AWS · Azure · GCP · Salesforce (16+ yrs)<br />
              <strong>Databases:</strong> SQL Server · MySQL · MongoDB (10+ years) · PostgreSQL · Airtable<br />
              <strong>AI/ML:</strong> Large Language Model (LLM) Integration · Python ML Pipelines · Harvard CS109xa<br />
              <strong>Architecture:</strong> Microservices · System Design · API Integrations · Business Intelligence
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Sole senior engineer responsible for the full technology stack serving 80+ employees — architecting integrations across 15+ platforms (Salesforce, Twilio, RingCentral, AWS, GCP, Stripe, Calendly, AgencyAnalytics, Apollo, Google Workspace)</li>
              <li>Led a Business Intelligence initiative that <strong>increased client retention by 20%</strong>, directly impacting recurring revenue</li>
              <li>Designed and implemented AI/LLM-powered automation workflows using n8n, Zapier, and custom integrations, reducing manual workload across departments</li>
              <li>Bridge business and engineering teams, orchestrating Development and Analytics teams for seamless cross-functional delivery</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Maintained operational continuity through major company restructuring, <strong>reducing technology expenses by 75%</strong> while preserving full system functionality</li>
              <li>Orchestrated Development and Analytics teams, translating business requirements into technical execution across all product lines</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li><strong>Saved $25,000+</strong> through strategic data migrations and process automation, reducing errors by 20%</li>
              <li>Led hundreds of projects spanning CRM customization, third-party integrations, and workflow optimization</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Founder &amp; Fractional CTO</div>
              <div className="job-period">April 2018 – Present (formalized as Startupp.Cloud LLC in 2022, rebranded to Startupp.ai in 2023)</div>
            </div>
            <ul>
              <li>Deliver Fractional CTO services to 5+ startups and mid-market companies, driving technical strategy that has generated <strong>$20K+ annual savings</strong> through automation, <strong>30% productivity increases</strong>, and <strong>60% efficiency improvements</strong></li>
              <li>Lead technical roadmap planning, architecture decisions, and engineering team mentorship from pre-seed through Series A</li>
              <li>Manage international engineering teams delivering full-stack development, AI implementation, and cloud infrastructure</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Managed technology for 40+ year credit administrator. Automated workflows saving $20,000+ annually. Led full digital transformation: client portals, accounting systems, marketing tracking</li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Built data-driven platform increasing team productivity by 30% and revenue by 15%. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2014) — Uruguay</div>
            </div>
            <ul>
              <li>Progressive roles across 6 companies: Software Developer → Project Manager → Team Lead → Co-Founder</li>
              <li>Led Salesforce GEMINI project at <strong>Altimetrik</strong> (contractor for Salesforce.com), co-founded 2 companies (HWDOTUY, GF Models International), built ERP solutions in C#/.NET at Loasoft S.A.</li>
            </ul>
          </section>

          {/* CERTIFICATIONS & EDUCATION */}
          <section className="resume-section" id="education">
            <h2>Certifications &amp; Education</h2>

            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python (CS109xa) — Harvard University (2024)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Salesforce Administrator ADM201 (2010) | Advanced Administrator (2019)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science</div>
              <div className="education-school">Escuela Tecnica Pedro Blanes, Uruguay (2005–2008) | U.S. equivalency: Brooklyn College, CUNY</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Doctoral Studies in Computer Science (2 years)</div>
              <div className="education-school">Universidad Catolica del Uruguay (2008–2011)</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
