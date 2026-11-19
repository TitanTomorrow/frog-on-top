import { useEffect, useState } from 'react'
import { nav, site } from '../../config/site'
import { FrogMark } from '../../graphics/Frog'
import { CloseIcon, MenuIcon } from '../../graphics/icons'
import { buttonClasses } from '../ui/buttonStyles'

export function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-forest-900/10 bg-mist-50/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label={`${site.name} — home`}>
          <FrogMark className="h-9 w-9" />
          <span className="font-display text-xl font-semibold tracking-tight text-forest-900">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-forest-900/75 transition-colors hover:text-forest-900"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className={buttonClasses('primary', 'px-5 py-2.5')}>
            Get a quote
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-forest-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-forest-900/10 px-4 pt-2 pb-5 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-forest-900/85 hover:bg-fern-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className={buttonClasses('primary', 'mt-3 w-full')}>
            Get a quote
          </a>
        </nav>
      )}
    </header>
  )
}
