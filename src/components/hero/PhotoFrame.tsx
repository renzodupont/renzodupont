import { Target, Code2, Users, Shield, TrendingUp, Briefcase } from 'lucide-react'

const icons = [
  { Icon: Target, duration: '22s', delay: '0s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.6))' },
  { Icon: Code2, duration: '28s', delay: '-5s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.6))' },
  { Icon: Users, duration: '35s', delay: '-10s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.5))' },
  { Icon: Shield, duration: '25s', delay: '-3s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.5))' },
  { Icon: TrendingUp, duration: '30s', delay: '-8s', reverse: false, color: 'drop-shadow(0 0 6px rgba(100,211,134,0.4))' },
  { Icon: Briefcase, duration: '40s', delay: '-15s', reverse: true, color: 'drop-shadow(0 0 6px rgba(244,114,182,0.4))' },
]

export default function PhotoFrame() {
  return (
    <div className="relative hidden lg:flex items-center justify-center" data-hero="focal">
      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/[0.08] blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink/[0.05] blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-accent/10 animate-orbit" style={{ animationDuration: '40s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-pink/[0.08] animate-orbit-reverse" style={{ animationDuration: '30s' }} />

      {/* Photo */}
      <div className="relative w-48 h-60 z-10">
        <img
          src="/images/renzo-no-bk.png"
          alt="Renzo Dupont"
          className="w-full h-full object-cover object-top grayscale"
          style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        />
      </div>

      {/* Orbiting icons */}
      {icons.map(({ Icon, duration, delay, reverse, color }, i) => (
        <div
          key={i}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
          style={{ animationDuration: duration, animationDelay: delay }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2" style={{ filter: color }}>
            <Icon className="w-5 h-5 text-text-secondary" />
          </div>
        </div>
      ))}
    </div>
  )
}
