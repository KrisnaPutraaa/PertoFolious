import { useEffect, useRef } from 'react'

// =====================================================================
//  Latar "padang malam di bawah bulan" bergaya blok, dengan efek ala shader:
//  - Depth of field : lapisan jauh lebih blur dari lapisan dekat
//  - Bloom & berkas cahaya bulan
//  - Kabut atmosfer di antara lapisan
//  - Parallax       : lapisan dekat bergerak lebih cepat saat scroll
//  Semua digambar SEKALI ke kanvas, lalu hanya digeser (ringan).
// =====================================================================

type Palette = {
  sky: [string, string, string]
  glow: string
  orb: string
  orbShade: string
  far: string
  farRim: string
  mid: string
  midRim: string
  leaf: string
  leafRim: string
  trunk: string
  near: string
  grass: string
  grassRim: string
  fog: string
  cloud: string
  firefly: string
  stars: boolean
}

const NIGHT: Palette = {
  sky: ['#05060d', '#0c1230', '#27305c'],
  glow: 'rgba(170,190,255,',
  orb: '#e9edff',
  orbShade: '#b9c3ea',
  far: '#1b2347', farRim: '#6b80c4',
  mid: '#111833', midRim: '#4a5c9c',
  leaf: '#0d2228', leafRim: '#3d6c78', trunk: '#1a1420',
  near: '#090d1a', grass: '#10241d', grassRim: '#3a6a59',
  fog: 'rgba(90,105,165,',
  cloud: 'rgba(150,165,220,0.16)',
  firefly: '#d8ff8a',
  stars: true,
}
const DAY: Palette = {
  sky: ['#7fb6f2', '#b9d8f5', '#ffe4c2'],
  glow: 'rgba(255,240,200,',
  orb: '#fff6c9',
  orbShade: '#ffe58a',
  far: '#a9bddf', farRim: '#e6efff',
  mid: '#7ea48a', midRim: '#c4e2b8',
  leaf: '#4c8a55', leafRim: '#8fd08a', trunk: '#6b4a2e',
  near: '#4f7d3c', grass: '#5f9a45', grassRim: '#a8dc7a',
  fog: 'rgba(255,255,255,',
  cloud: 'rgba(255,255,255,0.55)',
  firefly: 'transparent',
  stars: false,
}

const hash = (x: number, s = 0) => {
  let h = (x * 374761393 + s * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
const smooth = (x: number, s: number) => {
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f)
  return hash(i, s) * (1 - u) + hash(i + 1, s) * u
}

// Tekstur halus per blok: piksel 4×4 sedikit lebih terang/gelap
function blockTexture(g: CanvasRenderingContext2D, x: number, y: number, B: number, seed: number) {
  const P = Math.max(3, Math.round(B / 6))
  for (let py = 0; py < B; py += P)
    for (let px = 0; px < B; px += P) {
      const n = hash(Math.floor((x + px) / P) * 31 + Math.floor((y + py) / P), seed)
      if (n > 0.7) {
        g.fillStyle = 'rgba(255,255,255,0.05)'
        g.fillRect(x + px, y + py, P, P)
      } else if (n < 0.25) {
        g.fillStyle = 'rgba(0,0,0,0.12)'
        g.fillRect(x + px, y + py, P, P)
      }
    }
}

// Lapisan bukit dari blok (+ pohon opsional)
function drawHills(
  g: CanvasRenderingContext2D, w: number, h: number, B: number, base: number, amp: number,
  seed: number, fill: string, rim: string, trees?: { leaf: string; leafRim: string; trunk: string; chance: number },
  grass?: { color: string; rim: string },
) {
  const cols = Math.ceil(w / B) + 1
  for (let c = 0; c < cols; c++) {
    const n = smooth(c * 0.09, seed) * 0.7 + smooth(c * 0.23, seed + 1) * 0.3
    const top = Math.round((base - n * amp) / B) * B
    const x = c * B
    g.fillStyle = fill
    g.fillRect(x, top, B, h - top)
    for (let y = top; y < h; y += B) blockTexture(g, x, y, B, seed)
    if (grass) {
      g.fillStyle = grass.color
      g.fillRect(x, top, B, B * 0.45)
      g.fillStyle = grass.rim
      g.fillRect(x, top, B, Math.max(2, B * 0.1))
    } else {
      // tepi atas terkena cahaya bulan
      g.fillStyle = rim
      g.globalAlpha = 0.55
      g.fillRect(x, top, B, Math.max(2, B * 0.12))
      g.globalAlpha = 1
    }
    if (trees && hash(c, seed + 9) < trees.chance) {
      const th = 2 + Math.floor(hash(c, seed + 3) * 2)
      g.fillStyle = trees.trunk
      g.fillRect(x, top - th * B, B, th * B)
      const cy = top - th * B - B * 2
      g.fillStyle = trees.leaf
      g.fillRect(x - B, cy, B * 3, B * 2)
      g.fillRect(x, cy - B, B, B)
      for (let yy = cy - B; yy < cy + B * 2; yy += B) for (let xx = x - B; xx < x + B * 2; xx += B) blockTexture(g, xx, yy, B, seed + 5)
      g.fillStyle = trees.leafRim
      g.globalAlpha = 0.5
      g.fillRect(x - B, cy, B * 3, Math.max(2, B * 0.12))
      g.fillRect(x, cy - B, B, Math.max(2, B * 0.12))
      g.globalAlpha = 1
    }
  }
}

export default function NightBackground() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const layers = Array.from(root.querySelectorAll<HTMLCanvasElement>('canvas[data-layer]'))
    const fx = root.querySelector<HTMLCanvasElement>('canvas[data-fx]')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let pal = NIGHT, vw = 0, vh = 0, raf = 0, scrollY = 0

    function draw() {
      pal = document.documentElement.classList.contains('light') ? DAY : NIGHT
      vw = innerWidth
      vh = innerHeight
      const H = Math.round(vh * 1.35) // lebih tinggi dari layar → ruang untuk parallax
      const scale = vw < 640 ? 0.7 : 1
      for (const cv of layers) {
        cv.width = vw
        cv.height = H
        const g = cv.getContext('2d')!
        g.clearRect(0, 0, vw, H)
        const L = cv.dataset.layer
        if (L === 'sky') {
          const grd = g.createLinearGradient(0, 0, 0, H)
          grd.addColorStop(0, pal.sky[0])
          grd.addColorStop(0.55, pal.sky[1])
          grd.addColorStop(1, pal.sky[2])
          g.fillStyle = grd
          g.fillRect(0, 0, vw, H)
          if (pal.stars)
            for (let i = 0; i < 160; i++) {
              const x = hash(i, 1) * vw, y = hash(i, 2) * H * 0.6, s = hash(i, 3) > 0.9 ? 3 : 2
              g.fillStyle = `rgba(255,255,255,${0.25 + hash(i, 4) * 0.6})`
              g.fillRect(Math.round(x), Math.round(y), s, s)
            }
        } else if (L === 'moon') {
          // bulan / matahari kotak + bloom
          const mx = vw < 640 ? vw * 0.82 : vw * 0.78, my = vw < 640 ? vh * 0.17 : vh * 0.28, M = 84 * scale
          const bloom = g.createRadialGradient(mx, my, 0, mx, my, M * 5)
          bloom.addColorStop(0, pal.glow + '0.45)')
          bloom.addColorStop(0.25, pal.glow + '0.14)')
          bloom.addColorStop(1, pal.glow + '0)')
          g.fillStyle = bloom
          g.fillRect(0, 0, vw, H)
          g.fillStyle = pal.orb
          g.fillRect(mx - M / 2, my - M / 2, M, M)
          const P = M / 8
          g.fillStyle = pal.orbShade
          for (const [cx, cy, w, h] of [[1, 1, 2, 2], [5, 2, 2, 1], [2, 5, 1, 2], [5, 5, 2, 2], [4, 4, 1, 1]])
            g.fillRect(mx - M / 2 + cx * P, my - M / 2 + cy * P, w * P, h * P)
        } else if (L === 'far') {
          drawHills(g, vw, H, 26 * scale, H * 0.62, H * 0.22, 11, pal.far, pal.farRim)
          fog(g, H, 0.55, 0.35)
        } else if (L === 'mid') {
          drawHills(g, vw, H, 34 * scale, H * 0.76, H * 0.16, 23, pal.mid, pal.midRim, { leaf: pal.leaf, leafRim: pal.leafRim, trunk: pal.trunk, chance: 0.12 })
          fog(g, H, 0.7, 0.25)
        } else if (L === 'near') {
          drawHills(g, vw, H, 46 * scale, H * 0.92, H * 0.08, 37, pal.near, pal.grassRim, { leaf: pal.leaf, leafRim: pal.leafRim, trunk: pal.trunk, chance: 0.08 }, { color: pal.grass, rim: pal.grassRim })
        } else if (L === 'clouds') {
          g.fillStyle = pal.cloud
          const B = 22 * scale
          for (let i = 0; i < 9; i++) {
            const cx = hash(i, 50) * vw * 2, cy = (0.08 + hash(i, 51) * 0.3) * H
            const w = 4 + Math.floor(hash(i, 52) * 7), h = 1 + Math.floor(hash(i, 53) * 2)
            for (let r = 0; r < h; r++) g.fillRect(Math.round(cx / B) * B + r * B, cy + r * B, (w - r * 2) * B, B)
          }
        } else if (L === 'rays') {
          // berkas cahaya bulan miring ke bawah-kiri
          const mx = vw < 640 ? vw * 0.82 : vw * 0.78, my = vw < 640 ? vh * 0.17 : vh * 0.28
          for (let i = 0; i < 5; i++) {
            const a = 2.05 + i * 0.09 + hash(i, 70) * 0.04, len = H * 1.2, wid = 30 + hash(i, 71) * 60
            const ex = mx + Math.cos(a) * len, ey = my + Math.sin(a) * len
            const grd = g.createLinearGradient(mx, my, ex, ey)
            grd.addColorStop(0, pal.glow + '0.10)')
            grd.addColorStop(1, pal.glow + '0)')
            g.fillStyle = grd
            g.beginPath()
            g.moveTo(mx, my)
            g.lineTo(ex - wid, ey)
            g.lineTo(ex + wid, ey)
            g.closePath()
            g.fill()
          }
        }
      }
    }
    function fog(g: CanvasRenderingContext2D, H: number, at: number, a: number) {
      const grd = g.createLinearGradient(0, H * (at - 0.25), 0, H)
      grd.addColorStop(0, pal.fog + '0)')
      grd.addColorStop(0.45, pal.fog + a + ')')
      grd.addColorStop(1, pal.fog + a * 0.6 + ')')
      g.globalCompositeOperation = 'source-atop' // kabut hanya menempel di bukit
      g.fillStyle = grd
      g.fillRect(0, 0, vw, H)
      g.globalCompositeOperation = 'source-over'
    }

    // ---------- parallax saat scroll: makin dekat, makin cepat ----------
    const SPEED: Record<string, number> = { sky: 0.03, moon: 0.03, rays: 0.04, clouds: 0.06, far: 0.12, mid: 0.2, near: 0.32 }
    function place() {
      const max = Math.max(1, document.documentElement.scrollHeight - vh)
      const p = Math.min(1, scrollY / max)
      // muncul dari bawah saat keluar dari hero (seolah naik keluar gua)
      const rise = Math.max(0, 1 - scrollY / (vh * 0.9))
      for (const cv of layers) {
        const k = SPEED[cv.dataset.layer!] ?? 0
        const y = -p * k * vh * 1.2 + rise * k * vh * 1.4 - (cv.height - vh) * 0.15
        cv.style.transform = `translate3d(0,${y}px,0)`
      }
      root.style.opacity = String(Math.min(1, Math.max(0, (scrollY - vh * 0.05) / (vh * 0.35))))
    }

    // ---------- kunang-kunang & bintang berkelip (kanvas kecil beranimasi) ----------
    const flies = Array.from({ length: 26 }, (_, i) => ({ x: hash(i, 90), y: 0.55 + hash(i, 91) * 0.4, p: hash(i, 92) * 6.28 }))
    function animate(now: number) {
      const t = now / 1000, w = fx.width = innerWidth, h = (fx.height = innerHeight)
      const g = fx.getContext('2d')!
      if (pal.stars) {
        for (let i = 0; i < 40; i++) {
          const a = 0.5 + 0.5 * Math.sin(t * (1 + hash(i, 5) * 2) + i)
          g.fillStyle = `rgba(255,255,255,${a * 0.8})`
          g.fillRect(Math.round(hash(i, 6) * w), Math.round(hash(i, 7) * h * 0.45), 2, 2)
        }
        for (const f of flies) {
          const x = (f.x + Math.sin(t * 0.3 + f.p) * 0.03) * w, y = (f.y + Math.cos(t * 0.4 + f.p) * 0.02) * h
          const a = 0.35 + 0.65 * Math.max(0, Math.sin(t * 1.5 + f.p))
          g.fillStyle = `rgba(216,255,138,${a * 0.25})`
          g.fillRect(Math.round(x) - 3, Math.round(y) - 3, 8, 8)
          g.fillStyle = `rgba(216,255,138,${a})`
          g.fillRect(Math.round(x), Math.round(y), 2, 2)
        }
      }
      if (!reduced) raf = requestAnimationFrame(animate)
    }

    let pending = false
    const onScroll = () => {
      scrollY = window.scrollY
      if (!pending) {
        pending = true
        requestAnimationFrame(() => {
          pending = false
          place()
        })
      }
    }
    const onResize = () => {
      draw()
      place()
    }
    draw()
    onScroll()
    place()
    raf = requestAnimationFrame(animate)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    // ganti tema → gambar ulang (malam ↔ siang)
    const mo = new MutationObserver(onResize)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onResize)
      mo.disconnect()
    }
  }, [])

  // blur berbeda per lapisan = efek depth of field
  const layer = 'absolute top-0 left-0 w-full will-change-transform'
  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-0">
      <canvas data-layer="sky" className={layer} />
      <canvas data-layer="rays" className={`${layer} animate-[rays_8s_ease-in-out_infinite] blur-[6px]`} />
      <canvas data-layer="clouds" className={`${layer} blur-[3px]`} />
      <canvas data-layer="far" className={`${layer} blur-[3px]`} />
      <canvas data-layer="mid" className={`${layer} blur-[1.5px]`} />
      <canvas data-layer="near" className={layer} />
      <canvas data-fx className="absolute inset-0 h-full w-full" />
      {/* lapisan gelap tipis agar teks tetap terbaca, tapi latar tetap terlihat jelas */}
      <div className="absolute inset-0 bg-bg/35" />
      {/* bulan di atas lapisan gelap supaya tetap bersinar */}
      <canvas data-layer="moon" className={layer} />
    </div>
  )
}
