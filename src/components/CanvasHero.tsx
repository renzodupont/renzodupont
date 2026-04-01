import { useRef } from 'react'
import { useCanvasAnimation, type AnimationScene } from '../hooks/useCanvasAnimation'

interface CanvasHeroProps {
  scene: AnimationScene
  className?: string
}

export default function CanvasHero({ scene, className = '' }: CanvasHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvasAnimation(canvasRef, scene)

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Edge fades for text readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-dark-900 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-dark-900 to-transparent" />
      </div>
    </div>
  )
}
