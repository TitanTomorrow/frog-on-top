import { site } from '../../config/site'
import { ForestBackground } from '../../graphics/ForestBackground'
import { HeroMascot } from '../../graphics/HeroMascot'
import { ArrowRightIcon, CheckIcon } from '../../graphics/icons'
import { buttonClasses } from '../ui/buttonStyles'

const highlights = ['Laser cut · CNC bent · robot welded', 'Prototypes & runs of 1–5', 'Every part inspected']

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <ForestBackground className="absolute inset-0 -z-10 h-full w-full" />
      {/* soft morning mist behind the copy, for legibility over the treeline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_25%_45%,rgba(243,241,231,0.92),rgba(243,241,231,0.55)_55%,transparent_80%)] lg:bg-[radial-gradient(ellipse_45%_55%_at_28%_42%,rgba(243,241,231,0.9),rgba(243,241,231,0.5)_60%,transparent_85%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pt-28 pb-28 sm:px-6 sm:pt-32 md:pb-36 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-8 lg:pt-36 lg:pb-60">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-mist-50/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-moss-600 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-moss-500" aria-hidden="true" />
            CNC fabrication · {site.domain}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-forest-900 sm:text-5xl lg:text-6xl"
          >
            Precision parts, <span className="text-moss-600">fabricated with care.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-forest-900/75">
            {site.name} laser-cuts, CNC-bends and robot-welds metal parts from your DXF files — for prototypes and small runs of up to
            five. Clear quotes, careful work and parts that arrive ready to use.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={buttonClasses('primary', 'px-7 py-3.5 text-base')}>
              Request a quote
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a href="#services" className={buttonClasses('secondary', 'px-7 py-3.5 text-base')}>
              Explore services
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-forest-900/75">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-moss-600" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-md">
          <HeroMascot className="h-auto w-full drop-shadow-[0_18px_30px_rgba(19,38,27,0.12)]" />
        </div>
      </div>
    </section>
  )
}
