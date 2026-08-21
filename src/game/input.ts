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

const SPRINT_CODES = new Set(['ShiftLeft', 'ShiftRight'])

export function createKeyboard() {
  const held = new Set<string>()
  let sprinting = false

  const onDown = (event: KeyboardEvent) => {
    unlockAudio()
    if (event.code in DIRECTION_BY_CODE) {
      event.preventDefault()
      held.add(event.code)
      return
    }

    if (SPRINT_CODES.has(event.code)) {
      event.preventDefault()
      sprinting = true
    }
  }

  const onUp = (event: KeyboardEvent) => {
    if (event.code in DIRECTION_BY_CODE) {
      event.preventDefault()
      held.delete(event.code)
    }
    if (SPRINT_CODES.has(event.code)) {
      event.preventDefault()
      sprinting = false
    }
  }

  const onBlur = () => {
    held.clear()
    sprinting = false
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
      sprinting = false
    },
    isSprinting() {
      return sprinting
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
