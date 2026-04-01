import { useRef, useCallback, useState, type CSSProperties } from 'react'

interface TiltState {
  rotateX: number
  rotateY: number
  translateX: number
  translateY: number
  glowX: number
  glowY: number
}

const INITIAL: TiltState = { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, glowX: 50, glowY: 50 }
const MAX_ANGLE = 8
const MAX_OFFSET = 10

export function useTiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>(INITIAL)
  const [isHovered, setIsHovered] = useState(false)

  // Check if device supports hover
  const supportsHover = typeof window !== 'undefined'
    ? window.matchMedia('(hover: hover)').matches
    : false

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!supportsHover || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      rotateX: -y * MAX_ANGLE * 2,
      rotateY: x * MAX_ANGLE * 2,
      translateX: -x * MAX_OFFSET * 2,
      translateY: -y * MAX_OFFSET * 2,
      glowX: (x + 0.5) * 100,
      glowY: (y + 0.5) * 100,
    })
  }, [supportsHover])

  const onMouseEnter = useCallback(() => {
    if (supportsHover) setIsHovered(true)
  }, [supportsHover])

  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTilt(INITIAL)
  }, [])

  const cardStyle: CSSProperties = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: isHovered ? 'transform 150ms ease-out' : 'transform 400ms ease-out',
  }

  const innerStyle: CSSProperties = {
    transform: `translateX(${tilt.translateX}px) translateY(${tilt.translateY}px)`,
    transition: isHovered ? 'transform 150ms ease-out' : 'transform 400ms ease-out',
  }

  const glowStyle: CSSProperties = {
    background: isHovered
      ? `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(100, 211, 134, 0.05), transparent 60%)`
      : 'none',
    position: 'absolute' as const,
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none' as const,
    transition: 'background 150ms ease-out',
  }

  return { ref, cardStyle, innerStyle, glowStyle, onMouseMove, onMouseEnter, onMouseLeave }
}
