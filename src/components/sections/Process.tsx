import { steps, type StepFrog } from '../../config/site'
import { Frog } from '../../graphics/Frog'
import { SectionHeading } from '../ui/SectionHeading'

function StepIllustration({ kind }: { kind: StepFrog }) {
  const cls = 'h-28 w-28'
  switch (kind) {
    case 'wave':
      return <Frog waving className={cls} />
    case 'calipers':
      return <Frog accessories={['calipers']} className={cls} />
    case 'machine':
      return <Frog accessories={['goggles', 'endmill']} className={cls} />
    case 'box':
      return <Frog accessories={['box']} className={cls} />
  }
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="From drawing to doorstep in four steps"
          description="A simple, transparent process — you always know where your parts are and what happens next."
        />

        <div className="relative mt-16">
          {/* connector line on large screens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-16 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-fern-300 lg:block"
          />
          <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-fern-100 ring-8 ring-mist-100">
                <StepIllustration kind={step.frog} />
                <span className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 font-display text-sm font-semibold text-mist-50 ring-4 ring-mist-100">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-forest-900">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-forest-900/70">{step.description}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
