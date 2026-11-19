import { useId } from 'react'

/** Deterministic PRNG so the forest looks the same on every render/build. */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A three-tier pine silhouette with a short trunk. */
function pine(x: number, base: number, h: number, w: number) {
  let d = ''
  for (let i = 0; i < 3; i++) {
    const top = base - h + h * 0.25 * i
    const bottom = base - h * 0.62 + h * 0.25 * i
    const half = (w / 2) * (0.55 + 0.225 * i)
    d += `M${x.toFixed(1)} ${top.toFixed(1)}L${(x + half).toFixed(1)} ${bottom.toFixed(1)}L${(x - half).toFixed(1)} ${bottom.toFixed(1)}Z`
  }
  const tw = w * 0.07
  d += `M${(x - tw).toFixed(1)} ${(base - h * 0.14).toFixed(1)}h${(tw * 2).toFixed(1)}V${base}h${(-tw * 2).toFixed(1)}Z`
  return d
}

interface RowOptions {
  seed: number
  from: number
  to: number
  gap: [number, number]
  base: [number, number]
  height: [number, number]
}

function pineRow({ seed, from, to, gap, base, height }: RowOptions) {
  const rand = mulberry32(seed)
  const lerp = ([a, b]: [number, number]) => a + (b - a) * rand()
  let d = ''
  for (let x = from; x < to; x += lerp(gap)) {
    const h = lerp(height)
    d += pine(x, lerp(base), h, h * 0.52)
  }
  return d
}

// Pre-computed once at module load.
const farPines = pineRow({ seed: 7, from: -20, to: 1460, gap: [22, 48], base: [585, 605], height: [60, 110] })
const midPines = pineRow({ seed: 21, from: -40, to: 1480, gap: [40, 90], base: [680, 705], height: [110, 190] })
const nearLeft = pineRow({ seed: 3, from: -60, to: 230, gap: [60, 95], base: [905, 905], height: [220, 360] })
const nearRight = pineRow({ seed: 11, from: 1230, to: 1520, gap: [60, 95], base: [905, 905], height: [220, 360] })

const ridgePines = pineRow({ seed: 42, from: -20, to: 1460, gap: [18, 42], base: [92, 96], height: [34, 84] })

/** Thin treeline divider, filled with `currentColor`. Place at a section's top edge. */
export function PineRidge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 96"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={ridgePines} />
      <rect y="90" width="1440" height="6" />
    </svg>
  )
}

/**
 * Calm, layered forest scene used behind the hero.
 * Bottom-anchored and cropped (`slice`) so it always fills its container.
 */
export function ForestBackground({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `${name}-${uid}`
  const url = (name: string) => `url(#${id(name)})`

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d5e3d0" />
          <stop offset="0.55" stopColor="#ecefe2" />
          <stop offset="1" stopColor="#f3f1e7" />
        </linearGradient>
        <radialGradient id={id('sun')}>
          <stop offset="0" stopColor="#fff8e3" stopOpacity="1" />
          <stop offset="0.45" stopColor="#fbf1d2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fbf1d2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('ray')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbea" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fffbea" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('fog')}>
          <stop offset="0" stopColor="#f6f5ec" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f6f5ec" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('fogBand')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f1e7" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f3f1e7" stopOpacity="0.75" />
          <stop offset="1" stopColor="#f3f1e7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill={url('sky')} />
      <circle cx="1090" cy="230" r="300" fill={url('sun')} />

      {/* soft light rays */}
      <g opacity="0.35">
        <polygon points="1070,170 1110,170 860,900 700,900" fill={url('ray')} />
        <polygon points="1100,180 1125,180 1060,900 960,900" fill={url('ray')} />
        <polygon points="1050,180 1075,180 560,900 470,900" fill={url('ray')} />
      </g>

      {/* distant ridge + pines */}
      <path
        d="M0 560 C180 470 320 520 480 480 S800 420 980 470 S1260 430 1440 470 V900 H0Z"
        fill="#c6d6bc"
      />
      <path d={farPines} fill="#aac3a0" />

      {/* drifting fog */}
      <rect y="520" width="1440" height="160" fill={url('fogBand')} />
      <g className="fog-drift">
        <ellipse cx="300" cy="610" rx="360" ry="46" fill={url('fog')} />
        <ellipse cx="1000" cy="590" rx="420" ry="40" fill={url('fog')} />
      </g>

      {/* middle ridge + pines */}
      <path
        d="M0 655 C200 610 360 640 540 620 S900 580 1100 620 S1340 605 1440 615 V900H0Z"
        fill="#93b289"
      />
      <path d={midPines} fill="#729a6a" />

      <g className="fog-drift-slow">
        <ellipse cx="650" cy="715" rx="520" ry="48" fill={url('fog')} opacity="0.85" />
        <ellipse cx="80" cy="735" rx="300" ry="38" fill={url('fog')} opacity="0.7" />
        <ellipse cx="1360" cy="725" rx="320" ry="40" fill={url('fog')} opacity="0.7" />
      </g>

      {/* framing foreground pines */}
      <path d={nearLeft} fill="#3e6a47" />
      <path d={nearRight} fill="#3e6a47" />

      {/* soft meadow that blends into the page */}
      <path d="M0 790 C260 755 520 785 760 772 S1220 752 1440 778 V900H0Z" fill="#dfe8d3" />
      <path d="M0 835 C240 805 500 828 740 818 S1200 800 1440 826 V900H0Z" fill="#f3f1e7" />
    </svg>
  )
}
