import { useTiltCard } from '../hooks/useTiltCard'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const { ref, cardStyle, innerStyle, glowStyle, onMouseMove, onMouseEnter, onMouseLeave } = useTiltCard()

  return (
    <div
      ref={ref}
      className={className}
      style={cardStyle}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={glowStyle} />
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  )
}
