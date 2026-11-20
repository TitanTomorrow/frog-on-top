import { site, stats, values } from '../../config/site'
import { CheckIcon } from '../../graphics/icons'
import { SectionHeading } from '../ui/SectionHeading'

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="scroll-mt-16 bg-fern-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow={`Why ${site.name}`}
            title="A small shop that sweats the details"
            description="You get the attention of a dedicated fabricator and the consistency of a well-run process."
          />
          <ul className="mt-10 space-y-6">
            {values.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss-600 text-mist-50">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-forest-900">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-900/70">{v.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:gap-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col rounded-2xl border border-forest-900/8 bg-mist-50 p-5 shadow-sm shadow-forest-900/5 sm:p-7">
              <dt className="text-sm leading-snug text-forest-900/65">{s.label}</dt>
              <dd className="order-first mb-3 font-display text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
