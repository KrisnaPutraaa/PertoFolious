import Reveal from './Reveal'

// Pola font: label kecil = font pixel, judul besar = font Apple
export default function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-pixel text-sm tracking-wide text-accent">
        <span className="h-px w-8 bg-accent/50" />
        {label}
      </p>
      <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </Reveal>
  )
}
