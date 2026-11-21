# Njuguna Njenga portfolio: "Blueprint" design and build plan

## Context

Njuguna Njenga is a senior AI engineer and technical architect (AWS ProServe on UN WFP supply chain, fintech at Rova Credit, LLM pipelines at M365 Connect). His current site (njuguna-ai-portfolio.vercel.app) still carries template leftovers: a "Create Next App" title, "johndoe" links, stock testimonials, unbacked stats. The new site has one job: convince senior hiring managers and consulting clients, within one screen, that he designs and ships real systems.

The repo is a fresh Vite 8 + React 19 + TypeScript scaffold. Tailwind v4, Motion, Lucide and React Router are already added to `package.json` (uncommitted) but not wired up.

Decisions made with Antony:
- Direction: **Blueprint**. The site reads like an architect's drawing sheet; the systems are shown as interactive diagrams.
- Full diagrams for: WFP platform (hero), Rova Credit migration, M365 Connect pipeline. Side projects as smaller drawings.
- One scrolling page for v1. Light drafting-paper theme plus a blueprint-blue dark theme. No photo.

My calls (correct any of these):
- Audience is senior hiring managers and consulting clients.
- Nothing is carried over from the old site except the four real side projects. No testimonials, no "50+ projects / 100% satisfaction" stats.
- Diagrams only show what the CV states. I draft the node notes from the CV; Njuguna confirms or corrects them before launch.
- The CV PDF is offered as a download. It contains his phone number, so say if it should be left out.
- React Router stays installed but unused in v1 (one page). Case-study pages can use it later.
- Fonts are self-hosted (`@fontsource`), so no third-party font requests.
- Deployment is not part of this plan.

## Design

### The idea
A drawing sheet. Border frame, a title block at the foot, linework diagrams, annotations with leader lines. The one bold element is the interactive diagrams; everything around them is quiet type on a sheet grid.

### Tokens

| Role | Light (drafting film) | Dark (blueprint) |
|---|---|---|
| Page | `#E4EAEE` | `#0B2545` |
| Sheet | `#F7F9FA` | `#0F2F57` |
| Ink / linework | `#14233B` | `#EAF2FB` |
| Secondary text | `#5C6876` | `#A9BDD6` |
| Redline (legacy, removed, the one accent) | `#C4391F` | `#FF8A70` |
| Approved (built, live, earned) | `#1E7F6B` | `#5FD3B3` |

Colour carries meaning, not decoration: redline marks what was replaced or is in progress, approved marks what he built or has earned. Every colour pair is checked for WCAG AA contrast during the build.

Type: **Barlow Condensed** (600/700) for headings and diagram labels, **Barlow** (400/500) for body. Sentence case throughout, no tracked-out caps labels. Body line length capped near 68 characters. Left aligned on a 12-column grid.

Shape: 1px linework, square corners on the sheet and diagrams, 2px radius only on buttons. No shadows, no gradients, no cards.

### Page, top to bottom

```
+-- sheet frame -------------------------------------------------+
| Njuguna Njenga            Systems  Record  Skills  Contact  ◐ |
|                                                                |
| I design AI systems that       [Excel]---+                     |
| replace the ones people        [Email]---+--> (Platform)       |
| work around.                   [Legacy ERP]+     |      |      |
|                                              (Agents) (Data)   |
| Senior AI engineer and         ( Before | After )              |
| architect, Nairobi.            note: one trusted source for    |
| [See the systems] [Download CV]       1,000+ WFP users         |
+----------------------------------------------------------------+
| Systems      Rova Credit: monolith -> services   (diagram)     |
|              M365 Connect: recruitment pipeline  (diagram)     |
+----------------------------------------------------------------+
| Side builds  4 small drawings: AI Chief of Staff, Smart Fundi  |
|              Connect, Shujaa Storyteller, Digital Evidence     |
|              Vault. Each: one line, stack, demo + repo link    |
+----------------------------------------------------------------+
| Record       revision table: date | role | company | change    |
+----------------------------------------------------------------+
| Skills       legend grouped as in the CV (AI/ML, backend ...)  |
| Certs        earned = approved mark, in progress = redline     |
+-- title block -------------------------------------------------+
| Njuguna Njenga | Senior AI engineer & architect | Nairobi      |
| Email | LinkedIn | GitHub | Download CV            rev Nov 2026 |
+----------------------------------------------------------------+
```

- **Hero**: statement on the left, the WFP diagram on the right. On load the linework draws itself once (the only non-triggered motion on the page).
- **About**: directly under the hero. Three short first-person paragraphs from the CV and a three-row facts list (based in, now, focus). An optional 4:5 portrait sits to the left: drop `njuguna-njenga.jpg` into `src/assets/` and it appears; without it the section is text only.
- **Diagrams**: each has a Before/After switch. Before shows the legacy pieces in redline; After shows what replaced them in ink/approved, with lines redrawing between states. Hovering, focusing or tapping a node shows its note (what it was, what replaced it, the result) in an annotation beside the drawing. Nodes are real buttons, so the whole thing works by keyboard. On phones the diagram stacks vertically and notes open below it.
- **Record**: the career history as a drawing revision table (newest first), with dates exactly as in the CV.
- **Skills**: a legend, grouped as in the CV. No progress bars or percentages.
- **Certifications**: grouped as in the CV; in-progress ones are visibly marked as in progress.
- **Contact**: the title block. Email, LinkedIn (`linkedin.com/in/simon-njuguna-692557104`), GitHub (`github.com/snjugunanjenga`), CV download.

Quality floor: responsive to 360px, visible focus rings, `prefers-reduced-motion` skips the draw-in and state animations, theme follows system setting on first visit and remembers the toggle.

## Build

### Setup
- `vite.config.ts`: add the `@tailwindcss/vite` plugin.
- `src/index.css`: replace scaffold styles with `@import "tailwindcss"`, an `@theme` block for the tokens above, and `[data-theme="dark"]` overrides via CSS variables.
- Add deps: `@fontsource/barlow`, `@fontsource/barlow-condensed`; dev: `vitest`.
- Remove scaffold leftovers: `src/App.css`, `src/assets/{hero.png,react.svg,vite.svg}`, `public/icons.svg`. Replace `public/favicon.svg` with a small "NN" title-block mark.
- `index.html`: real title, description, Open Graph tags, theme-color.
- Copy the CV to `public/njuguna-njenga-cv.pdf`.

### Content as data (`src/content/`)
All copy lives in typed files so Njuguna's corrections are one-file edits:
- `profile.ts` (name, statement, links)
- `systems.ts` (the three diagrams: nodes with id, label, kind `legacy | built | agent | data`, grid position, note; edges per state `before | after`)
- `projects.ts` (four side builds: line, stack, demo URL, repo URL)
- `record.ts`, `skills.ts`, `certifications.ts` (straight from the CV)

### Components (`src/components/`)
- `Sheet.tsx` (frame + grid), `SheetHeader.tsx` (nav + `ThemeToggle.tsx`)
- `Hero.tsx`
- `SystemDiagram.tsx`: renders any entry from `systems.ts` as SVG; owns before/after state and selected node; uses `motion` for `pathLength` draw-in and state transitions. `DiagramNote.tsx` for the annotation.
- `Systems.tsx`, `SideBuilds.tsx`, `RecordTable.tsx`, `SkillsLegend.tsx`, `Certifications.tsx`, `TitleBlock.tsx`
- `src/hooks/useTheme.ts` (system preference, toggle, `localStorage`)
- `src/App.tsx` composes the page.

### Order of work
1. Setup, tokens, fonts, sheet frame, both themes.
2. `SystemDiagram` with the WFP data, then the hero around it.
3. Rova and M365 diagrams, side builds.
4. Record, skills, certifications, title block.
5. Responsive pass, keyboard and reduced-motion pass, contrast check.
6. Save this design into the repo as `docs/design.md` so Njuguna can review the copy against it.

## Verification
- `vitest`: content integrity test (every diagram edge points at an existing node; every node has a note; every external link is https). Run with `npx vitest run`.
- `npm run build` and `npm run lint` pass clean.
- Run `npm run dev` and check in a browser at 1440, 768 and 360px, in both themes: hero draw-in plays once, Before/After switches on all three diagrams, each node shows its note by hover, tap and keyboard (Tab + Enter), theme toggle persists across reload, CV downloads.
- With reduced motion turned on, the page shows the final diagram state with no animation.
- Confirm every side-build demo and repo link resolves before listing it; drop any that are dead.

## Needed from Njuguna (does not block the build)
- A read of the diagram notes for the three systems: they are drafted from the CV only.
- Whether the downloadable CV should include his phone number.
