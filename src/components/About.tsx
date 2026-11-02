import { education, profile } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="01" label="About" title="Quality-minded engineer, curious builder." />
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-6 text-lg leading-relaxed text-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Education</p>
            <p className="mt-4 font-serif text-3xl">{education.school}</p>
            <p className="mt-2 text-muted">{education.degree}</p>
            <p className="mt-6 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {education.period}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
