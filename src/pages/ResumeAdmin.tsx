import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  CERTIFICATIONS_BADGE_ADMIN,
  ResumeVersions,
  ResumeHeader,
  CredentialsSection,
  EducationSection,
} from '../components/ResumeShared'
import '../styles/resume.css'

/* Salesforce Administrator variant. Same history as /resume, but Admin-
   first positioning: declarative platform ownership leads; Apex and APIs
   appear as the differentiator that most admins escalate.

   Job titles match LinkedIn exactly across resume variants — positioning
   lives in the bullets, not rewritten historical titles. */
export default function ResumeAdmin() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Salesforce Administrator"
        description="Salesforce Certified Platform Administrator II with 16+ years on the platform — Sales Cloud, Flows, automation, data quality, security, reporting, and production support."
        canonicalUrl="https://renzodupont.com/resume-admin"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Salesforce Administrator',
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
            headline="Salesforce Administrator | Flows · Sales Cloud · Service Cloud · Data · Automation"
            badge={CERTIFICATIONS_BADGE_ADMIN}
          />

          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Salesforce Certified <strong>Platform Administrator II</strong> with <strong>16+ years</strong> on the
              Salesforce platform, including hands-on ownership of Sales Cloud administration, Flows, automation,
              data quality, security, reporting, integrations, release management, and production support.
              Experienced translating stakeholder requirements into scalable platform solutions, improving business
              processes, and governing changes across sales, service, and operational teams.
            </p>
          </section>

          <CredentialsSection priority="admin" />

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
              <li>Owned Salesforce platform administration for Sales Cloud and Service workflows — custom objects, page layouts, validation rules, app personalization, Sites configuration, and pricing / discounts / quote-to-cash setup</li>
              <li>Managed users and access: role hierarchy, profiles, permission sets, queues, public groups, sharing rules, SSO via JumpCloud, login IP ranges, password policies, and license utilization</li>
              <li>Designed and maintained Flows and business-process automation for lead scoring, opportunity management, forecasting, case routing, and operational handoffs</li>
              <li>Owned Salesforce reports and dashboards for sales, operations, and leadership — translating business KPIs into actionable visibility that drove <strong>client retention +20%</strong></li>
              <li>Maintained data quality and led Data Loader migrations, cleanup, and org merge/split activities with change validation before release</li>
              <li>Managed releases and sandbox strategy — Change Sets, Salesforce CLI, and stakeholder demos; configured managed packages / AppExchange (Conga, Calendly, WeFlow) and Pardot (~1 year); used Apex, SOQL, and REST when declarative options were not enough</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Player-coach: led a 5-person team while remaining the primary Salesforce administrator for Flows, configuration, security, data quality, and production troubleshooting</li>
              <li>Ran Agile ceremonies and partnered with BSAs, product owners, QA, and ops — gathering requirements, prioritizing backlog, and validating changes before release</li>
              <li>Owned sandbox strategy, deployment quality gates, and license optimization; applied Apex/SOQL when automation or integrations exceeded declarative limits</li>
            </ul>

            <div className="role-keep">
            <div className="job-header">
              <div className="job-title">Salesforce Advanced Administrator</div>
              <div className="job-period">January 2020 – May 2021</div>
            </div>
            <ul>
              <li>Administered Salesforce — custom objects, validation rules, Flows, approvals, page layouts, profiles/permission sets, and security model configuration for sales and operations users</li>
              <li>Ran data migrations with Data Loader and validated changes before release — <strong>reducing data errors 20%</strong>; supported REST integrations where needed</li>
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
              <li>Hands-on Salesforce lead for a distributed team — owned org configuration, production support, user training, and CRM solution quality while running Agile delivery</li>
              <li>Connected campaign data to Sales Cloud records and built operational reporting — <strong>productivity +30%</strong> and <strong>call-scoring efficiency +60%</strong></li>
            </ul>

            <div className="job-header">
              <div className="job-title">Software Developer</div>
              <div className="job-period">August 2013 – February 2018</div>
            </div>
            <ul>
              <li>Configured Salesforce for sales and operations — custom objects, workflows, validation, page layouts, and reporting; ran Data Loader migrations</li>
              <li>Triaged production defects and service requests; built CRM integrations connecting marketing systems to Sales Cloud when needed</li>
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
              <li>Led platform delivery on <strong>Salesforce&rsquo;s internal GEMINI</strong> project as a contractor embedded with Salesforce.com teams — change validation and delivery quality</li>
              <li>Built features for the <strong>Salesforce Partner Portal</strong>; mentored junior team members and introduced Agile practices across the team</li>
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
              <li><strong>PowerStreet — Software Developer (2007–2008):</strong> Built VB and SQL Server products</li>
            </ul>
            </div>
            </div>
          </section>

          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Technologies</h2>
            <div className="tech-compact">
              <strong>Salesforce Administration:</strong> Flows · Sales Cloud · Service Cloud · Omni-Channel · Custom Objects · Validation Rules · Approvals · Page Layouts · App Personalization · Sites · Role Hierarchy · Profiles · Permission Sets · Queues · Public Groups · Sharing Rules · SSO (JumpCloud) · Login IP Ranges · Password Policies · Reports &amp; Dashboards · Pricing / Discounts / Quote-to-Cash · Managed Packages · AppExchange (Conga · Calendly · WeFlow) · Pardot<br />
              <strong>Data &amp; Automation:</strong> Data Loader · Data Quality · Business Process Automation · Sandbox Management · Change Sets · Release Management · Change Validation<br />
              <strong>Governance &amp; Support:</strong> User Management · License Optimization · User Training &amp; Adoption · Incident Analysis · Stakeholder Requirements<br />
              <strong>Technical Differentiator:</strong> Apex · SOQL/SOSL · REST/JSON Integrations · Named Credentials · Salesforce CLI · Visualforce · Lightning Web Components<br />
              <strong>Delivery:</strong> Agile (Standups · Sprint Planning · Backlog Grooming · Retrospectives) · BSA / PM / QA Collaboration
            </div>
          </section>

          <EducationSection includeDiplomas />
        </div>
      </div>
    </div>
  )
}
