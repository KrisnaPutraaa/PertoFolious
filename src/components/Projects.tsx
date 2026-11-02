import { projects, type Project } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const Wrapper = project.link ? 'a' : 'div'
  return (
    <Wrapper
      {...(project.link ? { href: project.link, target: '_blank', rel: 'noreferrer' } : {})}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 md:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--glow)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{project.year}</span>
        {project.private ? (
          <span className="rounded-full border border-line px-2.5 py-0.5">Private repo</span>
        ) : project.link ? (
          <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        ) : null}
      </div>
      <h3 className={`mt-8 font-display font-semibold leading-tight tracking-tight ${large ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{project.title}</h3>
      <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
      <p className="mt-5 leading-relaxed text-muted">{project.description}</p>
      {large && (
        <ul className="mt-6 space-y-2 text-sm text-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="text-accent">—</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="03" label="Projects" title="Selected work." />
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <ProjectCard project={p} large />
          </Reveal>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {others.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
