import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import {
  CERTIFICATIONS_BADGE,
  ResumeVersions,
  ResumeDownload,
  ResumeHeader,
  CredentialsSection,
  EducationSection,
} from '../components/ResumeShared'
import '../styles/resume.css'

export default function ResumeFractional() {
  return (
    <div className="resume-page-root min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Fractional CTO and Software Engineer"
        description="Fractional technology leadership and hands-on software engineering across Salesforce, business systems, integrations, cloud platforms, and AI automation."
        canonicalUrl="https://renzodupont.com/resume-fractional"
        noIndex
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Renzo Dupont — Fractional CTO and Software Engineer',
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-6">
        <Link to="/" className="font-display font-bold text-accent">RD</Link>
        <span className="ml-4 text-sm text-text-muted">/ Resume</span>
      </header>

      <div className="resume-web">
        <ResumeDownload />

        <ResumeVersions />

        <div className="resume-container">
          <ResumeHeader
            headline="Fractional CTO & Software Engineer | Architecture · Delivery · Hands-on Build"
            badge={CERTIFICATIONS_BADGE}
          />

          <section className="resume-section" id="summary">
            <h2>Professional Summary</h2>
            <p>
              Technology leader and hands-on engineer with 18+ years building and operating business systems,
              software platforms, and integrations. I have led small engineering teams, owned company-wide
              Salesforce and technology stacks, and served as a fractional CTO for long-running client engagements.
              My work spans architecture and delivery oversight through production code, data migrations,
              reporting, cloud infrastructure, and AI automation.
            </p>
          </section>

          <section className="resume-section" id="services">
            <h2>Ways I Help Clients</h2>
            <div className="tech-compact">
              <strong>Fractional technology leadership:</strong> Architecture reviews · Technical roadmaps · Team and vendor oversight · Delivery standards · Budget and platform decisions<br />
              <strong>Software engineering:</strong> REST APIs · Full-stack applications · Data platforms and migrations · Cloud deployment · Production troubleshooting<br />
              <strong>Business systems:</strong> Salesforce architecture and development · CRM integrations · Order-to-cash workflows · Executive reporting · AI and workflow automation
            </div>
          </section>

          <section className="resume-section" id="experience">
            <h2>Selected Fractional and Product Work</h2>

            <div className="employer">
              <div className="job-header">
                <div className="company-name">CREDILIT S.A. — Montevideo, Uruguay</div>
                <div className="job-period">2014 – 2025</div>
              </div>
              <div className="employer-roles">
                <div className="job-header"><div className="job-title">Fractional CTO</div></div>
                <ul>
                  <li>Led a Salesforce-centered modernization of a credit administrator, replacing manual loan-origination workflows with client and partner self-service.</li>
                  <li>Built ASP.NET MVC portals connected to live Salesforce records and automated accounting workflows; the program saved more than $20K annually.</li>
                  <li>Owned application architecture and delivery across Salesforce, Azure, C#/.NET, SQL Server, and REST APIs.</li>
                </ul>
              </div>
            </div>

            <div className="employer">
              <div className="job-header">
                <div className="company-name">DENTALMARKETING.NET / 123 POSTCARDS — Heber City, Utah</div>
                <div className="job-period">2021 – 2023 fractional; 2013 – 2019 staff</div>
              </div>
              <div className="employer-roles">
                <div className="job-header"><div className="job-title">Fractional CTO · Previously Team Leader and Developer</div></div>
                <ul>
                  <li>Modernized campaign and CRM reporting with governed .NET Web APIs and executive and client-facing dashboards.</li>
                  <li>Built a Salesforce-integrated data platform and redesigned call scoring; the reported outcomes were 30% greater productivity and 60% greater call-scoring efficiency.</li>
                  <li>Led distributed engineering delivery across India, Nepal, and the Philippines.</li>
                </ul>
              </div>
            </div>

            <div className="employer">
              <div className="job-header">
                <div className="company-name">OPENAVA</div>
                <div className="job-period">2024 – Present</div>
              </div>
              <div className="employer-roles">
                <div className="job-header"><div className="job-title">Founder and Owner</div></div>
                <ul>
                  <li>Built a multi-tenant, white-label platform shipping as Ava CRM and Agency OS, with PostgreSQL tenant isolation, a versioned REST API, and React/TypeScript front ends.</li>
                  <li>Designed custom objects and fields, shared business modules, and a bring-your-own-key model for AI features.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="resume-section" id="employment">
            <h2>Recent Employment</h2>
            <div className="employer">
              <div className="job-header">
                <div className="company-name">VANTA</div>
                <div className="job-period">September 2026 – Present</div>
              </div>
              <div className="employer-roles">
                <div className="job-header"><div className="job-title">Salesforce Platform Engineer</div></div>
              </div>
            </div>
            <div className="employer">
              <div className="job-header">
                <div className="company-name">GARGLE, INC — Lehi, Utah</div>
                <div className="job-period">January 2020 – July 2026</div>
              </div>
              <div className="employer-roles">
                <div className="job-header"><div className="job-title">Senior Engineer · IT & Development Manager · Salesforce Advanced Administrator</div></div>
                <ul>
                  <li>Owned Salesforce and the surrounding business technology stack across 15+ integrated platforms, including finance, telephony, reporting, and cloud systems.</li>
                  <li>Led a five-person development and analytics team; reduced technology spend 75% through consolidation and license optimization.</li>
                  <li>Delivered zero-downtime Salesforce org merges and splits and executive client-health reporting associated with a 20% increase in retention.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="resume-section" id="competencies">
            <h2>Core Technologies</h2>
            <div className="tech-compact">
              <strong>Salesforce:</strong> Apex · Lightning Web Components · Flows · SOQL/SOSL · Sales and Service Cloud · REST integrations<br />
              <strong>Engineering:</strong> TypeScript · Node.js · Python · React · C#/.NET · PostgreSQL · SQL Server · REST APIs<br />
              <strong>Cloud and delivery:</strong> AWS · Azure · GCP · Cloudflare Workers/Pages/D1/R2 · Docker · GitHub Actions · CI/CD<br />
              <strong>AI and automation:</strong> LLM workflows · n8n · Zapier · Claude Code
            </div>
          </section>

          <CredentialsSection />
          <EducationSection />
        </div>
      </div>
    </div>
  )
}
