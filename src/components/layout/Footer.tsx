import { nav, site } from '../../config/site'
import { FrogMark } from '../../graphics/Frog'
import { PineRidge } from '../../graphics/ForestBackground'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-forest-950 text-mist-100/75">
      <PineRidge className="absolute inset-x-0 bottom-full h-14 w-full text-forest-950 sm:h-20" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <FrogMark className="h-9 w-9" />
            <span className="font-display text-xl font-semibold text-mist-50">{site.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.tagline}. Prototypes and small runs, made with care.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold tracking-[0.18em] text-fern-300 uppercase">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-mist-50">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.18em] text-fern-300 uppercase">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-mist-50">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-mist-50">
                {site.phone}
              </a>
            </li>
            <li>{site.location}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-mist-100/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-mist-100/50 sm:px-6 lg:px-8">
          © {year} {site.name} · {site.domain}
        </p>
      </div>
    </footer>
  )
}
