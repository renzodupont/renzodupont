export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-text-muted">
        &copy; 2007–{new Date().getFullYear()} Renzo Dupont. Built with React + Vite &middot; Deployed on Cloudflare
      </div>
    </footer>
  )
}
