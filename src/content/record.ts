export interface RecordEntry {
  dates: string
  role: string
  company: string
  change: string
}

// Newest first. Dates exactly as on the CV.
export const record: RecordEntry[] = [
  {
    dates: 'Oct 2026 to present',
    role: 'Full stack AI developer',
    company: 'SupplyChainWise, for the UN World Food Programme',
    change:
      'Replaced fragmented legacy systems with a Next.js platform serving 1,000+ WFP users. Unified email chains and Excel workbooks into one data source, improving workflows by 80 to 85%. Built an agentic AI starter kit for the team.',
  },
  {
    dates: 'Sep 2026 to present',
    role: 'AWS ProServe consultant, senior AI engineer',
    company: 'SupplyChainWise with AWS Professional Services',
    change:
      'Generative AI and cloud delivery for UN humanitarian logistics. Shapes architecture, security and data foundations, including discovery of legacy ERP and logistics systems. Runs agile delivery with AWS, client and partner teams.',
  },
  {
    dates: 'May 2026 to present',
    role: 'AI researcher, freelance',
    company: 'iCog Labs',
    change:
      'Hands-on research in machine learning, computational linguistics, computer vision and mobile robotics. Turns the findings into technical overviews, live-code demonstrations and presentations for international partners.',
  },
  {
    dates: 'Apr 2026 to Aug 2026',
    role: 'Senior AI software engineer and architect',
    company: 'Rova Credit Africa',
    change:
      'Led the architecture of enterprise-scale fintech mobile-lending applications on React, Node.js, Python and GCP, and the move from a legacy monolith to microservices.',
  },
  {
    dates: 'Mar 2025 to Dec 2025',
    role: 'Full-stack developer and AI specialist',
    company: 'AI Innovations Inc',
    change:
      'Built AI-driven SaaS platforms with TensorFlow and OpenAI models. Engineered real-time predictive systems handling 1M+ requests a day and cut API response latency by 50% with Redis caching, indexing and query optimisation.',
  },
  {
    dates: 'Jan 2022 to Dec 2025',
    role: 'Senior Python LLM and DevOps engineer',
    company: 'M365 Connect',
    change:
      'Architected recruitment automation pipelines with FastAPI, LangChain, Celery, Redis and Docker on Azure. Reached 85% code coverage and drove TypeScript adoption across engineering.',
  },
  {
    dates: 'Jun 2018 to Feb 2020',
    role: 'Full-stack developer',
    company: 'StartupHub',
    change:
      'Built web platforms from the ground up on the MERN stack. Scaled to 5,000+ active users with zero downtime and cut monthly AWS hosting costs by 40%.',
  },
]

export const education = {
  dates: 'Jan 2012 to Sept 2015',
  degree: 'BSc Mathematics and Computer Science',
  school: 'Multimedia University of Kenya',
}
