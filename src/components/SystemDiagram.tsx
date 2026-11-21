import { Bot, Database, Users } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import type { DiagramState, NodeKind, System, SystemNode } from '../content/systems'
import { useElementWidth } from '../hooks/useElementWidth'

interface Props {
  system: System
  /** Draw the linework in once when the page loads. Used by the hero only. */
  drawOnLoad?: boolean
  headingLevel?: 'h2' | 'h3'
}

interface Point {
  x: number
  y: number
}

const NODE_HEIGHT = 52
const ARROW_GAP = 3

const icons: Partial<Record<NodeKind, typeof Bot>> = {
  people: Users,
  data: Database,
  agent: Bot,
}

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

function nodeClasses(node: SystemNode, state: DiagramState, selected: boolean) {
  const base =
    'absolute flex items-center justify-center gap-1.5 border px-2 text-center font-display text-[0.95rem] font-semibold leading-[1.1] transition-colors duration-200 cursor-pointer'

  if (selected) return `${base} border-ink bg-ink text-sheet`

  if (node.kind === 'legacy') {
    return state === 'after'
      ? `${base} border-dashed border-redline bg-sheet text-redline line-through decoration-1`
      : `${base} border-redline bg-sheet text-redline`
  }
  if (node.kind === 'people') return `${base} border-ink bg-sheet text-ink`
  // Built parts are only pencilled in until the "after" state.
  return state === 'before'
    ? `${base} border-dashed border-rule bg-sheet text-pencil`
    : `${base} border-approved bg-sheet text-ink`
}

function describeNode(node: SystemNode, state: DiagramState) {
  if (node.kind === 'legacy') return state === 'after' ? 'Replaced' : 'In use'
  if (node.kind === 'people') return null
  return state === 'before' ? 'Not built yet' : 'Built'
}

export function SystemDiagram({ system, drawOnLoad = false, headingLevel = 'h3' }: Props) {
  const hasBefore = system.edges.some((e) => e.state === 'before')
  const [state, setState] = useState<DiagramState>('after')
  const [hasSwitched, setHasSwitched] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const reduceMotion = useReducedMotion()
  const markerId = useId()
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
  const animate = !reduceMotion && (drawOnLoad || hasSwitched)
  const lineColor = state === 'before' ? 'var(--redline)' : 'var(--ink)'

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
          <p className="text-[0.95rem] text-pencil">
            {system.client}, {system.period}
          </p>
        </div>
        {hasBefore && (
          <div className="flex border border-ink" role="group" aria-label={`${system.title}: show before or after`}>
            {(['before', 'after'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={state === option}
                onClick={() => switchTo(option)}
                className={`min-h-11 cursor-pointer px-5 font-display text-base font-semibold transition-colors duration-200 ${
                  state === option ? 'bg-ink text-sheet' : 'bg-transparent text-ink hover:bg-ink/10'
                }`}
              >
                {option === 'before' ? 'Before' : 'After'}
              </button>
            ))}
          </div>
        )}
      </figcaption>

      <div ref={ref} className="drawing-grid relative border border-rule" style={{ height }}>
        {width > 0 && (
          <>
            <svg
              className="absolute inset-0"
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id={markerId}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="9"
                  markerHeight="9"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={lineColor} />
                </marker>
              </defs>
              {edges.map((edge, i) => {
                const from = byId.get(edge.from)
                const to = byId.get(edge.to)
                if (!from || !to) return null
                return (
                  <motion.path
                    key={`${state}-${edge.from}-${edge.to}-${tall}`}
                    d={connector(place(from), place(to), nodeWidth, nodeHeight, tall)}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth={1.5}
                    markerEnd={`url(#${markerId})`}
                    initial={animate ? { pathLength: 0, opacity: 0 } : false}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: (drawOnLoad && !hasSwitched ? 0.35 : 0) + i * 0.14,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}
            </svg>

            {system.nodes.map((node) => {
              const { x, y } = place(node)
              const Icon = icons[node.kind]
              const isSelected = node.id === selectedId
              return (
                <button
                  key={node.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(node.id)}
                  onMouseEnter={() => setSelectedId(node.id)}
                  onFocus={() => setSelectedId(node.id)}
                  className={nodeClasses(node, state, isSelected)}
                  style={{
                    left: x - nodeWidth / 2,
                    top: y - nodeHeight / 2,
                    width: nodeWidth,
                    height: nodeHeight,
                  }}
                >
                  {Icon && nodeWidth > 120 && <Icon size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />}
                  <span>{node.label}</span>
                </button>
              )
            })}
          </>
        )}
      </div>

      <div className="border-x border-b border-rule px-4 py-3 sm:min-h-[7.5rem]" aria-live="polite">
        <p className="font-display text-lg font-semibold leading-snug">
          {selected ? selected.label : !hasBefore ? 'About this system' : state === 'before' ? 'Before' : 'After'}
          {status && (
            <span
              className={`ml-2 text-base font-semibold ${
                selected?.kind === 'legacy' ? 'text-redline' : state === 'after' ? 'text-approved' : 'text-pencil'
              }`}
            >
              {status}
            </span>
          )}
        </p>
        <p className="max-w-[68ch] text-[0.975rem]">{selected ? selected.note : state === 'before' && system.before ? system.before : system.summary}</p>
      </div>
    </figure>
  )
}
