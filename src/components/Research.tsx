import { useLang } from '../i18n'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Research() {
  const { t } = useLang()
  const r = t.research
  return (
    <section id="research" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading label={r.label} title={r.title} />
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur-md p-8 md:p-14">
          <span aria-hidden className="absolute top-0 right-8 font-display text-[10rem] leading-none text-accent/10 select-none">
            “
          </span>
          <p className="font-pixel text-sm text-accent">{r.status}</p>
          <h3 className="mt-6 max-w-4xl font-display text-2xl leading-tight font-semibold tracking-tight md:text-4xl">{r.paperTitle}</h3>
          <p className="mt-4 text-sm text-muted">{r.authors}</p>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted">{r.summary}</p>
        </article>
      </Reveal>
    </section>
  )
}
