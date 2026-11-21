import { profile } from '../content/profile'
import { wfp } from '../content/systems'
import { SystemDiagram } from './SystemDiagram'

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="statement"
      className="grid items-start gap-x-8 gap-y-10 px-5 py-12 sm:px-8 xl:grid-cols-12 xl:py-20"
    >
      <div className="xl:col-span-5">
        <h1
          id="statement"
          className="font-display text-[clamp(2.4rem,5.5vw,4.1rem)] font-bold leading-[0.95] tracking-[-0.01em]"
        >
          {profile.statement}
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-[2px] border border-ink bg-ink px-5 py-2.5 font-display text-lg font-semibold text-sheet transition-opacity duration-200 hover:opacity-85"
          >
            See the systems
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-[2px] border border-ink px-5 py-2.5 font-display text-lg font-semibold transition-colors duration-200 hover:bg-ink hover:text-sheet"
          >
            View CV
          </a>
        </div>
      </div>
      <div className="min-w-0 xl:col-span-7">
        <SystemDiagram system={wfp} drawOnLoad headingLevel="h2" />
      </div>
    </section>
  )
}
