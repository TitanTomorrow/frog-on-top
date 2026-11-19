import type { SVGProps } from 'react'

export type FrogAccessory = 'goggles' | 'calipers' | 'endmill' | 'box'

export interface FrogProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  accessories?: FrogAccessory[]
  /** Raise the right arm in a friendly wave. */
  waving?: boolean
  /** Blink + gentle bob. Automatically disabled for reduced-motion users. */
  animated?: boolean
  /** Soft ground shadow under the frog. */
  shadow?: boolean
  /** Accessible label. Omit for purely decorative frogs. */
  title?: string
}

const C = {
  outline: '#2c4f2a',
  skin: '#76b35f',
  skinShade: '#5e9a4c',
  belly: '#eef3cb',
  cheek: '#f2998f',
  pupil: '#1d2a21',
  steel: '#c3ccd2',
  steelDark: '#6b7780',
  steelEdge: '#4a545b',
}

/**
 * Chibi frog mascot, drawn on a 200×200 grid.
 * Silhouette technique: all body shapes are first drawn as a thick outline layer,
 * then filled on top — giving one clean "sticker" outline around the whole frog.
 */
export function Frog({
  accessories = [],
  waving = false,
  animated = true,
  shadow = true,
  title,
  ...svgProps
}: FrogProps) {
  const has = (a: FrogAccessory) => accessories.includes(a)
  const holdingBox = has('box')

  // Arms change shape depending on what the frog is doing.
  const leftArm = holdingBox ? (
    <ellipse cx="74" cy="162" rx="9" ry="14" transform="rotate(-35 74 162)" />
  ) : (
    <ellipse cx="62" cy="160" rx="9" ry="15" transform="rotate(20 62 160)" />
  )
  const rightArm = holdingBox ? (
    <ellipse cx="126" cy="162" rx="9" ry="14" transform="rotate(35 126 162)" />
  ) : (
    <ellipse cx="138" cy="160" rx="9" ry="15" transform="rotate(-20 138 160)" />
  )
  const waveArm = (
    <>
      <ellipse cx="160" cy="134" rx="8" ry="21" transform="rotate(51 160 134)" />
      <circle cx="180" cy="117" r="9.5" />
    </>
  )

  const legs = (
    <>
      <ellipse cx="60" cy="172" rx="22" ry="15" />
      <ellipse cx="140" cy="172" rx="22" ry="15" />
    </>
  )
  const feet = (
    <>
      <ellipse cx="76" cy="189" rx="15" ry="6.5" />
      <ellipse cx="124" cy="189" rx="15" ry="6.5" />
    </>
  )
  const body = <ellipse cx="100" cy="160" rx="48" ry="32" />
  const head = (
    <>
      <circle cx="64" cy="62" r="27" />
      <circle cx="136" cy="62" r="27" />
      <ellipse cx="100" cy="102" rx="70" ry="47" />
    </>
  )

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...svgProps}
    >
      {title && <title>{title}</title>}

      {shadow && <ellipse cx="100" cy="194" rx="60" ry="5" fill="#000" opacity="0.12" />}

      <g className={animated ? 'frog-bob' : undefined}>
        {/* Outline layer */}
        <g fill={C.outline} stroke={C.outline} strokeWidth="7" strokeLinejoin="round">
          {legs}
          {body}
          {feet}
          {head}
        </g>

        {/* Fill layer */}
        <g fill={C.skinShade}>{legs}</g>
        <g fill={C.skin}>{body}</g>
        <ellipse cx="100" cy="168" rx="30" ry="20" fill={C.belly} />
        <g fill={C.skin} stroke={C.outline} strokeWidth="2.5">
          {feet}
        </g>
        {/* toe lines */}
        <g stroke={C.outline} strokeWidth="1.8" strokeLinecap="round" opacity="0.55">
          <path d="M70 186v5M78 186v5M118 186v5M126 186v5" />
        </g>

        {/* Held tools: in front of the body, behind the head and hands */}
        {has('endmill') && <EndMill />}
        {has('calipers') && <Calipers />}

        {waving && (
          <g className={animated ? 'frog-wave' : undefined}>
            <g fill={C.outline} stroke={C.outline} strokeWidth="6">
              {waveArm}
            </g>
            <g fill={C.skin}>{waveArm}</g>
          </g>
        )}

        <g fill={C.skin}>{head}</g>
        {/* chin shadow + head highlight */}
        <ellipse cx="100" cy="142" rx="44" ry="6" fill={C.skinShade} opacity="0.45" />
        <ellipse cx="74" cy="84" rx="18" ry="7" fill="#fff" opacity="0.18" transform="rotate(-14 74 84)" />

        {/* Eyes */}
        <g className={animated ? 'frog-blink' : undefined}>
          <circle cx="64" cy="62" r="19" fill="#fff" />
          <circle cx="136" cy="62" r="19" fill="#fff" />
          <circle cx="67" cy="65" r="11.5" fill={C.pupil} />
          <circle cx="133" cy="65" r="11.5" fill={C.pupil} />
          <circle cx="71.5" cy="60" r="4.2" fill="#fff" />
          <circle cx="137.5" cy="60" r="4.2" fill="#fff" />
          <circle cx="63" cy="70" r="1.8" fill="#fff" opacity="0.9" />
          <circle cx="129" cy="70" r="1.8" fill="#fff" opacity="0.9" />
        </g>

        {/* Face */}
        <ellipse cx="45" cy="112" rx="11" ry="6.5" fill={C.cheek} opacity="0.55" />
        <ellipse cx="155" cy="112" rx="11" ry="6.5" fill={C.cheek} opacity="0.55" />
        <circle cx="94" cy="98" r="1.7" fill={C.outline} opacity="0.55" />
        <circle cx="106" cy="98" r="1.7" fill={C.outline} opacity="0.55" />
        <path
          d="M86 111 Q100 124 114 111"
          fill="none"
          stroke={C.outline}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {has('goggles') && <Goggles />}
        {holdingBox && <Box />}

        {/* Arms (in front of body and held items) */}
        <g fill={C.skin} stroke={C.outline} strokeWidth="2.5">
          {leftArm}
          {!waving && rightArm}
        </g>
      </g>
    </svg>
  )
}

function Goggles() {
  return (
    <g>
      {/* strap */}
      <path d="M40 66 Q32 76 31 90" fill="none" stroke="#3b4247" strokeWidth="6" strokeLinecap="round" />
      <path d="M160 66 Q168 76 169 90" fill="none" stroke="#3b4247" strokeWidth="6" strokeLinecap="round" />
      {/* bridge */}
      <path d="M86 60 Q100 52 114 60" fill="none" stroke="#3b4247" strokeWidth="5" strokeLinecap="round" />
      {/* lenses */}
      <circle cx="64" cy="62" r="23" fill="#bfe4f2" fillOpacity="0.28" stroke="#3b4247" strokeWidth="5" />
      <circle cx="136" cy="62" r="23" fill="#bfe4f2" fillOpacity="0.28" stroke="#3b4247" strokeWidth="5" />
      <path d="M50 52 Q56 45 64 44" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M122 52 Q128 45 136 44" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </g>
  )
}

function Calipers() {
  return (
    <g stroke={C.steelEdge} strokeWidth="2" strokeLinejoin="round">
      {/* beam */}
      <rect x="112" y="150" width="76" height="8" rx="1.5" fill={C.steel} />
      <path d="M118 154h64" stroke={C.steelDark} strokeWidth="1" strokeDasharray="1.5 3" />
      {/* fixed jaw */}
      <path d="M180 150v28l6 6v-34z" fill={C.steel} />
      <path d="M180 150v-12l4 -4v16z" fill={C.steel} />
      {/* sliding jaw with dial body */}
      <path d="M154 146h12v12h-4v20l-6 6v-26h-2z" fill={C.steel} />
      <rect x="150" y="143" width="20" height="10" rx="2" fill="#e7ebee" />
      <circle cx="160" cy="148" r="3" fill="#2f363b" stroke="none" />
    </g>
  )
}

function EndMill() {
  return (
    <g stroke={C.steelEdge} strokeWidth="2" strokeLinejoin="round">
      {/* shank */}
      <rect x="44" y="112" width="13" height="38" rx="2" fill={C.steel} />
      {/* fluted cutting end */}
      <path d="M45 150h11v30l-5.5 5-5.5-5z" fill="#d8dee2" />
      <path
        d="M45 156l11 -5M45 164l11 -5M45 172l11 -5M45 180l11 -5"
        stroke={C.steelDark}
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M47 116v30" stroke="#fff" strokeWidth="2" opacity="0.7" />
    </g>
  )
}

function Box() {
  return (
    <g strokeLinejoin="round">
      <rect x="68" y="146" width="64" height="44" rx="3" fill="#c99b62" stroke="#7a5532" strokeWidth="2.5" />
      <path d="M68 156h64" stroke="#a87c45" strokeWidth="1.5" />
      <rect x="95" y="146" width="10" height="44" fill="#e9d29f" opacity="0.9" />
      <rect x="108" y="166" width="17" height="12" rx="1" fill="#fbfaf5" stroke="#7a5532" strokeWidth="1" />
      <path d="M111 170h11M111 174h7" stroke="#7a5532" strokeWidth="1" />
    </g>
  )
}

/** Simplified frog head used as the logo mark and favicon. */
export function FrogMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <g fill={C.outline} stroke={C.outline} strokeWidth="4" strokeLinejoin="round">
        <circle cx="19" cy="22" r="10" />
        <circle cx="45" cy="22" r="10" />
        <ellipse cx="32" cy="38" rx="25" ry="17" />
      </g>
      <g fill={C.skin}>
        <circle cx="19" cy="22" r="10" />
        <circle cx="45" cy="22" r="10" />
        <ellipse cx="32" cy="38" rx="25" ry="17" />
      </g>
      <circle cx="19" cy="22" r="7" fill="#fff" />
      <circle cx="45" cy="22" r="7" fill="#fff" />
      <circle cx="20" cy="23" r="4.2" fill={C.pupil} />
      <circle cx="44" cy="23" r="4.2" fill={C.pupil} />
      <circle cx="21.6" cy="21.2" r="1.5" fill="#fff" />
      <circle cx="45.6" cy="21.2" r="1.5" fill="#fff" />
      <ellipse cx="14" cy="40" rx="4" ry="2.4" fill={C.cheek} opacity="0.6" />
      <ellipse cx="50" cy="40" rx="4" ry="2.4" fill={C.cheek} opacity="0.6" />
      <path d="M26 41 Q32 46 38 41" fill="none" stroke={C.outline} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
