import { useEffect, useRef } from 'react'
import {
  createPlayer,
  drawPlayer,
  spawnPlayer,
  updatePlayer,
} from './Character'
import { createKeyboard } from '../game/input'

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const keyboard = createKeyboard()
    const player = createPlayer()
    let spawned = false
    let frameId = 0
    let lastTime = performance.now()
    let running = true

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width))
      canvas.height = Math.max(1, Math.floor(height))
      ctx.imageSmoothingEnabled = false

      const bounds = { width: canvas.width, height: canvas.height }
      if (!spawned) {
        spawnPlayer(player, bounds)
        spawned = true
        return
      }

      updatePlayer(player, { x: 0, y: 0 }, 0, bounds)
    }

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      updatePlayer(player, keyboard.axis(), dt, {
        width: canvas.width,
        height: canvas.height,
      })

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawPlayer(ctx, player)
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
      aria-label="Pixel portfolio game. Use WASD or arrow keys to move."
    />
  )
}
