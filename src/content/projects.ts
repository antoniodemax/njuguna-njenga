export type ProjectStatus = 'production' | 'completed' | 'prototype' | 'demo'

export const statusLabels: Record<ProjectStatus, string> = {
  production: 'In production',
  completed: 'Completed',
  prototype: 'Hackathon prototype',
  demo: 'Live demo',
}

export interface CaseStudy {
  id: string
  name: string
  category: string
  status: ProjectStatus
  period: string
  problem: string
  system: string
  decisions: string[]
  outcome: string
  /** In-page link to the system's diagram. Client systems have no public URL. */
  diagram: string
}

// Every statement below comes from the CV. Njuguna: correct anything that is off.
export const caseStudies: CaseStudy[] = [
  {
    id: 'wfp',
    name: 'WFP supply-chain platform',
    category: 'Humanitarian logistics, enterprise platform',
    status: 'production',
    period: '2026 to present',
    problem:
      'Supply-chain teams worked across fragmented legacy systems, repetitive email chains and Excel workbooks, with the back-and-forth and data errors that come with them.',
    system:
      'One fast, reliable Next.js platform that unifies those workflows into a single trusted data source.',
    decisions: [
      'Built for resilience to downtime, so humanitarian operations keep running.',
      'An agentic AI starter kit standardises how the team builds and ships agent workflows.',
      'Delivered inside an AWS ProServe engagement that shaped the architecture, security and data foundations, starting with discovery of the legacy ERP and logistics systems.',
    ],
    outcome: 'Serves more than 1,000 WFP users. Workflows improved by 80 to 85% across WFP teams.',
    diagram: '#system-wfp',
  },
  {
    id: 'rova',
    name: 'Mobile lending, monolith to microservices',
    category: 'Fintech, mobile lending',
    status: 'completed',
    period: 'April to August 2026',
    problem: 'Enterprise-scale mobile-lending applications were running on a legacy monolith.',
    system: 'A microservices architecture behind the lending applications.',
    decisions: [
      'React for the applications, Node.js and Python for the services, Google Cloud for infrastructure.',
      'System designs, data models and infrastructure scalability choices were presented and defended live with executive client teams.',
    ],
    outcome: 'A more modular system with lower latency and better scalability.',
    diagram: '#system-rova',
  },
  {
    id: 'm365',
    name: 'Recruitment automation pipeline',
    category: 'Recruitment, LLM pipelines',
    status: 'completed',
    period: '2022 to 2025',
    problem:
      'Recruitment workflows, including technical screening, coding assessments and system design rubrics, needed to run as automated pipelines.',
    system: 'Full-stack recruitment automation pipelines built with FastAPI, LangChain, Celery, Redis and Docker.',
    decisions: [
      'Azure infrastructure tuned for cost-efficiency and high availability.',
      'Comprehensive automated test suites.',
      'TypeScript adopted across the engineering organisation.',
    ],
    outcome: 'Pipelines deployed at scale, with 85% code coverage.',
    diagram: '#system-m365',
  },
]

export interface SideBuild {
  name: string
  category: string
  status: ProjectStatus
  line: string
  stack?: string
  demo: string
  repo?: string
}

export const sideBuilds: SideBuild[] = [
  {
    name: 'AI Chief of Staff',
    category: 'AI assistant',
    status: 'demo',
    line: 'An AI assistant for executive work.',
    stack: 'Next.js, OpenAI API, PostgreSQL, TypeScript',
    demo: 'https://org-ai-chief-of-staff.vercel.app',
  },
  {
    name: 'Smart Fundi Connect',
    category: 'Local services',
    status: 'demo',
    line: 'A hub that connects people with local service providers.',
    demo: 'https://smart-fundi-connect.vercel.app',
  },
  {
    name: 'Shujaa Storyteller',
    category: 'Education',
    status: 'demo',
    line: 'An educational app that tells the stories of Kenyan heroes.',
    stack: 'TypeScript',
    demo: 'https://kenya-mashujaa-heroes-storyteller.vercel.app',
    repo: 'https://github.com/snjugunanjenga/shujaa-storyteller',
  },
  {
    name: 'Digital Evidence Vault',
    category: 'Safety, hackathon build',
    status: 'prototype',
    line: 'A secure vault for digital evidence, built for a hackathon on gender-based violence.',
    stack: 'TypeScript',
    demo: 'https://v0-digital-evidence-vault-gbv-hacka.vercel.app',
    repo: 'https://github.com/snjugunanjenga/v0-digital-evidence-vault-gbv-hackathon',
  },
]
