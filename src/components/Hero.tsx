import { profile } from '../data/portfolio'
import { useLang } from '../i18n'
import CaveBackground from './CaveBackground'
import Reveal from './Reveal'

// Hero selalu gelap (latar gua), jadi warnanya dikunci terang di sini
export default function Hero() {
  const { t } = useLang()
  const [first, second, ...rest] = profile.name.split(' ')
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden text-[#ededf0]">
      <CaveBackground />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24 pb-20 md:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.hero.status}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-shadow-pixel mt-7 font-pixel text-base text-[#e8c88a]">{t.hero.role}</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] [text-shadow:0_2px_30px_rgb(0_0_0/0.7)]">
            {first} {second}
            <br />
            <span className="text-[#b4b4bd]">{rest.join(' ')}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#d0d0d7] [text-shadow:0_1px_12px_#000]">{t.hero.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#e8c88a] px-6 py-3 text-sm font-medium text-[#09090c] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.primary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}${profile.cvFile}`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-6 py-3 text-sm backdrop-blur transition-colors hover:bg-black/60"
            >
              {t.hero.secondary}
            </a>
          </div>
        </Reveal>
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-pixel text-xs tracking-[0.2em] text-white/70 uppercase">
        {t.hero.scroll} ↓
      </a>
    </section>
  )
}
