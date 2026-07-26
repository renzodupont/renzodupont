import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

/* Proctored, verifiable credentials. Adding one here updates the header
   badge and the Certifications & Diplomas section together. */
const CERTIFICATIONS = [
  {
    name: 'Salesforce Certified Platform Administrator',
    meta: 'Salesforce · Jul 2026 · Credential ID 7967987',
  },
]

/* Completed university programs. Sit alongside certifications up top —
   these are graded, capstone-bearing programs, not course completions. */
const DIPLOMAS = [
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
const PROFESSIONAL_DEVELOPMENT = [
  'The Cybersecurity Threat Landscape',
  'SOC 2 Compliance Essential Training',
]

/* Vendor and institute training from the early career. */
const TECHNICAL_TRAINING = [
  'Microsoft C# & WPF — LATU, Montevideo · 2009–2010',
  'ERP Development, SQL Server 2000 & Visual Basic 6 — Assist Ltda · 2007',
]

export default function Resume() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Salesforce Developer"
        description="Salesforce Certified Platform Administrator and developer with 18+ years on the platform — Apex, LWC, Flows, SOQL, and REST integrations."
        canonicalUrl="https://renzodupont.com/resume"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Salesforce Developer',
        }}
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

        <div className="resume-container">
          {/* HEADER */}
          <div className="resume-header">
            <div>
              <h1>RENZO DUPONT</h1>
              <div className="resume-title">
                <span className="resume-title-main">Salesforce Developer | Apex | LWC | Flows | REST Integrations</span>
              </div>
              <div className="resume-certs-badge">
                {CERTIFICATIONS.map((cert) => cert.name).join(' · ')}
              </div>
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

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce Certified Platform Administrator and developer with <strong>18+ years</strong> on the
              platform — Apex, LWC, Flows, SOQL, and REST integrations. Sole technical owner of a customized
              Enterprise Edition org spanning sales, service, and finance, where I <strong>lifted client
              retention 20%</strong> and <strong>cut technology spend 75%</strong>. Began as a direct contractor
              to Salesforce.com, delivering Salesforce&rsquo;s internal GEMINI project alongside their engineering teams.
            </p>
          </section>

          {/* CERTIFICATIONS & DIPLOMAS */}
          <section className="resume-section" id="certifications">
            <h2>Certifications &amp; Diplomas</h2>

            {[...CERTIFICATIONS, ...DIPLOMAS].map((item) => (
              <div className="cert-item" key={item.name}>
                <span className="cert-name">{item.name}</span>
                <span className="cert-meta"> — {item.meta}</span>
              </div>
            ))}
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah</div>
              <div className="job-period">January 2020 – Present</div>
            </div>

            <div className="employer-roles">
            <div className="job-header">
              <div className="job-title">Senior Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Sole owner and architect of a customized Salesforce Enterprise Edition org spanning <strong>15+ integrated platforms</strong> across sales, marketing, service, and finance</li>
              <li>Build lead scoring, opportunity management, and forecasting in Apex, LWC, and Flows across Sales Cloud and Service Cloud</li>
              <li>Automate order-to-cash — accounts, orders, and invoicing — connecting Salesforce to ChargeOver, Stripe, and QuickBooks</li>
              <li>Design secure REST integrations connecting Salesforce with customer portals and third-party platforms</li>
              <li>Led multiple Salesforce org merges and splits with zero downtime, running in-house work previously outsourced at <strong>$20K+ per engagement</strong></li>
              <li>Built executive dashboards and client-health reporting that gave leadership visibility into retention risk — <strong>increasing client retention 20%</strong></li>
              <li>Own Salesforce release engineering — GitHub CI/CD, sandbox strategy, and Apex test coverage standards</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li><strong>Reduced technology expenses 75%</strong> by consolidating redundant tools, renegotiating vendor contracts, and optimizing license allocation</li>
              <li>Led a 5-person development and analytics team across Salesforce, Node.js, React, and Python</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Salesforce Advanced Administrator &amp; Developer</div>
              <div className="job-period">January 2020 – May 2021</div>
            </div>
            <ul>
              <li>Delivered <strong>500+</strong> Salesforce requests — custom objects, Flows, approvals, validation rules, and customer-facing portals</li>
              <li>Built Visualforce pages and REST integrations; ran large-scale data migrations with Data Loader — <strong>reducing data errors 20%</strong></li>
            </ul>
            </div>
            </div>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">DUPONT VENTURES LLC — Remote</div>
              <div className="job-period">April 2018 – Present</div>
            </div>

            <div className="employer-roles">
            <div className="job-header">
              <div className="job-title">Technical Consultant — Self-Employed</div>
            </div>
            <ul>
              <li>Independent Salesforce and full-stack consulting for US and LATAM clients — TypeScript, Python, and cloud integrations</li>
              <li>Delivered accounting automation and dashboards for a long-term client, <strong>saving $20,000+ annually</strong></li>
            </ul>
            </div>
            </div>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">DENTAL MARKETING | 123 POSTCARDS — Heber City, Utah</div>
              <div className="job-period">August 2013 – December 2019</div>
            </div>

            <div className="employer-roles">
            <div className="job-header">
              <div className="job-title">Team Leader</div>
              <div className="job-period">February 2018 – December 2019</div>
            </div>
            <ul>
              <li>Led a distributed engineering team across India, Nepal, and the Philippines delivering Salesforce and web projects</li>
              <li>Built a Salesforce-integrated data platform connecting campaign data to CRM records — <strong>increasing productivity 30%</strong> and <strong>call-scoring efficiency 60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="job-title">Software Developer</div>
              <div className="job-period">August 2013 – February 2018</div>
            </div>
            <ul>
              <li>Built and maintained Salesforce-integrated systems connecting campaign data to CRM records via REST APIs</li>
            </ul>
            </div>
            </div>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">ALTIMETRIK — Montevideo, Uruguay · Direct contractor to Salesforce.com</div>
              <div className="job-period">2010 – 2014</div>
            </div>

            <div className="employer-roles">
            <div className="job-header">
              <div className="job-title">Team Lead &amp; Salesforce Developer</div>
            </div>
            <ul>
              <li>Delivered <strong>Salesforce&rsquo;s internal GEMINI project</strong>, working directly with Salesforce.com engineering teams — writing Apex and Visualforce and leading delivery end-to-end</li>
              <li>Built features for the <strong>Salesforce Partner Portal</strong>; mentored junior developers and introduced Agile practices across the team</li>
            </ul>
            </div>
            </div>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">EARLIER ROLES — Uruguay</div>
              <div className="job-period">2007 – 2012</div>
            </div>
            <div className="employer-roles">
            <ul>
              <li><strong>Loasoft — Project Manager (2010–2011):</strong> Managed ERP delivery for enterprise clients</li>
              <li><strong>HWDotUY — Cofounder (2011–2012):</strong> Co-founded a software development and support firm</li>
              <li><strong>Logivai S.A. — Developer (2009–2010):</strong> Built ERP systems in C# and WPF</li>
              <li><strong>PowerStreet — Developer (2007–2008):</strong> Built VB and SQL Server products</li>
            </ul>
            </div>
            </div>
          </section>

          {/* CORE SKILLS & TECHNOLOGIES */}
          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Technologies</h2>
            <div className="tech-compact">
              <strong>Salesforce:</strong> Apex · Lightning Web Components (LWC) · Flow Automation · SOQL/SOSL · REST API Integrations · Sales Cloud · Service Cloud · Data Modeling &amp; Migration (Data Loader) · Sandbox Strategy · Apex Test Coverage · Security &amp; Sharing · Reports &amp; Dashboards · Customer Portals · Visualforce<br />
              <strong>Platform Ownership:</strong> CRM &amp; Business Systems Ownership · Release Management (GitHub CI/CD) · Executive BI &amp; Client-Health Reporting · License Optimization · Team Leadership<br />
              <strong>Engineering:</strong> Node.js · TypeScript · Python · React · REST APIs · AWS · Cloudflare · SQL Server · PostgreSQL<br />
              <strong>AI &amp; Automation:</strong> OpenAI APIs · LLM Integrations · Prompt Engineering · AI Workflow Automation · n8n · Zapier<br />
              <strong>AI Platforms &amp; Assistants:</strong> Claude Code · OpenCode · Codex · Local LLMs · RAG Strategies<br />
              <strong>Integrated Platforms:</strong> Twilio · RingCentral · Stripe · ChargeOver · QuickBooks · Google Workspace
            </div>
          </section>

          {/* EDUCATION & PROFESSIONAL DEVELOPMENT */}
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
        </div>
      </div>
    </div>
  )
}
