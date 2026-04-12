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
              <li>Founded and run a Fractional CTO consultancy — step into early-stage companies as their technical leader, define architecture and hiring strategy, build their engineering teams, and set the roadmap from pre-seed through Series A</li>
              <li>Manage distributed engineering teams across North and South America, establishing development processes, conducting technical interviews, and aligning engineering output with business milestones</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Drove the digital transformation of a 40+ year credit administrator — defined technical strategy, hired and managed the engineering team, and oversaw delivery of client portals, accounting automation, and marketing systems, <strong>saving $20,000+ annually</strong></li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Joined as technical leader for a growing marketing agency — built a data platform that gave the team real-time performance visibility (<strong>+30% productivity, +15% revenue</strong>), then redesigned the Call Scoring system end-to-end (<strong>+60% efficiency, −40% cost</strong>)</li>
            </ul>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Serve as the senior technical leader for the entire company (80+ employees) — own architecture decisions, manage vendor relationships, and set the technical roadmap across all product lines</li>
              <li>Lead a team of 3 engineers and coordinate with Analytics stakeholders, running sprint planning, code reviews, and cross-functional delivery meetings to keep business and engineering aligned</li>
              <li>Conceived and led a Business Intelligence initiative — built reporting dashboards and presented insights directly to executive leadership, <strong>increasing client retention by 20%</strong> and reshaping company strategy</li>
              <li>Championed AI/LLM adoption across the organization — evaluated tools, defined the implementation strategy, and managed the rollout of automated workflows across sales and operations</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Guided the technology organization through a major company restructuring — consolidated redundant tools, renegotiated vendor contracts, and reallocated resources to <strong>reduce expenses by 75%</strong> while keeping every system operational and the team intact</li>
              <li>Managed cross-functional teams across development, analytics, and IT operations — established sprint cadences, defined delivery standards, and aligned technical priorities with evolving business objectives during a period of rapid change</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li>Led hundreds of CRM and integration projects, growing from administrator to team lead — mentored junior developers, built institutional knowledge, and established the engineering culture that the team still operates on</li>
              <li>Executed large-scale data migrations and process automation initiatives, <strong>saving $25,000+</strong> and reducing data errors by 20%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2014) — Uruguay</div>
            </div>
            <ul>
              <li>Progressive leadership arc across 6 companies — Software Developer → Project Manager → Team Lead → Co-Founder — managing international teams across India, Nepal, and Philippines while co-founding 2 companies (HWDOTUY, GF Models International)</li>
              <li>Led the Salesforce GEMINI project at <strong>Altimetrik</strong> as a direct contractor for Salesforce.com — managed developers, implemented Agile methodologies, and coordinated with Salesforce engineering teams</li>
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
