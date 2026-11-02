import { useLang } from '../i18n'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading label={t.experience.label} title={t.experience.title} />
      <div className="border-t border-line">
        {t.experience.items.map((exp, i) => (
          <Reveal key={exp.company + exp.role} delay={i * 100}>
            <article className="grid gap-6 border-b border-line py-10 md:grid-cols-[200px_1fr]">
              <p className="font-pixel text-muted">{exp.period}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {exp.role} <span className="text-accent">· {exp.company}</span>
                </h3>
                <ul className="mt-5 space-y-3 text-muted">
                  {exp.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
