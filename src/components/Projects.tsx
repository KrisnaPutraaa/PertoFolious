import { useRef, type MouseEvent } from 'react'
import type { Project } from '../data/portfolio'
import { useLang } from '../i18n'
import PixelIcon from './PixelIcon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ProjectCard({ project, large, privateLabel }: { project: Project; large?: boolean; privateLabel: string }) {
  const ref = useRef<HTMLElement>(null)

  // Kartu sedikit miring mengikuti posisi kursor (efek 3D)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-md p-7 transition-[transform,border-color] duration-300 ease-out hover:border-accent/40 md:p-8"
    >
      {/* cahaya yang mengikuti kursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), var(--glow), transparent 60%)' }}
      />
      <div className="relative flex items-start justify-between">
        {/* ikon dalam "slot" ala inventaris */}
        <div className="slot grid h-14 w-14 place-items-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
          <PixelIcon name={project.icon} size={30} />
        </div>
        <div className="flex flex-col items-end gap-1.5 font-pixel text-xs text-muted">
          <span className="rounded-md border border-line px-2 py-0.5">{project.year}</span>
          {project.private && <span className="rounded-md border border-line px-2 py-0.5">🔒 {privateLabel}</span>}
        </div>
      </div>
      <h3 className={`relative mt-6 font-display leading-tight font-semibold tracking-tight ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
        {project.title}
      </h3>
      <p className="relative mt-1 text-sm text-accent">{project.subtitle}</p>
      <p className="relative mt-4 leading-relaxed text-muted">{project.description}</p>
      {large && project.highlights.length > 0 && (
        <ul className="relative mt-5 space-y-2 text-sm text-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}
      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-7">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-pixel text-xs text-muted transition-colors group-hover:text-text">
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useLang()
  const items = t.projects.items
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle} />
      <div className="grid gap-5 md:grid-cols-2">
        {items.filter((p) => p.featured).map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <ProjectCard project={p} large privateLabel={t.projects.privateRepo} />
          </Reveal>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {items.filter((p) => !p.featured).map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <ProjectCard project={p} privateLabel={t.projects.privateRepo} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
