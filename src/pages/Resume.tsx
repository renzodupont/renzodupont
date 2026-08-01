import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  CERTIFICATIONS_BADGE,
  ResumeVersions,
  ResumeHeader,
  CredentialsSection,
  EducationSection,
} from '../components/ResumeShared'
import '../styles/resume.css'

/* Salesforce variant. Credentials, contact block and education live in
   ResumeShared so they stay identical to the software-engineering
   variant at /resume-engineer. */
export default function Resume() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Salesforce Developer"
        description="Salesforce Certified Platform Developer and Platform Administrator II with 18+ years on the platform — Apex, LWC, Flows, SOQL, and REST integrations."
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

        <ResumeVersions />

        <div className="resume-container">
          <ResumeHeader
            headline="Salesforce Developer | Apex | LWC | Flows | REST Integrations"
            badge={CERTIFICATIONS_BADGE}
          />

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce Certified <strong>Platform Developer</strong> and <strong>Platform Administrator II</strong>
              (advanced administrator) with <strong>18+ years</strong> on the platform — Apex, LWC, Flows, SOQL,
              and REST integrations. Sole technical owner of a customized
              Enterprise Edition org spanning sales, service, and finance, where I <strong>lifted client
              retention 20%</strong> and <strong>cut technology spend 75%</strong>. Began as a direct contractor
              to Salesforce.com, delivering Salesforce&rsquo;s internal GEMINI project alongside their engineering teams.
            </p>
          </section>

          <CredentialsSection />

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
              <div className="job-title">Technical Consultant (Part-time / Independent)</div>
            </div>
            <ul>
              <li>Full-stack delivery outside the Salesforce stack — TypeScript, Python, PostgreSQL, RAG pipelines, and the Cloudflare edge stack (D1, R2, AI Gateway)</li>
              <li>Client-facing consulting for US and LATAM clients — business analysis, requirements gathering, UI/UX, implementation, and end-user training</li>
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

          <EducationSection />
        </div>
      </div>
    </div>
  )
}
