import { Hero } from './components/Hero'
import { RecordTable } from './components/RecordTable'
import { SheetHeader } from './components/SheetHeader'
import { SideBuilds } from './components/SideBuilds'
import { Certifications, SkillsLegend } from './components/SkillsLegend'
import { Systems } from './components/Systems'
import { TitleBlock } from './components/TitleBlock'

function App() {
  return (
    <div className="mx-auto max-w-[1280px] p-2 sm:p-5">
      {/* The sheet: a single framed drawing */}
      <div className="border border-ink bg-sheet">
        <SheetHeader />
        <main>
          <Hero />
          <Systems />
          <SideBuilds />
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
