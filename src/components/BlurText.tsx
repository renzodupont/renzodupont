import { motion, type Transition } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  stepDuration?: number
  rootMargin?: string
}

export default function BlurText({
  text,
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.5,
  stepDuration = 0.3,
  rootMargin = '-10% 0px',
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current as Element)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  const from = useMemo(
    () => direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -30 }
      : { filter: 'blur(10px)', opacity: 0, y: 30 },
    [direction]
  )

  const to = [
    { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ]

  const times = [0, 0.5, 1]

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((word, index) => {
        const keyframes: Record<string, (string | number)[]> = {
          filter: [from.filter, to[0].filter, to[1].filter],
          opacity: [from.opacity, to[0].opacity, to[1].opacity],
          y: [from.y, to[0].y, to[1].y],
        }

        const transition: Transition = {
          duration: stepDuration * 2,
          times,
          delay: (index * delay) / 1000,
        }

        return (
          <motion.span
            key={index}
            initial={from}
            animate={inView ? keyframes : from}
            transition={transition}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {word === ' ' ? '\u00A0' : word}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        )
      })}
    </span>
  )
}
