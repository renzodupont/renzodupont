import { useEffect, useRef, useMemo, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface ScrollTextRevealProps {
  children: ReactNode
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  className?: string
  tag?: 'h2' | 'h3' | 'p' | 'div'
}

export default function ScrollTextReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  className = '',
  tag: Tag = 'div',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  const splitContent = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    if (!text) return children

    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <span className="inline-block" key={index}>
          {word}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const triggers: ScrollTrigger[] = []

    // Slight rotation reveal
    const rotTween = gsap.fromTo(el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    )
    if (rotTween.scrollTrigger) triggers.push(rotTween.scrollTrigger)

    // Word-by-word opacity reveal
    const words = el.querySelectorAll<HTMLElement>('.inline-block')
    if (words.length) {
      const opacityTween = gsap.fromTo(words,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20%',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )
      if (opacityTween.scrollTrigger) triggers.push(opacityTween.scrollTrigger)

      // Optional blur
      if (enableBlur) {
        const blurTween = gsap.fromTo(words,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=20%',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        )
        if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger)
      }
    }

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [enableBlur, baseRotation, baseOpacity, blurStrength])

  return (
    <Tag ref={containerRef as any} className={className}>
      {typeof children === 'string' ? <p>{splitContent}</p> : children}
    </Tag>
  )
}
