import chiefOfStaff from '../assets/projects/chief-of-staff.webp'
import ethanel from '../assets/projects/ethanel.webp'
import evidenceVault from '../assets/projects/evidence-vault.webp'
import shujaa from '../assets/projects/shujaa.webp'
import smartFundi from '../assets/projects/smart-fundi.webp'
import ventureRoute from '../assets/projects/venture-route.webp'

export interface Project {
  name: string
  category: string
  /** Shown beside the name. Says honestly how finished the thing is. */
  status: string
  line: string
  image: string
  live: string
  repo?: string
}

// Descriptions come from each project's own site or repository. Njuguna: correct anything that is off.
export const projects: Project[] = [
  {
    name: 'Ethanel',
    category: 'Real estate',
    status: 'Live, with demo data',
    line: 'Homes and plots to rent, buy or lease in Kenya. Contact the agency on WhatsApp in one tap, and rent goes straight to the landlord’s own M-Pesa.',
    image: ethanel,
    live: 'https://ethanel-platform.vercel.app/',
    repo: 'https://github.com/simpleHacker0893/ethanel-real-estate-management',
  },
  {
    name: 'Venture Route',
    category: 'AI reasoning',
    status: 'Live demo',
    line: 'Turns a founder’s plain-language venture brief into an evidence-backed route through the BASIX ecosystem, decided by MeTTa graph rules.',
    image: ventureRoute,
    live: 'https://basix-venture-route.vercel.app/',
    repo: 'https://github.com/simpleHacker0893/basix-venture-route',
  },
  {
    name: 'AI Chief of Staff',
    category: 'AI assistant',
    status: 'Live demo',
    line: 'An AI assistant for executive work, built with Next.js, the OpenAI API and PostgreSQL.',
    image: chiefOfStaff,
    live: 'https://org-ai-chief-of-staff.vercel.app',
  },
  {
    name: 'Smart Fundi Connect',
    category: 'Local services',
    status: 'Live demo',
    line: 'A hub that connects people with verified local service providers.',
    image: smartFundi,
    live: 'https://smart-fundi-connect.vercel.app',
  },
  {
    name: 'Shujaa Storyteller',
    category: 'Education',
    status: 'Live demo',
    line: 'An educational app that tells the stories of Kenyan heroes.',
    image: shujaa,
    live: 'https://kenya-mashujaa-heroes-storyteller.vercel.app',
    repo: 'https://github.com/snjugunanjenga/shujaa-storyteller',
  },
  {
    name: 'Digital Evidence Vault',
    category: 'Safety',
    status: 'Hackathon prototype',
    line: 'A secure vault for digital evidence, built for a hackathon on gender-based violence.',
    image: evidenceVault,
    live: 'https://v0-digital-evidence-vault-gbv-hacka.vercel.app',
    repo: 'https://github.com/snjugunanjenga/v0-digital-evidence-vault-gbv-hackathon',
  },
]

export interface ClientResult {
  name: string
  client: string
  result: string
}

// Short results from client work. Every claim is from the CV.
export const clientResults: ClientResult[] = [
  {
    name: 'Supply-chain platform',
    client: 'UN World Food Programme, 2026 to present',
    result:
      'Replaced spreadsheets, email chains and legacy systems with one platform for 1,000+ users. Workflows improved by 80 to 85%.',
  },
  {
    name: 'Monolith to microservices',
    client: 'Rova Credit Africa, 2026',
    result:
      'Led the move of enterprise mobile-lending applications from a legacy monolith to microservices on Google Cloud.',
  },
  {
    name: 'Recruitment automation',
    client: 'M365 Connect, 2022 to 2025',
    result: 'Built LLM recruitment pipelines on FastAPI, LangChain and Celery, with 85% code coverage.',
  },
]
