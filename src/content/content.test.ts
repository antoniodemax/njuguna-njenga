import { describe, expect, it } from 'vitest'
import { profile } from './profile'
import { sideBuilds } from './projects'
import { systems } from './systems'

describe('system diagrams', () => {
  for (const system of systems) {
    describe(system.title, () => {
      const ids = system.nodes.map((n) => n.id)

      it('has unique node ids', () => {
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('only connects nodes that exist', () => {
        for (const edge of system.edges) {
          expect(ids).toContain(edge.from)
          expect(ids).toContain(edge.to)
        }
      })

      it('gives every node a note and a place on the grid', () => {
        for (const node of system.nodes) {
          expect(node.note.trim().length).toBeGreaterThan(0)
          expect(node.col).toBeGreaterThanOrEqual(0)
          expect(node.col).toBeLessThan(system.cols)
          expect(node.row).toBeGreaterThanOrEqual(0)
          expect(node.row).toBeLessThan(system.rows)
        }
      })

      it('never puts two nodes in the same cell', () => {
        const cells = system.nodes.map((n) => `${n.col}:${n.row}`)
        expect(new Set(cells).size).toBe(cells.length)
      })

      it('shows something in the finished state', () => {
        expect(system.edges.some((e) => e.state === 'after')).toBe(true)
      })
    })
  }
})

describe('external links', () => {
  const links = [
    profile.linkedin,
    profile.github,
    ...sideBuilds.flatMap((b) => (b.repo ? [b.demo, b.repo] : [b.demo])),
  ]

  it('are all https', () => {
    for (const link of links) {
      expect(link.startsWith('https://')).toBe(true)
    }
  })
})
