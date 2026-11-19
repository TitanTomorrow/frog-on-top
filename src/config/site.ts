/**
 * All business details and page copy live here so they can be edited in one place.
 * Values marked "PLACEHOLDER" should be replaced with real information before launch.
 */

export const site = {
  name: 'Frog On Top',
  domain: 'frogon.top',
  url: 'https://frogon.top',
  tagline: 'Precision CNC machining in metal & plastic',
  description:
    'Frog On Top machines precise metal and plastic parts — from one-off prototypes to production runs — with clear quotes and careful inspection.',
  email: 'hello@frogon.top', // PLACEHOLDER — confirm this inbox exists
  phone: '(555) 010-0100', // PLACEHOLDER
  location: 'Your City, State', // PLACEHOLDER
  hours: 'Mon–Fri · 8am–5pm', // PLACEHOLDER
} as const

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Materials', href: '#materials' },
  { label: 'Process', href: '#process' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
] as const

export type ServiceIcon = 'mill' | 'lathe' | 'plastic' | 'prototype' | 'finish' | 'inspect'

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
  points: string[]
}

export const services: Service[] = [
  {
    icon: 'mill',
    title: 'CNC Milling',
    description: 'Prismatic parts cut from solid stock — housings, brackets, plates, fixtures and enclosures.',
    points: ['Pockets, profiles, slots & threads', 'Tight-tolerance bores', 'Engraving & part marking'],
  },
  {
    icon: 'lathe',
    title: 'CNC Turning',
    description: 'Round parts with concentric features — shafts, bushings, spacers, pins and fittings.',
    points: ['OD / ID turning & facing', 'Threads, grooves & knurls', 'Concentricity-critical work'],
  },
  {
    icon: 'plastic',
    title: 'Plastic Machining',
    description: 'Engineering plastics cut cool and clean — crisp edges, no melting, no stress cracks.',
    points: ['Delrin, nylon, PEEK & UHMW', 'Clear acrylic & polycarbonate', 'Low-stress fixturing'],
  },
  {
    icon: 'prototype',
    title: 'Prototypes & Short Runs',
    description: 'From a single proof-of-concept part to small production batches, without tooling costs.',
    points: ['One-off prototypes', 'Batch & repeat orders', 'Design-for-manufacturing feedback'],
  },
  {
    icon: 'finish',
    title: 'Finishing & Secondary Ops',
    description: 'Parts that arrive ready to use, not ready for more work.',
    points: ['Deburring & edge breaks', 'Bead blast & brushed finishes', 'Tapping & threaded inserts'],
  },
  {
    icon: 'inspect',
    title: 'Quality Inspection',
    description: 'Every part is checked against your drawing before it leaves the shop.',
    points: ['Calibrated measuring tools', 'First-article reports on request', 'Careful, protective packing'],
  },
]

export const materials = {
  metals: [
    'Aluminum 6061',
    'Aluminum 7075',
    'Mild steel 1018',
    'Stainless 303 / 304',
    'Stainless 316',
    'Brass 360',
    'Copper 110',
    'Tool steel (on request)',
  ],
  plastics: [
    'Delrin / Acetal',
    'Nylon 6/6',
    'PEEK',
    'UHMW-PE',
    'HDPE',
    'PTFE (Teflon)',
    'Acrylic (PMMA)',
    'Polycarbonate',
  ],
} as const

export type StepFrog = 'wave' | 'calipers' | 'machine' | 'box'

export const steps: { title: string; description: string; frog: StepFrog }[] = [
  {
    title: 'Send your drawing',
    description: 'Share a STEP, IGES or PDF drawing along with quantity, material and finish.',
    frog: 'wave',
  },
  {
    title: 'Get a clear quote',
    description: 'We review it for manufacturability and send a straightforward quote — usually within 1–2 business days.',
    frog: 'calipers',
  },
  {
    title: 'Machine & inspect',
    description: 'Your parts are programmed, cut and measured against your drawing.',
    frog: 'machine',
  },
  {
    title: 'Packed & shipped',
    description: 'Deburred, cleaned, carefully packed and on their way to you.',
    frog: 'box',
  },
]

// PLACEHOLDER figures — replace with your shop's real capabilities.
export const stats = [
  { value: '±0.001″', label: 'Typical tolerance on critical features' },
  { value: '5–10', label: 'Business days standard lead time' },
  { value: '1–1,000', label: 'Parts per order, prototype to production' },
  { value: '100%', label: 'Of parts inspected before shipping' },
] as const

export const values = [
  {
    title: 'Precision you can measure',
    description: 'We hold the tolerances on your drawing and tell you up front if a feature will be a challenge.',
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
