import type { CrystalId } from '../game/types'

export type PortfolioLink = {
  label: string
  href: string
}

export type PortfolioProject = {
  name: string
  blurb: string
  tags: string[]
  href?: string
}

export type PortfolioRole = {
  title: string
  org: string
  period: string
  points: string[]
}

export type PortfolioSection = {
  title: string
  kicker: string
  body: string
  skills?: string[]
  roles?: PortfolioRole[]
  projects?: PortfolioProject[]
  links?: PortfolioLink[]
}

export const PORTFOLIO: Record<CrystalId, PortfolioSection> = {
  about: {
    title: 'About Me',
    kicker: 'PLAYER 1',
    body: 'I am Neithan, a software engineer who likes making interfaces feel like places you can walk through. This cabinet is my resume: smash a crystal, read a chapter, keep exploring.',
  },
  skills: {
    title: 'Skills',
    kicker: 'LOADOUT',
    body: 'Typed UI systems, canvas / game loops, and product-minded frontend work. Comfortable owning a feature from sketch to ship.',
    skills: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Canvas API',
      'Node.js',
      'Git',
      'Accessibility',
      'Design systems',
    ],
  },
  experience: {
    title: 'Experience',
    kicker: 'QUEST LOG',
    body: 'Building web apps with a bias toward clear types, tight feedback loops, and UI that still works on a phone.',
    roles: [
      {
        title: 'Software Engineer',
        org: 'Independent / product teams',
        period: '2022 — Present',
        points: [
          'Shipped interactive React + TypeScript features with an eye for motion and state.',
          'Turned messy product requirements into small, testable UI slices.',
        ],
      },
      {
        title: 'Frontend Developer',
        org: 'Web products',
        period: '2019 — 2022',
        points: [
          'Owned component libraries, performance passes, and pixel-accurate layouts.',
          'Partnered with design to keep the build faithful without blocking shipping.',
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    kicker: 'STAGE SELECT',
    body: 'A few worlds I have built. Swap these entries in src/data/portfolio.ts when you want the real list on screen.',
    projects: [
      {
        name: 'Pixel Portfolio',
        blurb: 'This arcade cabinet. Canvas movement, crystal collisions, and React overlays for the actual resume.',
        tags: ['React', 'Canvas', 'Tailwind'],
      },
      {
        name: 'Typed UI Kits',
        blurb: 'Reusable component systems with strict props, keyboard paths, and theme tokens.',
        tags: ['TypeScript', 'Design systems'],
      },
      {
        name: 'Realtime Dashboards',
        blurb: 'Live-updating views where the boring parts (loading, empty, error) are treated as first-class states.',
        tags: ['React', 'Data viz'],
      },
    ],
  },
  contact: {
    title: 'Contact',
    kicker: 'INSERT COIN',
    body: 'Want to co-op on a product, a game-like UI, or a nasty frontend bug? Send a ping.',
    links: [
      { label: 'Email', href: 'mailto:hello@neithan.dev' },
      { label: 'GitHub', href: 'https://github.com/neithan' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neithan' },
    ],
  },
}
