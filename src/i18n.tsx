import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './data/portfolio'

// "Context" = cara React membagikan data (di sini: bahasa aktif) ke semua komponen
type LangState = { lang: Lang; setLang: (l: Lang) => void; t: Content }
const LangContext = createContext<LangState | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'id') return saved
  } catch {
    /* storage tidak tersedia */
  }
  // pengunjung dengan browser berbahasa Indonesia otomatis dapat versi Indonesia
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* abaikan */
    }
  }

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang harus dipakai di dalam <LangProvider>')
  return ctx
}
