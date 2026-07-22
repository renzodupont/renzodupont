/**
 * Selected work. Every claim here must be traceable to /resume or to a live URL.
 *
 * Structure per project follows how an engineering hiring panel actually reads:
 *   context -> problem -> what was built (architecture) -> outcome.
 * The `architecture` bullets are the part that separates senior from mid — keep
 * them concrete and systems-level, never "used React and it went well".
 */

export interface Project {
  slug: string
  company: string
  role: string
  period: string
  /** One line: what the organization was, so the constraints make sense. */
  context: string
  /** The business/technical problem that existed before. */
  problem: string
  /** Concrete architectural and engineering decisions. */
  architecture: string[]
  stack: string[]
  outcomes: { value: string; label: string }[]
  links?: { label: string; href: string }[]
  accent: 'accent' | 'pink'
}

export const projects: Project[] = [
  {
    slug: 'openava',
    company: 'OpenAva',
    role: 'Founder & Principal Engineer',
    period: '2024 – Present',
    context:
      'A multi-tenant, white-label business platform shipping as two products: Ava CRM for operators and Agency OS for marketing agencies.',
    problem:
      'Small operators outgrow spreadsheets but cannot absorb the cost or implementation overhead of enterprise CRM. The gap is not features — it is that every vertical needs a slightly different data model, and most platforms make you fork the product to get one.',
    architecture: [
      'PostgreSQL-backed multi-tenant data layer with per-tenant isolation, so a single deployment serves independent customers without forking the schema per vertical',
      'User-defined custom objects and fields — the same mechanism that lets one codebase serve dental practices, real-estate teams, lending offices, restaurants, and workshops',
      'A single versioned REST API (api.startupp.ai) as the only path to data; every client — web app, agency console, customer portal, third-party integration — is a consumer of that one contract',
      'React + TypeScript application front ends; Astro static marketing surface on Cloudflare Pages, so public pages ship fully-crawlable HTML with no client-side routing',
      'BYOK model for AI features — customers supply their own model keys, which keeps inference cost off the platform and customer data out of a shared vendor account',
      'Twelve-plus functional modules built on shared primitives (contacts, invoicing, projects, inventory, forms, email, workflows, reporting) rather than as separate applications',
      'Localized to English, Spanish, and Japanese at the routing layer, not as a bolt-on translation pass',
    ],
    stack: [
      'PostgreSQL',
      'REST API',
      'React',
      'TypeScript',
      'Node.js',
      'Astro',
      'Cloudflare',
      'Multi-tenant',
      'White-label',
      'LLM / BYOK',
    ],
    outcomes: [
      { value: '2', label: 'products in production' },
      { value: '12+', label: 'functional modules' },
      { value: '6', label: 'verticals served' },
    ],
    links: [
      { label: 'getopenava.com', href: 'https://getopenava.com' },
      { label: 'Ava CRM', href: 'https://openava.app' },
      { label: 'Agency OS', href: 'https://agency.openava.app' },
    ],
    accent: 'accent',
  },
  {
    slug: 'gargle',
    company: 'Gargle, Inc.',
    role: 'Senior Engineer / Business Systems Architect',
    period: '2020 – Present · Lehi, Utah',
    context:
      'An 80-person dental marketing company running sales, marketing, service, and finance on a heavily customized Salesforce Enterprise Edition org.',
    problem:
      'The business technology stack had grown by accretion — redundant tools, unclear ownership, and any structural Salesforce work (org merges, migrations) outsourced at $20K+ per engagement. Leadership had no reliable read on which clients were at risk of churning.',
    architecture: [
      'Sole owner and architect of the Salesforce org and surrounding stack — data model, internal tools, executive reporting, cloud infrastructure, and vendor systems across 15+ integrated platforms',
      'Ran multiple org merges and splits end-to-end with zero downtime: Apex batch jobs for staged data migration, validation triggers, and data-integrity controls — bringing in-house work previously outsourced at $20K+ per engagement',
      'Built order-to-cash integration connecting Salesforce accounts, orders, and invoicing to ChargeOver, Stripe, and QuickBooks, so finance and revenue operations read from one system of record',
      'Exposed Salesforce data to external customer-facing UIs through custom REST API layers rather than granting portal licenses — keeping the CRM authoritative while controlling what leaves it',
      'Built executive BI and client-health reporting in Python against Salesforce data, surfacing retention risk to leadership before renewal conversations instead of after',
      'Owned release engineering: GitHub-based CI/CD, a sandbox strategy spanning partial and full-copy environments, and Apex test coverage standards',
      'Established the code-review guardrails that let junior engineers contribute safely using Claude Code and similar AI coding tools',
      'Led a 5-person development and analytics team — sprint planning, code review, deployments, and requirements translation across Salesforce, Node.js, React, Python, and SQL Server',
    ],
    stack: [
      'Salesforce (Apex, LWC, Flows, SOQL)',
      'Node.js',
      'TypeScript',
      'Python',
      'REST APIs',
      'ChargeOver',
      'QuickBooks',
      'Stripe',
      'Twilio',
      'RingCentral',
      'SQL Server',
      'AWS',
      'GCP',
      'n8n',
    ],
    outcomes: [
      { value: '75%', label: 'technology spend reduced' },
      { value: '20%', label: 'client retention increase' },
      { value: '15+', label: 'platforms integrated' },
    ],
    accent: 'pink',
  },
  {
    slug: 'dental-marketing',
    company: 'DentalMarketing.net / 123 Postcards',
    role: 'Fractional CTO · previously Team Leader & Developer',
    period: '2013 – 2019, 2021 – 2023 · Heber City, Utah',
    context:
      'A dental marketing SaaS whose reporting had not kept pace with the business — campaign data lived apart from CRM records, and both executives and clients were reading stale exports.',
    problem:
      'Leadership could not see campaign performance against client outcomes without manual assembly, and clients had no self-serve view at all. Call scoring — the core quality signal for the product — was a slow manual process.',
    architecture: [
      'Modernized reporting end to end: custom executive dashboards for internal leadership and client-facing dashboards for customers, replacing manually assembled exports',
      'Built .NET Web APIs as the data layer between the platform and its front ends, so internal and client-facing dashboards consumed the same governed contract instead of querying production directly',
      'Delivered dashboard front ends in React and Angular against those APIs',
      'Built a Salesforce-integrated data platform connecting campaign data to CRM records over REST, making campaign performance and client engagement visible in one place',
      'Redesigned the call-scoring system, cutting the manual review loop that gated the product’s core quality metric',
      'Led a distributed engineering team across India, Nepal, and the Philippines, introducing structured scrum practices to improve release quality and cross-timezone communication',
    ],
    stack: [
      '.NET / C#',
      'Web API',
      'React',
      'Angular',
      'Salesforce',
      'Node.js',
      'AWS',
      'REST APIs',
    ],
    outcomes: [
      { value: '60%', label: 'call-scoring efficiency gain' },
      { value: '40%', label: 'cost reduction' },
      { value: '30%', label: 'productivity increase' },
    ],
    accent: 'accent',
  },
  {
    slug: 'credilit',
    company: 'Credilit S.A.',
    role: 'Fractional CTO',
    period: '2014 – 2025 · Montevideo, Uruguay',
    context:
      'A credit administrator more than 40 years old, running loan origination on manual process and phone calls while its CRM data sat in Salesforce.',
    problem:
      'Clients and partner brokers had no way to submit or track loan requests themselves. Every request round-tripped through staff, and the operational record lived separately from the Salesforce data that the business actually ran on.',
    architecture: [
      'Led the technology transformation end to end — from a manual, phone-driven origination process to client- and partner-facing self-service',
      'Built ASP.NET (MVC) portals connected directly to the company’s Salesforce environment, so clients and partners could submit and manage loan requests against live CRM records rather than a synced copy',
      'Kept Salesforce as the system of record and treated the portal as a controlled view onto it — avoiding the dual-source drift that usually follows bolting a web app onto a CRM',
      'Automated accounting workflows and delivered integrated marketing dashboards for leadership',
      'Hosted on Azure, with Salesforce CRM workflow and admin/dev work carried alongside the application build',
    ],
    stack: [
      'ASP.NET MVC',
      'C# / .NET',
      'Salesforce',
      'Azure',
      'SQL Server',
      'REST APIs',
    ],
    outcomes: [
      { value: '$20K+', label: 'saved annually' },
      { value: '11 yrs', label: 'engagement length' },
      { value: '40+ yr', label: 'legacy business modernized' },
    ],
    accent: 'pink',
  },
]
