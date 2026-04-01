import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  morphTransition?: boolean
}

export default function ScrollReveal({ children, className = '', morphTransition = false }: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    // Morph transition: subtle scale-up scrubbed to scroll
    if (morphTransition) {
      gsap.fromTo(section,
        { scale: 0.97, transformOrigin: 'center top' },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
