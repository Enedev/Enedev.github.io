import type { Axis, Direction, Player, Rect, WorldBounds } from './types'
import { clamp } from './math'
import { PIXEL, drawSprite } from './sprite'

const COLS = 12
const ROWS = 16
const WALK_FPS = 8
const ATTACK_TIME = 0.22

export const PLAYER_WIDTH = COLS * PIXEL
export const PLAYER_HEIGHT = ROWS * PIXEL
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

const IDLE: Record<Exclude<Direction, 'left'>, readonly string[]> = {
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

const WALK: Record<Exclude<Direction, 'left'>, readonly string[]> = {
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
    '.MM...CC.MM.',
    'MM........MM',
    '.MM......MM.',
    'BB........BB',
    '.BB......BB.',
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
    '.MM...CC.MM.',
    'MM........MM',
    '.MM......MM.',
    'BB........BB',
    '.BB......BB.',
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
    '....MM.MM...',
    '...MM...MM..',
    '..BB....BB..',
    '.BBB...BBB..',
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
    animTime: 0,
    frame: 0,
    attackTime: 0,
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
  attacking = false,
) {
  const length = Math.hypot(axis.x, axis.y)
  player.isMoving = length > 0
  player.animTime += dt
  player.attackTime = Math.max(0, player.attackTime - dt)

  if (attacking && player.attackTime <= 0) {
    player.attackTime = ATTACK_TIME
  }

  if (player.isMoving) {
    const nx = axis.x / length
    const ny = axis.y / length
    player.x += nx * player.speed * dt
    player.y += ny * player.speed * dt
    player.direction = resolveDirection(axis, player.direction)
    player.frame = Math.floor(player.animTime * WALK_FPS) % 2
  } else {
    player.frame = 0
  }

  player.x = clamp(player.x, 0, Math.max(0, bounds.width - player.width))
  player.y = clamp(player.y, 0, Math.max(0, bounds.height - player.height))
}

export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  const bob =
    player.isMoving || player.attackTime > 0
      ? 0
      : Math.sin(player.animTime * 7) > 0
        ? 0
        : 2
  const lunge = player.attackTime > 0 ? lungeOffset(player.direction) : { x: 0, y: 0 }
  const x = Math.round(player.x + lunge.x)
  const y = Math.round(player.y + bob + lunge.y)
  const flipX = player.direction === 'left'
  const facing = player.direction === 'left' ? 'right' : player.direction
  const pose = player.isMoving && player.frame === 1 ? WALK[facing] : IDLE[facing]

  ctx.fillStyle = 'rgba(7, 4, 15, 0.45)'
  ctx.fillRect(x + 8, y + player.height - 6, player.width - 16, 6)
  drawSprite(ctx, pose, x, y, PALETTE, { flipX })
}

export function attackHitbox(player: Player): Rect {
  const reach = 26
  const thickness = 28
  switch (player.direction) {
    case 'up':
      return {
        x: player.x + 10,
        y: player.y - reach,
        width: player.width - 20,
        height: reach + 8,
      }
    case 'down':
      return {
        x: player.x + 10,
        y: player.y + player.height - 8,
        width: player.width - 20,
        height: reach,
      }
    case 'left':
      return {
        x: player.x - reach,
        y: player.y + 16,
        width: reach + 8,
        height: thickness,
      }
    case 'right':
      return {
        x: player.x + player.width - 8,
        y: player.y + 16,
        width: reach,
        height: thickness,
      }
  }
}

function lungeOffset(direction: Direction) {
  switch (direction) {
    case 'up':
      return { x: 0, y: -4 }
    case 'down':
      return { x: 0, y: 4 }
    case 'left':
      return { x: -4, y: 0 }
    case 'right':
      return { x: 4, y: 0 }
  }
}

function resolveDirection(axis: Axis, fallback: Direction): Direction {
  if (axis.x < 0) return 'left'
  if (axis.x > 0) return 'right'
  if (axis.y < 0) return 'up'
  if (axis.y > 0) return 'down'
  return fallback
}
