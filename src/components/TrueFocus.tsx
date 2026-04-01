import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TrueFocusProps {
  sentence: string
  separator?: string
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
  className?: string
}

interface FocusRect {
  x: number
  y: number
  width: number
  height: number
}

export default function TrueFocus({
  sentence,
  separator = ' ',
  blurAmount = 5,
  borderColor = '#64d386',
  glowColor = 'rgba(100, 211, 134, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  className = '',
}: TrueFocusProps) {
  const words = sentence.split(separator)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 })

  // Auto-cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % words.length)
    }, (animationDuration + pauseBetweenAnimations) * 1000)
    return () => clearInterval(interval)
  }, [animationDuration, pauseBetweenAnimations, words.length])

  // Update focus rect when active word changes
  useEffect(() => {
    const word = wordRefs.current[currentIndex]
    const container = containerRef.current
    if (!word || !container) return

    const parentRect = container.getBoundingClientRect()
    const activeRect = word.getBoundingClientRect()

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [currentIndex, words.length])

  return (
    <span className={`relative inline ${className}`} ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={el => { wordRefs.current[index] = el }}
          style={{
            filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}

      <motion.span
        className="absolute pointer-events-none"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: 1,
        }}
        transition={{ duration: animationDuration }}
        style={{
          top: 0,
          left: 0,
          position: 'absolute',
        }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }} />
        <span className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }} />
        <span className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }} />
        <span className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }} />
      </motion.span>
    </span>
  )
}
