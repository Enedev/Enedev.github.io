import type { Axis, Direction, Player, WorldBounds } from './types'

const SCALE = 4
const COLS = 12
const ROWS = 16

export const PLAYER_WIDTH = COLS * SCALE
export const PLAYER_HEIGHT = ROWS * SCALE
export const PLAYER_SPEED = 140

const PALETTE: Record<string, string> = {
  H: '#3b1d63',
  S: '#ffc89a',
  W: '#f8f1ff',
  E: '#1a0a28',
  C: '#5ef2ff',
  B: '#ffe566',
  M: '#ff4fd8',
}

const SPRITES: Record<Exclude<Direction, 'left'>, readonly string[]> = {
  down: [
    '....HHHH....',
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HHSSSSHH..',
    '.HSSWSSWSSH.',
    '.HSSESSSESH.',
    '..SS.SS.SS..',
    '...CCCCCC...',
    '..CCCCCCCC..',
    '.CCCCCCCCCC.',
    '.CCCBBBBCCC.',
    '..MM.CC.MM..',
    '..MM....MM..',
    '..MM....MM..',
    '..BB....BB..',
    '.BBB....BBB.',
  ],
  up: [
    '....HHHH....',
    '...HHHHHH...',
    '..HHHHHHHH..',
    '.HHHHHHHHHH.',
    '.HHHHHHHHHH.',
    '..HHHHHHHH..',
    '...HHHHHH...',
    '...CCCCCC...',
    '..CCCCCCCC..',
    '.CCCCCCCCCC.',
    '.CCCBBBBCCC.',
    '..MM.CC.MM..',
    '..MM....MM..',
    '..MM....MM..',
    '..BB....BB..',
    '.BBB....BBB.',
  ],
  right: [
    '...HHHHH....',
    '..HHHHHHH...',
    '..HHHHHSS...',
    '..HHSSSWSS..',
    '..HSSSES....',
    '..SSSSS.....',
    '...CCCCC....',
    '..CCCCCCCC..',
    '..CCCCCCC...',
    '..CCCBBB....',
    '...MM.CC....',
    '...MM..MM...',
    '...MM..MM...',
    '...BB..BB...',
    '..BBB..BBB..',
    '............',
  ],
}

export function createPlayer(): Player {
  return {
    x: 0,
    y: 0,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    speed: PLAYER_SPEED,
    direction: 'down',
    isMoving: false,
  }
}

export function spawnPlayer(player: Player, bounds: WorldBounds) {
  player.x = Math.round((bounds.width - player.width) / 2)
  player.y = Math.round((bounds.height - player.height) / 2)
}

export function updatePlayer(
  player: Player,
  axis: Axis,
  dt: number,
  bounds: WorldBounds,
) {
  const length = Math.hypot(axis.x, axis.y)
  player.isMoving = length > 0

  if (player.isMoving) {
    const nx = axis.x / length
    const ny = axis.y / length
    player.x += nx * player.speed * dt
    player.y += ny * player.speed * dt
    player.direction = resolveDirection(axis, player.direction)
  }

  player.x = clamp(player.x, 0, Math.max(0, bounds.width - player.width))
  player.y = clamp(player.y, 0, Math.max(0, bounds.height - player.height))
}

export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  const x = Math.round(player.x)
  const y = Math.round(player.y)
  const flipX = player.direction === 'left'
  const rows =
    player.direction === 'left' ? SPRITES.right : SPRITES[player.direction]

  ctx.fillStyle = 'rgba(7, 4, 15, 0.45)'
  ctx.fillRect(x + 8, y + player.height - 6, player.width - 16, 6)

  for (let row = 0; row < rows.length; row += 1) {
    const line = rows[row]
    if (!line) continue

    for (let col = 0; col < line.length; col += 1) {
      const color = PALETTE[line[col] ?? '']
      if (!color) continue
      const drawCol = flipX ? line.length - 1 - col : col
      ctx.fillStyle = color
      ctx.fillRect(x + drawCol * SCALE, y + row * SCALE, SCALE, SCALE)
    }
  }
}

function resolveDirection(axis: Axis, fallback: Direction): Direction {
  if (axis.x < 0) return 'left'
  if (axis.x > 0) return 'right'
  if (axis.y < 0) return 'up'
  if (axis.y > 0) return 'down'
  return fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
