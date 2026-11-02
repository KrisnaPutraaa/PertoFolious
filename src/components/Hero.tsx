import { profile, stats } from '../data/portfolio'
import Reveal from './Reveal'

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ')
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center pt-24 pb-16">
      {/* Cahaya lembut di latar belakang */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float absolute top-[10%] left-[55%] h-[480px] w-[480px] rounded-full bg-[var(--glow)] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities · {profile.location}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display font-semibold text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] tracking-[-0.045em]">
            {first}
            <br />
            <span className="text-muted">{rest.join(' ')}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 font-mono text-sm text-accent">{profile.role}</p>
              <p className="text-lg leading-relaxed text-muted">{profile.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                View my work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={`${import.meta.env.BASE_URL}${profile.cvFile}`}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm transition-colors hover:bg-surface"
              >
                Download CV
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg p-6">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 font-display font-semibold text-4xl tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
