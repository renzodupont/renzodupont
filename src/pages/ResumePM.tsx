import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  ResumeVersions,
  ResumeHeader,
  CredentialsSection,
  EducationSection,
} from '../components/ResumeShared'
import '../styles/resume.css'

/* Project / Product leadership variant. Same employers and LinkedIn job
   titles as the other resumes — bullets lead with stakeholder management,
   requirements, prioritization, timelines, triage, budgets, and cross-
   functional delivery. Section order: Summary → Skills → Experience →
   Certifications → Education so PM competencies surface before Salesforce
   credentials. */
export default function ResumePM() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Technical Project / Product Leader"
        description="Technical project and product leader with 18+ years leading cross-functional delivery — stakeholder communication, requirements, prioritization, timelines, triage, and budgets."
        canonicalUrl="https://renzodupont.com/resume-pm"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Technical Project / Product Leader',
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
          <ResumeHeader headline="Technical Project Leader | Product Ownership · Stakeholders · Delivery · Prioritization" />

          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Technical project and product leader with <strong>18+ years</strong> driving cross-functional delivery
              across sales, operations, finance, marketing, and engineering. Experienced as a hands-on product owner
              and project lead — gathering requirements, negotiating scope and priorities, documenting progress,
              managing timelines and Gantt plans, triaging work, and communicating with stakeholders at every level.
            </p>
          </section>

          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Competencies</h2>
            <div className="tech-compact">
              <strong>Project &amp; Product Leadership:</strong> Product Ownership · Project Planning · Roadmaps · Gantt Charts · Timelines · Milestone Tracking · Scope Negotiation · Priority Management · Backlog Grooming<br />
              <strong>Stakeholders &amp; Communication:</strong> Cross-Department Collaboration · Executive Updates · Requirements Gathering · Progress Documentation · Status Reporting · Demos · Change Communication<br />
              <strong>Delivery Operations:</strong> Triage · Incident Prioritization · Release Coordination · Risk Management · Budget &amp; Vendor Negotiation · License / Cost Optimization<br />
              <strong>Ways of Working:</strong> Agile / Scrum · Sprint Planning · Standups · Retrospectives · BSA / PM / QA Partnership · User Training &amp; Adoption<br />
              <strong>Platform Context:</strong> Salesforce (CRM / Business Systems) · Integrations · Reporting &amp; KPIs · AppExchange / Vendor Management
            </div>
          </section>

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
                  <li>Acted as product owner and project lead for company-wide Salesforce and business-systems initiatives — gathering requirements from sales, service, finance, and leadership, then negotiating scope, priorities, and delivery timelines</li>
                  <li>Ran cross-department programs end to end: documented progress, maintained Gantt / milestone plans, coordinated releases, and reported status to stakeholders</li>
                  <li>Owned triage for production issues and enhancement requests — prioritized work against business impact, communicated tradeoffs, and kept critical paths on schedule</li>
                  <li>Negotiated vendor and tooling decisions across <strong>15+ platforms</strong>; delivered org merges/splits and reporting programs that drove <strong>client retention +20%</strong></li>
                  <li>Partnered with BSAs, product stakeholders, QA, and ops on backlog grooming, acceptance criteria, demos, and change validation before go-live</li>
                </ul>

                <div className="job-header">
                  <div className="job-title">IT &amp; Development Manager</div>
                  <div className="job-period">June 2021 – December 2023</div>
                </div>
                <ul>
                  <li>Led a 5-person development and analytics team — sprint planning, standups, retrospectives, code/delivery reviews, and cross-functional coordination with sales, marketing, accounting, and support</li>
                  <li>Owned project intake, prioritization, and roadmap sequencing; translated stakeholder needs into scoped work with clear timelines and documented progress</li>
                  <li>Negotiated vendor contracts and consolidated tools — <strong>reduced technology expenses 75%</strong> while preserving core business capability through restructuring</li>
                  <li>Managed budgets, license allocation, and delivery risk; escalated tradeoffs early and kept leadership informed on status, blockers, and decisions needed</li>
                </ul>

                <div className="role-keep">
                  <div className="job-header">
                    <div className="job-title">Salesforce Advanced Administrator</div>
                    <div className="job-period">January 2020 – May 2021</div>
                  </div>
                  <ul>
                    <li>Gathered requirements from accounting, sales, marketing, and support; documented solutions and coordinated delivery of platform and portal initiatives</li>
                    <li>Triaged and delivered enhancement work with change validation before release — <strong>reducing data errors 20%</strong> on migration-led projects</li>
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
                  <li>Led a distributed engineering team across India, Nepal, and the Philippines — set priorities, ran Scrum ceremonies, and improved communication and release quality</li>
                  <li>Owned project and platform strategy across Salesforce and web delivery; gathered requirements, negotiated scope with stakeholders, and tracked timelines through delivery</li>
                  <li>Drove a Salesforce-integrated campaign/CRM data program — <strong>productivity +30%</strong> and <strong>call-scoring efficiency +60%</strong> — with documented progress and cross-team coordination</li>
                </ul>

                <div className="job-header">
                  <div className="job-title">Software Developer</div>
                  <div className="job-period">August 2013 – February 2018</div>
                </div>
                <ul>
                  <li>Partnered with sales and operations to gather requirements and deliver CRM / campaign integrations; triaged defects and communicated status through implementation</li>
                  <li>Documented delivery progress and supported user-facing rollout for systems connecting marketing data to Salesforce</li>
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
                  <li>Led delivery on <strong>Salesforce&rsquo;s internal GEMINI</strong> project — planning through deployment, coordinating with Salesforce.com engineering, and owning timeline and quality</li>
                  <li>Mentored junior developers, introduced Agile practices, and managed stakeholder communication across the Partner Portal workstream</li>
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
                  <li><strong>Loasoft — Project Manager (2010–2011):</strong> Managed ERP delivery — decision-making, team leadership, training, performance/quality analysis, and system design</li>
                  <li><strong>HWDotUY — Cofounder (2011–2012):</strong> Co-founded a software firm; owned client-facing delivery, support, and project outcomes</li>
                  <li><strong>Logivai S.A. — Developer (2009–2010):</strong> Built ERP systems in C# and WPF</li>
                  <li><strong>PowerStreet — Software Developer (2007–2008):</strong> Built VB and SQL Server products</li>
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
