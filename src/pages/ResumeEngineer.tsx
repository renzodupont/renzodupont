import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  ResumeVersions,
  ResumeHeader,
  CredentialsSection,
  EducationSection,
} from '../components/ResumeShared'
import '../styles/resume.css'

/* Software-engineering variant. Same roles and same facts as /resume, but
   led by languages, services, APIs and cloud rather than the Salesforce
   platform — Salesforce appears as the enterprise system of record it is,
   not as the headline.

   Section order for this variant: Summary → Core Skills → Experience →
   Certifications → Education. Engineering stack must lead; Salesforce
   credentials must not be the first signal a generalist recruiter sees. */
export default function ResumeEngineer() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Software Engineer"
        description="Software engineer with 18+ years building production backend services, REST APIs, data pipelines, and cloud and AI systems in TypeScript, Node.js, and Python."
        canonicalUrl="https://renzodupont.com/resume-engineer"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Software Engineer',
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
          <ResumeHeader headline="Senior Software Engineer | TypeScript · Node.js · C#/.NET · Python · Cloud · AI" />

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Software engineer with <strong>18+ years</strong> building production systems end to end —
              Web APIs, system integrations, data migrations, and cloud infrastructure across the
              JavaScript and .NET ecosystems. Architected and led an entire business technology stack
              spanning <strong>15+ integrated platforms</strong>, from data model through CI/CD and release
              engineering. Led a 5-person engineering team and shipped AI/LLM features and RAG pipelines on
              the Cloudflare edge stack.
            </p>
            <div className="stack-years">
              <strong>Experience by stack:</strong> SQL &amp; relational data 18+ yrs · Salesforce 16+ yrs ·
              .NET / C# (ASP.NET, Web API, LINQ, WPF) 10+ yrs · JavaScript &amp; TypeScript (Node, React) 8+ yrs ·
              Python 6+ yrs
            </div>
          </section>

          {/* CORE SKILLS — before credentials so engineering stack leads */}
          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Technologies</h2>
            <div className="tech-compact">
              <strong>Languages &amp; Frameworks:</strong> TypeScript · JavaScript · Node.js · Python · React · C# · .NET / ASP.NET · SQL<br />
              <strong>Backend &amp; APIs:</strong> REST &amp; Web API Design · System Integrations · LINQ · Data Modeling &amp; Migration · Batch Processing · Automated Testing · Release Management (GitHub CI/CD)<br />
              <strong>AI &amp; Automation:</strong> OpenAI APIs · LLM Integrations · RAG Pipelines · Prompt Engineering · AI Workflow Automation · n8n · Zapier<br />
              <strong>AI Platforms &amp; Assistants:</strong> Claude Code · OpenCode · Codex · Local LLMs<br />
              <strong>Cloud &amp; Data:</strong> Cloudflare (Workers, D1, R2, AI Gateway) · AWS · PostgreSQL · SQL Server · Docker<br />
              <strong>Enterprise Platforms:</strong> Salesforce (Apex, LWC, Flows, SOQL) · Twilio · RingCentral · Stripe · QuickBooks · Google Workspace<br />
              <strong>Delivery:</strong> Team Leadership · Business Analysis · UI/UX · Stakeholder-Facing Implementation
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE — contiguous block before certs/education */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="employer">
              <div className="job-header">
                <div className="company-name">GARGLE, INC — Lehi, Utah</div>
                <div className="job-period">January 2020 – July 31, 2026</div>
              </div>

              <div className="employer-roles">
                <div className="job-header">
                  <div className="job-title">Senior Engineer</div>
                  <div className="job-period">December 2023 – July 31, 2026</div>
                </div>
                <ul>
                  <li>Architected and led the company&rsquo;s business technology stack across backend services, internal tools, cloud infrastructure, and integrations spanning <strong>15+ platforms</strong></li>
                  <li>Built backend services and REST APIs in Node.js, TypeScript, Python, and C#/ASP.NET connecting billing, telephony, and productivity systems — Stripe, ChargeOver, QuickBooks, Twilio, RingCentral, and Google Workspace</li>
                  <li>Shipped AI/LLM automation and RAG pipelines for data enrichment, workflow routing, and reporting on Node.js services and the Cloudflare edge stack (Workers, D1, R2, AI Gateway), plus n8n and Zapier</li>
                  <li>Owned release engineering — GitHub CI/CD, multi-environment strategy, automated tests; used PostgreSQL and SQL Server alongside Python for data pipelines and executive reporting — <strong>client retention +20%</strong></li>
                  <li>Ran large-scale data migrations and system merges with batch jobs, validation, and integrity controls at zero downtime, replacing work previously outsourced at <strong>$20K+ per engagement</strong></li>
                  <li>Architected and maintained the Salesforce Enterprise Edition org as the system of record — Apex, LWC, Flows, and SOQL — with stakeholder-facing delivery from requirements through implementation and training</li>
                </ul>

                <div className="job-header">
                  <div className="job-title">IT &amp; Development Manager</div>
                  <div className="job-period">June 2021 – December 2023</div>
                </div>
                <ul>
                  <li>Player-coach: led a 5-person development and analytics team across Node.js, TypeScript, React, Python, and SQL Server while remaining hands-on on APIs, integrations, and production troubleshooting</li>
                  <li>Owned Web API design, third-party integrations, and UI/UX delivery for internal tools — sprint planning, code review, and stakeholder demos</li>
                  <li><strong>Reduced technology expenses 75%</strong> by consolidating redundant tools, renegotiating vendor contracts, and optimizing infrastructure and license allocation</li>
                </ul>

                <div className="role-keep">
                <div className="job-header">
                  <div className="job-title">Salesforce Advanced Administrator</div>
                  <div className="job-period">January 2020 – May 2021</div>
                </div>
                <ul>
                  <li>Delivered <strong>500+</strong> platform, reporting, and automation requests <strong>per quarter</strong> across accounting, sales, marketing, and support</li>
                  <li>Built REST and third-party integrations and ran large-scale data migrations with validation scripts — <strong>reducing data errors 20%</strong></li>
                </ul>
                </div>
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
                  <li>Hands-on lead for a distributed engineering team (India, Nepal, Philippines) — business analysis, requirements, UI/UX, implementation, and end-user training alongside delivery management</li>
                  <li>Delivered C#/ASP.NET Web API services with LINQ and SQL data access alongside TypeScript, React, and Node front ends on AWS; PostgreSQL and SQL Server for campaign and CRM data stores</li>
                  <li>Built a data platform integrating campaign data with CRM records via REST — <strong>productivity +30%</strong> and <strong>call-scoring efficiency +60%</strong></li>
                </ul>

                <div className="job-header">
                  <div className="job-title">Software Developer</div>
                  <div className="job-period">August 2013 – February 2018</div>
                </div>
                <ul>
                  <li>Built and maintained integration services and Web APIs connecting campaign data to CRM records — C#, REST, and SQL</li>
                </ul>
              </div>
            </div>

            <div className="employer">
              <div className="job-header">
                <div className="company-name">ALTIMETRIK | Salesforce.com Engineering Contractor — Montevideo, Uruguay</div>
                <div className="job-period">2010 – 2014</div>
              </div>

              <div className="employer-roles">
                <div className="job-header">
                  <div className="job-title">Team Lead</div>
                </div>
                <ul>
                  <li>Led a development team delivering <strong>Salesforce&rsquo;s internal GEMINI platform</strong>, working directly with Salesforce.com engineering teams on architecture and delivery standards</li>
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

          <CredentialsSection />
          <EducationSection />
        </div>
      </div>
    </div>
  )
}
