import { noise3D } from './simplex'
import type { AnimationScene } from '../hooks/useCanvasAnimation'

interface Ring {
  baseRadius: number
  strokeWidth: number
  opacity: number
  pulseSpeed: number
  pulsePhase: number
  color: string
}

interface Orbiter {
  ringIndex: number
  angle: number
  speed: number
  size: number
  color: string
  trail: { x: number; y: number }[]
  direction: number // 1 or -1
}

interface BackgroundParticle {
  angle: number
  radius: number
  speed: number
  opacity: number
  size: number
}

export function createGeometricPulse(): AnimationScene {
  let rings: Ring[] = []
  let orbiters: Orbiter[] = []
  let bgParticles: BackgroundParticle[] = []
  let cx = 0
  let cy = 0
  let scale = 1
  const GREEN = 'rgba(100, 211, 134,'
  const PINK = 'rgba(244, 114, 182,'

  function init(width: number, height: number) {
    cx = width * 0.65
    cy = height * 0.5
    scale = Math.min(width, height) / 600

    rings = [
      { baseRadius: 60, strokeWidth: 1.5, opacity: 0.25, pulseSpeed: 0.3, pulsePhase: 0, color: GREEN },
      { baseRadius: 110, strokeWidth: 1.2, opacity: 0.2, pulseSpeed: 0.4, pulsePhase: 1.2, color: GREEN },
      { baseRadius: 160, strokeWidth: 1, opacity: 0.15, pulseSpeed: 0.35, pulsePhase: 2.5, color: GREEN },
      { baseRadius: 210, strokeWidth: 0.8, opacity: 0.1, pulseSpeed: 0.5, pulsePhase: 0.8, color: PINK },
      { baseRadius: 260, strokeWidth: 0.5, opacity: 0.08, pulseSpeed: 0.45, pulsePhase: 3.1, color: PINK },
    ]

    orbiters = []
    for (let ri = 0; ri < rings.length; ri++) {
      const count = ri < 2 ? 3 : 2
      for (let j = 0; j < count; j++) {
        orbiters.push({
          ringIndex: ri,
          angle: (Math.PI * 2 * j) / count + Math.random() * 0.5,
          speed: 0.15 + Math.random() * 0.25,
          size: 2 + Math.random() * 3,
          color: ri < 3 ? GREEN : PINK,
          trail: [],
          direction: Math.random() > 0.4 ? 1 : -1,
        })
      }
    }

    bgParticles = []
    for (let i = 0; i < 25; i++) {
      bgParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 50,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.25,
        size: 1 + Math.random() * 1.5,
      })
    }
  }

  function draw(ctx: CanvasRenderingContext2D, time: number, _width: number, _height: number) {
    // Radial lines (slowly rotating)
    const lineRotation = time * 0.01
    const lineCount = 10
    ctx.save()
    for (let i = 0; i < lineCount; i++) {
      const angle = (Math.PI * 2 * i) / lineCount + lineRotation
      const len = 300 * scale
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
      ctx.strokeStyle = `${GREEN} 0.04)`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
    ctx.restore()

    // Draw rings
    for (const ring of rings) {
      const pulseAmp = 8 * scale
      const r = (ring.baseRadius + Math.sin(time * ring.pulseSpeed + ring.pulsePhase) * pulseAmp) * scale
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `${ring.color} ${ring.opacity})`
      ctx.lineWidth = ring.strokeWidth
      ctx.stroke()
    }

    // Central core (breathing)
    const coreScale = 1 + Math.sin(time * 0.2) * 0.2
    const coreOpacity = 0.12 + Math.sin(time * 0.2) * 0.05
    const coreRadius = 40 * scale * coreScale
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius)
    coreGrad.addColorStop(0, `${GREEN} ${coreOpacity})`)
    coreGrad.addColorStop(0.5, `${GREEN} ${coreOpacity * 0.3})`)
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
    ctx.fillStyle = coreGrad
    ctx.fill()

    // Core bright center
    ctx.beginPath()
    ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2)
    ctx.fillStyle = `${GREEN} 0.6)`
    ctx.fill()

    // Update and draw orbiters
    for (const orb of orbiters) {
      const ring = rings[orb.ringIndex]
      const pulseAmp = 8 * scale
      const r = (ring.baseRadius + Math.sin(time * ring.pulseSpeed + ring.pulsePhase) * pulseAmp) * scale

      // Noise-modulated speed
      const speedMod = 1 + noise3D(orb.angle, orb.ringIndex, time * 0.2) * 0.3
      orb.angle += orb.speed * orb.direction * speedMod * 0.016

      const ox = cx + Math.cos(orb.angle) * r
      const oy = cy + Math.sin(orb.angle) * r

      // Update trail
      orb.trail.unshift({ x: ox, y: oy })
      if (orb.trail.length > 5) orb.trail.pop()

      // Draw trail
      for (let ti = 1; ti < orb.trail.length; ti++) {
        const tp = orb.trail[ti]
        const trailOpacity = (1 - ti / orb.trail.length) * 0.3
        const trailSize = orb.size * (1 - ti / orb.trail.length) * 0.7
        ctx.beginPath()
        ctx.arc(tp.x, tp.y, trailSize, 0, Math.PI * 2)
        ctx.fillStyle = `${orb.color} ${trailOpacity})`
        ctx.fill()
      }

      // Draw orbiter glow
      const glowGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 12)
      glowGrad.addColorStop(0, `${orb.color} 0.08)`)
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(ox, oy, 12, 0, Math.PI * 2)
      ctx.fillStyle = glowGrad
      ctx.fill()

      // Draw orbiter dot
      ctx.beginPath()
      ctx.arc(ox, oy, orb.size, 0, Math.PI * 2)
      ctx.fillStyle = `${orb.color} 0.8)`
      ctx.fill()
    }

    // Background particles drifting outward
    for (const bp of bgParticles) {
      bp.radius += bp.speed * 0.3
      const maxRadius = 300 * scale
      if (bp.radius > maxRadius) {
        bp.radius = 30 + Math.random() * 30
        bp.angle = Math.random() * Math.PI * 2
      }

      const fadeOut = 1 - bp.radius / maxRadius
      const bx = cx + Math.cos(bp.angle) * bp.radius
      const by = cy + Math.sin(bp.angle) * bp.radius

      ctx.beginPath()
      ctx.arc(bx, by, bp.size, 0, Math.PI * 2)
      ctx.fillStyle = `${GREEN} ${bp.opacity * fadeOut})`
      ctx.fill()
    }
  }

  return { init, draw }
}
