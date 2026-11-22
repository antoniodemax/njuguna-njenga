import { LazyMotion } from 'motion/react'
import { About } from './components/About'
import { ClientWork } from './components/ClientWork'
import { GitHubProfiles } from './components/GitHubProfiles'
import { Hero } from './components/Hero'
import { InstallBar } from './components/InstallBar'
import { Projects } from './components/Projects'
import { RecordTable } from './components/RecordTable'
import { SheetHeader } from './components/SheetHeader'
import { SkillsAndCertifications } from './components/SkillsLegend'
import { TitleBlock } from './components/TitleBlock'

// The animation engine loads separately, after the page is already readable.
const loadMotion = () => import('./motion-features').then((mod) => mod.default)

function App() {
  return (
    <LazyMotion features={loadMotion} strict>
      <SheetHeader />
      <main>
        <Hero />
        <About />
        <Projects />
        <ClientWork />
        <RecordTable />
        <SkillsAndCertifications />
        <GitHubProfiles />
      </main>
      <TitleBlock />
      <InstallBar />
    </LazyMotion>
  )
}

export default App
