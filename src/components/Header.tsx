import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      if (y > 80) {
        setHidden(y > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl text-accent">
          RD
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('about')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('expertise')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Expertise
          </button>
          <button onClick={() => scrollToSection('work')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Contact
          </button>
          <a
            href="https://calendly.com/renzo-startupp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <button onClick={() => scrollToSection('about')} className="text-left text-text-secondary hover:text-text-primary">About</button>
          <button onClick={() => scrollToSection('expertise')} className="text-left text-text-secondary hover:text-text-primary">Expertise</button>
          <button onClick={() => scrollToSection('work')} className="text-left text-text-secondary hover:text-text-primary">Work</button>
          <button onClick={() => scrollToSection('contact')} className="text-left text-text-secondary hover:text-text-primary">Contact</button>
          <a
            href="https://calendly.com/renzo-startupp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2 text-center"
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  )
}
