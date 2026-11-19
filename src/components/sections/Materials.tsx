import { materials } from '../../config/site'
import { PineRidge } from '../../graphics/ForestBackground'
import { SectionHeading } from '../ui/SectionHeading'

const groups = [
  {
    title: 'Metals',
    note: 'Strong, conductive and heat-tolerant — for structural and functional parts.',
    items: materials.metals,
    chip: 'border-steel-400/30 bg-steel-200/10 text-steel-200',
    dot: 'bg-steel-300',
  },
  {
    title: 'Plastics',
    note: 'Light, insulating and low-friction — for wear parts, enclosures and clear covers.',
    items: materials.plastics,
    chip: 'border-fern-400/30 bg-fern-400/10 text-fern-200',
    dot: 'bg-fern-400',
  },
]

export function Materials() {
  return (
    <section
      id="materials"
      aria-labelledby="materials-title"
      className="relative mt-16 scroll-mt-16 bg-forest-900 py-20 sm:mt-20 sm:py-28"
    >
      <PineRidge className="absolute inset-x-0 bottom-full h-14 w-full text-forest-900 sm:h-20" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="materials-title"
          tone="dark"
          eyebrow="Materials"
          title="Metal and plastic, cut to spec"
          description="We stock and source a wide range of common engineering materials. Have something specific in mind? Just ask."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-mist-100/10 bg-forest-800/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${g.dot}`} aria-hidden="true" />
                <h3 className="text-2xl font-semibold text-mist-50">{g.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-mist-100/70">{g.note}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {g.items.map((m) => (
                  <li key={m} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${g.chip}`}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-mist-100/60">
          Don’t see your material? <a href="#contact" className="font-medium text-honey-300 underline-offset-4 hover:underline">Tell us what you need</a> — we can usually source it.
        </p>
      </div>
    </section>
  )
}
