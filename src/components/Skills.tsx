import { certifications, skills } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Skills() {
  const all = skills.flatMap((s) => s.items)
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="05" label="Skills" title="Tools of the trade." />
      </div>

      {/* Baris teks berjalan */}
      <div className="relative mb-20 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-10 font-display font-semibold text-3xl whitespace-nowrap text-muted md:text-4xl tracking-tight">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 100}>
            <h3 className="mb-4 border-b border-line pb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <Reveal delay={200}>
          <h3 className="mb-4 border-b border-line pb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Certifications
          </h3>
          <ul className="space-y-3 text-sm">
            {certifications.map((c) => (
              <li key={c.name} className="flex justify-between gap-4">
                <span>{c.name}</span>
                <span className="shrink-0 text-muted">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
