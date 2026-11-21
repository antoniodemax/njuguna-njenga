export type NodeKind = 'people' | 'legacy' | 'built' | 'data' | 'agent'
export type DiagramState = 'before' | 'after'

export interface SystemNode {
  id: string
  label: string
  kind: NodeKind
  /** Position on the drawing grid, counted from the top left. */
  col: number
  row: number
  note: string
}

export interface SystemEdge {
  from: string
  to: string
  state: DiagramState
}

export interface System {
  id: string
  title: string
  client: string
  period: string
  summary: string
  /** What the picture looked like before the work. Shown in the Before state. */
  before?: string
  cols: number
  rows: number
  nodes: SystemNode[]
  edges: SystemEdge[]
}

// Every note below is drafted from the CV. Njuguna: correct anything that is off.

export const wfp: System = {
  id: 'wfp',
  title: 'WFP supply-chain platform',
  client: 'SupplyChainWise with AWS Professional Services, for the UN World Food Programme',
  period: '2026 to present',
  summary:
    'One unified platform replaces all three. Teams work from a single shared data source, with agent workflows built on a standard starter kit. Workflows improved by 80 to 85% across WFP teams. Select any part of the drawing to read more.',
  before:
    'WFP teams worked across three disconnected places: Excel workbooks, repetitive email chains and fragmented legacy systems. The back-and-forth between them led to data errors.',
  cols: 4,
  rows: 3,
  nodes: [
    {
      id: 'excel',
      label: 'Excel workbooks',
      kind: 'legacy',
      col: 0,
      row: 0,
      note: 'Operational data lived in workbooks passed between teams. Their contents now sit in one trusted data source.',
    },
    {
      id: 'email',
      label: 'Email chains',
      kind: 'legacy',
      col: 0,
      row: 1,
      note: 'Repetitive email chains carried the workflow. Moving that into the platform cut the back-and-forth and the data errors that came with it.',
    },
    {
      id: 'legacy',
      label: 'Legacy systems',
      kind: 'legacy',
      col: 0,
      row: 2,
      note: 'Fragmented legacy monolithic systems, mapped during discovery of the existing ERP and logistics estate, then replaced.',
    },
    {
      id: 'teams',
      label: 'WFP teams',
      kind: 'people',
      col: 1,
      row: 1,
      note: 'More than 1,000 WFP users. They used to move between three disconnected ways of working; now they use one.',
    },
    {
      id: 'platform',
      label: 'Unified platform',
      kind: 'built',
      col: 2,
      row: 1,
      note: 'A fast, reliable Next.js platform built to stay up through downtime, so humanitarian supply-chain operations keep running.',
    },
    {
      id: 'data',
      label: 'Shared data source',
      kind: 'data',
      col: 3,
      row: 0,
      note: 'Disjointed workflows, email chains and workbooks unified into a single trusted source of data.',
    },
    {
      id: 'agents',
      label: 'Automated workflows',
      kind: 'agent',
      col: 3,
      row: 2,
      note: 'Agent workflows, built on an agentic AI starter kit that standardises how the team builds and ships them.',
    },
  ],
  edges: [
    { from: 'teams', to: 'excel', state: 'before' },
    { from: 'teams', to: 'email', state: 'before' },
    { from: 'teams', to: 'legacy', state: 'before' },
    { from: 'teams', to: 'platform', state: 'after' },
    { from: 'platform', to: 'data', state: 'after' },
    { from: 'platform', to: 'agents', state: 'after' },
  ],
}

export const rova: System = {
  id: 'rova',
  title: 'Mobile lending, monolith to microservices',
  client: 'Rova Credit Africa',
  period: 'April to August 2026',
  summary:
    'Led the architecture of enterprise-scale mobile-lending applications and the move from a legacy monolith to microservices, improving modularity, latency and scalability. Defended the system designs, data models and infrastructure choices live with executive client teams.',
  before: 'The mobile-lending applications ran on a single legacy monolith.',
  cols: 3,
  rows: 1,
  nodes: [
    {
      id: 'monolith',
      label: 'Lending monolith',
      kind: 'legacy',
      col: 0,
      row: 0,
      note: 'The legacy monolith behind the lending products. Retired in favour of separate services.',
    },
    {
      id: 'apps',
      label: 'Mobile lending apps',
      kind: 'people',
      col: 1,
      row: 0,
      note: 'Enterprise-scale fintech mobile-lending applications, built with React.',
    },
    {
      id: 'services',
      label: 'Microservices on GCP',
      kind: 'built',
      col: 2,
      row: 0,
      note: 'Node.js and Python services on Google Cloud. Splitting the monolith made the system more modular, faster to respond and easier to scale.',
    },
  ],
  edges: [
    { from: 'apps', to: 'monolith', state: 'before' },
    { from: 'apps', to: 'services', state: 'after' },
  ],
}

export const m365: System = {
  id: 'm365',
  title: 'Recruitment automation pipeline',
  client: 'M365 Connect',
  period: '2022 to 2025',
  summary:
    'Architected and deployed full-stack recruitment automation pipelines, running in Docker on Azure and tuned for cost and high availability. Reached 85% code coverage with automated test suites and drove TypeScript adoption across the engineering organisation.',
  cols: 4,
  rows: 2,
  nodes: [
    {
      id: 'workflow',
      label: 'Recruitment workflow',
      kind: 'people',
      col: 0,
      row: 1,
      note: 'The recruitment process the pipeline automates, including technical screening criteria, coding assessments and system design rubrics.',
    },
    {
      id: 'api',
      label: 'FastAPI service',
      kind: 'built',
      col: 1,
      row: 1,
      note: 'The Python API in front of the pipeline.',
    },
    {
      id: 'redis',
      label: 'Redis',
      kind: 'data',
      col: 2,
      row: 0,
      note: 'Redis alongside the Celery workers.',
    },
    {
      id: 'workers',
      label: 'Celery workers',
      kind: 'built',
      col: 2,
      row: 1,
      note: 'Background workers that carry the long-running pipeline steps.',
    },
    {
      id: 'llm',
      label: 'LangChain steps',
      kind: 'agent',
      col: 3,
      row: 1,
      note: 'The LLM steps of the pipeline, built with LangChain.',
    },
  ],
  edges: [
    { from: 'workflow', to: 'api', state: 'after' },
    { from: 'api', to: 'workers', state: 'after' },
    { from: 'workers', to: 'redis', state: 'after' },
    { from: 'workers', to: 'llm', state: 'after' },
  ],
}

export const systems: System[] = [wfp, rova, m365]
