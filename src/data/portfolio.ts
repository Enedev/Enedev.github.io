import type { ContentCrystalId } from '../game/types'
import type { Locale } from '../i18n/locale'

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

const SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'Dart',
  'SQL',
  'GDScript',
  'React',
  'Next.js',
  'Angular',
  'Flutter',
  'Tailwind CSS',
  'Redux',
  'Node.js',
  'Express',
  'NestJS',
  'Spring Boot',
  'REST APIs',
  'PostgreSQL',
  'Supabase',
  'MySQL',
  'MongoDB',
  'Firebase',
  'AWS',
  'Git',
  'Docker',
  'Kubernetes',
  'Vercel',
  'Vite',
]

const LINKS: PortfolioLink[] = [
  { label: 'Email', href: 'mailto:dev.neithangomez@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Enedev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neithan-gomez-65422235b/' },
]

const PROJECTS_EN: PortfolioProject[] = [
  {
    name: 'FluxLab',
    blurb:
      'LIMS web app for lab sample workflows. Spreadsheet ingest, generated reports, and a structured Supabase data layer that cuts manual ops time.',
    tags: ['React', 'NestJS', 'Supabase', 'Vercel'],
    href: 'https://fluxlab-front.vercel.app',
  },
  {
    name: 'FocusHub',
    blurb:
      'Student productivity platform with a custom interactive calendar (no date library), Pomodoro, dynamic tasks, and analytics on Vercel.',
    tags: ['Angular', 'NestJS', 'Vercel'],
    href: 'https://focushub-eight.vercel.app',
  },
  {
    name: 'Stickify',
    blurb:
      'Music-review social network on Supabase auth and metadata, with cached external APIs and a full unit/integration test suite.',
    tags: ['Angular', 'NestJS', 'Supabase'],
    href: 'https://github.com/Enedev/StickifyWithBack',
  },
  {
    name: 'NDGelato',
    blurb:
      'Flutter app with an interactive menu that renders ice-cream visuals from selected ingredients, plus realtime order tracking and delivery APIs.',
    tags: ['Flutter', 'Firebase'],
    href: 'https://github.com/Dhani-dev/NDGelato',
  },
  {
    name: 'Pokenetes API',
    blurb:
      'REST API in Node.js, Fastify, and TypeScript for Pokemon, trainers, and battles. Supabase data layer, Docker, coverage gates, and CI/CD to test and prod on Render.',
    tags: ['Fastify', 'TypeScript', 'Supabase', 'Docker'],
    href: 'https://github.com/Enedev/Pokenetes-API',
  },
  {
    name: 'Slime Game',
    blurb:
      'Co-op Unity adventure with Juesgape. C# gameplay, ShaderLab/HLSL, and a slime you steer through stages. Repo plus a Drive build folder.',
    tags: ['Unity', 'C#', 'ShaderLab'],
    href: 'https://github.com/Juesgape/Slime-game',
  },
  {
    name: 'Psyence',
    blurb:
      'Godot hobby project. Game-dev side quest using GDScript, matching the Unity / Godot lane on GitHub.',
    tags: ['Godot', 'GDScript'],
    href: 'https://github.com/Enedev/Psyence-Godot-game-',
  },
  {
    name: 'Pixel Portfolio',
    blurb: 'This arcade cabinet. Walk the grid, smash crystals, and see the rest of my work.',
    tags: ['React', 'Canvas', 'TypeScript'],
  },
]

const PROJECTS_ES: PortfolioProject[] = [
  {
    name: 'FluxLab',
    blurb:
      'App web LIMS para flujos de muestras de laboratorio. Ingesta de hojas de cálculo, reportes generados y una capa de datos estructurada en Supabase que reduce el tiempo de operación manual.',
    tags: ['React', 'NestJS', 'Supabase', 'Vercel'],
    href: 'https://fluxlab-front.vercel.app',
  },
  {
    name: 'FocusHub',
    blurb:
      'Plataforma de productividad para estudiantes con un calendario interactivo propio (sin librería de fechas), Pomodoro, tareas dinámicas y analítica en Vercel.',
    tags: ['Angular', 'NestJS', 'Vercel'],
    href: 'https://focushub-eight.vercel.app',
  },
  {
    name: 'Stickify',
    blurb:
      'Red social de reseñas de música con autenticación y metadatos en Supabase, APIs externas en caché y una suite completa de pruebas unitarias y de integración.',
    tags: ['Angular', 'NestJS', 'Supabase'],
    href: 'https://github.com/Enedev/StickifyWithBack',
  },
  {
    name: 'NDGelato',
    blurb:
      'App en Flutter con un menú interactivo que renderiza el helado según los ingredientes elegidos, más seguimiento de pedidos en tiempo real y APIs de domicilio.',
    tags: ['Flutter', 'Firebase'],
    href: 'https://github.com/Dhani-dev/NDGelato',
  },
  {
    name: 'Pokenetes API',
    blurb:
      'API REST en Node.js, Fastify y TypeScript para Pokémon, entrenadores y batallas. Capa de datos en Supabase, Docker, umbrales de cobertura y CI/CD a prueba y producción en Render.',
    tags: ['Fastify', 'TypeScript', 'Supabase', 'Docker'],
    href: 'https://github.com/Enedev/Pokenetes-API',
  },
  {
    name: 'Slime Game',
    blurb:
      'Aventura cooperativa en Unity con Juesgape. Jugabilidad en C#, ShaderLab/HLSL y un slime que recorres por los niveles. El repo más una carpeta de build en Drive.',
    tags: ['Unity', 'C#', 'ShaderLab'],
    href: 'https://github.com/Juesgape/Slime-game',
  },
  {
    name: 'Psyence',
    blurb:
      'Proyecto hobby en Godot. Un side quest de desarrollo de juegos con GDScript, en la misma línea Unity / Godot de GitHub.',
    tags: ['Godot', 'GDScript'],
    href: 'https://github.com/Enedev/Psyence-Godot-game-',
  },
  {
    name: 'Pixel Portfolio',
    blurb: 'Este gabinete arcade. Camina por la grilla, rompe cristales y mira el resto de mi trabajo.',
    tags: ['React', 'Canvas', 'TypeScript'],
  },
]

export const PORTFOLIO: Record<Locale, Record<ContentCrystalId, PortfolioSection>> = {
  en: {
    about: {
      title: 'About Me',
      kicker: 'PLAYER 1',
      body: 'Neithan Felipe Gomez Rivera. Final-year Systems Engineering student at Universidad de Medellin (top 5%, class of 2027) and full-stack web developer based in Medellin, Colombia. I ship web and mobile apps with robust REST architectures, CI/CD, and a hobby side quest in game dev (Unity / Godot).',
    },
    skills: {
      title: 'Skills',
      kicker: 'LOADOUT',
      body: 'This is my full-stack loadout: languages, UI, APIs, data, and DevOps. English B2 (400-hour certified program).',
      skills: SKILLS,
    },
    experience: {
      title: 'Experience',
      kicker: 'QUEST LOG',
      body: 'Teaching, university training, and shipping full-stack products. Education sits in this log too.',
      roles: [
        {
          title: 'Programming Teaching Monitor',
          org: 'Fundacion Rofe (Jovenes Creativos)',
          period: 'Mar 2022 — Nov 2022',
          points: [
            'Led in-person and remote programming fundamentals sessions for 30+ high-school students.',
            'Reviewed workshops, helped debug logic blocks, and tracked progress on virtual learning platforms.',
          ],
        },
        {
          title: 'Systems Engineering (9th semester)',
          org: 'Universidad de Medellin — Top 5%',
          period: 'Expected 2027',
          points: [
            'Core work across algorithms, OOP, data, and full-stack product builds.',
            'Certified English B2 program (400 hours) at the same university.',
          ],
        },
        {
          title: 'Systems Technician',
          org: 'SENA',
          period: 'Certified',
          points: ['Technical systems training before and alongside the engineering degree.'],
        },
        {
          title: 'Complementary training',
          org: 'Platzi',
          period: 'Ongoing',
          points: [
            'React path: architecture, state, and hooks.',
            'JavaScript DOM, ES6+, and async programming.',
            'SQL / MySQL design and optimization.',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      kicker: 'STAGE SELECT',
      body: 'These are my featured projects. Smash, read, and open the live stage if there is one.',
      projects: PROJECTS_EN,
    },
    contact: {
      title: 'Contact',
      kicker: 'INSERT COIN',
      body: 'Based in Medellin. Open to full-stack web, mobile, and product work. Ping the channels below.',
      links: LINKS,
    },
  },
  es: {
    about: {
      title: 'Sobre mí',
      kicker: 'PLAYER 1',
      body: 'Neithan Felipe Gómez Rivera. Estudiante de último año de Ingeniería de Sistemas en la Universidad de Medellín (top 5%, promoción 2027) y desarrollador web full-stack ubicado en Medellín, Colombia. Saco a producción apps web y móviles con arquitecturas REST sólidas, CI/CD, y un hobby paralelo en desarrollo de videojuegos (Unity / Godot).',
    },
    skills: {
      title: 'Habilidades',
      kicker: 'LOADOUT',
      body: 'Este es mi kit full-stack: lenguajes, UI, APIs, datos y DevOps. Inglés B2 (programa certificado de 400 horas).',
      skills: SKILLS,
    },
    experience: {
      title: 'Experiencia',
      kicker: 'QUEST LOG',
      body: 'Enseñanza, formación universitaria y entrega de productos full-stack. La educación también está en este registro.',
      roles: [
        {
          title: 'Monitor de programación',
          org: 'Fundación Rofé (Jóvenes Creativos)',
          period: 'Mar 2022 — Nov 2022',
          points: [
            'Dirigí sesiones presenciales y remotas de fundamentos de programación para más de 30 estudiantes de colegio.',
            'Revisé talleres, ayudé a depurar bloques de lógica y hice seguimiento del progreso en plataformas de aprendizaje virtual.',
          ],
        },
        {
          title: 'Ingeniería de Sistemas (noveno semestre)',
          org: 'Universidad de Medellín — Top 5%',
          period: 'Previsto 2027',
          points: [
            'Trabajo principal en algoritmos, POO, datos y construcción de productos full-stack.',
            'Programa certificado de inglés B2 (400 horas) en la misma universidad.',
          ],
        },
        {
          title: 'Técnico en sistemas',
          org: 'SENA',
          period: 'Certificado',
          points: ['Formación técnica en sistemas, antes y durante la carrera de ingeniería.'],
        },
        {
          title: 'Formación complementaria',
          org: 'Platzi',
          period: 'En curso',
          points: [
            'Ruta de React: arquitectura, estado y hooks.',
            'JavaScript: DOM, ES6+ y programación asíncrona.',
            'Diseño y optimización de SQL / MySQL.',
          ],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      kicker: 'STAGE SELECT',
      body: 'Estos son mis proyectos destacados. Rompe, lee y abre la versión en vivo si hay una.',
      projects: PROJECTS_ES,
    },
    contact: {
      title: 'Contacto',
      kicker: 'INSERT COIN',
      body: 'Ubicado en Medellín. Abierto a trabajo full-stack web, desarrollo móvil y a trabajar de forma productiva. Escríbeme por los canales de abajo.',
      links: LINKS,
    },
  },
}
