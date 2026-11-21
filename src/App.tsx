import { About } from './components/About'
import { Hero } from './components/Hero'
import { RecordTable } from './components/RecordTable'
import { SheetHeader } from './components/SheetHeader'
import { Certifications, SkillsLegend } from './components/SkillsLegend'
import { Architecture } from './components/Architecture'
import { Projects } from './components/Projects'
import { TitleBlock } from './components/TitleBlock'

function App() {
  return (
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
  )
}

export default App
