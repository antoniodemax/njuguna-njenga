export interface SideBuild {
  name: string
  line: string
  stack?: string
  demo: string
  repo?: string
}

export const sideBuilds: SideBuild[] = [
  {
    name: 'AI Chief of Staff',
    line: 'An AI assistant for executive work.',
    stack: 'Next.js, OpenAI API, PostgreSQL, TypeScript',
    demo: 'https://org-ai-chief-of-staff.vercel.app',
  },
  {
    name: 'Smart Fundi Connect',
    line: 'A hub that connects people with local service providers.',
    demo: 'https://smart-fundi-connect.vercel.app',
  },
  {
    name: 'Shujaa Storyteller',
    line: 'An educational app that tells the stories of Kenyan heroes.',
    stack: 'TypeScript',
    demo: 'https://kenya-mashujaa-heroes-storyteller.vercel.app',
    repo: 'https://github.com/snjugunanjenga/shujaa-storyteller',
  },
  {
    name: 'Digital Evidence Vault',
    line: 'A secure vault for digital evidence, built for a hackathon on gender-based violence.',
    stack: 'TypeScript',
    demo: 'https://v0-digital-evidence-vault-gbv-hacka.vercel.app',
    repo: 'https://github.com/snjugunanjenga/v0-digital-evidence-vault-gbv-hackathon',
  },
]
