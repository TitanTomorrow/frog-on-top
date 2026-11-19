import { useId } from 'react'
import { Frog } from './Frog'

/**
 * The brand's namesake: a chibi frog sitting on top of a freshly
 * face-milled aluminum block, with a few chips of swarf nearby.
 */
export function HeroMascot({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `${name}-${uid}`

  const top = '180,180 320,240 180,300 40,240'
  const left = '40,240 180,300 180,356 40,296'
  const right = '180,300 320,240 320,296 180,356'

  return (
    <svg
      viewBox="0 0 360 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >
      <title>Frog On Top mascot sitting on a machined aluminum block</title>
      <defs>
        <linearGradient id={id('top')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f4f6" />
          <stop offset="1" stopColor="#c0c9cf" />
        </linearGradient>
        <linearGradient id={id('left')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b7c0c7" />
          <stop offset="1" stopColor="#959fa7" />
        </linearGradient>
        <linearGradient id={id('right')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#87939b" />
          <stop offset="1" stopColor="#a3aeb5" />
        </linearGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#13261b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#13261b" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id('topClip')}>
          <polygon points={top} />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="186" cy="344" rx="176" ry="30" fill={`url(#${id('shadow')})`} />

      {/* block */}
      <polygon points={left} fill={`url(#${id('left')})`} />
      <polygon points={right} fill={`url(#${id('right')})`} />
      <polygon points={top} fill={`url(#${id('top')})`} />

      {/* face-milling swirl marks */}
      <g clipPath={`url(#${id('topClip')})`} fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.35">
        {[40, 70, 100, 130, 160, 190].map((r) => (
          <ellipse key={r} cx="130" cy="262" rx={r} ry={r * 0.43} />
        ))}
      </g>

      {/* chamfered edge highlights */}
      <path d="M40 240 L180 300 L320 240" fill="none" stroke="#fff" strokeWidth="2" opacity="0.75" />
      <path d="M180 300 V356" stroke="#fff" strokeWidth="1.2" opacity="0.4" />
      <path
        d="M40 240 L180 180 L320 240 L320 296 L180 356 L40 296 Z"
        fill="none"
        stroke="#4a545b"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {/* machined pocket on left face */}
      <polygon points="70,265 140,295 140,320 70,290" fill="#7f8a92" opacity="0.55" />
      <polygon points="70,265 140,295 140,299 70,269" fill="#5f6a72" opacity="0.5" />

      {/* drilled holes on top face */}
      {[
        [96, 240],
        [264, 240],
        [180, 282],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <ellipse cx={cx} cy={cy} rx="10.5" ry="4.6" fill="#5c666e" />
          <ellipse cx={cx} cy={cy + 1} rx="7.5" ry="3" fill="#2f363b" />
        </g>
      ))}

      {/* aluminum chips */}
      <g fill="none" stroke="#a9b3ba" strokeWidth="2.4" strokeLinecap="round">
        <path d="M22 326 c6 -9 18 -6 15 4 c-3 8 -14 5 -11 -3" />
        <path d="M318 336 c7 -7 17 -2 13 7 c-4 7 -13 2 -9 -4" />
        <path d="M292 352 c5 -6 13 -3 10 4" />
      </g>

      {/* the frog, on top */}
      <ellipse cx="180" cy="249" rx="64" ry="11" fill="#13261b" opacity="0.14" />
      <Frog x="80" y="56" width="200" height="200" accessories={['goggles']} shadow={false} />
    </svg>
  )
}
