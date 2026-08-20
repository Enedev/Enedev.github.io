import { useEffect, useLayoutEffect, useRef } from 'react'
import {
  attackHitbox,
  createPlayer,
  drawPlayer,
  spawnPlayer,
  updatePlayer,
} from './Character'
import { createCrystals, drawCrystal, layoutCrystals, updateCrystal } from './Crystal'
import { createKeyboard, mergeAxis } from '../game/input'
import { aabb } from '../game/math'
import { drawParticles, spawnBurst, updateParticles } from '../game/particles'
import type { Axis, CrystalId, Particle } from '../game/types'

type GameCanvasProps = {
  paused?: boolean
  brokenIds: CrystalId[]
  touchAxis: Axis
  touchAttack: boolean
  onCrystalBroken: (id: CrystalId) => void
  onStep?: () => void
  onHit?: () => void
}

export function GameCanvas({
  paused = false,
  brokenIds,
  touchAxis,
  touchAttack,
  onCrystalBroken,
  onStep,
  onHit,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(paused)
  const brokenRef = useRef(brokenIds)
  const touchAxisRef = useRef(touchAxis)
  const touchAttackRef = useRef(touchAttack)
  const onBrokenRef = useRef(onCrystalBroken)
  const onStepRef = useRef(onStep)
  const onHitRef = useRef(onHit)

  useLayoutEffect(() => {
    pausedRef.current = paused
    brokenRef.current = brokenIds
    touchAxisRef.current = touchAxis
    touchAttackRef.current = touchAttack
    onBrokenRef.current = onCrystalBroken
    onStepRef.current = onStep
    onHitRef.current = onHit
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const keyboard = createKeyboard()
    const player = createPlayer()
    const crystals = createCrystals(brokenRef.current)
    const particles: Particle[] = []
    const smashed = new Set<CrystalId>(brokenRef.current)
    let spawned = false
    let frameId = 0
    let lastTime = performance.now()
    let elapsed = 0
    let running = true
    let lastWalkFrame = 0
    let prevTouchAttack = false

    const bounds = () => ({ width: canvas.width, height: canvas.height })

    const smash = (id: CrystalId, x: number, y: number, colors: string[]) => {
      const crystal = crystals.find((item) => item.id === id)
      if (!crystal || crystal.state !== 'idle') return
      crystal.state = 'breaking'
      spawnBurst(particles, x, y, colors)
      onHitRef.current?.()
    }

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width))
      canvas.height = Math.max(1, Math.floor(height))
      ctx.imageSmoothingEnabled = false
      layoutCrystals(crystals, bounds())
      if (!spawned) {
        spawnPlayer(player, bounds())
        spawned = true
        return
      }
      updatePlayer(player, { x: 0, y: 0 }, 0, bounds(), false)
    }

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      elapsed += dt

      const queuedAttack = keyboard.consumeAttack()
      const touchPressed = touchAttackRef.current && !prevTouchAttack
      prevTouchAttack = touchAttackRef.current
      const attacking = !pausedRef.current && (queuedAttack || touchPressed)

      if (!pausedRef.current) {
        const axis = mergeAxis(keyboard.axis(), touchAxisRef.current)
        updatePlayer(player, axis, dt, bounds(), attacking)

        if (player.isMoving && player.frame !== lastWalkFrame) {
          lastWalkFrame = player.frame
          onStepRef.current?.()
        }

        const strike = attacking ? attackHitbox(player) : null

        for (const crystal of crystals) {
          if (crystal.state !== 'idle') continue
          const bodyHit = aabb(player, crystal)
          const attackHit = strike ? aabb(strike, crystal) : false
          if (bodyHit || attackHit) {
            smash(
              crystal.id,
              crystal.x + crystal.width / 2,
              crystal.y + crystal.height / 2,
              [crystal.color, crystal.highlight, '#ffffff'],
            )
          }
        }

        for (const crystal of crystals) {
          if (updateCrystal(crystal, dt) && !smashed.has(crystal.id)) {
            crystal.state = 'broken'
            smashed.add(crystal.id)
            onBrokenRef.current(crystal.id)
          }
        }
      }

      updateParticles(particles, dt)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const crystal of crystals) drawCrystal(ctx, crystal, elapsed)
      drawPlayer(ctx, player)
      drawParticles(ctx, particles)
      frameId = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    keyboard.attach()
    frameId = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      keyboard.detach()
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 block h-full w-full bg-transparent"
      aria-label="Pixel portfolio game. Use WASD or arrow keys to move. Press Space or J to smash crystals."
    />
  )
}
