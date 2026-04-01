import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // On portrait screens, stretch horizontally so aurora fills width
  float aspect = uResolution.x / uResolution.y;
  if (aspect < 1.0) {
    uv.x = uv.x * aspect;
  }
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 1.5 - height + 0.6);
  float intensity = 0.7 * height;
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

interface AuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
  opacity?: number
}

export default function Aurora({
  colorStops = ['#0a0a0a', '#64d386', '#f472b6'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  opacity = 0.4,
}: AuroraProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animateId = 0
    let renderer: Renderer | null = null
    let resizeHandler: (() => void) | null = null
    const wrapper = wrapperRef.current

    const initTimer = setTimeout(() => {
      try {
        renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
      } catch {
        return
      }

      const gl = renderer.gl
      gl.clearColor(0, 0, 0, 0)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

      const geometry = new Triangle(gl)
      if (geometry.attributes.uv) {
        delete (geometry.attributes as Record<string, unknown>).uv
      }

      const colorStopsArray = colorStops.map(hex => {
        const c = new Color(hex)
        return [c.r, c.g, c.b]
      })

      const w = document.documentElement.clientWidth
      const h = document.documentElement.clientHeight

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: colorStopsArray },
          uResolution: { value: [w, h] },
          uBlend: { value: blend },
        },
      })

      const mesh = new Mesh(gl, { geometry, program })

      // Append canvas to wrapper first so we can measure
      if (wrapper) wrapper.appendChild(gl.canvas)

      // Use wrapper's actual size (set by top:0/right:0/bottom:0/left:0)
      const syncSize = () => {
        if (!renderer || !wrapper) return
        const rect = wrapper.getBoundingClientRect()
        renderer.setSize(rect.width, rect.height)
        program.uniforms.uResolution.value = [rect.width, rect.height]
        // OGL overrides canvas CSS — force it back
        gl.canvas.style.width = '100%'
        gl.canvas.style.height = '100%'
        gl.canvas.style.display = 'block'
        gl.canvas.style.willChange = 'transform'
        gl.canvas.style.transform = 'translateZ(0)'
      }
      syncSize()

      // Watch for wrapper resize
      const ro = new ResizeObserver(syncSize)
      ro.observe(wrapper!)

      resizeHandler = () => syncSize()
      window.addEventListener('resize', resizeHandler)

      const update = (t: number) => {
        animateId = requestAnimationFrame(update)
        program.uniforms.uTime.value = t * 0.01 * speed * 0.1
        renderer!.render({ scene: mesh })
      }
      animateId = requestAnimationFrame(update)

      // Fade in
      if (wrapper) {
        wrapper.style.opacity = String(opacity)
      }
    }, 800)

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(animateId)
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      if (renderer) {
        const gl = renderer.gl
        if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas)
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    }
  }, [colorStops, amplitude, blend, speed, opacity])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 1s',
        overflow: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  )
}
