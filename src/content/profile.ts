export const profile = {
  name: 'Njuguna Njenga',
  role: 'Senior AI engineer and technical architect',
  location: 'Nairobi, Kenya',
  statement: 'I design AI systems that replace the workarounds.',
  intro:
    'Senior AI engineer and technical architect in Nairobi. Right now I am an AWS ProServe consultant on supply-chain systems for the UN World Food Programme.',
  email: 'simonnjenganjuguna@gmail.com',
  phone: '+254 728 240411',
  // The same number is on WhatsApp.
  whatsapp: 'https://wa.me/254728240411',
  linkedin: 'https://www.linkedin.com/in/simon-njuguna-692557104/',
  github: 'https://github.com/snjugunanjenga',
  githubProfiles: [
    {
      handle: 'snjugunanjenga',
      url: 'https://github.com/snjugunanjenga',
      about: 'AI agents, voice and coding tutors, hackathon builds and coursework.',
    },
    {
      handle: 'simpleHacker0893',
      url: 'https://github.com/simpleHacker0893',
      about: 'Product builds: Ethanel, Venture Route and Mazao, an offline-first app for Kenyan micro-merchants.',
    },
  ],
  // Every figure here is from the CV. `value` counts up when the page loads.
  stats: [
    { value: 10, suffix: '+', label: 'years building software' },
    { value: 1000, suffix: '+', label: 'WFP users on the platform I built' },
    { value: 85, suffix: '%', label: 'better workflows at WFP, at the top of an 80 to 85% range' },
    { value: 1, suffix: 'M+', label: 'requests a day on systems I engineered' },
  ],
  cv: '/njuguna-njenga-cv.pdf',
} as const
