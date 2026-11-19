import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Materials } from './components/sections/Materials'
import { Process } from './components/sections/Process'
import { Services } from './components/sections/Services'
import { WhyUs } from './components/sections/WhyUs'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-forest-900 px-4 py-2 text-mist-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Materials />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
