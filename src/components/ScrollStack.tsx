import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface ScrollStackProps {
  children: ReactNode
  className?: string
}

export default function ScrollStack({ children, className = '' }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    // Only stack on desktop — mobile gets normal layout
    if (window.innerWidth < 768) return

    const cards = container.querySelectorAll<HTMLElement>('.stack-card')
    if (cards.length === 0) return

    // Each card pins at the top and gets scaled/blurred as the next card covers it
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 15%',
        endTrigger: container,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })

      // Scale down + blur as next cards stack on top
      if (i < cards.length - 1) {
        const scaleTarget = 0.92 + i * 0.02
        gsap.to(card, {
          scale: scaleTarget,
          filter: 'blur(3px)',
          opacity: 0.5,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 60%',
            end: 'top 15%',
            scrub: 0.3,
          },
        })
      }
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
