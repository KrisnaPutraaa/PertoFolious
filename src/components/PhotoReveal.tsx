import { useEffect, useRef } from 'react'
import { profile } from '../data/portfolio'
import { useLang } from '../i18n'

// =====================================================================
//  Foto asli ditumpuk dengan foto versi blok (ukuran & pose sama persis).
//  Kotak-kotak di sekitar kursor berubah jadi versi blok, mengikuti kursor
//  dengan sedikit tertinggal, lalu pelan-pelan kembali ke foto asli (jejak).
// =====================================================================
const CELL = 16 // ukuran 1 kotak di layar (px)

export default function PhotoReveal() {
  const { t } = useLang()
  const figRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fig = figRef.current!, pc = canvasRef.current!, g = pc.getContext('2d')!
    const base = import.meta.env.BASE_URL
    const real = new Image(), blocky = new Image()
    real.src = base + profile.photo.real
    blocky.src = base + profile.photo.blocky

    let cols = 0, rows = 0, cw = 0, ch = 0, dpr = 1
    let cells = new Float32Array(0)
    let mx = -9999, my = -9999, sx = -9999, sy = -9999, near = 0, lastInput = 0, raf = 0, visible = false
    const canHover = matchMedia('(hover: hover)').matches

    function size() {
      dpr = Math.min(2, devicePixelRatio || 1)
      cw = fig.clientWidth
      ch = fig.clientHeight
      pc.width = cw * dpr
      pc.height = ch * dpr
      cols = Math.ceil(cw / CELL)
      rows = Math.ceil(ch / CELL)
      cells = new Float32Array(cols * rows)
    }

    const toLocal = (cx: number, cy: number) => {
      const r = pc.getBoundingClientRect()
      mx = cx - r.left
      my = cy - r.top
      lastInput = performance.now()
    }
    const onPointer = (e: PointerEvent) => toLocal(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => toLocal(e.touches[0].clientX, e.touches[0].clientY)

    function loop(now: number) {
      // 1) "kuas" mengikuti kursor dengan halus
      let tx = mx, ty = my
      if (!canHover && now - lastInput > 2500) {
        // HP tanpa sentuhan: kuas bergerak sendiri supaya efeknya terlihat
        const k = now / 1000
        tx = cw * (0.5 + 0.3 * Math.sin(k * 0.9))
        ty = ch * (0.4 + 0.25 * Math.sin(k * 1.3 + 1))
      }
      if (sx < -999) {
        sx = tx
        sy = ty
      }
      sx += (tx - sx) * 0.12
      sy += (ty - sy) * 0.12

      // 2) makin dekat kursor ke foto → lingkaran makin besar
      const dx = Math.max(-tx, 0, tx - cw), dy = Math.max(-ty, 0, ty - ch)
      const dist = Math.hypot(dx, dy)
      const target = dist === 0 ? 1 : Math.max(0, 1 - dist / 220)
      near += (target - near) * 0.08
      const R = 40 + 110 * near

      // 3) nilai tiap kotak: naik cepat bila dekat, turun pelan bila jauh
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const d = Math.hypot(c * CELL + CELL / 2 - sx, r * CELL + CELL / 2 - sy)
          const v = near > 0.02 ? Math.min(1, Math.max(0, (R - d) / (R * 0.45))) : 0
          cells[i] = v > cells[i] ? cells[i] + (v - cells[i]) * 0.35 : Math.max(v, cells[i] - 0.012)
        }

      // 4) gambar: foto asli, lalu kotak versi blok di atasnya
      if (real.complete && blocky.complete && real.naturalWidth) {
        g.setTransform(dpr, 0, 0, dpr, 0, 0)
        const iw = real.naturalWidth, ih = real.naturalHeight
        const s = Math.max(cw / iw, ch / ih)
        const ox = (cw - iw * s) / 2, oy = (ch - ih * s) / 2
        g.drawImage(real, ox, oy, iw * s, ih * s)
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            const v = cells[r * cols + c]
            if (v < 0.03) continue
            const h = (((c * 73856093) ^ (r * 19349663)) >>> 0) % 1000 / 1000
            if (v < 1 && v < h * 0.9 + 0.1) continue // tepi bergerigi (dither)
            const x = c * CELL, y = r * CELL
            g.drawImage(blocky, (x - ox) / s, (y - oy) / s, CELL / s, CELL / s, x, y, CELL, CELL)
            if (v < 0.97) {
              g.fillStyle = `rgba(255,255,255,${(1 - v) * 0.12})`
              g.fillRect(x, y, CELL, CELL)
            }
          }
      }
      if (visible) raf = requestAnimationFrame(loop)
    }

    size()
    // hanya beranimasi saat foto terlihat di layar
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(loop)
    })
    io.observe(fig)
    real.onload = blocky.onload = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }
    addEventListener('resize', size)
    addEventListener('pointermove', onPointer, { passive: true })
    pc.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      removeEventListener('resize', size)
      removeEventListener('pointermove', onPointer)
      pc.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <figure ref={figRef} className="relative m-0 aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
      <canvas ref={canvasRef} role="img" aria-label={t.about.photoAlt} className="absolute inset-0 h-full w-full touch-pan-y" />
      <figcaption className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 font-pixel text-sm whitespace-nowrap text-white [text-shadow:2px_2px_0_#222]">
        <span className="hidden [@media(hover:hover)]:inline">{t.about.photoHintMouse} ✦</span>
        <span className="[@media(hover:hover)]:hidden">{t.about.photoHintTouch} ✦</span>
      </figcaption>
    </figure>
  )
}
