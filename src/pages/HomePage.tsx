import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'
import SelectedWorkSection from '../components/sections/SelectedWorkSection'
import ApproachSection from '../components/sections/ApproachSection'
import StackSection from '../components/sections/StackSection'
import AboutSection from '../components/sections/AboutSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'
import { profile } from '../data/profile'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title={`${profile.name} — ${profile.title}`}
        description="Salesforce & Software Engineer with 18+ years building business systems, integrations, automation, and software platforms."
        canonicalUrl="https://renzodupont.com"
        ogImage="https://renzodupont.com/images/profile.jpg"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.title,
          url: 'https://renzodupont.com',
          image: 'https://renzodupont.com/images/profile.jpg',
          email: profile.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lehi',
            addressRegion: 'UT',
            addressCountry: 'US',
          },
          knowsAbout: [
            'Salesforce Architecture',
            'Apex',
            'Business Systems Architecture',
            'Systems Integration',
            'Data Migration',
            'PostgreSQL',
            'Node.js',
            'TypeScript',
            '.NET',
            'REST API Design',
            'Technical Leadership',
          ],
          alumniOf: [
            { '@type': 'Organization', name: 'Harvard University (CS109x)' },
            { '@type': 'Organization', name: 'MIT xPro' },
          ],
          sameAs: [profile.linkedin, profile.github],
        }}
      />
      <Header />
      <main>
        <HeroSection />
        {/* Work first: evidence before self-description. A hiring manager who
            bounces after one scroll should have seen the projects, not the bio. */}
        <SelectedWorkSection />
        <ApproachSection />
        <StackSection />
        <AboutSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
