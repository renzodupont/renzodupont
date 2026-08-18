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
        description="Salesforce Certified Platform Developer and Platform Administrator II — Apex, Lightning Web Components, Flows, SOQL/SOSL, Visualforce, REST/JSON integrations, and production support."
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
            headline="Salesforce Developer | Apex · Flows · Integrations · Production Support"
            badge={CERTIFICATIONS_BADGE}
          />

          {/* PROFESSIONAL SUMMARY */}
          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce Certified <strong>Platform Developer</strong> and <strong>Platform Administrator II</strong>
              {' '}with <strong>16+ years</strong> on the Salesforce platform, with hands-on development across Apex,
              Lightning Web Components, Flows, SOQL/SOSL, Visualforce, and REST/JSON integrations. Hands-on builder
              throughout my career, including during management roles: writing Apex, resolving production incidents,
              validating changes, and coordinating releases. Strongest in Sales Cloud development, API automation,
              data quality, and Agile delivery with BSAs, product, QA, and business stakeholders.
            </p>
          </section>

          <CredentialsSection />

          {/* PROFESSIONAL EXPERIENCE */}
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
              <li>Developed and supported Sales Cloud apps with Apex Triggers, Batch/Queueable/Scheduled Apex, Flows, and SOQL/SOSL — bulkified for governor limits — lead scoring, opportunities, forecasting, and case routing</li>
              <li>Built and supported REST/JSON integrations using Named Credentials, Apex callouts, asynchronous processing, retry/error handling, and automated tests — ChargeOver, Stripe, QuickBooks, Twilio, RingCentral</li>
              <li>Owned releases: sandbox refreshes, change validation, Git branching/PRs, GitHub CI/CD, Change Sets, Ant, Salesforce CLI/SFDX; Apex unit tests with mocked HTTP callouts; debug via log analysis</li>
              <li>Supported service routing and operational Salesforce workflows, including Omni-Channel configuration and automation</li>
              <li>Shipped org merges/splits with Batch Apex, validation triggers, and Data Loader; Salesforce reporting that drove <strong>client retention +20%</strong></li>
              <li>Configured AppExchange packages (Conga, Calendly, WeFlow) and Pardot (~1 year); resolved <strong>500+</strong> tickets <strong>per quarter</strong> throughout Gargle tenure</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Player-coach: led a 5-person development and analytics team while remaining the primary Salesforce developer for Apex, Flows, integrations, and production troubleshooting</li>
              <li>Ran Agile ceremonies and partnered with BSAs, product owners, QA, and ops on enhancements and defect resolution</li>
              <li>Refactored Apex and integrations for governor-limit safety and SOQL optimization; owned Apex test strategy, sandbox strategy, and deployment quality gates</li>
            </ul>

            <div className="role-keep">
            <div className="job-header">
              <div className="job-title">Salesforce Advanced Administrator</div>
              <div className="job-period">January 2020 – May 2021</div>
            </div>
            <ul>
              <li>Developed and supported Salesforce apps — custom objects, validation rules, Flows, approvals, Visualforce, Apex Triggers, and security model configuration</li>
              <li>Built REST integrations and data migrations with Data Loader and Batch Apex — <strong>reducing data errors 20%</strong>; validated changes before release</li>
            </ul>
            </div>
            </div>
            </div>

            <div className="employer">
            <div className="job-header">
              <div className="company-name">HONEYGRID, INC</div>
              <div className="job-period">April 2024 – Present</div>
            </div>

            <div className="employer-roles">
            <div className="job-header">
              <div className="job-title">Sr. Software Engineer</div>
              <div className="job-period">April 2024 – Present</div>
            </div>
            <ul>
              <li>Building generative AI features for a digital marketing platform using TypeScript on Cloudflare (Workers, Pages, D1, R2, KV) with multiple LLM providers — complementing Salesforce expertise with modern cloud-native development</li>
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
              <li>Hands-on Salesforce lead for a distributed engineering team — wrote Apex/PHP integrations, reviewed CRM solutions, and owned production support while running Agile delivery</li>
              <li>Built REST/JSON integrations connecting campaign data to Sales Cloud records — <strong>productivity +30%</strong> and <strong>call-scoring efficiency +60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="job-title">Software Developer</div>
              <div className="job-period">August 2013 – February 2018</div>
            </div>
            <ul>
              <li>Developed Salesforce integrations — custom objects, Apex/PHP bridges, REST APIs, and Data Loader migrations connecting marketing systems to Sales Cloud</li>
              <li>Triaged production defects and service requests; configured workflows, validation, page layouts, and reporting for sales and operations</li>
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
              <li>Wrote Apex and Visualforce for <strong>Salesforce&rsquo;s internal GEMINI platform</strong> as an engineering contractor embedded with Salesforce.com teams — delivery, code quality, and change validation</li>
              <li>Built features for the <strong>Salesforce Partner Portal</strong>; mentored junior developers on Apex/Visualforce and introduced Agile practices across the team</li>
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
              <strong>Salesforce Development:</strong> Apex Triggers · Batch / Queueable / Scheduled Apex · SOQL/SOSL · Flows · Visualforce · Lightning Web Components · Bulkification · Governor Limits · Unit Testing · Sales Cloud<br />
              <strong>Integration &amp; Automation:</strong> REST/JSON · Named Credentials · Apex Callouts · Async Processing · Mocked HTTP Callouts · GitHub CI/CD · Git Branching / PRs · Change Sets · Ant · Salesforce CLI / SFDX · AppExchange (Conga · Calendly · WeFlow) · Pardot<br />
              <strong>Production Support:</strong> Incident Analysis · Log Analysis / Debugging · Service Requests · Change Validation · Release Management · Sandbox Refreshes · Data Quality · Security &amp; Sharing<br />
              <strong>Delivery:</strong> Agile (Standups · Sprint Planning · Backlog Grooming · Retrospectives) · BSA / PM / QA Collaboration<br />
              <strong>Also:</strong> Omni-Channel · Partner Portal · Service Cloud · Node.js · TypeScript · Python · SQL
            </div>
          </section>

          <EducationSection />
        </div>
      </div>
    </div>
  )
}
