import type { Crystal, CrystalId, WorldBounds } from './types'
import { PIXEL, drawSprite } from './sprite'

const COLS = 10
const ROWS = 14
export const CRYSTAL_SIZE = { width: COLS * PIXEL, height: ROWS * PIXEL }
export const BREAK_DURATION = 0.42

const BODY: readonly string[] = [
  '....CC....',
  '...CCCC...',
  '..CCCCCC..',
  '.CCCCCCCC.',
  '.CCWWCCCC.',
  '.CWWCCCCC.',
  '.CCCCCCCC.',
  '.CCCCCCCC.',
  '..CCCCCC..',
  '...CCCC...',
  '....CC....',
  '....SS....',
  '...SSSS...',
  '..SSSSSS..',
]

type CrystalTheme = {
  label: string
  nx: number
  ny: number
  C: string
  W: string
  S: string
}

export const CRYSTAL_LAYOUT: Record<CrystalId, CrystalTheme> = {
  about: {
    label: 'ABOUT',
    nx: 0.22,
    ny: 0.34,
    C: '#5ef2ff',
    W: '#e9ffff',
    S: '#2a6d75',
  },
  skills: {
    label: 'SKILLS',
    nx: 0.78,
    ny: 0.3,
    C: '#ff4fd8',
    W: '#ffd1f4',
    S: '#7a2a68',
  },
  experience: {
    label: 'XP',
    nx: 0.24,
    ny: 0.74,
    C: '#ffe566',
    W: '#fff4b0',
    S: '#7a6a22',
  },
  projects: {
    label: 'WORK',
    nx: 0.76,
    ny: 0.72,
    C: '#7cff6b',
    W: '#d8ffd1',
    S: '#2f6d28',
  },
  contact: {
    label: 'PING',
    nx: 0.5,
    ny: 0.16,
    C: '#c084fc',
    W: '#f3e8ff',
    S: '#5b2d96',
  },
}

export const ALL_CRYSTAL_IDS = Object.keys(CRYSTAL_LAYOUT) as CrystalId[]

export function createCrystals(brokenIds: Iterable<CrystalId>): Crystal[] {
  const broken = new Set(brokenIds)

  return ALL_CRYSTAL_IDS.filter((id) => !broken.has(id)).map((id) => {
    const theme = CRYSTAL_LAYOUT[id]
    return {
      id,
      nx: theme.nx,
      ny: theme.ny,
      x: 0,
      y: 0,
      width: CRYSTAL_SIZE.width,
      height: CRYSTAL_SIZE.height,
      state: 'idle',
      breakTime: 0,
      label: theme.label,
      color: theme.C,
      highlight: theme.W,
      shadow: theme.S,
    }
  })
}

export function layoutCrystals(crystals: Crystal[], bounds: WorldBounds) {
  for (const crystal of crystals) {
    crystal.x = Math.round(crystal.nx * bounds.width - crystal.width / 2)
    crystal.y = Math.round(crystal.ny * bounds.height - crystal.height / 2)
    crystal.x = Math.max(8, Math.min(bounds.width - crystal.width - 8, crystal.x))
    crystal.y = Math.max(24, Math.min(bounds.height - crystal.height - 8, crystal.y))
  }
}

export function updateCrystal(crystal: Crystal, dt: number) {
  if (crystal.state !== 'breaking') return false
  crystal.breakTime += dt
  return crystal.breakTime >= BREAK_DURATION
}

export function drawCrystal(
  ctx: CanvasRenderingContext2D,
  crystal: Crystal,
  time: number,
) {
  if (crystal.state === 'broken') return

  const floatY = Math.sin(time * 2.4 + crystal.nx * 8) * 3
  const shake =
    crystal.state === 'breaking' ? Math.sin(crystal.breakTime * 80) * 3 : 0
  const skipChance = crystal.state === 'breaking' ? crystal.breakTime / BREAK_DURATION : 0
  const x = crystal.x + shake
  const y = crystal.y + floatY

  ctx.fillStyle = 'rgba(7, 4, 15, 0.4)'
  ctx.fillRect(x + 8, y + crystal.height - 4, crystal.width - 16, 6)

  drawSprite(ctx, BODY, x, y, {
    C: crystal.color,
    W: crystal.highlight,
    S: crystal.shadow,
  }, { skipChance })

  ctx.font = '8px "Press Start 2P", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillStyle = crystal.color
  ctx.fillText(crystal.label, x + crystal.width / 2, y - 4)
}
