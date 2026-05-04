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
        noIndex
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
              <div className="resume-title">Business Systems Architect | Salesforce, AI Automation, CRM Integrations &amp; Full-Stack Engineering</div>
              <div className="resume-contact">
                <a href="mailto:renzo@startupp.ai">renzo@startupp.ai</a> |{' '}
                <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer"><span className="screen-only">LinkedIn</span><span className="print-only">linkedin.com/in/renzo-dupont</span></a> |{' '}
                <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
                <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer"><span className="screen-only">GitHub</span><span className="print-only">github.com/renzodupont</span></a>
              </div>
              <div className="resume-personal">
                Languages: English, Spanish
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Business Systems Architect and senior technical leader with <strong>18+ years</strong> building Salesforce-centered platforms, CRM integrations, BI reporting, cloud systems, and AI automation.
              Sole senior engineer for an 80+ employee company, owning Salesforce, data pipelines, vendor systems, internal tools, and integrations across <strong>15+ platforms</strong>.
              Strong record translating messy business requirements into scalable systems, reducing tech costs by <strong>75%</strong>, improving client retention by <strong>20%</strong>, and leading development/analytics teams.
              Hands-on across Salesforce, Apex, Flows, Node.js, TypeScript, Python, React, SQL, cloud infrastructure, and LLM workflows.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="resume-section" id="competencies">
            <h2>Core Competencies</h2>
            <div className="tech-compact">
              <strong>Business Systems:</strong> Salesforce Architecture · CRM Integrations · Enterprise Applications · Resource Planning · Vendor Management<br />
              <strong>Salesforce:</strong> Flows · Apex · SOQL/SOSL · Lightning · Reports &amp; Dashboards · Data Loader · Security &amp; Sharing<br />
              <strong>Automation &amp; Data:</strong> AI/LLM Workflows · n8n · Zapier · BI / Executive Reporting · Data Pipelines · ETL · Process Automation<br />
              <strong>Engineering:</strong> TypeScript · Node.js · Python · React · REST APIs · SQL Server · PostgreSQL · MongoDB · C#/.NET · PHP<br />
              <strong>Cloud &amp; Platforms:</strong> AWS · GCP · Azure · Cloudflare (Workers, Pages, D1, R2, KV) · Docker · CI/CD
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer / Business Systems Architect</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Own the full business technology stack for an 80+ employee company, including Salesforce, CRM workflows, internal tools, reporting, cloud infrastructure, and integrations across 15+ platforms</li>
              <li>Architect Salesforce-centered operating systems using Apex, Flows, SOQL, Node.js, TypeScript, REST APIs, and Python to connect Twilio, RingCentral, Stripe, AWS, GCP, Google Workspace, and other business-critical platforms</li>
              <li>Built executive BI and client-health reporting using Python and Salesforce reporting, giving leadership visibility into retention risks and <strong>increasing client retention by 20%</strong></li>
              <li>Built AI/LLM automation workflows with n8n, Zapier, and custom Node.js services for data enrichment, workflow routing, reporting, and operational process automation</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Reduced technology expenses by <strong>75%</strong> by consolidating redundant tools, renegotiating vendor contracts, optimizing license allocation, and preserving core business functionality through restructuring</li>
              <li>Led development and analytics teams, running sprint planning, code reviews, deployments, requirements translation, and cross-functional delivery across Salesforce, Node.js, React, Python, and SQL Server</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li>Delivered hundreds of Salesforce projects, including custom objects, Flows, workflow rules, approvals, Apex/PHP integrations, migrations, and operational automation</li>
              <li>Executed large-scale Salesforce data migrations using SQL, Data Loader, and validation scripts, <strong>saving $25,000+</strong> and reducing data errors by 20%</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Technical Consultant / Fractional CTO</div>
              <div className="job-period">April 2018 – Present</div>
            </div>
            <ul>
              <li>Provide part-time technical leadership and implementation support for startups and mid-market companies across Salesforce, web platforms, cloud systems, AI features, automation, and data workflows</li>
              <li>Focus on architecture, hands-on delivery, technical strategy, and mentoring teams from pre-seed through growth-stage environments</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>HoneyGrid, Inc (Sr. Software Engineer, Apr 2024 – Present, Remote):</strong> Build generative AI features for a digital marketing platform on the Cloudflare stack (Workers, Pages, D1, R2, KV) using TypeScript and multiple LLM providers</li>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Led digital transformation for a 40+ year credit administrator, implementing CRM workflows, client portals, accounting automation, and marketing dashboards, <strong>saving $20,000+ annually</strong></li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Built a Salesforce-integrated data platform connecting campaign data to CRM records, <strong>increasing productivity by 30%</strong>. Redesigned Call Scoring end-to-end, <strong>improving efficiency by 60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2014) — Uruguay</div>
            </div>
            <ul>
              <li>Progressive roles across 6 companies — Developer → Project Manager → Team Lead → Co-Founder. Built ERP systems in C#/WPF/SQL Server (Loasoft), Salesforce + PHP integrations (Dental Marketing), and client solutions in VB6/SQL Server (Powerstreet)</li>
              <li>Led the Salesforce GEMINI project at <strong>Altimetrik</strong> (contractor for Salesforce.com) — wrote Apex and Visualforce code, managed the dev team, and coordinated with Salesforce engineering</li>
            </ul>
          </section>

          {/* CERTIFICATIONS & EDUCATION */}
          <section className="resume-section" id="education">
            <h2>Certifications &amp; Education</h2>

            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python — Harvard CS109x (2024)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Salesforce Administrator ADM201 (2010) | Advanced Administrator (2019)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science</div>
              <div className="education-school">U.S. equivalency: Brooklyn College, CUNY</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
