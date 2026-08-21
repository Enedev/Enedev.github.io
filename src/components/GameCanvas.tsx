import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPlayer, drawPlayer, spawnPlayer, updatePlayer } from './Character'
import { createCrystals, createRestartCrystal, drawCrystal, layoutCrystals, updateCrystal } from './Crystal'
import { CONTENT_CRYSTAL_IDS } from '../game/crystal'
import { createKeyboard } from '../game/input'
import { aabb } from '../game/math'
import { drawParticles, spawnBurst, updateParticles } from '../game/particles'
import type { Axis, ContentCrystalId, CrystalId, Particle } from '../game/types'

type GameCanvasProps = {
  paused?: boolean
  brokenIds: ContentCrystalId[]
  crystalLabels: Record<CrystalId, string>
  canvasLabel: string
  onCrystalBroken: (id: ContentCrystalId) => void
  onReset: () => void
  onStep?: () => void
  onHit?: () => void
}

type PointerGoal = {
  active: boolean
  x: number
  y: number
}

export function GameCanvas({
  paused = false,
  brokenIds,
  crystalLabels,
  canvasLabel,
  onCrystalBroken,
  onReset,
  onStep,
  onHit,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(paused)
  const brokenRef = useRef(brokenIds)
  const labelsRef = useRef(crystalLabels)
  const onBrokenRef = useRef(onCrystalBroken)
  const onResetRef = useRef(onReset)
  const onStepRef = useRef(onStep)
  const onHitRef = useRef(onHit)

  useLayoutEffect(() => {
    pausedRef.current = paused
    brokenRef.current = brokenIds
    labelsRef.current = crystalLabels
    onBrokenRef.current = onCrystalBroken
    onResetRef.current = onReset
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
    const pointer: PointerGoal = { active: false, x: 0, y: 0 }
    let spawned = false
    let frameId = 0
    let lastTime = performance.now()
    let elapsed = 0
    let running = true
    let spawnedRetry = false
    let lastWalkFrame = 0

    const bounds = () => ({ width: canvas.width, height: canvas.height })

    const toCanvas = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / Math.max(rect.width, 1)
      const scaleY = canvas.height / Math.max(rect.height, 1)
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      }
    }

    const pointerAxis = (): Axis => {
      if (!pointer.active) return { x: 0, y: 0 }
      const dx = pointer.x - (player.x + player.width / 2)
      const dy = pointer.y - (player.y + player.height / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < 12) {
        pointer.active = false
        return { x: 0, y: 0 }
      }
      return { x: dx / dist, y: dy / dist }
    }

    const smash = (id: CrystalId, x: number, y: number, colors: string[]) => {
      const crystal = crystals.find((item) => item.id === id)
      if (!crystal || crystal.state !== 'idle') return
      crystal.state = 'breaking'
      spawnBurst(particles, x, y, colors)
      onHitRef.current?.()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (pausedRef.current) return
      event.preventDefault()
      canvas.setPointerCapture(event.pointerId)
      const point = toCanvas(event)
      pointer.active = true
      pointer.x = point.x
      pointer.y = point.y
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.active) return
      const point = toCanvas(event)
      pointer.x = point.x
      pointer.y = point.y
    }

    const onPointerUp = () => {
      pointer.active = false
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

      if (!pausedRef.current) {
        const keys = keyboard.axis()
        const usingKeys = keys.x !== 0 || keys.y !== 0
        const axis = usingKeys ? keys : pointerAxis()
        const sprinting = keyboard.isSprinting()
        updatePlayer(player, axis, dt, bounds(), sprinting)

        if (player.isMoving && player.frame !== lastWalkFrame) {
          lastWalkFrame = player.frame
          onStepRef.current?.()
        }

        for (const crystal of crystals) {
          if (crystal.state !== 'idle') continue
          if (!aabb(player, crystal)) continue
          smash(
            crystal.id,
            crystal.x + crystal.width / 2,
            crystal.y + crystal.height / 2,
            [crystal.color, crystal.highlight, '#ffffff'],
          )
        }

        for (const crystal of crystals) {
          if (updateCrystal(crystal, dt) && !smashed.has(crystal.id)) {
            crystal.state = 'broken'
            smashed.add(crystal.id)

            if (crystal.id === 'restart') {
              onResetRef.current()
              continue
            }

            onBrokenRef.current(crystal.id)
            const cleared = CONTENT_CRYSTAL_IDS.every((id) => smashed.has(id))
            if (cleared && !spawnedRetry) {
              spawnedRetry = true
              const retry = createRestartCrystal(player.y > canvas.height / 2)
              crystals.push(retry)
              layoutCrystals([retry], bounds())
            }
          }
        }
      }

      updateParticles(particles, dt)

      const labels = labelsRef.current
      for (const crystal of crystals) {
        crystal.label = labels[crystal.id] ?? crystal.label
      }

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
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    frameId = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      keyboard.detach()
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 block h-full w-full cursor-pointer touch-none bg-transparent"
      aria-label={canvasLabel}
    />
  )
}
