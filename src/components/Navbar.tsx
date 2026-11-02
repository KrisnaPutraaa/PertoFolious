import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { useLang } from '../i18n'
import { PixelSword } from './PixelIcon'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [light, setLight] = useState(() => document.documentElement.classList.contains('light'))

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects', label: t.nav.projects },
    { href: '#research', label: t.nav.research },
    { href: '#skills', label: t.nav.skills },
  ]

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
      /* abaikan */
    }
  }

  // Di atas hero (gua gelap) teks selalu terang; setelah scroll ikut tema
  const onHero = !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        onHero ? 'border-b border-transparent text-white' : 'border-b border-line bg-bg/80 text-text backdrop-blur-xl'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        {/* Menu: font pixel + pedang muncul saat hover */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-1.5 font-pixel text-[15px] transition-colors hover:text-[#fff2a8] ${
                onHero ? 'text-shadow-pixel text-white/90' : 'text-muted'
              }`}
            >
              <PixelSword
                size={16}
                className="w-0 -translate-x-1 -rotate-12 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100"
              />
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol bahasa EN / ID */}
          <div className="flex rounded-full border border-current/15 p-0.5 font-pixel text-xs" role="group" aria-label="Language">
            {(['en', 'id'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-accent text-[#09090c]' : 'opacity-70 hover:opacity-100'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Ganti tema terang/gelap"
            className="grid h-9 w-9 place-items-center rounded-full border border-current/15 opacity-80 transition-opacity hover:opacity-100"
          >
            {light ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            )}
          </button>
          <a
            href="#contact"
            className={`hidden rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85 md:inline-block ${
              onHero ? 'bg-white text-[#09090c]' : 'bg-text text-bg'
            }`}
          >
            {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-current/15 lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line px-5 py-3 lg:hidden">
          {[...links, { href: '#contact', label: t.nav.contact }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-2 py-3 font-pixel text-lg">
              <PixelSword size={16} />
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
