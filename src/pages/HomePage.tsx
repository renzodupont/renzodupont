import Header from '../components/Header'
import HeroSection from '../components/hero/HeroSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
