import type { IconName } from '../data/portfolio'

// Ikon pixel orisinal. Setiap huruf = 1 piksel berwarna, titik (.) = kosong.
const PALETTE: Record<string, string> = {
  R: '#e05a5a', r: '#ff9e9e', Y: '#f2c14e', y: '#ffe9a6', G: '#5cc96d', g: '#9be7a6',
  W: '#cfd0d8', w: '#8a5a2b', c: '#9df2e8', C: '#3dbdb1', k: '#2b2b33', p: '#eadfc4', b: '#6e4a2a', B: '#3b82f6',
}

const ICONS: Record<IconName, string[]> = {
  chart: ['..........GG', '..........GG', '......YY..GG', '......YY..GG', '..RR..YY..GG', '..RR..YY..GG', '..RR..YY..GG', '..RR..YY..GG', 'kkkkkkkkkkkk'],
  heart: ['..RR...RR...', '.RrRR.RRRR..', '.RrRRRRRRR..', '.RRRRRRRRR..', '..RRRRRRR...', '...RRRRR....', '....RRR.....', '.....R......'],
  window: ['WWWWWWWWWWWW', 'WRWYWGWWWWWW', 'WWWWWWWWWWWW', 'Wkkkkkkkkkkk', 'WkccccCkkkkW', 'WkkkkkkkkkkW', 'WkCccckkkkkW', 'WkkkkkkkkkkW', 'WWWWWWWWWWWW'],
  bot: ['.....Y......', '.....W......', '..WWWWWWW...', '.WWWWWWWWW..', '.WWcWWWcWW..', '.WWWWWWWWW..', '.WWWkkkWWW..', '..WWWWWWW...', '...W...W....'],
  trophy: ['..YYYYYYYY..', 'Y.YyYYYYYY.Y', 'Y.YyYYYYYY.Y', '.YYyYYYYYYY.', '...YYYYYY...', '....YYYY....', '.....YY.....', '...bbbbbb...', '...bbbbbb...'],
  scroll: ['..pppppppp..', '..pkkkkkpp..', '..pppppppp..', '..pkkkkp.p..', '..pppppppp..', '..pkkkkkkp..', '..pppppppp..', '..pkkkp.pp..', '..pppppppp..'],
  database: ['...CCCCCC...', '..CccccccC..', '..CCCCCCCC..', '..CccccccC..', '..CCCCCCCC..', '..CccccccC..', '...CCCCCC...'],
  check: ['..........G.', '.........GG.', '........GG..', '.G.....GG...', '.GG...GG....', '..GG.GG.....', '...GGG......', '....G.......'],
  pickaxe: ['..CCCCCCCC..', '.CCc.ww.cCC.', 'C....ww....C', '.....ww.....', '.....ww.....', '.....ww.....', '.....ww.....', '.....ww.....'],
  star: ['.....Y.....', '....YyY....', 'YYYYYyYYYYY', '.YYYYYYYYY.', '..YYYYYYY..', '..YYY.YYY..', '.YY.....YY.'],
}

export default function PixelIcon({ name, size = 24, className = '' }: { name: IconName; size?: number; className?: string }) {
  const rows = ICONS[name]
  const w = Math.max(...rows.map((r) => r.length))
  const h = rows.length
  const s = Math.max(w, h) // kanvas persegi agar semua ikon sejajar
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-(s - w) / 2} ${-(s - h) / 2} ${s} ${s}`}
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          PALETTE[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PALETTE[ch]} /> : null,
        ),
      )}
    </svg>
  )
}

// Pedang pixel untuk hover menu (desain sendiri)
export function PixelSword({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden className={className}>
      <path fill="#1d3b3a" d="M13 1h2v1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H9V8H8V7h1V6h1V5h1V4h1V3h1z" />
      <path fill="#4fe0d0" d="M13 2h1v1h1v1h-1v1h-1v1h-1v1h-1v1h-1v1H9V8h1V7h1V6h1V5h1V4h1V3h-1z" />
      <path fill="#c9fff8" d="M13 2h1v1h-1v1h-1v1h-1v1h-1v1H9V6h1V5h1V4h1V3h1z" />
      <path fill="#2c2c2c" d="M3 8h2v1h1v1h1v1h1v1h1v2H8v-1H7v-1H6v-1H5v-1H4V9H3z" />
      <path fill="#7a5531" d="M6 11h1v1H6v1H5v1H4v1H2v-2h1v-1h1v-1h1v-1h1z" />
      <path fill="#4b3320" d="M1 14h2v2H1z" />
    </svg>
  )
}
