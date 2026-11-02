import { useLang } from '../i18n'
import PhotoReveal from './PhotoReveal'
import Reveal from './Reveal'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-pixel text-sm tracking-wide text-accent">
              <span className="h-px w-8 bg-accent/50" />
              {t.about.label}
            </p>
            <h2 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl">
              {t.about.title}
              <br />
              <span className="text-muted">{t.about.titleMuted}</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {t.stats.map((s) => (
                <div key={s.label} className="bg-bg/70 p-4 backdrop-blur-md">
                  <dd className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{s.value}</dd>
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-muted">
              <span className="font-pixel text-accent">{t.education.label}</span> · {t.education.school} — {t.education.degree} ({t.education.period})
            </p>
          </Reveal>
        </div>
        {/* foto muncul dengan fade + sedikit membesar saat di-scroll */}
        <Reveal delay={150} className="reveal-zoom">
          <PhotoReveal />
        </Reveal>
      </div>
    </section>
  )
}
