import { Bot, Database, Users } from 'lucide-react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useId, useMemo, useState, type CSSProperties } from 'react'
import type { DiagramState, NodeKind, System, SystemNode } from '../content/systems'
import { useElementWidth } from '../hooks/useElementWidth'

interface Props {
  system: System
  /** Play the build sequence once, the first time the drawing scrolls into view. */
  drawOnLoad?: boolean
  headingLevel?: 'h2' | 'h3'
}

interface Point {
  x: number
  y: number
}

const NODE_HEIGHT = 52
const ARROW_GAP = 3
/** Seconds each step of the build takes: one connector, then the part it leads to. */
const STAGE = 0.42
const EASE = [0.22, 0.7, 0.2, 1] as const

const icons: Partial<Record<NodeKind, typeof Bot>> = {
  people: Users,
  data: Database,
  agent: Bot,
}

const isBuilt = (node: SystemNode) => node.kind !== 'legacy' && node.kind !== 'people'

/** Right-angled connector from the edge of box a to the edge of box b. */
function connector(a: Point, b: Point, w: number, h: number, tall: boolean) {
  if (tall) {
    if (Math.abs(b.y - a.y) < 1) {
      const s = Math.sign(b.x - a.x)
      return `M ${a.x + (s * w) / 2} ${a.y} H ${b.x - s * (w / 2 + ARROW_GAP)}`
    }
    const s = Math.sign(b.y - a.y)
    const sy = a.y + (s * h) / 2
    const ey = b.y - s * (h / 2 + ARROW_GAP)
    const my = (sy + ey) / 2
    return `M ${a.x} ${sy} V ${my} H ${b.x} V ${ey}`
  }
  if (Math.abs(b.x - a.x) < 1) {
    const s = Math.sign(b.y - a.y)
    return `M ${a.x} ${a.y + (s * h) / 2} V ${b.y - s * (h / 2 + ARROW_GAP)}`
  }
  const s = Math.sign(b.x - a.x)
  const sx = a.x + (s * w) / 2
  const ex = b.x - s * (w / 2 + ARROW_GAP)
  const mx = (sx + ex) / 2
  return `M ${sx} ${a.y} H ${mx} V ${b.y} H ${ex}`
}

/** How many connectors away each part is from where the finished flow starts. */
function buildOrder(system: System) {
  const depth = new Map(system.nodes.map((n) => [n.id, 0]))
  const after = system.edges.filter((e) => e.state === 'after')
  for (let pass = 0; pass < system.nodes.length; pass++) {
    for (const edge of after) {
      const next = (depth.get(edge.from) ?? 0) + 1
      if (next > (depth.get(edge.to) ?? 0)) depth.set(edge.to, next)
    }
  }
  return depth
}

function nodeClasses(node: SystemNode, state: DiagramState, selected: boolean) {
  const base =
    'absolute flex items-center justify-center gap-1.5 rounded-lg border px-2 text-center font-display text-[0.95rem] font-semibold leading-[1.1] transition-colors duration-200 cursor-pointer'

  if (selected) return `${base} border-fg bg-fg text-ground`
  if (node.kind === 'legacy') {
    return `${base} bg-surface text-redline ${state === 'after' ? 'border-dashed border-redline' : 'border-redline'}`
  }
  if (node.kind === 'people') return `${base} border-fg bg-surface text-fg`
  return `${base} border-live bg-surface text-fg`
}

function describeNode(node: SystemNode, state: DiagramState) {
  if (node.kind === 'legacy') return state === 'after' ? 'Replaced' : 'In use'
  if (node.kind === 'people') return null
  return 'Built'
}

export function SystemDiagram({ system, drawOnLoad = false, headingLevel = 'h3' }: Props) {
  const hasBefore = system.edges.some((e) => e.state === 'before')
  const [state, setState] = useState<DiagramState>('after')
  const [hasSwitched, setHasSwitched] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const reduceMotion = useReducedMotion()
  const [seen, setSeen] = useState(false)

  // Hold the drawing back until it is on screen, so the build sequence is actually watched.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  const markerId = useId()
  const depth = useMemo(() => buildOrder(system), [system])
  const Heading = headingLevel

  // Narrow screens get the same drawing turned on its side: flow runs top to bottom.
  const tall = width > 0 && width < 560
  const cols = tall ? system.rows : system.cols
  const rows = tall ? system.cols : system.rows
  const cellWidth = width / cols
  const nodeWidth = Math.max(0, Math.min(176, cellWidth - (tall ? 12 : 28)))
  // Very narrow boxes wrap their label onto three lines, so they get more height.
  const nodeHeight = nodeWidth < 84 ? 68 : NODE_HEIGHT
  const cellHeight = (tall ? 44 : 40) + nodeHeight
  const height = rows * cellHeight

  const place = (node: SystemNode): Point => ({
    x: ((tall ? node.row : node.col) + 0.5) * cellWidth,
    y: ((tall ? node.col : node.row) + 0.5) * cellHeight,
  })

  const byId = new Map(system.nodes.map((n) => [n.id, n]))
  const selected = selectedId ? (byId.get(selectedId) ?? null) : null
  const edges = system.edges.filter((e) => e.state === state)
  // Before the work, the built parts do not exist yet, so they are not drawn at all.
  const nodes = system.nodes.filter((n) => state === 'after' || !isBuilt(n))

  // On a switch, the old connectors retract first; on page load there is a short beat.
  const lead = hasSwitched ? 0.3 : 0.35
  const timing = (duration: number, delay = 0) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease: EASE }
  const playIntro = drawOnLoad && !reduceMotion
  // Built parts are wiped in along the direction the flow runs.
  const hiddenClip = tall ? 'inset(-6px -6px 100% -6px)' : 'inset(-6px 100% -6px -6px)'
  const shownClip = 'inset(-6px -6px -6px -6px)'

  const switchTo = (next: DiagramState) => {
    if (next === state) return
    setState(next)
    setHasSwitched(true)
    // Clear the selection so the panel explains the state just switched to.
    setSelectedId(null)
  }

  const status = selected ? describeNode(selected, state) : null

  return (
    <figure id={`system-${system.id}`} className="m-0">
      <figcaption className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-4">
        <div className="max-w-[60ch]">
          <Heading className="font-display text-2xl font-semibold leading-tight">{system.title}</Heading>
          <p className="text-[0.95rem] text-muted">
            {system.client}, {system.period}
          </p>
        </div>
        {hasBefore && (
          <div className="flex overflow-hidden rounded-full border border-line bg-white/5 p-1" role="group" aria-label={`${system.title}: show before or after`}>
            {(['before', 'after'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={state === option}
                onClick={() => switchTo(option)}
                className={`min-h-10 cursor-pointer rounded-full px-5 font-display text-base font-semibold transition-colors duration-200 ${
                  state === option ? 'bg-fg text-ground' : 'bg-transparent text-fg hover:bg-white/10'
                }`}
              >
                {option === 'before' ? 'Before' : 'After'}
              </button>
            ))}
          </div>
        )}
      </figcaption>

      <div
        ref={ref}
        // Before the width is measured (including in the prerendered HTML) the height comes from
        // CSS, picking the sideways layout on narrow screens, so nothing jumps once it is known.
        className="drawing-grid relative h-(--h-tall) rounded-xl border border-line min-[618px]:h-(--h-wide)"
        style={
          {
            '--h-tall': `${system.cols * (44 + NODE_HEIGHT)}px`,
            '--h-wide': `${system.rows * (40 + NODE_HEIGHT)}px`,
            ...(width > 0 ? { height } : {}),
          } as CSSProperties
        }
      >
        {width > 0 && (seen || !drawOnLoad) && (
          <>
            <svg
              className="absolute inset-0"
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              aria-hidden="true"
            >
              <defs>
                {(['before', 'after'] as const).map((s) => (
                  <marker
                    key={s}
                    id={`${markerId}-${s}`}
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="9"
                    markerHeight="9"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill={s === 'before' ? 'var(--redline)' : 'var(--fg)'} />
                  </marker>
                ))}
              </defs>
              <AnimatePresence initial={playIntro}>
                {edges.map((edge) => {
                  const from = byId.get(edge.from)
                  const to = byId.get(edge.to)
                  if (!from || !to) return null
                  const step = edge.state === 'after' ? (depth.get(edge.from) ?? 0) : 0
                  return (
                    <m.path
                      key={`${edge.state}-${edge.from}-${edge.to}-${tall}`}
                      d={connector(place(from), place(to), nodeWidth, nodeHeight, tall)}
                      fill="none"
                      stroke={edge.state === 'before' ? 'var(--redline)' : 'var(--fg)'}
                      strokeWidth={1.5}
                      markerEnd={`url(#${markerId}-${edge.state})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1, transition: timing(STAGE, lead + step * STAGE) }}
                      exit={{ pathLength: 0, opacity: 0, transition: timing(0.26) }}
                    />
                  )
                })}
              </AnimatePresence>
            </svg>

            <AnimatePresence initial={playIntro}>
              {nodes.map((node) => {
                const { x, y } = place(node)
                const Icon = icons[node.kind]
                const isSelected = node.id === selectedId
                const built = isBuilt(node)
                // A built part is inked in just as its connector arrives.
                const arrives = lead + (depth.get(node.id) ?? 0) * STAGE - 0.14
                return (
                  <m.button
                    key={node.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(node.id)}
                    onMouseEnter={() => setSelectedId(node.id)}
                    onFocus={() => setSelectedId(node.id)}
                    // The narrowest phones get a slightly smaller label so three lines fit the box.
                    className={`${nodeClasses(node, state, isSelected)} ${nodeWidth < 84 ? 'text-[0.8rem]!' : ''}`}
                    style={{
                      left: x - nodeWidth / 2,
                      top: y - nodeHeight / 2,
                      width: nodeWidth,
                      height: nodeHeight,
                    }}
                    initial={built ? { opacity: 0, clipPath: hiddenClip } : false}
                    animate={
                      built
                        ? { opacity: 1, clipPath: shownClip, transition: timing(0.5, arrives) }
                        : { opacity: node.kind === 'legacy' && state === 'after' ? 0.72 : 1, transition: timing(0.3) }
                    }
                    exit={built ? { opacity: 0, clipPath: hiddenClip, transition: timing(0.24) } : undefined}
                  >
                    {built && (
                      // Wet-fg flash as the part is drawn, fading to the sheet.
                      <m.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-live"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0, transition: timing(0.9, arrives + 0.25) }}
                      />
                    )}
                    {node.kind === 'legacy' && (
                      // Redline struck corner to corner across a replaced part.
                      <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 size-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <m.line
                          x1="0"
                          y1="100"
                          x2="100"
                          y2="0"
                          stroke="var(--redline)"
                          strokeWidth={1.25}
                          vectorEffect="non-scaling-stroke"
                          initial={false}
                          animate={{
                            pathLength: state === 'after' ? 1 : 0,
                            opacity: state === 'after' ? 1 : 0,
                            transition: timing(0.4),
                          }}
                        />
                      </svg>
                    )}
                    {Icon && nodeWidth > 120 && (
                      <Icon size={15} strokeWidth={1.75} aria-hidden="true" className="relative shrink-0" />
                    )}
                    <span className="relative">{node.label}</span>
                  </m.button>
                )
              })}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="px-1 pt-4 sm:min-h-[7.5rem]" aria-live="polite">
        <p className="font-display text-lg font-semibold leading-snug">
          {selected ? selected.label : !hasBefore ? 'About this system' : state === 'before' ? 'Before' : 'After'}
          {status && (
            <span
              className={`ml-2 text-base font-semibold ${selected?.kind === 'legacy' ? 'text-redline' : 'text-live'}`}
            >
              {status}
            </span>
          )}
        </p>
        <p className="max-w-[68ch] text-[0.975rem]">
          {selected ? selected.note : state === 'before' && system.before ? system.before : system.summary}
        </p>
      </div>
    </figure>
  )
}
