import { useId } from 'react'
import { Frog } from './Frog'

/**
 * The brand's namesake: a chibi frog sitting on top of a laser-cut,
 * press-brake-formed sheet-metal hat bracket, with a couple of laser-cut
 * slugs on the ground nearby.
 *
 * The bracket is modelled as a 2D cross-section (u = across, h = up) with real
 * inside/outside bend radii, extruded along v and projected isometrically, so
 * the bends pick up light the way formed metal does.
 */

type Pt = readonly [number, number]

const OX = 166 // screen position of the bracket's front-left-bottom corner
const OY = 352
const DEPTH = 100 // extrusion length along v
const LEG_U = 28 // outside face of the left leg

const project = (u: number, v: number, h: number): Pt => [OX + 1.4 * (u - v), OY - 0.6 * (u + v) - h]
const toPoints = (pts: Pt[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/** Points along a circular arc in the (u, h) profile plane, angles in degrees. */
function arc(cu: number, ch: number, r: number, from: number, to: number, steps: number): Pt[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180
    return [cu + r * Math.cos(a), ch + r * Math.sin(a)] as const
  })
}

// 6-unit sheet; bends have a 3-unit inside radius and 9-unit outside radius.
// Outer (top) surface, left foot → left leg → web → right leg → right foot.
const outer: Pt[] = [
  [0, 6],
  ...arc(25, 9, 3, -90, 0, 3),
  ...arc(37, 67, 9, 180, 90, 6),
  ...arc(83, 67, 9, 90, 0, 6),
  ...arc(95, 9, 3, 180, 270, 3),
  [120, 6],
]
// Inner (underside) surface, same order.
const inner: Pt[] = [
  [0, 0],
  ...arc(25, 9, 9, -90, 0, 6),
  ...arc(37, 67, 3, 180, 90, 3),
  ...arc(83, 67, 3, 90, 0, 3),
  ...arc(95, 9, 9, 180, 270, 6),
  [120, 0],
]

interface Face {
  points: string
  fill: string
  depth: number
}

const LIGHT: Pt = [-0.45, 0.89] // from the upper left, in the profile plane
const metal = (lightness: number) => `hsl(204 10% ${lightness.toFixed(1)}%)`

/**
 * Turns each segment of a profile chain into an extruded quad, dropping faces
 * that point away from the viewer. `side` is +1 for the top surface (normal on
 * the left of travel) and -1 for the underside (normal on the right).
 */
function extrude(chain: Pt[], side: 1 | -1, shadowed: boolean): Face[] {
  const faces: Face[] = []
  for (let i = 0; i < chain.length - 1; i++) {
    const [au, ah] = chain[i]
    const [bu, bh] = chain[i + 1]
    const len = Math.hypot(bu - au, bh - ah)
    if (len < 1e-6) continue
    const nu = (-(bh - ah) * side) / len
    const nh = ((bu - au) * side) / len
    // view direction (toward the viewer) is (-1, -1, 1.2) in (u, v, h)
    if (-nu + 1.2 * nh <= 0.01) continue
    const lit = nu * LIGHT[0] + nh * LIGHT[1]
    faces.push({
      points: toPoints([project(au, 0, ah), project(bu, 0, bh), project(bu, DEPTH, bh), project(au, DEPTH, ah)]),
      fill: metal(shadowed ? 30 + 12 * lit : 50 + 42 * lit),
      depth: -(au + bu) / 2 + (1.2 * (ah + bh)) / 2,
    })
  }
  return faces
}

const leftEdge: Face = {
  points: toPoints([project(0, 0, 0), project(0, 0, 6), project(0, DEPTH, 6), project(0, DEPTH, 0)]),
  fill: metal(50 + 42 * 0.45),
  depth: 3.6,
}

// Painter's order: far faces first.
const faces = [...extrude(outer, 1, false), ...extrude(inner, -1, true), leftEdge].sort((a, b) => a.depth - b.depth)

const endFace = toPoints([...outer, ...[...inner].reverse()].map(([u, h]) => project(u, 0, h)))
const channelFloor = toPoints([project(34, 0, 0), project(86, 0, 0), project(86, DEPTH, 0), project(34, DEPTH, 0)])

// Specular glint running along the bend between the left leg and the web.
const glintA = project(37 - 6.36, 0, 67 + 6.36)
const glintB = project(37 - 6.36, DEPTH, 67 + 6.36)

// Affine maps from a face's own 2D coordinates to the screen, for drawing round holes.
const footPlane = `matrix(1.4 -0.6 -1.4 -0.6 ${OX} ${OY - 6})` // x = u, y = v
const legPlane = `matrix(-1.4 -0.6 0 -1 ${OX + 1.4 * LEG_U} ${OY - 0.6 * LEG_U})` // x = v, y = h
const groundAt = (x: number, y: number) => `matrix(1.4 -0.6 -1.4 -0.6 ${x} ${y})`

const HOLE = '#2f363b'
const HOLE_RIM = '#5c666e'

export function HeroMascot({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `${name}-${uid}`

  return (
    <svg viewBox="0 0 360 380" xmlns="http://www.w3.org/2000/svg" role="img" className={className}>
      <title>Frog On Top mascot sitting on a bent sheet-metal bracket</title>
      <defs>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#13261b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#13261b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="180" cy="314" rx="178" ry="44" fill={`url(#${id('shadow')})`} />

      {/* shade on the ground inside the channel */}
      <polygon points={channelFloor} fill="#13261b" opacity="0.35" />

      {/* outline pass: a fat stroke under the fills leaves only the silhouette */}
      <g fill="#4a545b" stroke="#4a545b" strokeWidth="3" strokeLinejoin="round" opacity="0.6">
        {faces.map((f, i) => (
          <polygon key={i} points={f.points} />
        ))}
        <polygon points={endFace} />
      </g>

      {/* bracket surfaces */}
      <g strokeWidth="0.8" strokeLinejoin="round">
        {faces.map((f, i) => (
          <polygon key={i} points={f.points} fill={f.fill} stroke={f.fill} />
        ))}
      </g>

      {/* laser-cut edge of the sheet */}
      <polygon points={endFace} fill="#8e9aa2" stroke="#4a545b" strokeWidth="1.5" strokeLinejoin="round" />

      {/* bend highlight */}
      <line x1={glintA[0]} y1={glintA[1]} x2={glintB[0]} y2={glintB[1]} stroke="#fff" strokeWidth="1.6" opacity="0.7" />

      {/* mounting holes in the left foot */}
      <g transform={footPlane} fill={HOLE} stroke={HOLE_RIM}>
        {[22, 78].map((v) => (
          <circle key={v} cx="12.5" cy={v} r="4.5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* laser-cut holes and slot in the left leg */}
      <g transform={legPlane} fill={HOLE} stroke={HOLE_RIM}>
        <circle cx="18" cy="40" r="4" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <rect x="32" y="36" width="36" height="8" rx="4" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <circle cx="82" cy="40" r="4" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </g>

      {/* laser-cut slugs left over from the holes */}
      {[
        [40, 334],
        [312, 330],
        [292, 348],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle transform={groundAt(x, y + 2.5)} r="4.2" fill="#6f7a82" />
          <circle
            transform={groundAt(x, y)}
            r="4.2"
            fill="#c3ccd2"
            stroke="#6f7a82"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {/* the frog, on top */}
      <ellipse cx="180" cy="219" rx="64" ry="11" fill="#13261b" opacity="0.14" />
      <Frog x="80" y="26" width="200" height="200" accessories={['goggles']} shadow={false} />
    </svg>
  )
}
