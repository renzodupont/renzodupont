import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ExpertiseSection from '../components/sections/ExpertiseSection'
import CaseStudiesSection from '../components/sections/CaseStudiesSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <PageMeta
        title="Renzo Dupont — Business Systems Architect"
        description="Senior technical leader with 18+ years building Salesforce-centered platforms, GTM systems, AI automation, enterprise applications, and technical teams."
        canonicalUrl="https://renzodupont.com"
        ogImage="https://renzodupont.com/images/profile.jpg"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Renzo Dupont',
          jobTitle: 'Business Systems Architect',
          url: 'https://renzodupont.com',
          image: 'https://renzodupont.com/images/profile.jpg',
          sameAs: [
            'https://www.linkedin.com/in/renzo-dupont-b9797941/',
            'https://github.com/renzodupont',
          ],
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <CaseStudiesSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
