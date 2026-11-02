import Reveal from './Reveal'

export default function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <span>{index}</span>
        <span className="h-px w-10 bg-accent/50" />
        <span>{label}</span>
      </p>
      <h2 className="font-display font-semibold text-4xl leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
    </Reveal>
  )
}
