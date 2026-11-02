import { publication } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="04" label="Research" title="Publication." />
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14">
          <span aria-hidden className="absolute top-0 right-8 font-display font-semibold text-[10rem] leading-none text-accent/10 select-none tracking-tight">
            “
          </span>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{publication.status}</p>
          <h3 className="mt-6 max-w-4xl font-display font-semibold text-3xl leading-tight md:text-4xl tracking-tight">{publication.title}</h3>
          <p className="mt-4 text-sm text-muted">{publication.authors}</p>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted">{publication.summary}</p>
        </article>
      </Reveal>
    </section>
  )
}
