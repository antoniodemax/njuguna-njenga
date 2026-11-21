export interface SkillGroup {
  name: string
  items: string[]
}

// Grouped as on the CV.
export const skills: SkillGroup[] = [
  {
    name: 'AI and ML',
    items: [
      'Agentic AI',
      'RAG',
      'Amazon Bedrock AgentCore',
      'OpenAI API',
      'LangChain',
      'Vertex AI',
      'Model fine-tuning',
      'Vector embeddings',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Transformers',
      'NLP',
      'Computer vision',
      'On-device ML (TensorFlow Lite, CoreML)',
      'Voice and vision pipelines (Whisper, MobileNet)',
    ],
  },
  {
    name: 'Backend',
    items: [
      'Node.js',
      'Python (FastAPI, Django)',
      'TypeScript',
      'REST and GraphQL APIs',
      'Neo4j',
      'Celery',
      'Redis',
      'Docker',
    ],
  },
  {
    name: 'Frontend and mobile',
    items: [
      'React',
      'Next.js (App Router, Server Components)',
      'Tailwind CSS',
      'shadcn/ui',
      'React Native',
      'Expo',
      'Flutter',
      'Kotlin',
      'Android SDK',
    ],
  },
  {
    name: 'Cloud and DevOps',
    items: ['AWS', 'Azure ML', 'GCP', 'Kubernetes', 'Terraform', 'GitHub Actions', 'CI/CD pipelines'],
  },
  {
    name: 'Fintech and databases',
    items: [
      'M-Pesa Daraja',
      'BitSacco API',
      'Hedera Hashgraph',
      'Stripe Checkout',
      'PostgreSQL',
      'MongoDB',
      'Supabase',
      'Neon',
      'Convex',
      'Sanity',
      'AuroraDB',
      'CockroachDB',
      'Pinecone',
    ],
  },
  {
    name: 'Data engineering',
    items: [
      'Apache Airflow',
      'Azure Data Factory',
      'BigQuery ML',
      'Selenium',
      'SQL',
      'Data modelling',
      'Power BI',
      'Tableau',
    ],
  },
]
