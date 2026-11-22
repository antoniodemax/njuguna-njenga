import { ArrowDown } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { profile } from '../content/profile'
import { CountUp } from './CountUp'

// Optional cut-out portrait that stands in front of the name. Drop a transparent
// hero-portrait.(png|webp) into src/assets and it appears; without one the name stands alone.
const portraits = import.meta.glob<string>('../assets/hero-portrait.{png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const portrait = Object.values(portraits)[0]

const [firstName, lastName] = profile.name.split(' ')

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative -mt-[4.5rem] overflow-hidden px-5 pt-[4.5rem] sm:px-8">
      {/* Ember light behind the name */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="glow left-[58%] top-[-22%] h-[105%] w-[130%] -translate-x-1/2 sm:top-[-38%] sm:h-[135%] sm:w-[105%]" />
        <div className="grain" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-b from-transparent to-ground" />
      </div>

      <div className="relative mx-auto max-w-[1200px] pb-12 pt-14 sm:pt-20 md:pb-16">
        <p className="font-display text-2xl font-semibold sm:text-3xl">Hi, I am</p>

        {/* The name is sized from the container so it always runs edge to edge:
            one line on wide screens, two on phones. */}
        <div className="@container relative">
          <h1
            id="hero-name"
            className="bg-linear-to-b from-white from-55% to-white/25 bg-clip-text font-display text-[calc(100cqw/2.94)] font-bold whitespace-nowrap leading-[0.84] tracking-[-0.01em] text-transparent sm:text-[calc(100cqw/5.57)] sm:leading-[0.95]"
          >
            {firstName} <br className="sm:hidden" />
            {lastName}
          </h1>
          {portrait && (
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              className="pointer-events-none absolute bottom-[-35%] left-1/2 h-[230%] max-w-none -translate-x-1/2 object-contain object-bottom"
            />
          )}
        </div>

        <div className="mt-10 md:mt-14">
          <p className="font-display text-xl font-semibold text-ember sm:text-2xl">{profile.role}</p>
          <p className="mt-2 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.02]">
            {profile.statement}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              See the projects
              <ArrowDown size={17} strokeWidth={2} aria-hidden="true" />
            </a>
            <a href="#github" className="btn btn-ghost">
              <FaGithub size={17} aria-hidden="true" />
              View GitHub
            </a>
          </div>
        </div>

        {/* Figures from the CV. They count up once, quickly, as the page loads. */}
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:mt-16 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-2 max-w-[22ch] text-[0.95rem] leading-snug text-muted">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.75rem,6.5vw,4.5rem)] font-bold leading-none">
                <CountUp value={stat.value} suffix={stat.suffix} delay={0.1 + i * 0.08} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
