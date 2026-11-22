# Njuguna Njenga portfolio: design

## Purpose
Send visitors to Njuguna's live projects and his two GitHub profiles. Everything else on the page is supporting proof.

## Page order
1. **Hero**: "Hi, I am" and his name set edge to edge over an ember glow; role, one-line statement, buttons to the projects and GitHub; four figures from the CV that count up once as the page loads (about two seconds).
2. **About me**: portrait in full colour, three paragraphs, three facts.
3. **Projects**: six screenshot cards in two staggered columns, each with "Open live site" and, where public, "Code".
4. **Client work**: the WFP Before/After diagram in a glass panel, then three one-paragraph results. Experience follows as a compact timeline, with skills and certifications in two fold-out panels.
5. **More on GitHub**: two large glass panels, one per profile.
6. **Contact**: six glass tiles.

The header is a full-width frosted bar: logo and name on the left, plain text links (About, Projects, Work, GitHub, Contact) with the current one underlined in ember, and "View CV" on the right. Below 1024px the links sit behind a menu button.

## Look
| Role | Value |
|---|---|
| Ground | `#0B0806` |
| Surface (solid panels, diagram boxes) | `#17100C` |
| Text | `#FBF6F1` |
| Secondary text | `#B9AEA4` |
| Ember (actions, current nav item, accents) | `#FF6A1A` |
| Live marker | `#4ADE9A` |
| Replaced (diagram only) | `#FF6B5E` |
| Glass | `rgba(20,13,9,0.7)`, 18px blur, 1px `rgba(255,255,255,0.14)` edge |

- One dark theme. No light mode.
- Glass is used for things you act on or look at: the header bar, the GitHub panels, the diagram, the fold-outs, the contact tiles. Headings and paragraphs sit on the ground.
- The ember glow appears three times: behind the hero, behind the GitHub panels, behind the contact tiles. Elsewhere the ground is plain.
- Type: Barlow Condensed for headings, Barlow for body. Panels have 24px corners; buttons are pills.
- Motion: the hero figures count up once on load, cards lift on hover, and the diagram builds itself when it scrolls into view. Nothing loops. All of it is skipped for visitors who prefer reduced motion.

## Rules for content
- Only real figures and claims: from the CV, or from a project's own site or repository.
- Client names appear as text. No client logos, testimonials or invented statistics.
- Each project carries an honest status ("Live demo", "Live, with demo data", "Hackathon prototype").

## Optional photos
- `src/assets/njuguna-njenga.(jpg|png|webp)`: the About portrait, shown in its own colours.
- `src/assets/hero-portrait.(png|webp)`: a cut-out portrait with a transparent background. When present it stands in front of the name in the hero. Needs a sharp, front-facing, chest-up photo at least 1500px wide.

## Where things live
- All copy and links: `src/content/`.
- Colours, glass, glow and buttons: `src/index.css`.
- The site address used for search engines and link previews: `.env`.
