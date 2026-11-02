import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [light, setLight] = useState(() => document.documentElement.classList.contains('light'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !light
    setLight(next)
    document.documentElement.classList.toggle('light', next)
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark')
    } catch {
      /* abaikan jika storage tidak tersedia */
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display font-semibold text-2xl tracking-tight">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Ganti tema terang/gelap"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text"
          >
            {light ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            )}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 md:inline-block"
          >
            Let’s talk
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Buka menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          {[...links, { href: '#contact', label: 'Contact' }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
