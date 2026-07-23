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
  title: 'Salesforce Developer & Administrator',
  subtitle: 'Salesforce development, administration, and integrations',
  /** Shown in the hero badge. One line to update when the role changes. */
  currentRole: 'Senior Engineer at Gargle, Inc.',
  location: 'Lehi, Utah',
  languages: 'English, Spanish',
  focus: 'Salesforce development, administration, integrations, and business systems',
  email: 'renzo@renzodupont.com',
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
  { value: '18+', label: 'Years of experience' },
  { value: '15+', label: 'Platforms & technologies' },
  { value: '5', label: 'Engineers led' },
] as const
