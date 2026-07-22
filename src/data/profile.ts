/**
 * Single source of truth for identity, contact, and headline numbers.
 * Every number here must be defensible in an interview and consistent with /resume.
 *
 * Framing note: this site is a long-lived professional portfolio, not a job-search
 * landing page. It carries no availability, sponsorship, or "looking for work"
 * language — that kind of copy goes stale the day a role is signed and is awkward
 * to leave up while employed. A strong body of work reads as hireable on its own;
 * anyone recruiting can find the resume and the email.
 */

export const profile = {
  name: 'Renzo Dupont',
  title: 'Business Systems / Platform Architect',
  subtitle: 'Salesforce-centered platforms, integrations, and data migrations',
  /** Shown in the hero badge. One line to update when the role changes. */
  currentRole: 'Business Systems Architect at Gargle, Inc.',
  location: 'Lehi, Utah',
  languages: 'English, Spanish',
  focus: 'Salesforce platform architecture, business systems, integrations, and data migration',
  // TODO(renzo): swap in a personal address. renzo@startupp.ai points at your own
  // company, which reads as "he runs an agency" rather than "he builds systems".
  email: 'renzo@startupp.ai',
  linkedin: 'https://www.linkedin.com/in/renzo-dupont-b9797941/',
  github: 'https://github.com/renzodupont',
} as const

/**
 * Hero stats. Each one traces to a specific line in /resume.
 * Deliberately does NOT include "80+ team size" — that was the size of the
 * company, not the team led (5 engineers + analysts), and the mismatch with
 * the resume is the kind of thing that gets a candidate quietly dropped.
 */
export const stats = [
  { value: '18+', label: 'Years building systems' },
  { value: '15+', label: 'Platforms integrated' },
  { value: '75%', label: 'Technology spend cut' },
  { value: '20%', label: 'Client retention lift' },
] as const
