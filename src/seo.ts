import { about } from './content/about'
import { education } from './content/record'
import { profile } from './content/profile'

export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

/** Structured data that tells search engines this page is one person's profile. */
export function profileJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteUrl}/`,
    name: `${profile.name}, ${profile.role}`,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role,
      description: about.paragraphs.slice(0, 2).join(' '),
      url: `${siteUrl}/`,
      image: `${siteUrl}/og.png`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone.replace(/\s/g, ''),
      address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: [
        'Artificial intelligence',
        'Agentic AI',
        'Retrieval-augmented generation',
        'LLM automation',
        'Software architecture',
        'Cloud architecture',
        'Microservices',
        'Fintech',
      ],
    },
  }
}
