import { Target, Code2, Users, Shield, TrendingUp, Briefcase } from 'lucide-react'

const orbitingIcons = [
  { Icon: Target, color: 'text-accent', glow: 'rgba(100, 211, 134, 0.4)', duration: '28s', reverse: false },
  { Icon: Code2, color: 'text-accent', glow: 'rgba(100, 211, 134, 0.35)', duration: '35s', reverse: true },
  { Icon: Users, color: 'text-pink', glow: 'rgba(244, 114, 182, 0.4)', duration: '32s', reverse: false },
  { Icon: Shield, color: 'text-accent', glow: 'rgba(100, 211, 134, 0.3)', duration: '25s', reverse: true },
  { Icon: TrendingUp, color: 'text-pink', glow: 'rgba(244, 114, 182, 0.35)', duration: '30s', reverse: false },
  { Icon: Briefcase, color: 'text-accent', glow: 'rgba(100, 211, 134, 0.3)', duration: '22s', reverse: true },
]

export default function PhotoFrame() {
  return (
    <div
      className="absolute right-0 lg:right-[5%] top-1/2 -translate-y-1/2 hidden lg:block z-20"
      data-hero="focal"
    >
      <div className="relative w-[400px] xl:w-[460px]">
        {/* Ambient glow behind photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[300px] h-[300px] rounded-full bg-accent/[0.08] blur-3xl"
            style={{ animation: 'pulse 5s ease-in-out infinite' }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[200px] h-[200px] rounded-full bg-pink/[0.05] blur-2xl"
            style={{ animation: 'pulse 6s ease-in-out infinite 2s' }}
          />
        </div>

        {/* Orbital rings — expand outward from container */}
        <div
          className="absolute -inset-10 rounded-full border border-accent/10"
          style={{ animation: 'spin 40s linear infinite' }}
        />
        <div
          className="absolute -inset-5 rounded-full border border-pink/[0.08]"
          style={{ animation: 'spin 30s linear infinite reverse' }}
        />

        {/* Orbiting tech icons */}
        {orbitingIcons.map((node, i) => {
          const Icon = node.Icon
          return (
            <div
              key={i}
              className="absolute -inset-10"
              style={{
                animation: `spin ${node.duration} linear infinite${node.reverse ? ' reverse' : ''}`,
                animationDelay: `-${i * 4}s`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  filter: `drop-shadow(0 0 8px ${node.glow})`,
                  animation: `spin ${node.duration} linear infinite${node.reverse ? '' : ' reverse'}`,
                  animationDelay: `-${i * 4}s`,
                }}
              >
                <Icon size={20} className={`${node.color} opacity-70`} strokeWidth={1.5} />
              </div>
            </div>
          )
        })}

        {/* Photo — B&W, fading into background */}
        <div className="relative">
          <img
            src="/images/renzo-no-bk.png"
            alt="Renzo Dupont"
            className="relative w-full h-auto grayscale"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
