export interface Certification {
  name: string
  issuer?: string
  year?: string
  inProgress?: boolean
}

export interface CertificationGroup {
  name: string
  items: Certification[]
}

// Grouped as on the CV.
export const certifications: CertificationGroup[] = [
  {
    name: 'Cloud and AI',
    items: [
      { name: 'AWS Solutions Architect Professional', inProgress: true },
      { name: 'AWS Certified Generative AI Developer, Professional (AIP-C01)', inProgress: true },
      { name: 'AWS AI Practitioner', year: '2026' },
      { name: 'Amazon Bedrock AgentCore Getting Started', issuer: 'AWS', year: '2026' },
      { name: 'AWS Engagement Security Training for Partners', issuer: 'AWS', year: '2026' },
      { name: 'Google Cloud Professional Cloud Architect' },
      { name: 'Kubernetes and Cloud Native Associate (KCNA)', issuer: 'Linux Foundation', year: '2026' },
      { name: 'Introduction to Linux', issuer: 'Linux Foundation', year: '2026' },
      { name: 'GitHub Actions Professional Certificate' },
      { name: 'AI for Software Engineering', issuer: 'Power Learn Project', year: '2025' },
      { name: 'What Is Generative AI' },
      { name: 'Career Essentials in Data Analysis', issuer: 'Microsoft and LinkedIn' },
    ],
  },
  {
    name: 'Computer science and deep learning',
    items: [
      { name: 'CS50 Artificial Intelligence with Python', issuer: 'Harvard', year: '2026' },
      { name: 'CS50 Introduction to Computer Science', issuer: 'Harvard', year: '2026' },
      { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2026' },
      { name: 'PyTorch for Deep Learning', year: '2026' },
      { name: 'Software Design Architect', issuer: 'Coursera', year: '2026' },
    ],
  },
  {
    name: 'Blockchain',
    items: [
      { name: 'Hedera Hashgraph Developer Certificate', year: '2025' },
      { name: 'Building an Ethereum Blockchain App: Smart Contracts', year: '2025' },
    ],
  },
  {
    name: 'Hackathons and awards',
    items: [
      {
        name: 'AI Data Harness Solution Developer, Open Agent Hackathon',
        issuer: 'Zetaris with SpaceXSI',
        year: 'Nov 2026',
      },
      {
        name: 'MeTTa Builder, project delivered and demonstrated',
        issuer: 'BASIX Omniversity Hackathon',
        year: 'Oct 2026',
      },
      { name: 'Team captain, 4th Hack-Nation Hackathon', year: '2026' },
    ],
  },
]
