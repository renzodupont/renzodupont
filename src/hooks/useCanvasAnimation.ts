import { useEffect, useRef, type RefObject } from 'react'

export interface AnimationScene {
  init: (width: number, height: number) => void
  draw: (ctx: CanvasRenderingContext2D, time: number, width: number, height: number) => void
}

export function useCanvasAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  scene: AnimationScene
) {
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const initializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Setup canvas dimensions with DPR
    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
      scene.init(rect.width, rect.height)
      initializedRef.current = true
    }

    resize()

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>
    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', handleResize)

    // Visibility via IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    // If reduced motion, render one static frame and stop
    if (prefersReduced) {
      const rect = canvas.getBoundingClientRect()
      scene.draw(ctx, 0, rect.width, rect.height)
      return () => {
        window.removeEventListener('resize', handleResize)
        observer.disconnect()
      }
    }

    // Animation loop
    startTimeRef.current = performance.now()

    function frame(now: number) {
      rafRef.current = requestAnimationFrame(frame)

      if (!isVisibleRef.current || !initializedRef.current) return

      const rect = canvas!.getBoundingClientRect()
      const time = (now - startTimeRef.current) / 1000

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      scene.draw(ctx!, time, rect.width, rect.height)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [canvasRef, scene])
}
