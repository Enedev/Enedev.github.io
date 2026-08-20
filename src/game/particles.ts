import type { Particle } from './types'
import { PIXEL } from './sprite'
import { rand } from './math'

export function spawnBurst(
  particles: Particle[],
  x: number,
  y: number,
  colors: string[],
) {
  const count = 22
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.2, 0.2)
    const speed = rand(80, 220)
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      life: rand(0.35, 0.7),
      maxLife: 0.7,
      size: Math.random() > 0.6 ? PIXEL * 2 : PIXEL,
      color: colors[i % colors.length] ?? '#ffffff',
    })
  }
}

export function updateParticles(particles: Particle[], dt: number) {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i]
    if (!particle) continue
    particle.life -= dt
    particle.x += particle.vx * dt
    particle.y += particle.vy * dt
    particle.vy += 420 * dt
    particle.vx *= 0.98
    if (particle.life <= 0) particles.splice(i, 1)
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: readonly Particle[],
) {
  for (const particle of particles) {
    const alpha = Math.max(0, particle.life / particle.maxLife)
    ctx.globalAlpha = alpha
    ctx.fillStyle = particle.color
    ctx.fillRect(
      Math.round(particle.x),
      Math.round(particle.y),
      particle.size,
      particle.size,
    )
  }
  ctx.globalAlpha = 1
}
