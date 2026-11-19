import { services } from '../../config/site'
import { CheckIcon, ServiceGlyph } from '../../graphics/icons'
import { SectionHeading } from '../ui/SectionHeading'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Everything your part needs, under one roof"
          description="From the first chip to final inspection, we handle the details so your parts fit, function and look right."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.title}
              className="group flex flex-col rounded-2xl border border-forest-900/8 bg-mist-50 p-6 shadow-sm shadow-forest-900/5 transition-shadow hover:shadow-md hover:shadow-forest-900/8 sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fern-100 text-moss-600 transition-colors group-hover:bg-fern-200">
                <ServiceGlyph name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-forest-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/70">{s.description}</p>
              <ul className="mt-5 space-y-2 border-t border-forest-900/8 pt-5 text-sm text-forest-900/80">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
