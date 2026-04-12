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
        title="Renzo Dupont — Senior Full-Stack Engineer"
        description="Senior Engineer with 18+ years building scalable products. Full-stack, AI/ML, Salesforce, cloud infrastructure."
        canonicalUrl="https://renzodupont.com"
        ogImage="https://renzodupont.com/images/profile.jpg"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Renzo Dupont',
          jobTitle: 'Senior Full-Stack Engineer',
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
