import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Store Lenis instance globally so route changes can access it
let lenisInstance: Lenis | null = null

export function useSmoothScroll() {
  const location = useLocation()

  // Initialize Lenis once
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisInstance = null
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])
}
