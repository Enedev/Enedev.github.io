import type { Axis, Direction } from './types'
import { clamp } from './math'
import { unlockAudio } from './audio'

const DIRECTION_BY_CODE: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
}

const ATTACK_CODES = new Set(['Space', 'KeyJ', 'Enter'])

export function createKeyboard() {
  const held = new Set<string>()
  let attackQueued = false

  const onDown = (event: KeyboardEvent) => {
    unlockAudio()
    if (event.code in DIRECTION_BY_CODE) {
      event.preventDefault()
      held.add(event.code)
      return
    }

    if (ATTACK_CODES.has(event.code)) {
      event.preventDefault()
      if (!event.repeat) attackQueued = true
    }
  }

  const onUp = (event: KeyboardEvent) => {
    if (event.code in DIRECTION_BY_CODE || ATTACK_CODES.has(event.code)) {
      event.preventDefault()
    }
    held.delete(event.code)
  }

  const onBlur = () => {
    held.clear()
  }

  return {
    attach() {
      window.addEventListener('keydown', onDown)
      window.addEventListener('keyup', onUp)
      window.addEventListener('blur', onBlur)
    },
    detach() {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
      held.clear()
      attackQueued = false
    },
    consumeAttack() {
      const queued = attackQueued
      attackQueued = false
      return queued
    },
    queueAttack() {
      attackQueued = true
    },
    axis(): Axis {
      let x = 0
      let y = 0

      for (const code of held) {
        const direction = DIRECTION_BY_CODE[code]
        if (direction === 'left') x -= 1
        if (direction === 'right') x += 1
        if (direction === 'up') y -= 1
        if (direction === 'down') y += 1
      }

      return {
        x: clamp(x, -1, 1),
        y: clamp(y, -1, 1),
      }
    },
  }
}

export function mergeAxis(a: Axis, b: Axis): Axis {
  return {
    x: clamp(a.x + b.x, -1, 1),
    y: clamp(a.y + b.y, -1, 1),
  }
}
