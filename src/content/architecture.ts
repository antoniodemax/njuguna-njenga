export interface Decision {
  area: string
  what: string
  where: string
}

// One concrete, CV-backed example per area. Njuguna: correct anything that is off.
export const decisions: Decision[] = [
  {
    area: 'System design',
    what: 'Moved enterprise mobile-lending applications from a legacy monolith to microservices, improving modularity, latency and scalability.',
    where: 'Rova Credit Africa',
  },
  {
    area: 'Cloud infrastructure',
    what: 'Ran enterprise infrastructure on Azure, tuned for cost-efficiency and high availability. Earlier, cut monthly AWS hosting costs by 40% through auto-scaling policies.',
    where: 'M365 Connect, StartupHub',
  },
  {
    area: 'Database architecture',
    what: 'Cut API response latency by 50% with Redis caching, database indexing and query optimisation.',
    where: 'AI Innovations Inc',
  },
  {
    area: 'AI integration',
    what: 'Built an agentic AI starter kit that standardises how a team ships agent workflows, and LLM recruitment pipelines with LangChain.',
    where: 'UN World Food Programme, M365 Connect',
  },
  {
    area: 'Security',
    what: 'Shapes the architecture, security and data foundations of an AWS ProServe engagement for UN humanitarian logistics.',
    where: 'SupplyChainWise with AWS Professional Services',
  },
  {
    area: 'Scalability',
    what: 'Engineered real-time predictive systems that process more than 1M requests a day, and scaled a platform to 5,000+ active users with zero downtime.',
    where: 'AI Innovations Inc, StartupHub',
  },
  {
    area: 'Data pipelines',
    what: 'Architected automation pipelines on FastAPI, Celery and Redis, packaged with Docker.',
    where: 'M365 Connect',
  },
  {
    area: 'Software reliability',
    what: 'Built a platform for resilience to downtime so operations keep running, and reached 85% code coverage with automated test suites.',
    where: 'UN World Food Programme, M365 Connect',
  },
]
