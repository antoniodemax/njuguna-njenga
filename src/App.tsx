import { LazyMotion } from 'motion/react'
import { About } from './components/About'
import { Hero } from './components/Hero'
import { RecordTable } from './components/RecordTable'
import { SheetHeader } from './components/SheetHeader'
import { Certifications, SkillsLegend } from './components/SkillsLegend'
import { Architecture } from './components/Architecture'
import { Projects } from './components/Projects'
import { TitleBlock } from './components/TitleBlock'

// The animation engine loads separately, after the page is already readable.
const loadMotion = () => import('./motion-features').then((mod) => mod.default)

function App() {
  return (
    <LazyMotion features={loadMotion} strict>
    <div className="mx-auto max-w-[1280px] p-2 sm:p-5">
      {/* The sheet: a single framed drawing */}
      <div className="border border-ink bg-sheet">
        <SheetHeader />
        <main>
          <Hero />
          <About />
          <Projects />
          <Architecture />
          <RecordTable />
          <SkillsLegend />
          <Certifications />
        </main>
        <TitleBlock />
      </div>
    </div>
    </LazyMotion>
  )
}

export default App
