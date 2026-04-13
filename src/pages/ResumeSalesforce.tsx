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
              <div className="resume-title">Salesforce Architect | 16+ Years Salesforce | Advanced Admin &amp; Developer</div>
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
              Salesforce Architect with <strong>16+ years</strong> of hands-on experience spanning Lightning, Flows, Apex, Visualforce, and enterprise-scale administration.
              Currently the lead Salesforce engineer at Gargle, Inc., owning the complete Salesforce ecosystem and its integration with <strong>15+ external platforms</strong> (Twilio, RingCentral, Stripe, AWS, GCP, Calendly, AgencyAnalytics, Apollo, and more).
              Certified Administrator (ADM201) and Advanced Administrator with deep expertise in complex org architecture, data migrations, and automation at scale.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="resume-section" id="competencies">
            <h2>Salesforce &amp; Technical Competencies</h2>
            <div className="tech-compact">
              <strong>Salesforce Platform:</strong> Lightning Experience · Lightning Web Components · Flows · Process Builder · Apex · Visualforce · SOQL/SOSL · Reports &amp; Dashboards<br />
              <strong>Salesforce Admin:</strong> ADM201 Certified · Advanced Administrator · Org Architecture · Security &amp; Sharing · Data Modeling · Sandbox Management · Change Sets<br />
              <strong>Integrations:</strong> REST/SOAP APIs · Twilio · RingCentral · Stripe · ChargeOver · Calendly · AgencyAnalytics · Apollo · Zapier · n8n · Google Workspace<br />
              <strong>Data &amp; BI:</strong> Data Migrations · ETL · Business Intelligence · Custom Reporting · Analytics Dashboards · Airtable<br />
              <strong>Complementary Stack:</strong> JavaScript/TypeScript · Python · Node.js · React · AWS · GCP · Cloudflare · SQL Server · MongoDB · PostgreSQL
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="resume-section" id="experience">
            <h2>Professional Experience</h2>

            <div className="job-header">
              <div className="company-name">GARGLE, INC — Lehi, Utah (Hybrid)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Senior Computer Science Engineer &amp; Lead Salesforce Architect</div>
              <div className="job-period">December 2023 – Present</div>
            </div>
            <ul>
              <li>Own the entire Salesforce ecosystem — an enterprise-scale org with 200+ custom objects, 200+ Flows, and 100+ Apex classes/triggers serving 80+ users across sales, operations, and finance</li>
              <li>Built and maintain REST/SOAP API integrations (Apex, Node.js) between Salesforce and 15+ platforms (Twilio, RingCentral, Stripe, Calendly, AgencyAnalytics, Apollo, AWS, GCP, Google Workspace) — creating a unified hub where all customer and operational data flows through Salesforce</li>
              <li>Led multiple Salesforce org mergers and environment splits — wrote Apex batch jobs for data migrations, built validation triggers, and maintained data integrity with zero downtime</li>
              <li>Built custom Salesforce reports, dashboards, and BI views that gave leadership visibility into client health, <strong>increasing client retention by 20%</strong></li>
              <li>Connected AI/LLM workflows to Salesforce via n8n and Zapier — automated lead scoring, data enrichment, and outreach triggered by Salesforce events and Process Builder actions</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Kept the Salesforce ecosystem running through a major company restructuring — consolidated redundant integrations, optimized license allocation, and renegotiated vendor contracts, <strong>reducing technology expenses by 75%</strong></li>
              <li>Managed the Salesforce development team — ran sprint planning, conducted code reviews, and oversaw deployment processes across multiple sandboxes and production orgs</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li>Primary Salesforce administrator for the entire organization — designed custom objects, page layouts, validation rules, workflow rules, approval processes, and built integrations using Apex and PHP</li>
              <li>Led hundreds of Salesforce projects including third-party integrations, data migrations (Data Loader, Apex batch), and process automation — <strong>saved $25,000+</strong> and reduced data errors by 20%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Fractional CTO</div>
              <div className="job-period">April 2018 – Present</div>
            </div>
            <ul>
              <li>Provide technical consulting specializing in CRM strategy and Salesforce architecture — design org structures, data models, automation, and integration architecture for startups and mid-market companies</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>HoneyGrid, Inc (Sr. Software Engineer, Apr 2024 – Present, Remote):</strong> Building generative AI features for a digital marketing platform using TypeScript on Cloudflare (Workers, Pages, D1, R2, KV) with multiple LLM providers — complementing Salesforce expertise with modern cloud-native development</li>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Designed and implemented a CRM and client portal for a 40+ year credit administrator — built automated billing workflows, communication tracking, and marketing dashboards, <strong>saving $20,000+ annually</strong></li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Built a Salesforce-integrated data platform connecting campaign data to CRM records, <strong>increasing productivity by 30%</strong>. Redesigned Call Scoring end-to-end, <strong>improving efficiency by 60%</strong></li>
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
              <div className="education-degree">Salesforce Administrator ADM201 (2010)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Salesforce Advanced Administrator (2019)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Machine Learning and AI with Python (CS109xa) — Harvard University (2024)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Full Stack Development — MIT xPro (2021)</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Bachelor of Science in Computer Science</div>
              <div className="education-school">Escuela Tecnica Pedro Blanes, Uruguay (2005–2008) | U.S. equivalency: Brooklyn College, CUNY</div>
            </div>

            <div className="education-item">
              <div className="education-degree">Doctoral Studies in Computer Science (2 years)</div>
              <div className="education-school">Universidad Catolica del Uruguay (2008–2011)</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
