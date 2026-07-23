import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import '../styles/resume.css'

export default function Resume() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Salesforce Developer & Administrator"
        description="Salesforce Developer and Administrator with 18+ years across Salesforce development, administration, integrations, and business systems."
        canonicalUrl="https://renzodupont.com/resume"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Salesforce Developer & Administrator',
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
                <span className="resume-title-main">Salesforce Developer &amp; Administrator</span>
                <span className="resume-title-detail">Apex · Flows · Integrations</span>
              </div>
              <div className="resume-contact">
                <a href="mailto:renzo@renzodupont.com">renzo@renzodupont.com</a> |{' '}
                <a href="https://linkedin.com/in/renzo-dupont-b9797941" target="_blank" rel="noopener noreferrer"><span className="screen-only">LinkedIn</span><span className="print-only">linkedin.com/in/renzo-dupont-b9797941</span></a> |{' '}
                <a href="https://renzodupont.com" target="_blank" rel="noopener noreferrer">renzodupont.com</a> |{' '}
                <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer"><span className="screen-only">GitHub</span><span className="print-only">github.com/renzodupont</span></a>
              </div>
              <div className="resume-personal">
                Lehi, Utah (Hybrid / Remote) | Authorized to work in the U.S. — no sponsorship required | Languages: English, Spanish
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce Developer and Administrator with <strong>18+ years</strong> building and
              running Salesforce-centered business systems for sales, marketing, service, and finance. Sole technical
              owner of Salesforce and the surrounding business technology stack — CRM setup, reporting, automation,
              and integrations across <strong>15+ platforms</strong>. Hands-on in Apex, Flows, SOQL, and
              REST integrations, plus Node.js, TypeScript, Python, and AI/LLM automation.
              <strong> Cut technology spend 75%</strong>, <strong>lifted client retention 20%</strong>, and led a
              5-person development and analytics team. Began on the platform as a direct contractor to Salesforce.com,
              delivering the GEMINI project and Partner Portal.
            </p>
          </section>

          {/* CORE SKILLS & TECHNOLOGIES */}
          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Technologies</h2>
            <div className="tech-compact">
              <strong>Salesforce &amp; CRM:</strong> Customized Enterprise Edition org architecture · Apex · Lightning Web Components (LWC) · Flows &amp; Process Builder · SOQL/SOSL · REST API Integrations · Sales Cloud (leads, opportunities, scoring, forecasting) · Service Cloud (case management) · Order-to-cash (accounts, orders, invoicing) · Data Modeling &amp; Migration (Data Loader) · Sandbox Strategy (partial &amp; full copy) · Apex Test Coverage · CI/CD (GitHub) · Release Management · Security &amp; Sharing · Reports &amp; Dashboards · Customer Portals · Visualforce<br />
              <strong>Business Systems / RevOps:</strong> CRM &amp; Business Systems Ownership · GTM Systems · Executive BI &amp; Client-Health Reporting · Vendor Stack &amp; License Optimization · Process Automation · Team Leadership<br />
              <strong>Engineering &amp; Automation:</strong> Node.js · TypeScript/JavaScript · Python · C#/.NET · React &amp; Next.js · REST APIs · AI/LLM Workflows (n8n, Zapier, custom services) · Cloudflare (Workers, D1, R2, KV) · AWS · GCP · Azure · Docker · SQL Server · PostgreSQL · MySQL · MongoDB<br />
              <strong>Integrated Platforms:</strong> Twilio · RingCentral · Stripe · ChargeOver · QuickBooks · Google Workspace · Calendly · AgencyAnalytics · Apollo
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah</div>
              <div className="job-period">January 2020 – Present</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Engineer</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Sole owner and architect of a heavily customized Salesforce Enterprise Edition org and the surrounding business technology stack — CRM data model, internal tools, executive reporting, cloud infrastructure, and vendor systems — spanning 15+ integrated platforms across sales, marketing, service, and finance</li>
              <li>Architect Salesforce-centered operating systems using Apex, LWC, Flows, SOQL, Node.js, TypeScript, REST APIs, and Python — covering lead scoring, opportunity management, and forecasting on the sales side, and case management plus order-to-cash flows connecting accounts, orders, and invoicing to ChargeOver, Stripe, and QuickBooks</li>
              <li>Expose Salesforce data to external customer-facing UIs via custom RESTful API layers; integrate Twilio, RingCentral, AWS, GCP, and Google Workspace into one operating model</li>
              <li>Own Salesforce org strategy through multiple org merges and splits — Apex batch jobs for data migration, validation triggers, and data-integrity controls delivered with zero downtime — running in-house work previously outsourced at <strong>$20K+ per engagement</strong></li>
              <li>Built executive BI and client-health reporting with Python and Salesforce reporting, giving leadership visibility into retention risk and <strong>increasing client retention by 20%</strong></li>
              <li>Own Salesforce release engineering — GitHub-based CI/CD, sandbox strategy across partial and full copy environments, and Apex test coverage standards — and established the review guardrails that let junior engineers safely contribute to the codebase using Claude Code and similar AI coding tools</li>
              <li>Build AI/LLM-enabled automation workflows with n8n, Zapier, and custom Node.js services for data enrichment, workflow routing, reporting, GTM operations, and internal process automation</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li><strong>Reduced technology expenses by 75%</strong> by consolidating redundant tools, renegotiating vendor contracts, and optimizing license allocation while preserving core business functionality through the restructuring</li>
              <li>Led a 5-person development and analytics team — sprint planning, code reviews, deployments, requirements translation, and cross-functional delivery across Salesforce, Node.js, React, Python, and SQL Server</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Salesforce Advanced Administrator &amp; Developer</div>
              <div className="job-period">January 2020 – May 2021</div>
            </div>
            <ul>
              <li>Delivered <strong>500+</strong> Salesforce, reporting, automation, and business-systems requests across accounting, sales, marketing, and customer service — custom objects, Flows, Process Builder, approvals, validation rules, and customer-facing portals</li>
              <li>Built Visualforce pages plus REST API and third-party app integrations, and executed large-scale data migrations with Data Loader, SQL, and validation scripts — <strong>reducing data errors 20%</strong></li>
            </ul>

            <div className="job-header">
              <div className="company-name">DUPONT VENTURES LLC — Independent Consulting Practice (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Principal Technical Consultant</div>
              <div className="job-period">April 2018 – Present</div>
            </div>
            <ul>
              <li>Fractional CTO and architecture advisory for a small roster of long-term US and LATAM clients across Salesforce, cloud platforms, and AI/LLM integrations</li>
              <li><strong>Credilit S.A. — Fractional CTO (2014–2025):</strong> Led digital transformation for a 40+ year credit administrator — Salesforce CRM workflows and admin/dev features, .NET / C# ASP.NET MVC2 web apps, and Azure-hosted client portals and accounting automation. Delivered integrated marketing dashboards and <strong>saved the client $20,000+ annually</strong></li>
              <li><strong>DentalMarketing.net / 123 Postcards — Fractional CTO (2021–2023):</strong> Owned engineering and platform strategy across Salesforce, Angular, React, Node, and AWS. Built a Salesforce-integrated data platform connecting campaign data to CRM records, <strong>increasing productivity 30%</strong> and <strong>improving call-scoring efficiency 60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="company-name">DENTAL MARKETING | 123 POSTCARDS — Heber City, Utah</div>
              <div className="job-period">August 2013 – December 2019 · Salesforce ownership carried forward to Gargle as the team transitioned; DM later sold</div>
            </div>

            <div className="job-header">
              <div className="job-title">Team Leader</div>
              <div className="job-period">February 2018 – December 2019</div>
            </div>
            <ul>
              <li>Led a distributed engineering team across India, Nepal, and the Philippines delivering Salesforce and web projects on time, improving communication and release quality through structured scrum practices</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Software Developer</div>
              <div className="job-period">August 2013 – February 2018</div>
            </div>
            <ul>
              <li>Built and maintained Salesforce-integrated systems connecting marketing campaign data to CRM records via REST APIs, improving visibility into campaign performance and client engagement</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER — Montevideo, Uruguay</div>
              <div className="job-period">2007 – 2014</div>
            </div>
            <ul>
              <li><strong>Altimetrik — Team Lead &amp; Developer (2010–2014):</strong> Led the Salesforce GEMINI project end-to-end and delivered the Partner Portal implementation as a direct contractor to Salesforce.com — writing Apex and Visualforce and collaborating with Salesforce.com teams on architecture and delivery standards. Mentored junior developers and introduced Agile practices</li>
              <li><strong>Loasoft — Project Manager (2010–2011), Logivai S.A. — Developer (2009–2010), HWDotUY — Cofounder (2011–2012):</strong> Managed ERP delivery and built ERP systems in C# and WPF; co-founded a software development and support firm. Earlier: VB / SQL Server products at PowerStreet (2007–2008)</li>
            </ul>
          </section>

          {/* CERTIFICATIONS & EDUCATION */}
          <section className="resume-section" id="education">
            <h2>Education &amp; Professional Development</h2>

            <div className="education-item">
              <div className="education-degree">Salesforce Administration Training — ADM201 (2010); Advanced Administrator coursework (2019)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python — Harvard CS109x (2024)</div>
              <div className="education-school">Diploma awarded following training in LLM training methods and using Python for reinforcement training</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
              <div className="education-school">MERN stack program; scored 100% on the final capstone project</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science — UTU, Mercedes, Soriano, Uruguay</div>
              <div className="education-school">U.S. equivalency certificate obtained; evaluated as U.S. equivalent at Brooklyn College, CUNY</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
