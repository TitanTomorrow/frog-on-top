/**
 * All business details and page copy live here so they can be edited in one place.
 * Values marked "PLACEHOLDER" should be replaced with real information before launch.
 */

export const site = {
  name: 'Frog On Top',
  domain: 'frogon.top',
  url: 'https://titantomorrow.github.io/frog-on-top/',
  tagline: 'CNC laser cutting, bending & robotic welding',
  description:
    'Frog On Top laser-cuts, CNC-bends and robot-welds metal parts for prototypes and small runs of up to five — with clear quotes and careful inspection.',
  email: 'hello@frogon.top', // PLACEHOLDER — confirm this inbox exists
  phone: '(555) 010-0100', // PLACEHOLDER
  location: 'Your City, State', // PLACEHOLDER
  hours: 'Mon–Fri · 8am–5pm', // PLACEHOLDER
} as const

/** Sheet thickness each process can handle. */
export const thickness = {
  laser: 'up to 6 mm (1/4″)',
  bend: 'up to 3 mm (1/8″)',
  weld: '0.5–3 mm (0.020″–1/8″)',
} as const

/** Largest part each process can handle. */
export const maxSize = {
  laser: '600 × 600 mm (24″ × 24″)',
  bend: '840 mm (33″) wide',
} as const

/** Capacity of the CNC press brake, in tons. */
export const pressBrakeTons = 25

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Materials', href: '#materials' },
  { label: 'Process', href: '#process' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
] as const

export type ServiceIcon = 'laser' | 'bend' | 'weld' | 'prototype' | 'finish' | 'inspect'

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
  points: string[]
}

export const services: Service[] = [
  {
    icon: 'laser',
    title: 'CNC Laser Cutting',
    description: `Flat profiles ${thickness.laser} thick, cut straight from your DXF — brackets, plates, panels and gussets.`,
    points: ['Compressed-air cutting as standard', 'Nitrogen cutting available for oxide-free edges', `Parts up to ${maxSize.laser}`],
  },
  {
    icon: 'bend',
    title: 'CNC Bending',
    description: `Computer-controlled forming on our ${pressBrakeTons}-ton CNC press brake — sheet ${thickness.bend} thick into brackets, channels, boxes and enclosures.`,
    points: [`${pressBrakeTons}-ton CNC press brake`, 'Programmed, repeatable bend angles', `Parts up to ${maxSize.bend}`],
  },
  {
    icon: 'weld',
    title: 'Robotic Welding',
    description: `Welded by a programmed robotic arm — sheet ${thickness.weld} thick, joined into strong assemblies.`,
    points: ['CNC robotic-arm welding', 'Consistent, repeatable welds', 'Frames, brackets & assemblies'],
  },
  {
    icon: 'prototype',
    title: 'Prototypes & Small Runs',
    description: 'Built for prototyping — a single part or a small run of up to five, with no tooling costs.',
    points: ['One-off prototypes', 'Runs of 5 parts or fewer', 'Design-for-manufacturing feedback'],
  },
  {
    icon: 'finish',
    title: 'Post-Processing',
    description: 'Parts arrive clean, smooth and safe to handle.',
    points: ['Deburring', 'Bead blasting', 'Vibratory tumbling'],
  },
  {
    icon: 'inspect',
    title: 'Quality Inspection',
    description: 'Every part is checked against your DXF before it leaves the shop.',
    points: ['Calibrated measuring tools', 'First-article reports on request', 'Careful, protective packing'],
  },
]

export const materials = [
  'Mild steel',
  'Stainless 304',
  'Stainless 316',
  'Aluminum 5052',
  'Aluminum 6061',
] as const

export type StepFrog = 'wave' | 'calipers' | 'machine' | 'box'

export const steps: { title: string; description: string; frog: StepFrog }[] = [
  {
    title: 'Send your DXF',
    description: 'Share your DXF files with quantity (1–5), material, thickness and finish.',
    frog: 'wave',
  },
  {
    title: 'Get a clear quote',
    description: 'We review it for manufacturability and send a straightforward quote — usually within 1–2 business days.',
    frog: 'calipers',
  },
  {
    title: 'Cut, bend & weld',
    description: 'Your parts are laser-cut, CNC-bent, robot-welded and measured against your DXF.',
    frog: 'machine',
  },
  {
    title: 'Packed & shipped',
    description: 'Deburred, blasted or tumbled, carefully packed and on their way to you.',
    frog: 'box',
  },
]

// PLACEHOLDER figures — replace with your shop's real capabilities.
export const stats = [
  { value: '±0.005″', label: 'Typical laser-cut tolerance' },
  { value: '5–10', label: 'Business days standard lead time' },
  { value: '1–5', label: 'Parts per order — prototypes & small runs' },
  { value: '100%', label: 'Of parts inspected before shipping' },
] as const

export const values = [
  {
    title: 'Precision you can measure',
    description: 'We hold the tolerances you specify and tell you up front if a feature will be a challenge.',
  },
  {
    title: 'Straight answers, fast',
    description: 'Real people reply to quotes and questions — no portals, no runaround.',
  },
  {
    title: 'Care in every part',
    description: 'Clean edges, protected surfaces and packaging that gets parts to you in the condition they left.',
  },
] as const
