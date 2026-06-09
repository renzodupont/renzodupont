import { Link, useLocation } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

export default function ResumeSalesforce() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Salesforce Architect Resume"
        description="Salesforce Architect with 16+ years experience."
        canonicalUrl="https://renzodupont.com/resume-salesforce"
        noIndex
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Renzo Dupont — Salesforce Architect Resume' }}
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
              <div className="resume-title">
                <span className="resume-title-main">Salesforce &amp; Business Systems Architect</span>
                <span className="resume-title-detail">CRM Integrations · AI Automation · Full-Stack Engineering</span>
              </div>
              <div className="resume-contact">
                <a href="mailto:renzo@startupp.ai">renzo@startupp.ai</a> |{' '}
                <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer"><span className="screen-only">LinkedIn</span><span className="print-only">linkedin.com/in/renzo-dupont</span></a> |{' '}
                <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
                <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer"><span className="screen-only">GitHub</span><span className="print-only">github.com/renzodupont</span></a>
              </div>
              <div className="resume-personal">
                Authorized to work in the U.S. — no sponsorship required | Languages: English, Spanish
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce and Business Systems Architect with <strong>16+ years</strong> across Salesforce architecture, CRM integrations, BI reporting, data migrations, and automation at scale.
              Sole senior engineer for an 80+ employee company, owning Salesforce, internal tools, reporting, cloud infrastructure, and integrations across <strong>15+ platforms</strong> including Twilio, RingCentral, Stripe, AWS, GCP, Calendly, AgencyAnalytics, Apollo, and Google Workspace.
              Salesforce administration training in ADM201 and Advanced Administrator coursework, with hands-on depth in Apex, Flows, SOQL, security, governance, data models, and stakeholder-facing delivery.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="resume-section" id="competencies">
            <h2>Salesforce &amp; Technical Competencies</h2>
            <div className="tech-compact">
              <strong>Salesforce Architecture:</strong> Flows · Apex · SOQL/SOSL · Lightning · Visualforce · Reports &amp; Dashboards · Data Modeling<br />
              <strong>Platform Ownership:</strong> Business Systems Ownership · Security &amp; Sharing · Governance · Sandbox Management · Change Sets · License Optimization<br />
              <strong>CRM Integrations:</strong> REST/SOAP APIs · Twilio · RingCentral · Stripe · ChargeOver · Calendly · AgencyAnalytics · Apollo · Zapier · n8n · Google Workspace<br />
              <strong>Data, BI &amp; Automation:</strong> Data Migrations · Data Loader · ETL · Executive Reporting · Client Health Reporting · AI/LLM Workflows<br />
              <strong>Complementary Stack:</strong> TypeScript · Python · Node.js · React · AWS · GCP · Cloudflare · SQL Server · MongoDB · PostgreSQL
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Engineer / Business Systems Architect</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Own Salesforce and the full business technology stack for an 80+ employee company, including CRM workflows, internal tools, executive reporting, cloud infrastructure, vendor systems, and integrations across 15+ platforms</li>
              <li>Architect Salesforce-centered operating systems using Apex, Flows, SOQL, Node.js, TypeScript, REST APIs, and Python to connect Twilio, RingCentral, Stripe, AWS, GCP, Google Workspace, and other business-critical platforms</li>
              <li>Led multiple Salesforce org mergers and environment splits, writing Apex batch jobs for data migrations, building validation triggers, and maintaining data integrity with zero downtime</li>
              <li>Built custom Salesforce reports, dashboards, and BI views that gave leadership visibility into client health, <strong>increasing client retention by 20%</strong></li>
              <li>Built AI/LLM-enabled automation workflows with n8n, Zapier, and custom Node.js services for data enrichment, workflow routing, reporting, GTM operations, and internal process automation</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Reduced technology expenses by <strong>75%</strong> by consolidating redundant tools, renegotiating vendor contracts, optimizing license allocation, and preserving core business functionality through restructuring</li>
              <li>Led a 5-person development and analytics team, running sprint planning, code reviews, deployments, requirements translation, and cross-functional delivery across Salesforce, Node.js, React, Python, and SQL Server</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li>Primary Salesforce administrator for the entire organization — designed custom objects, page layouts, validation rules, workflow rules, approval processes, and built integrations using Apex and PHP</li>
              <li>Delivered 500+ Salesforce, reporting, automation, and business-systems requests including third-party integrations, data migrations (Data Loader, Apex batch), and process automation — <strong>saved $25,000+</strong> and reduced data errors by 20%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI / STARTUPP.CLOUD — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Founder &amp; Principal Technical Consultant</div>
              <div className="job-period">April 2018 – Present</div>
            </div>
            <ul>
              <li>Lead an independent consulting and product practice focused on Salesforce, web platforms, cloud systems, AI features, automation, and data workflows for startups and mid-market companies</li>
              <li>Selected ventures and brands include StartUpp.Cloud, OpenAva, Lumina Consulting Group, and Dupont Ventures LLC, which formalized related consulting and product work in 2026</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>HoneyGrid, Inc — Part-Time Client Engagement, Sr. Software Engineer, Apr 2024 – Present:</strong> Building generative AI features for a digital marketing platform using TypeScript on Cloudflare (Workers, Pages, D1, R2, KV) with multiple LLM providers — complementing Salesforce expertise with modern cloud-native development</li>
              <li><strong>Credilit S.A. — Part-Time Technical Consultant, Apr 2018 – Oct 2025:</strong> Designed and implemented a CRM and client portal for a 40+ year credit administrator — built automated billing workflows, communication tracking, and marketing dashboards, <strong>saving $20,000+ annually</strong></li>
              <li><strong>DentalMarketing.net — Part-Time Technical Consultant, Sep 2021 – Jan 2023:</strong> Built a Salesforce-integrated data platform connecting campaign data to CRM records, <strong>increasing productivity by 30%</strong>. Redesigned Call Scoring end-to-end, <strong>improving efficiency by 60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="company-name">ALTIMETRIK — Montevideo, Uruguay (Contractor for Salesforce.com)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Team Lead — Salesforce GEMINI Project &amp; Partner Portal</div>
              <div className="job-period">2010 – 2014</div>
            </div>
            <ul>
              <li>Led the Salesforce GEMINI project (internal finance tool) as a direct contractor for Salesforce.com — managed a development team, wrote Apex and Visualforce code, and coordinated directly with Salesforce engineering teams</li>
              <li>Developed features on the Salesforce Partner Portal, mentored junior developers on the platform, and implemented Agile methodologies across the team</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2013) — Uruguay</div>
            </div>
            <ul>
              <li>Salesforce + PHP integrations at Dental Marketing, ERP development in C#/.NET/SQL Server at Loasoft S.A., and client solutions in VB6/SQL Server at Powerstreet/Assist Ltda</li>
            </ul>
          </section>

          {/* CERTIFICATIONS & EDUCATION */}
          <section className="resume-section" id="education">
            <h2>Certifications &amp; Education</h2>

            <div className="education-item">
              <div className="education-degree">Salesforce Administration Training — ADM201 (2010) | Advanced Administrator coursework (2019)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python — Harvard CS109x (2024)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science — Uruguay</div>
              <div className="education-school">Evaluated as U.S. equivalent: Brooklyn College, CUNY</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
