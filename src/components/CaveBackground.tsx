import { useEffect, useRef } from 'react'

// =====================================================================
//  Latar gua voxel orisinal yang digambar dengan kode (tanpa aset game).
//  - Setiap blok = tekstur 16×16 piksel
//  - Cahaya bertingkat 0–15 menyebar dari obor & lava
//  - Dinding belakang bergerak lebih lambat (efek kedalaman / parallax)
// =====================================================================

const T = 16 // piksel tekstur per blok
const AIR = 0, STONE = 1, DEEP = 2, GOLD = 3, DIAMOND = 4, LAVA = 5, GRAVEL = 6, COPPER = 7

// ---------- noise (angka acak yang konsisten) ----------
const hash = (x: number, y: number, s = 0) => {
  let h = (x * 374761393 + y * 668265263 + s * 1442695041) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
function noise2(x: number, y: number, s: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

// ---------- tekstur 16×16 ----------
type RGB = [number, number, number]
function makeTex(fn: (x: number, y: number) => RGB) {
  const t = new Uint8ClampedArray(T * T * 3)
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) t.set(fn(x, y), (y * T + x) * 3)
  return t
}
const stoneFn = (x: number, y: number, s = 0): RGB => {
  const n = hash(x, y, 11 + s), p = noise2(x * 0.35, y * 0.35, 12 + s)
  const v = 118 + (n - 0.5) * 22 + (p > 0.62 ? -24 : p < 0.3 ? 12 : 0)
  return [v, v, v + 2]
}
const oreFn = (col: RGB, hi: RGB, seed: number) => (x: number, y: number): RGB => {
  const spots = [[4, 4], [10, 6], [6, 11], [12, 12]]
  for (const [sx, sy] of spots) {
    const dx = x - sx - Math.floor(hash(sx, sy, seed) * 2), dy = y - sy
    if (dx >= 0 && dx < 2 && dy >= 0 && dy < 2) return dx + dy === 0 ? hi : col
    if ((dx === -1 || dx === 2) && dy >= 0 && dy < 2 && hash(x, y, seed) > 0.5) return col.map((c) => c * 0.7) as RGB
  }
  return stoneFn(x, y)
}
const TEX: Record<number, Uint8ClampedArray> = {
  [STONE]: makeTex(stoneFn),
  [DEEP]: makeTex((x, y) => {
    const n = hash(x, y, 21), streak = (y + Math.floor(hash(0, y, 22) * 3)) % 4 === 0 ? -14 : 0
    const v = 64 + (n - 0.5) * 16 + streak
    return [v, v, v + 8]
  }),
  [GRAVEL]: makeTex((x, y) => {
    const v = 95 + hash(Math.floor(x / 2), Math.floor(y / 2), 31) * 50
    return [v + 6, v, v - 6]
  }),
  [GOLD]: makeTex(oreFn([228, 178, 48], [255, 244, 150], 41)),
  [DIAMOND]: makeTex(oreFn([70, 214, 214], [200, 255, 250], 42)),
  [COPPER]: makeTex(oreFn([196, 108, 70], [240, 160, 110], 43)),
}

const bright = (l: number) => 0.06 + 0.94 * Math.pow(0.86, 15 - l)

export default function CaveBackground() {
  const backRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current!, backEl = backRef.current!, host = cv.parentElement!
    const ctx = cv.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, COLS = 0, ROWS = 0, scale = 1, backTilePx = 0
    let img: ImageData, px: Uint8ClampedArray

    // ---------- ukuran: skala SERAGAM supaya blok selalu persegi ----------
    function resize() {
      const vw = host.clientWidth, vh = host.clientHeight
      const blockPx = Math.max(34, Math.min(60, vh / 9))
      scale = blockPx / T
      W = Math.ceil(vw / scale) + 1
      H = Math.ceil(vh / scale)
      cv.width = W
      cv.height = H
      cv.style.width = W * scale + 'px'
      cv.style.height = H * scale + 'px'
      COLS = Math.ceil(W / T) + 2
      ROWS = Math.ceil(H / T) + 1
      img = ctx.createImageData(W, H)
      px = img.data
      buildBack()
    }

    // ---------- dinding belakang: dibuat sekali, lalu hanya digeser ----------
    function buildBack() {
      const TILE = T * 8
      const c = document.createElement('canvas')
      c.width = c.height = TILE
      const g = c.getContext('2d')!, d = g.createImageData(TILE, TILE)
      for (let y = 0; y < TILE; y++)
        for (let x = 0; x < TILE; x++) {
          const bx = Math.floor(x / T), by = Math.floor(y / T), tx = x % T, ty = y % T
          let k = (0.8 + hash(bx, by, 60) * 0.25) * 0.55
          if (ty === T - 1 || tx === T - 1) k *= 0.8
          const c3 = stoneFn(tx, ty, 50 + ((bx * 3 + by) % 4))
          const i = (y * TILE + x) * 4
          d.data[i] = c3[0] * k
          d.data[i + 1] = c3[1] * k
          d.data[i + 2] = c3[2] * k * 1.04
          d.data[i + 3] = 255
        }
      g.putImageData(d, 0, 0)
      backTilePx = TILE * scale
      backEl.style.backgroundImage = `url(${c.toDataURL()})`
      backEl.style.backgroundSize = `${backTilePx}px ${backTilePx}px`
      backEl.style.width = host.clientWidth + backTilePx * 2 + 'px'
    }

    // ---------- bentuk gua ----------
    function blockAt(bx: number, by: number) {
      const rel = by / ROWS
      const n = noise2(bx * 0.13, by * 0.2, 1) * 0.65 + noise2(bx * 0.31, by * 0.42, 2) * 0.35
      const edge = Math.max(0, 0.32 - rel) * 2.6 + Math.max(0, rel - 0.74) * 2.2
      if (n + edge <= 0.58) return rel > 0.8 ? LAVA : AIR
      const r = hash(bx, by, 7)
      if (r > 0.975) return DIAMOND
      if (r > 0.95) return GOLD
      if (r > 0.93) return COPPER
      if (noise2(bx * 0.25, by * 0.25, 5) > 0.78) return GRAVEL
      return rel > 0.7 ? DEEP : STONE
    }

    let camX = 0, t = 0, last = performance.now(), raf = 0, visible = true
    const sparks: { x: number; y: number; vy: number; life: number; c: string }[] = []
    const dust = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), v: 0.004 + Math.random() * 0.01 }))

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt
      camX += dt * 9

      const bx0 = Math.floor(camX / T) - 1
      // 1) grid blok yang terlihat + posisi obor
      const grid: number[][] = []
      for (let gy = 0; gy < ROWS; gy++) {
        const row: number[] = []
        for (let gx = 0; gx < COLS; gx++) row.push(blockAt(bx0 + gx, gy))
        grid.push(row)
      }
      const torches: [number, number][] = []
      for (let gy = 0; gy < ROWS - 1; gy++)
        for (let gx = 0; gx < COLS; gx++) {
          const below = grid[gy + 1][gx]
          if (grid[gy][gx] === AIR && below !== AIR && below !== LAVA && hash(bx0 + gx, 0, 77) > 0.62) torches.push([gx, gy])
        }

      // 2) sebarkan cahaya (BFS) dari obor (14) & lava (15) lewat udara
      const light = grid.map((r) => r.map(() => 0))
      const q: [number, number][] = []
      for (const [gx, gy] of torches) {
        light[gy][gx] = 14
        q.push([gx, gy])
      }
      for (let gy = 0; gy < ROWS; gy++)
        for (let gx = 0; gx < COLS; gx++)
          if (grid[gy][gx] === LAVA) {
            light[gy][gx] = 15
            q.push([gx, gy])
          }
      for (let qi = 0; qi < q.length; qi++) {
        const [x, y] = q[qi], l = light[y][x] - 1
        if (l <= 0) continue
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy
          if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || light[ny][nx] >= l) continue
          light[ny][nx] = l
          if (grid[ny][nx] === AIR) q.push([nx, ny])
        }
      }

      // 3) geser halus (sub-piksel) lewat CSS → gerakan mulus
      const offX = Math.floor(camX) - bx0 * T
      cv.style.transform = `translate3d(${-(camX - Math.floor(camX)) * scale}px,0,0)`
      backEl.style.transform = `translate3d(${-((camX * 0.55 * scale) % backTilePx) - backTilePx}px,0,0)`

      // 4) gambar per piksel
      for (let y = 0; y < H; y++) {
        const gy = Math.floor(y / T), ty = y % T
        for (let x = 0; x < W; x++) {
          const wx = x + offX, gx = Math.floor(wx / T), tx = wx % T
          const k = grid[gy][gx], p = (y * W + x) * 4
          let L = bright(Math.max(4, light[gy][gx]))
          if (k === AIR) {
            // udara = "kaca gelap" di atas dinding belakang
            const w = Math.max(0, L - 0.2)
            px[p] = 120 * w
            px[p + 1] = 55 * w
            px[p + 2] = 0
            px[p + 3] = 255 * Math.min(1, Math.max(0, 1 - L * 1.05))
            continue
          }
          let r: number, g: number, b: number
          if (k === LAVA) {
            const w = noise2((wx + t * 6) * 0.25, (y + t * 2) * 0.25, 9)
            r = 210 + w * 45
            g = 70 + w * 110
            b = 10 + w * 30
            L = 1
          } else {
            const tex = TEX[k], i = (ty * T + tx) * 3
            r = tex[i]
            g = tex[i + 1]
            b = tex[i + 2]
            if (ty === 0 && gy > 0 && grid[gy - 1][gx] === AIR) {
              r *= 1.15
              g *= 1.15
              b *= 1.15
            }
            if (ty === T - 1) {
              r *= 0.85
              g *= 0.85
              b *= 0.85
            }
            if ((k === GOLD || k === DIAMOND || k === COPPER) && (r !== g || g !== b)) L = Math.max(L, 0.3)
          }
          const w = k === LAVA ? 0 : Math.max(0, L - 0.2)
          px[p] = r * L * (1 + w * 0.45)
          px[p + 1] = g * L * (1 + w * 0.12)
          px[p + 2] = b * L * (1 - w * 0.35)
          px[p + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)

      // 5) obor, percikan, debu
      for (const [gx, gy] of torches) {
        const x = gx * T - offX + 7, y = gy * T + 4
        ctx.fillStyle = '#5a3d22'
        ctx.fillRect(x, y + 3, 2, 9)
        ctx.fillStyle = '#7a5531'
        ctx.fillRect(x, y + 3, 1, 9)
        const f = Math.sin(t * 14 + gx * 3) > 0
        ctx.fillStyle = f ? '#ffb02e' : '#ff8a1c'
        ctx.fillRect(x - 1, y, 4, 3)
        ctx.fillStyle = '#ffe680'
        ctx.fillRect(x, y + (f ? 0 : 1), 2, 2)
        ctx.fillStyle = '#fffbe0'
        ctx.fillRect(x, y + 1, 1, 1)
        if (Math.random() < 0.03) sparks.push({ x: x + 1, y, vy: -6 - Math.random() * 6, life: 1, c: '#ffcc66' })
      }
      if (Math.random() < 0.25) {
        for (let tries = 0; tries < 5; tries++) {
          const gx = Math.floor(Math.random() * COLS), gy = Math.floor(Math.random() * ROWS)
          if (grid[gy][gx] === LAVA && (gy === 0 || grid[gy - 1][gx] === AIR)) {
            sparks.push({ x: gx * T - offX + Math.random() * T, y: gy * T, vy: -10 - Math.random() * 14, life: 1, c: '#ff9a3c' })
            break
          }
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.y += s.vy * dt
        s.vy += 6 * dt
        s.life -= dt * 0.8
        s.x -= dt * 9
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = s.life
        ctx.fillStyle = s.c
        ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1)
      }
      ctx.globalAlpha = 1
      for (const d of dust) {
        d.y -= d.v * dt * 6
        if (d.y < 0) {
          d.y = 1
          d.x = Math.random()
        }
        ctx.fillStyle = 'rgba(255,220,170,0.28)'
        ctx.fillRect(Math.round(d.x * W), Math.round(d.y * H), 1, 1)
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame)
    }

    resize()
    // hemat baterai: animasi berhenti saat hero tidak terlihat di layar
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduced) {
        cancelAnimationFrame(raf)
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(host)
    raf = requestAnimationFrame(frame)
    const onResize = () => resize()
    addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050506]">
      <div ref={backRef} className="absolute top-0 left-0 h-full bg-repeat [image-rendering:pixelated] will-change-transform" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 [image-rendering:pixelated] will-change-transform" />
      {/* lapisan gelap supaya teks tetap terbaca */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_22%_55%,rgb(5_5_6/0.74),rgb(5_5_6/0.05)_75%),linear-gradient(180deg,rgb(5_5_6/0.5),transparent_18%,transparent_85%,rgb(5_5_6/0.55))]" />
    </div>
  )
}
