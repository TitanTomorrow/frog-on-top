/**
 * All business details and page copy live here so they can be edited in one place.
 * Values marked "PLACEHOLDER" should be replaced with real information before launch.
 */

export const site = {
  name: 'Frog On Top',
  domain: 'frogon.top',
  url: 'https://titantomorrow.github.io/frog-on-top/',
  tagline: 'CNC laser cutting, bending & welding',
  description:
    'Frog On Top laser-cuts, bends and welds metal parts for prototypes and small runs of up to five — with clear quotes and careful inspection.',
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
    description: 'Flat profiles cut straight from your drawing — brackets, plates, panels and gussets.',
    points: ['Complex profiles & cutouts', 'Holes, slots & tabs', 'Cut from DXF, STEP or PDF'],
  },
  {
    icon: 'bend',
    title: 'CNC Bending',
    description: 'Press-brake forming that turns flat blanks into brackets, channels, boxes and enclosures.',
    points: ['Accurate, repeatable angles', 'Flanges, channels & U-bends', 'Flat patterns checked before cutting'],
  },
  {
    icon: 'weld',
    title: 'CNC Welding',
    description: 'Automated welding that joins cut and formed parts into strong, consistent assemblies.',
    points: ['Consistent, repeatable welds', 'Seams, joints & corners', 'Frames, brackets & assemblies'],
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
    description: 'Every part is checked against your drawing before it leaves the shop.',
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
    title: 'Send your drawing',
    description: 'Share a DXF, STEP or PDF drawing along with quantity (1–5), material, thickness and finish.',
    frog: 'wave',
  },
  {
    title: 'Get a clear quote',
    description: 'We review it for manufacturability and send a straightforward quote — usually within 1–2 business days.',
    frog: 'calipers',
  },
  {
    title: 'Cut, bend & weld',
    description: 'Your parts are laser-cut, formed, welded and measured against your drawing.',
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
