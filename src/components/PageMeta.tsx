import { useEffect } from 'react'

interface PageMetaProps {
  title: string
  description: string
  canonicalUrl: string
  ogImage?: string
  ogType?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function PageMeta({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://startupp.ai/images/og-default.png',
  ogType = 'website',
  noIndex = false,
  jsonLd,
}: PageMetaProps) {
  useEffect(() => {
    // Title
    document.title = title

    // Helper to set or create a meta tag
    function setMeta(attr: string, key: string, content: string) {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Basic meta
    setMeta('name', 'description', description)

    // Robots
    if (noIndex) {
      setMeta('name', 'robots', 'noindex, nofollow')
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]')
      if (robotsMeta) robotsMeta.remove()
    }

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:site_name', 'Renzo Dupont')

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    // JSON-LD structured data
    // Remove any existing JSON-LD from previous route
    document.querySelectorAll('script[data-page-jsonld]').forEach(el => el.remove())

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      schemas.forEach(schema => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-page-jsonld', 'true')
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      })
    }
  }, [title, description, canonicalUrl, ogImage, ogType, noIndex, jsonLd])

  return null
}
