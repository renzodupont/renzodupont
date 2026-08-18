import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  CERTIFICATIONS,
  DIPLOMAS,
  PROFESSIONAL_DEVELOPMENT,
  TECHNICAL_TRAINING,
  ResumeVersions,
  ResumeHeader,
} from '../components/ResumeShared'
import '../styles/resume.css'

/* IT & Business Systems Director variant. Same employers and LinkedIn titles —
   positioned for business systems / SaaS / identity / vendor / budget leadership
   rather than infrastructure-heavy IT Director. Certs stay compact at the bottom
   so leadership scope carries the page. */
export default function ResumeITDirector() {
  const diplomasChronological = [...DIPLOMAS].reverse()

  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — IT & Business Systems Director"
        description="Technology leader with 18+ years across software, enterprise systems, and IT operations — budgets, vendors, identity, stakeholder reporting, and cross-functional teams."
        canonicalUrl="https://renzodupont.com/resume-it-director"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — IT & Business Systems Director',
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
          <ResumeHeader headline="IT &amp; Business Systems Director | Leadership · Budgets · Vendors · Identity · Reporting" />

          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Technology leader with <strong>18+ years</strong> across software, enterprise systems, and IT
              operations. Experienced mentoring engineers, establishing technical standards, enforcing access
              governance and change controls, and reporting outcomes to stakeholders across sales, operations,
              finance, and leadership. Led a 5-person team and the technology stack for an{' '}
              <strong>80+ employee</strong> company spanning <strong>15+ SaaS / cloud platforms</strong> —
              consolidated technology spend by <strong>75%</strong> and improved executive visibility that drove{' '}
              <strong>client retention +20%</strong>.
            </p>
          </section>

          <section className="resume-section" id="competencies">
            <h2>Core Skills &amp; Competencies</h2>
            <div className="tech-compact">
              <strong>IT &amp; Business Systems Leadership:</strong> Team Mentorship · Engineering Standards · Access Governance · Change Controls · Security Standards · Policy Enforcement · Onboarding / Offboarding · Vendor Management<br />
              <strong>Budget &amp; Operations:</strong> Technology Budgeting · License Optimization · Contract Negotiation · Cost Consolidation · Risk &amp; Priority Management<br />
              <strong>Stakeholders &amp; Reporting:</strong> Executive Reporting · KPI Dashboards · Status Communication · Requirements Translation · Change Management<br />
              <strong>Identity, Collaboration &amp; Cloud:</strong> JumpCloud SSO · Google Workspace · GCP · AWS · Salesforce · RingCentral · Twilio · CallRail · Automation Workflows<br />
              <strong>Delivery:</strong> Agile Leadership · Release Governance · Incident Triage · Process Automation
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
                  <li>Owned IT and business systems for an <strong>80+ employee</strong> company — mentored junior engineers, established engineering standards, and enforced access governance, change controls, and security standards across identity and platform changes</li>
                  <li>Owned stakeholder management and executive reporting: KPI dashboards, retention/risk visibility, and status communication to sales, service, finance, and leadership — <strong>client retention +20%</strong></li>
                  <li>Governed onboarding/offboarding and identity automation via JumpCloud SSO with Google Workspace; set access policies and reduced risk from inconsistent provisioning</li>
                  <li>Directed <strong>15+ SaaS / cloud platforms</strong> spanning Salesforce, GCP, AWS, Google Workspace, RingCentral, Twilio, CallRail, and related automations — prioritizing work against business impact</li>
                  <li>Partnered with department leads on requirements, change controls, and go-live readiness for org-wide initiatives including system merges and operational reporting programs</li>
                </ul>

                <div className="job-header">
                  <div className="job-title">IT &amp; Development Manager</div>
                  <div className="job-period">June 2021 – December 2023</div>
                </div>
                <ul>
                  <li>Led a 5-person development and analytics team — mentoring, performance expectations, delivery reviews, and coordination with sales, marketing, accounting, and support</li>
                  <li>Owned IT budgeting and vendor negotiation across the company stack; consolidated redundant tools and optimized licenses — <strong>reduced technology expenses 75%</strong> while preserving core business capability</li>
                  <li>Set priorities and roadmaps with stakeholders; documented progress, escalated tradeoffs early, and kept leadership informed on status, risk, and decisions needed</li>
                  <li>Established release and quality standards — sandbox strategy, deployment gates, and change validation before production</li>
                </ul>

                <div className="role-keep">
                  <div className="job-header">
                    <div className="job-title">Salesforce Advanced Administrator</div>
                    <div className="job-period">January 2020 – May 2021</div>
                  </div>
                  <ul>
                    <li>Partnered with accounting, sales, marketing, and support to gather requirements and coordinate platform delivery for operations and customer-facing portals</li>
                    <li>Owned intake triage and change validation for migrations and enhancements — <strong>reducing data errors 20%</strong></li>
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
                  <li>Led a distributed engineering team across India, Nepal, and the Philippines — mentoring, priorities, Scrum ceremonies, and release-quality standards</li>
                  <li>Owned stakeholder communication and delivery planning across Salesforce and web programs; negotiated scope and tracked outcomes with business partners</li>
                  <li>Directed a campaign/CRM data initiative with cross-team coordination — <strong>productivity +30%</strong> and <strong>call-scoring efficiency +60%</strong></li>
                </ul>

                <div className="job-header">
                  <div className="job-title">Software Developer</div>
                  <div className="job-period">August 2013 – February 2018</div>
                </div>
                <ul>
                  <li>Partnered with sales and operations on requirements and delivery for CRM / campaign systems; communicated status through implementation and rollout</li>
                  <li>Supported operational reporting and integration work connecting marketing data to Salesforce</li>
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

          {/* Compact footer — leadership carries the resume; certs stay secondary */}
          <section className="resume-section" id="education">
            <h2>Certifications &amp; Education</h2>
            <div className="cert-development">
              <strong>Salesforce Certified:</strong> {CERTIFICATIONS.map((c) => c.short).join(' · ')}
            </div>
            <div className="education-item">
              <span className="education-degree">Bachelor&rsquo;s Degree in Computer Science</span>
              <span className="education-school"> — Universidad del Trabajo del Uruguay (UTU) · 2008</span>
            </div>
            <div className="education-item">
              <span className="education-degree">U.S. Academic Equivalency</span>
              <span className="education-school"> — B.S. Computer Science · Evaluated 2024, Brooklyn College (CUNY)</span>
            </div>
            {diplomasChronological.map((item) => (
              <div className="education-item" key={item.name}>
                <span className="education-degree">{item.name}</span>
                <span className="education-school"> — {item.meta}</span>
              </div>
            ))}
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
