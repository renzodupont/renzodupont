import { Link, useLocation } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

export default function ResumeLeader() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Technical Leader Resume"
        description="Fractional CTO / Director of Engineering resume."
        canonicalUrl="https://renzodupont.com/resume-leader"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Renzo Dupont — Technical Leader Resume' }}
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
              <div className="resume-title">Fractional CTO | Director of Engineering | Technical Leader</div>
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
              Technical leader with <strong>18+ years</strong> driving engineering strategy, scaling teams, and delivering enterprise systems across multiple industries.
              Currently leading the entire technology organization at Gargle, Inc. (80+ employees) while simultaneously running Startupp.ai as Founder &amp; CEO, providing Fractional CTO services to startups across the US and Latam.
              Proven track record managing international engineering teams, owning technical roadmaps, and <strong>bridging business strategy with engineering execution</strong>.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="resume-section" id="competencies">
            <h2>Core Competencies</h2>
            <div className="tech-compact">
              <strong>Technical Leadership:</strong> Engineering Strategy · Roadmap Planning · Cross-Functional Collaboration · Vendor &amp; Stakeholder Management · Technical Due Diligence<br />
              <strong>Team Management:</strong> International Teams · Agile/Scrum · Mentorship · Hiring &amp; Team Building · Performance Optimization<br />
              <strong>Architecture &amp; Strategy:</strong> System Design · Microservices · Cloud Infrastructure · AI/LLM Strategy · Digital Transformation<br />
              <strong>Platforms:</strong> Salesforce (16+ yrs) · AWS · Azure · GCP · Cloudflare<br />
              <strong>Full Stack:</strong> JavaScript/TypeScript · Python · React · Node.js · .NET
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Founder &amp; Fractional CTO</div>
              <div className="job-period">April 2018 – Present (formalized as Startupp.Cloud LLC in 2022, rebranded to Startupp.ai in 2023)</div>
            </div>
            <ul>
              <li>Founded and lead a Fractional CTO consultancy serving 5+ startups and mid-market companies across North America — providing strategic technical leadership, architecture oversight, and engineering team mentorship</li>
              <li>Own technical roadmap planning, hiring strategy, and vendor selection from pre-seed through Series A, enabling founders to scale their engineering organizations</li>
              <li>Manage international engineering teams delivering full-stack development, AI implementation, and cloud infrastructure across multiple time zones</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Led technology strategy for 40+ year credit administrator. Drove digital transformation across client portals, accounting, and marketing — saving $20,000+ annually through automation</li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Delivered data-driven platform increasing team productivity by 30% and revenue by 15%. Redesigned Call Scoring system, improving efficiency by 60% and reducing costs by 40%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Lead Senior Engineer for the entire company's technology infrastructure (80+ on-site and remote employees), owning architecture decisions, vendor relationships, and technical roadmap</li>
              <li>Orchestrate a team of 3 engineers and cross-functional Analytics stakeholders, bridging business needs with engineering execution</li>
              <li>Drove a Business Intelligence initiative that <strong>increased client retention by 20%</strong>, presenting insights directly to executive leadership to shape company strategy</li>
              <li>Spearheaded AI/LLM adoption across the organization, defining implementation strategy and managing rollout across departments</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Led technology organization through major company restructuring, <strong>reducing expenses by 75%</strong> while maintaining full operational continuity and team morale</li>
              <li>Managed cross-functional teams spanning development, analytics, and IT operations, aligning technical priorities with business objectives</li>
              <li>Established engineering processes and standards that scaled the team's delivery capacity during rapid organizational change</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li>Led hundreds of projects across CRM customization, process automation, and system integrations, <strong>saving $25,000+</strong> and reducing errors by 20%</li>
              <li>Mentored junior developers and administrators, building institutional knowledge and engineering culture</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2014) — Uruguay</div>
            </div>
            <ul>
              <li>Progressive leadership roles across 6 companies: Software Developer → Project Manager → Team Lead → Co-Founder</li>
              <li>Led Salesforce GEMINI project at <strong>Altimetrik</strong> (contractor for Salesforce.com), co-founded 2 companies (HWDOTUY, GF Models International), managed international teams across India, Nepal, and Philippines</li>
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
