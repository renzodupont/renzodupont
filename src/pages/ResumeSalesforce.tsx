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
                Languages: Spanish (Native), English (Fluent)
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
              <li>Sole Salesforce architect owning an enterprise-scale org: 200+ custom objects, 200+ Flows, 100+ Apex classes and triggers, serving 80+ users — including integrations with financial systems, sales &amp; marketing platforms, and operational tools via REST/SOAP APIs</li>
              <li>Led multiple Salesforce org mergers, environment splits, and large-scale data migrations — maintaining data integrity and zero downtime across consolidation and restructuring events</li>
              <li>Architected integrations between Salesforce and 15+ platforms — Twilio, RingCentral, AWS, GCP, Stripe, Calendly, AgencyAnalytics, Apollo, Google Workspace, Ad Platforms — creating a unified operational hub</li>
              <li>Built Business Intelligence dashboards and custom reporting that <strong>increased client retention by 20%</strong></li>
              <li>Implemented AI/LLM-powered workflows integrated with Salesforce using n8n and Zapier, automating lead scoring, data enrichment, and outreach</li>
            </ul>

            <div className="job-header">
              <div className="job-title">IT &amp; Development Manager</div>
              <div className="job-period">June 2021 – December 2023</div>
            </div>
            <ul>
              <li>Maintained Salesforce ecosystem continuity through major restructuring, <strong>reducing technology expenses by 75%</strong> by consolidating integrations and optimizing license allocation</li>
              <li>Led Salesforce development team, managing sprint planning, code reviews, and deployment processes across multiple sandboxes</li>
            </ul>

            <div className="print-page-break"></div>

            <div className="job-header">
              <div className="job-title">Team Leader &amp; Salesforce Administrator</div>
              <div className="job-period">August 2013 – May 2021</div>
            </div>
            <ul>
              <li><strong>Saved $25,000+</strong> through strategic Salesforce data migrations, custom automation, and process optimization — reducing data errors by 20%</li>
              <li>Led hundreds of Salesforce projects: custom objects, page layouts, validation rules, workflow rules, approval processes, and third-party integrations</li>
              <li>Served as primary Salesforce administrator and go-to technical resource for the entire organization</li>
            </ul>

            <div className="job-header">
              <div className="company-name">STARTUPP.AI — US &amp; Latam (Remote)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Founder &amp; Fractional CTO</div>
              <div className="job-period">April 2018 – Present (formalized as Startupp.Cloud LLC in 2022, rebranded to Startupp.ai in 2023)</div>
            </div>
            <ul>
              <li>Provide Salesforce architecture consulting and Fractional CTO services to startups and mid-market companies, specializing in CRM strategy and enterprise Salesforce implementations</li>
              <li>Deliver end-to-end Salesforce solutions: org design, data modeling, automation, and integration architecture</li>
            </ul>

            <div className="job-header">
              <div className="job-title">Selected Client Engagements</div>
            </div>
            <ul>
              <li><strong>Credilit S.A. (CTO, Apr 2018 – Oct 2025, Uruguay):</strong> Designed and implemented CRM and client portal for 40+ year credit administrator, automating workflows and saving $20,000+ annually</li>
              <li><strong>DentalMarketing.net (CTO, Sep 2021 – Jan 2023, Utah):</strong> Built Salesforce-integrated data platform increasing productivity by 30%. Redesigned Call Scoring system, improving efficiency by 60%</li>
            </ul>

            <div className="job-header">
              <div className="company-name">ALTIMETRIK — Montevideo, Uruguay (Contractor for Salesforce.com)</div>
            </div>

            <div className="job-header">
              <div className="job-title">Team Lead — Salesforce GEMINI Project &amp; Partner Portal</div>
              <div className="job-period">2010 – 2014</div>
            </div>
            <ul>
              <li>Led the Salesforce GEMINI project (internal finance tool) as a direct contractor for Salesforce.com</li>
              <li>Developed on Salesforce Partner Portal, mentored developers, and implemented Agile methodologies</li>
              <li>Gained deep understanding of Salesforce internals through direct collaboration with Salesforce engineering teams</li>
            </ul>

            <div className="job-header">
              <div className="company-name">EARLIER CAREER (2007–2013) — Uruguay</div>
            </div>
            <ul>
              <li>Software development roles at Dental Marketing (Salesforce + PHP integrations), Loasoft S.A. (ERP in C#/.NET), HunterPro S.A., and Powerstreet/Assist Ltda</li>
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
