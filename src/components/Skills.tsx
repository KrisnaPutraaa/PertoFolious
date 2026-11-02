import { useLang } from '../i18n'
import PixelIcon from './PixelIcon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Keahlian ditampilkan seperti "inventaris": tiap kategori = panel, tiap skill = slot
export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading label={s.label} title={s.title} subtitle={s.subtitle} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {s.groups.map((group, i) => (
          <Reveal key={group.name} delay={(i % 3) * 100}>
            <div className="h-full rounded-2xl border border-line bg-surface/70 backdrop-blur-md p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="slot grid h-10 w-10 place-items-center">
                  <PixelIcon name={group.icon} size={22} />
                </div>
                <h3 className="font-pixel text-base">{group.name}</h3>
                <span className="ml-auto font-pixel text-xs text-muted">×{group.items.length}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="slot px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        {/* Sertifikat sebagai "achievement" */}
        <Reveal delay={200} className="md:col-span-2 lg:col-span-1">
          <div className="h-full rounded-2xl border border-line bg-surface/70 backdrop-blur-md p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="slot grid h-10 w-10 place-items-center">
                <PixelIcon name="star" size={22} />
              </div>
              <h3 className="font-pixel text-base">{s.achievementsTitle}</h3>
              <span className="ml-auto font-pixel text-xs text-muted">×{t.certifications.length}</span>
            </div>
            <ul className="space-y-2">
              {t.certifications.map((c) => (
                <li key={c.name} className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-2">
                  <PixelIcon name="trophy" size={18} className="shrink-0 transition-transform group-hover:scale-110" />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.issuer}
                      {c.year ? ` · ${c.year}` : ''}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 font-pixel text-[11px] text-emerald-400">{s.achievementTag} ✓</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
