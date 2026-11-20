import { materials, pressBrakeTons, thickness } from '../../config/site'
import { PineRidge } from '../../graphics/ForestBackground'
import { SectionHeading } from '../ui/SectionHeading'

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
          title="Sheet metal, cut to spec"
          description="We work in common sheet metals that cut cleanly, bend predictably and weld well. Have something specific in mind? Just ask."
        />

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-mist-100/10 bg-forest-800/60 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-steel-300" aria-hidden="true" />
            <h3 className="text-2xl font-semibold text-mist-50">Metals</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-mist-100/70">
            Strong, weldable and formable — for brackets, panels, enclosures and frames.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {materials.map((m) => (
              <li
                key={m}
                className="rounded-full border border-steel-400/30 bg-steel-200/10 px-3.5 py-1.5 text-sm font-medium text-steel-200"
              >
                {m}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 font-sans text-xs font-semibold tracking-[0.18em] text-fern-300 uppercase">
            Sheet thickness
          </h4>
          <dl className="mt-3 divide-y divide-mist-100/10 text-sm">
            {[
              ['CNC laser cutting', thickness.laser],
              [`CNC bending (${pressBrakeTons}-ton press brake)`, thickness.bend],
              ['Robotic welding', thickness.weld],
            ].map(([process, range]) => (
              <div key={process} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-mist-100/70">{process}</dt>
                <dd className="text-right font-medium text-mist-50">{range}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-8 text-center text-sm text-mist-100/60">
          Don’t see your material? <a href="#contact" className="font-medium text-honey-300 underline-offset-4 hover:underline">Tell us what you need</a> — we can usually source it.
        </p>
      </div>
    </section>
  )
}
