import type { Axis, Direction, Player, WorldBounds } from './types'
import { clamp } from './math'

const WALK_FPS = 8
const RUN_FPS = 12
const TURN_SPEED = 14

export const PLAYER_WIDTH = 56
export const PLAYER_HEIGHT = 48
export const PLAYER_SPEED = 140
export const PLAYER_SPRINT = 260

const SHIP_SRC = '/sprites/ship.png'
const shipImage = new Image()
shipImage.src = SHIP_SRC

function lerpAngle(from: number, to: number, t: number) {
  let diff = to - from
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return from + diff * t
}

export function createPlayer(): Player {
  return {
    x: 0,
    y: 0,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    speed: PLAYER_SPEED,
    direction: 'up',
    angle: 0,
    isMoving: false,
    isSprinting: false,
    animTime: 0,
    frame: 0,
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
  sprinting = false,
) {
  const length = Math.hypot(axis.x, axis.y)
  player.isMoving = length > 0
  player.isSprinting = sprinting && player.isMoving
  player.animTime += dt

  if (player.isMoving) {
    const speed = player.isSprinting ? PLAYER_SPRINT : PLAYER_SPEED
    const fps = player.isSprinting ? RUN_FPS : WALK_FPS
    const nx = axis.x / length
    const ny = axis.y / length
    player.x += nx * speed * dt
    player.y += ny * speed * dt
    player.direction = resolveDirection(axis, player.direction)
    player.angle = lerpAngle(player.angle, Math.atan2(nx, -ny), Math.min(1, dt * TURN_SPEED))
    player.frame = Math.floor(player.animTime * fps) % 2
  } else {
    player.frame = 0
  }

  player.x = clamp(player.x, 0, Math.max(0, bounds.width - player.width))
  player.y = clamp(player.y, 0, Math.max(0, bounds.height - player.height))
}

export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  const bob = player.isMoving ? 0 : Math.sin(player.animTime * 5) > 0 ? 0 : 1
  const cx = Math.round(player.x + player.width / 2)
  const cy = Math.round(player.y + player.height / 2 + bob)
  const w = player.width
  const h = player.height

  ctx.fillStyle = 'rgba(7, 4, 15, 0.4)'
  ctx.beginPath()
  ctx.ellipse(cx, player.y + player.height - 2, w * 0.28, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(player.angle)

  if (player.isMoving) {
    const pulse = 0.55 + Math.sin(player.animTime * (player.isSprinting ? 48 : 28)) * 0.45
    const length = (player.isSprinting ? 22 : 14) * pulse
    ctx.fillStyle = `rgba(255, 210, 90, ${0.35 + pulse * 0.45})`
    ctx.beginPath()
    ctx.moveTo(-5, h * 0.28)
    ctx.lineTo(5, h * 0.28)
    ctx.lineTo(0, h * 0.28 + length)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = `rgba(255, 255, 220, ${0.45 + pulse * 0.4})`
    ctx.beginPath()
    ctx.moveTo(-2, h * 0.28)
    ctx.lineTo(2, h * 0.28)
    ctx.lineTo(0, h * 0.28 + length * 0.65)
    ctx.closePath()
    ctx.fill()
  }

  if (shipImage.complete && shipImage.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(shipImage, -w / 2, -h / 2, w, h)
  }

  ctx.restore()
}

function resolveDirection(axis: Axis, fallback: Direction): Direction {
  if (Math.abs(axis.x) >= Math.abs(axis.y)) {
    if (axis.x < 0) return 'left'
    if (axis.x > 0) return 'right'
  }
  if (axis.y < 0) return 'up'
  if (axis.y > 0) return 'down'
  return fallback
}
