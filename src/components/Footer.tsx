import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-text-muted">
        {/* "2007–" read as a business's founding year rather than a career start. */}
        &copy; {new Date().getFullYear()} {profile.name} &middot;{' '}
        <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
          {profile.email}
        </a>{' '}
        &middot; React + Vite on Cloudflare
      </div>
    </footer>
  )
}
