import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'

interface HeroEntranceProps {
  children: React.ReactNode
}

export default function HeroEntrance({ children }: HeroEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('[data-hero]')
    gsap.set(elements, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Start immediately — no initial delay
    tl.to('[data-hero="badge"]', { opacity: 1, y: 0, duration: 0.4 }, 0)
    tl.to('[data-hero="headline"]', { opacity: 1, y: 0, duration: 0.4 }, 0.1)
    tl.to('[data-hero="headline-accent"]', { opacity: 1, y: 0, duration: 0.4 }, 0.2)
    tl.to('[data-hero="subheadline"]', { opacity: 1, y: 0, duration: 0.35 }, 0.35)
    tl.to('[data-hero="cta"]', { opacity: 1, y: 0, duration: 0.35 }, 0.5)
    tl.to('[data-hero="stats"]', { opacity: 1, y: 0, duration: 0.3 }, 0.6)
    tl.to('[data-hero="focal"]', { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power1.out' }, 0.4)

  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
